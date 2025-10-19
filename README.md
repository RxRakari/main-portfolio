# ⚡ Full-stack Sleek Portfolio

A **super-fast**, **secure**, and **scalable** portfolio platform built with a sleek, minimalist black-and-white theme.
Includes an **admin dashboard** for full content management, **Redis caching** for optimized performance, and complete **customization flexibility**.

---

## ✨ Features

* ⚙️ **Admin dashboard** for full content control
* 📝 **Blog management** with markdown support
* 💼 **Project showcase** with categories and live links
* 💬 **Testimonials** section
* 🖼️ **Gallery** with image uploads (Cloudinary integration)
* 📩 **Contact form** with instant email notifications
* ⚡ **Ultra-fast performance** using **Redis caching** for frequently accessed data
* 🔒 **High-level security** with JWT authentication, input sanitization, and secure API design
* 📈 **Scalable architecture** (Node.js + MongoDB + Redis) to handle heavy traffic efficiently
* 🎨 **Fully customizable UI** with TailwindCSS and modular React components
* 📚 **Auto-generated API documentation** using Swagger
* 🖥️ **Responsive monochrome design** for desktop and mobile

---

## 🧩 Tech Stack

### 🖥️ Frontend

* **React 19**
* **React Router DOM**
* **TailwindCSS**
* **TypeScript**

### ⚙️ Backend

* **Express.js**
* **MongoDB**
* **Redis** – For caching and speed optimization
* **Cloudinary** – Image storage and CDN delivery
* **Nodemailer** – Email service
* **JWT** – Authentication and session management
* **Swagger** – Interactive API documentation

---

## 🚀 Setup Instructions

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run setup
```

Then edit the `.env` file with:

* MongoDB connection string
* Redis connection URL
* JWT secret
* Cloudinary credentials
* Email service credentials

Create the initial admin user:

```bash
npm run create-admin
```

Default login:
**Email:** `admin@example.com`
**Password:** `admin123`

Start the backend:

```bash
npm run dev
```

Access API docs at:
👉 `http://localhost:5000/api-docs`

---

## 🛠️ Admin Dashboard Access

Once setup is complete, log into the dashboard using your admin credentials.

> ⚠️ It’s strongly recommended to change your default password immediately after login.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description                      |
| :----- | :------------------- | :------------------------------- |
| POST   | `/api/auth/register` | Register a new admin (dev only)  |
| POST   | `/api/auth/login`    | Login as admin                   |
| GET    | `/api/auth/profile`  | Get admin profile (protected)    |
| PUT    | `/api/auth/profile`  | Update admin profile (protected) |

### 📝 Blogs

| Method | Endpoint         | Description               |
| :----- | :--------------- | :------------------------ |
| GET    | `/api/blogs`     | Get all blogs             |
| GET    | `/api/blogs/:id` | Get a specific blog       |
| POST   | `/api/blogs`     | Create a blog (protected) |
| PUT    | `/api/blogs/:id` | Update blog (protected)   |
| DELETE | `/api/blogs/:id` | Delete blog (protected)   |

### 💼 Projects

| Method | Endpoint            | Description                 |
| :----- | :------------------ | :-------------------------- |
| GET    | `/api/projects`     | Get all projects            |
| GET    | `/api/projects/:id` | Get one project             |
| POST   | `/api/projects`     | Add new project (protected) |
| PUT    | `/api/projects/:id` | Update project (protected)  |
| DELETE | `/api/projects/:id` | Delete project (protected)  |

### 💬 Testimonials

| Method | Endpoint                | Description                    |
| :----- | :---------------------- | :----------------------------- |
| GET    | `/api/testimonials`     | Get testimonials               |
| POST   | `/api/testimonials`     | Add testimonial (protected)    |
| PUT    | `/api/testimonials/:id` | Update testimonial (protected) |
| DELETE | `/api/testimonials/:id` | Delete testimonial (protected) |

### 🖼️ Gallery

| Method | Endpoint           | Description              |
| :----- | :----------------- | :----------------------- |
| GET    | `/api/gallery`     | Get all images           |
| POST   | `/api/gallery`     | Upload image (protected) |
| DELETE | `/api/gallery/:id` | Delete image (protected) |

### 📩 Contact

| Method | Endpoint           | Description                   |
| :----- | :----------------- | :---------------------------- |
| POST   | `/api/contact`     | Submit contact form           |
| GET    | `/api/contact`     | Get submissions (protected)   |
| DELETE | `/api/contact/:id` | Delete submission (protected) |

---

## ⚙️ Performance & Security Highlights

* ⚡ **Redis caching** for ultra-fast API responses
* 🔐 **JWT-based authentication** and role-based access control
* 🧱 **Input validation** with strong schema enforcement
* 🧩 **Rate limiting** and request sanitization
* 🚀 **Optimized queries** and indexing for MongoDB
* 🛡️ **HTTPS-ready** configuration for secure deployment
* 🧭 **Scalable architecture** — easily extendable for new features

---

## 📄 License

**ISC**
