# Luma — Full-Stack E-Commerce Store

**Stack:** React (Vite) · HTML / CSS / JavaScript · Python FastAPI · PostgreSQL

## Features
- Home page with hero, categories and featured products
- Shop page: search, category filter, max-price filter, sorting
- Product detail page with quantity picker and "Buy now"
- Persistent cart (localStorage), free-shipping progress bar
- Register / login with JWT auth (bcrypt password hashing)
- Checkout and order history (stock is checked and deducted in a DB transaction)
- Responsive layout, loading skeletons, toasts
- 16 sample products are seeded automatically on first start

## Project layout
```
ecommerce/
├── docker-compose.yml      # PostgreSQL in one command
├── backend/                # FastAPI
│   ├── requirements.txt
│   ├── .env.example
│   └── app/ (main, models, schemas, auth, seed, routers/)
└── frontend/               # React + Vite
    ├── package.json
    └── src/ (pages, components, context, styles.css)
```