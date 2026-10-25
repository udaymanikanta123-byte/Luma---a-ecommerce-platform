import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api, money } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { Summary } from "./Cart.jsx";

export default function Checkout() {
  const cart = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shipping_name: user?.name || "",
    shipping_phone: "",
    shipping_address: "",
    shipping_city: "",
    shipping_pincode: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!user) return <Navigate to="/login?next=/checkout" replace />;
  if (cart.items.length === 0) return <Navigate to="/cart" replace />;

  const on = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const order = await api("/orders", {
        method: "POST",
        token,
        body: {
          ...form,
          items: cart.items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        },
      });
      cart.clear();
      navigate("/orders", { state: { placed: order.id } });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container page">
      <h1>Checkout</h1>
      <div className="cart-layout">
        <form className="panel" onSubmit={submit} id="checkout-form">
          <h3>Shipping details</h3>
          <div className="form-grid">
            <label>Full name<input required value={form.shipping_name} onChange={on("shipping_name")} /></label>
            <label>Phone<input required inputMode="tel" minLength={7} value={form.shipping_phone} onChange={on("shipping_phone")} /></label>
            <label className="span2">Address<input required minLength={5} value={form.shipping_address} onChange={on("shipping_address")} placeholder="House no, street, area" /></label>
            <label>City<input required value={form.shipping_city} onChange={on("shipping_city")} /></label>
            <label>PIN code<input required minLength={4} maxLength={12} value={form.shipping_pincode} onChange={on("shipping_pincode")} /></label>
          </div>
          <div className="pay-note">
            💳 <strong>Cash on delivery</strong> — this is a demo store, no real payment is taken.
          </div>
          {error && <p className="alert">{error}</p>}
        </form>
        <div>
          <Summary cart={cart} />
          <ul className="mini-items">
            {cart.items.map((i) => (
              <li key={i.id}><span>{i.name} × {i.quantity}</span><span>{money(i.price * i.quantity)}</span></li>
            ))}
          </ul>
          <button className="btn btn-primary btn-block" form="checkout-form" disabled={busy}>
            {busy ? "Placing order…" : `Place order · ${money(cart.total)}`}
          </button>
          <Link to="/cart" className="muted small center">← Back to cart</Link>
        </div>
      </div>
    </div>
  );
}
