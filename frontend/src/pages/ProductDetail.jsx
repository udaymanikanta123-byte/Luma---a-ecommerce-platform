import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, money } from "../api.js";
import { Stars } from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    setP(null);
    setQty(1);
    api(`/products/${id}`).then(setP).catch((e) => setError(e.message));
    window.scrollTo(0, 0);
  }, [id]);

  if (error)
    return (
      <div className="container page">
        <p className="alert">{error}</p>
        <Link to="/shop" className="link">← Back to shop</Link>
      </div>
    );
  if (!p) return <div className="container page"><div className="card skeleton detail-skel" /></div>;

  const off = p.old_price ? Math.round((1 - p.price / p.old_price) * 100) : 0;
  const out = p.stock === 0;

  return (
    <div className="container page">
      <Link to="/shop" className="link">← Back to shop</Link>
      <div className="detail">
        <div className="detail-img"><img src={p.image_url} alt={p.name} /></div>
        <div className="detail-info">
          <span className="card-cat">{p.category}</span>
          <h1>{p.name}</h1>
          <div className="card-rating">
            <Stars value={p.rating} /> <span className="muted">{p.rating} · {p.reviews} reviews</span>
          </div>
          <div className="detail-price">
            <strong>{money(p.price)}</strong>
            {p.old_price && <s>{money(p.old_price)}</s>}
            {off > 0 && <span className="tag tag-sale inline">Save {off}%</span>}
          </div>
          <p className="detail-desc">{p.description}</p>
          <p className={out ? "stock out" : p.stock < 10 ? "stock low" : "stock"}>
            {out ? "Out of stock" : p.stock < 10 ? `Only ${p.stock} left` : "In stock"}
          </p>

          {!out && (
            <div className="detail-actions">
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(Math.min(p.stock, qty + 1))} aria-label="Increase">+</button>
              </div>
              <button className="btn btn-primary" onClick={() => add(p, qty)}>Add to cart</button>
              <button
                className="btn btn-dark"
                onClick={() => {
                  add(p, qty);
                  navigate("/cart");
                }}
              >
                Buy now
              </button>
            </div>
          )}

          <ul className="detail-points">
            <li>🚚 Free delivery on orders over ₹999</li>
            <li>↩️ 7-day easy returns</li>
            <li>🔒 Secure checkout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
