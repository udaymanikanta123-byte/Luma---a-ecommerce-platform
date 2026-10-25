import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">L</span>uma
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
        </nav>

        <form className="search" onSubmit={submit}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" />
        </form>

        <div className="nav-actions">
          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            {count > 0 && <span className="badge">{count}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button className="avatar" onClick={() => setMenu(!menu)} aria-label="Account">
                {user.name[0].toUpperCase()}
              </button>
              {menu && (
                <div className="dropdown" onMouseLeave={() => setMenu(false)}>
                  <p className="dd-name">{user.name}</p>
                  <p className="dd-mail">{user.email}</p>
                  <Link to="/orders" onClick={() => setMenu(false)}>My orders</Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenu(false);
                      navigate("/");
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
