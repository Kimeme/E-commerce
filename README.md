# E-Shop | Full-Stack E-Commerce Application

A modern **full-stack E-Commerce application** built with **Next.js 16, React.js, TypeScript, Tailwind CSS, Prisma, Stripe, and MongoDB**.  
This project allows users to browse products, add items to the cart, checkout securely with Stripe, and manage orders. Admin users can also manage products and review ratings.  

---

## 🌟 Features

**User Features:**
- User Authentication (Sign Up / Login)
- Browse Products with categories and search
- Add to Cart & Checkout functionality
- Stripe Payment Integration
- View Order History & Status
- Submit Product Reviews & Ratings
- Responsive Design (Mobile & Desktop)

**Admin Features:**
- Summary Dashboard of orders, products, and revenue
- Add New Products
- Manage / Edit / Delete Products
- Manage Orders (update status)
- View Reviews & Ratings

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React.js, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Next.js API Routes, Prisma ORM  
- **Database:** MongoDB (via Prisma)  
- **Payments:** Stripe  
- **Deployment (Optional):** Vercel for frontend, Render / Railway for backend  

---

## 📸 Screenshots / Demo

![Home Page](./docs/homepage.png)  
![Product Page](./docs/product-page.png)  
![Checkout](./docs/checkout.png)  
![Admin Dashboard](./docs/admin-dashboard.png)  

**Live Demo:** [Your Deployed App Link](https://your-app-link.com)

---

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Prerequisites

- Node.js v18+  
- npm or yarn  
- MongoDB (local or Atlas)  
- Stripe account (for payments)  

### Installation

1. Clone the repository:

```bash
git clone git@github.com:Kimeme/E-commerce.git
cd e-shop


2. Install dependencies:

npm install
# or
yarn

3. Create a .env file in the root:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

4. Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000
 in your browser to see the result.
You can start editing pages by modifying app/page.tsx. The page auto-updates as you edit the file.

Testing Stripe Payments

Use Stripe test cards to simulate payments in development:

Successful payment: 4242 4242 4242 4242

Expiry: any future date

CVC: any 3 digits

ZIP: any 5 digits

Other test cards available here: Stripe Test Cards

   -> Make sure you are using Stripe test keys, not live keys.

Learnings & Challenges

Learned full-stack Next.js with TypeScript

Integrated Stripe payments securely

Implemented responsive UI with Tailwind CSS

Designed MongoDB schema with Prisma ORM

Built admin panel for product & order management

Implemented reviews and ratings system

Managed complex state with React & API calls

🔮 Future Improvements

Add Analytics Dashboard for sales trends

Implement advanced search and filter

Add unit & integration testing

Improve SEO for product pages


Learn More About Next.js

Next.js Documentation
 - learn about Next.js features and API.

Learn Next.js
 - an interactive Next.js tutorial.

Next.js GitHub Repository
 - feedback and contributions welcome!

 Deploy on Vercel

Use Vercel Platform
 for deployment.
See Next.js deployment docs
 for details.

  License

This project is open-sourced under the MIT License.

---

✅ **Summary:**  

- This version is **fully professional and portfolio-ready**.  
- **Learnings & Challenges** and **Future Improvements** are included—very important to show your skills and growth.  
- **Next Steps / git commands** are **removed** because visitors don’t need them.  

---

If you want, I can also **make a “super visual version”** with **badges for Next.js, TypeScript, Prisma, Stripe**, **GIF placeholders for UI**, and a **feature summary table**—this will make your GitHub repo really stand out.  

Do you want me to do that?