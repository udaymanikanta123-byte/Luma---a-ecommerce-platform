import { Link, useNavigate } from "react-router-dom";
import { FREE_SHIPPING_ABOVE, money } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export function Summary({ cart }) {
  const left = FREE_SHIPPING_ABOVE - cart.subtotal;
  return (
    <div className="summary">
      <h3>Order summary</h3>
      <div className="row"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
      <div className="row">
        <span>Shipping</span>
        <span>{cart.shipping === 0 ? "Free" : money(cart.shipping)}</span>
      </div>
      <div className="row total"><span>Total</span><span>{money(cart.total)}</span></div>
      {left > 0 && cart.items.length > 0 && (
        <div className="ship-bar">
          <p>Add {money(left)} more for free shipping</p>
          <div className="bar"><i style={{ width: `${Math.min(100, (cart.subtotal / FREE_SHIPPING_ABOVE) * 100)}%` }} /></div>
        </div>
      )}
    </div>
  );
}

export default function Cart() {
  const cart = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.items.length === 0)
    return (
      <div className="container page">
        <div className="empty">
          <div className="empty-ico">🛒</div>
          <h3>Your cart is empty</h3>
          <p className="muted">Looks like you haven’t added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Start shopping</Link>
        </div>
      </div>
    );

  return (
    <div className="container page">
      <h1>Shopping cart</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {cart.items.map((i) => (
            <div className="cart-item" key={i.id}>
              <Link to={`/product/${i.id}`}><img src={i.image_url} alt={i.name} /></Link>
              <div className="cart-info">
                <Link to={`/product/${i.id}`} className="card-title">{i.name}</Link>
                <span className="muted small">{money(i.price)} each</span>
                <button className="link danger" onClick={() => cart.remove(i.id)}>Remove</button>
              </div>
              <div className="qty">
                <button onClick={() => cart.setQty(i.id, i.quantity - 1)} aria-label="Decrease">−</button>
                <span>{i.quantity}</span>
                <button onClick={() => cart.setQty(i.id, i.quantity + 1)} aria-label="Increase">+</button>
              </div>
              <strong className="cart-line">{money(i.price * i.quantity)}</strong>
            </div>
          ))}
        </div>
        <div>
          <Summary cart={cart} />
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate(user ? "/checkout" : "/login?next=/checkout")}
          >
            {user ? "Proceed to checkout" : "Sign in to checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
