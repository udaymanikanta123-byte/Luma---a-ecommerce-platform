import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">
            <span className="logo-mark">L</span>uma
          </div>
          <p className="muted">Thoughtfully chosen products, delivered to your door.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/shop?category=Electronics">Electronics</Link>
          <Link to="/shop?category=Fashion">Fashion</Link>
          <Link to="/shop?category=Home %26 Living">Home &amp; Living</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/orders">My orders</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Luma. Demo store — no real payments are processed.</div>
    </footer>
  );
}
