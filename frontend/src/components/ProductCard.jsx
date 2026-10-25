import { Link } from "react-router-dom";
import { money } from "../api.js";
import { useCart } from "../context/CartContext.jsx";

export function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {"★".repeat(full)}
      <span className="stars-off">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function ProductCard({ product }) {
  const { add } = useCart();
  const off = product.old_price ? Math.round((1 - product.price / product.old_price) * 100) : 0;
  const out = product.stock === 0;

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card-img">
        <img src={product.image_url} alt={product.name} loading="lazy" />
        {off > 0 && <span className="tag tag-sale">-{off}%</span>}
        {out && <span className="tag tag-out">Sold out</span>}
      </Link>
      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-title">{product.name}</Link>
        <div className="card-rating">
          <Stars value={product.rating} />
          <span className="muted small">({product.reviews})</span>
        </div>
        <div className="card-foot">
          <div className="price">
            <strong>{money(product.price)}</strong>
            {product.old_price && <s>{money(product.old_price)}</s>}
          </div>
          <button className="btn btn-dark btn-sm" disabled={out} onClick={() => add(product)}>
            {out ? "Sold out" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
