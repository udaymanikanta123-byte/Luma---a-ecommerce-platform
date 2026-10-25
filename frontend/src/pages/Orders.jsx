import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { api, money } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Orders() {
  const { user, token, loading: authLoading } = useAuth();
  const { state } = useLocation();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    api("/orders", { token }).then(setOrders).catch((e) => setError(e.message));
  }, [token]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login?next=/orders" replace />;

  return (
    <div className="container page">
      <h1>My orders</h1>
      {state?.placed && (
        <div className="success">
          🎉 Order #{state.placed} placed successfully! Thank you for shopping with Luma.
        </div>
      )}
      {error && <p className="alert">{error}</p>}
      {orders && orders.length === 0 && (
        <div className="empty">
          <div className="empty-ico">📦</div>
          <h3>No orders yet</h3>
          <Link to="/shop" className="btn btn-primary">Start shopping</Link>
        </div>
      )}
      <div className="orders">
        {orders?.map((o) => (
          <div className="order" key={o.id}>
            <div className="order-head">
              <div>
                <strong>Order #{o.id}</strong>
                <span className="muted small">
                  {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <span className="status">{o.status}</span>
              <strong>{money(o.total)}</strong>
            </div>
            <div className="order-items">
              {o.items.map((i) => (
                <Link to={`/product/${i.product_id}`} className="order-item" key={i.product_id}>
                  <img src={i.image_url} alt={i.name} />
                  <div><span>{i.name}</span><span className="muted small">Qty {i.quantity} · {money(i.price)}</span></div>
                </Link>
              ))}
            </div>
            <p className="muted small">
              Ship to: {o.shipping_name}, {o.shipping_address}, {o.shipping_city} {o.shipping_pincode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
