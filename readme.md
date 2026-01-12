# ✍️ Blogosphere — A Modern Full-Stack Blogging Platform (MERN + OTP Auth + Image Upload)

Blogosphere is a fully featured MERN-based blogging platform that allows users to authenticate securely using OTP-based login, create and manage blog posts with images, update or delete their content, and interact with a visually appealing responsive UI built using React & Tailwind CSS.

This project showcases advanced MERN concepts including secure authentication, file uploads, protected routing, context store, and modern UI/UX techniques.

---

# ✨ Key Features Overview

### 🔐 **Secure Authentication**
- Email & Password based login
- OTP verification via email
- HTTP-only cookies & JWT for maximum security
- Unauthorized users cannot access protected routes

### ✍️ **Blog Management**
- Create blogs with **Image Upload**
- Edit & Update blogs anytime
- Delete own blogs
- Markdown-ready content structure

### 🧑‍💻 **User Account / Profile**
- Profile dashboard
- User initials as avatar
- Auth context-aware navigation

### 🖼 **Rich Image Support**
- Drag & Drop upload support
- Live image preview
- Multer-based backend storage
- Static serving endpoint for images

### 🎨 **Modern UI & UX**
- Tailwind CSS + custom theme
- Responsive for all screens
- Masonry grid for blogs layout
- Framer Motion animations
- Toast Notifications

### ⚙️ **Fully Production Ready Architecture**
- Modular directory structure
- MVC pattern in backend
- Reusable components in frontend

---

# 🧩 Tech Stack Breakdown

## **Frontend**
| Library / Tool | Purpose |
|---|---|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| React Router DOM | Routing System |
| Context API | Auth State Management |
| Hot Toast | Notifications |
| Framer Motion | Animations |
| Fetch API | API Communication |

## **Backend**
| Library / Tool | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | API Server |
| MongoDB & Mongoose | Database & ORM |
| Multer | File Upload |
| Nodemailer | Email OTP |
| JWT | Authentication |
| Cookie Parser | Token Handling |
| CORS | Security Configuration |

---
## 🌲 Project Directory Structure (Stylish Tree)

```
BLOGOSPHERE/
│
├── 🌲 Backend/
│   ├── 📦 config/
│   │   └── 📄 db.js
│   │
│   ├── 📁 controllers/
│   │   ├── 📄 autoController.js
│   │   ├── 📄 blogController.js
│   │   └── 📄 otpController.js
│   │
│   ├── 🧱 middlewares/
│   │   └── 📄 authMiddleware.js
│   │
│   ├── 🗂 models/
│   │   ├── 📄 authModel.js
│   │   ├── 📄 blogModel.js
│   │   └── 📄 otpModel.js
│   │
│   ├── 🚏 routes/
│   │   ├── 📄 authRoutes.js
│   │   ├── 📄 blogRoutes.js
│   │   └── 📄 otpRoutes.js
│   │
│   ├── ⚙️ services/
│   │   └── 📄 service.js
│   │
│   ├── 🖼 uploads/
│   │   └── 📁 blogs/
│   │
│   ├── 🔐 .env
│   ├── 📦 package.json
│   ├── 📦 package-lock.json
│   └── 🚀 server.js
│
├── 🌲 Frontend/
│   ├── 🧩 node_modules/
│   │
│   ├── 🌐 public/
│   │   └── 🖼 vite.svg
│   │
│   ├── 💻 src/
│       ├── 🖼 assets/
│       │
│       ├── 🧩 components/
│       │   ├── 📄 blogCard.jsx
│       │   ├── 📄 footer.jsx
│       │   ├── 📄 navbar.jsx
│       │   └── 📄 protectedRoute.jsx
│       │
│       ├── 🔌 context/
│       │   └── 📄 authContext.jsx
│       │
│       ├── 📄 pages/
│       │   ├── 📄 blogDetails.jsx
│       │   ├── 📄 createBlog.jsx
│       │   ├── 📄 home.jsx
│       │   ├── 📄 otpVerify.jsx
│       │   ├── 📄 profile.jsx
│       │   ├── 📄 signIn.jsx
│       │   └── 📄 signUp.jsx
│       │
│       ├── 🛠 utils/
│       │   └── 📄 api.js
│       │
│       ├── 🎨 App.css
│       ├── 📄 App.jsx
│       ├── 🎨 index.css
│       └── 📄 main.jsx
│
│   ├── 📄 .gitignore
│   ├── 🔍 eslint.config.js
│   ├── 🌐 index.html
│   ├── 📦 package.json
│   ├── 📦 package-lock.json
│   ├── 📘 README.md
│   ├── 🎨 tailwind.config.js
│   └── 📦 vite.config.js
│
└── 📘 README.md (root)

```

---

# 🏗 Installation & Local Setup Guide

## **1️⃣ Clone the Repository**
```bash
git clone https://github.com/nikunj1112/blogosphere.git
cd blogosphere
```

---

## **2️⃣ Backend Setup**
```bash
cd backend
npm install
```

### **Environment Variables Setup**
Create a `.env` file inside backend:

```env
PORT=1030
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_token
SMTP_USER=your_email
SMTP_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

### **Run Backend**
```bash
npm run dev
```
> Server runs at: `http://localhost:1030`

---

## **3️⃣ Frontend Setup**
```bash
cd ../frontend
npm install
```

### **Run Frontend**
```bash
npm run dev
```

> App runs at: `http://localhost:5173`

---

# 🔐 Authentication Flow Explanation

```
User enters Email + Password → Send Request
                      ⬇
Server verifies Email → Sends OTP to User Email
                      ⬇
User enters OTP → Verify OTP
                      ⬇
JWT Token issued in HTTP-only cookie
                      ⬇
User Authenticated → Profile + Protected Actions Allowed
```

### **Why HTTP-Only Cookies?**
- They **cannot be accessed via JavaScript**
- Protects against **XSS attacks**
- Secure for production

---

# 🖼 Image Upload System (Details)

### **Frontend**
- Drag & Drop support
- File type validation
- Live preview with URL.createObjectURL

### **Backend (Multer)**
- Saved to `/uploads/`
- Served as static assets via:
```
http://localhost:1030/uploads/<file-name>
```

---

# 📽️ Demo video url :

https://drive.google.com/file/d/1cu7uBUPChXwIU0MtelnC3EO0lIosB08a/view?usp=sharing

---

# 🖼️ Demo Image :

<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 01 26 AM" src="https://github.com/user-attachments/assets/b2d12bd5-ee39-459f-b14c-14093fa0f1b5" />
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 01 49 AM" src="https://github.com/user-attachments/assets/ed7cd2c7-b751-4d8c-9761-f76e5f9f3e85" />
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 02 00 AM" src="https://github.com/user-attachments/assets/66cf0d4d-3af1-4eee-8121-8b2cdec3c11e" />
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 08 29 AM" src="https://github.com/user-attachments/assets/a233b663-6eba-4499-93b6-296132f0ca79" />
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 08 38 AM" src="https://github.com/user-attachments/assets/7246ab87-9d0b-4b8e-94cd-c0611926fa73" />
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 09 03 AM" src="https://github.com/user-attachments/assets/0f977f0e-893f-48da-bdb0-b0158e3dabb4" />
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 09 14 AM" src="https://github.com/user-attachments/assets/c38852c4-195c-4e8e-91df-df59a891e971" />
<!-- <img width="450" height="500" alt="Screenshot 2026-01-13 at 12 09 34 AM" src="https://github.com/user-attachments/assets/38a18f4f-a681-46c9-bf02-ed741fa4d81e" /> -->
<img width="450" height="500" alt="Screenshot 2026-01-13 at 12 09 55 AM" src="https://github.com/user-attachments/assets/4b158ea9-afb5-496a-8075-f9b4bc204426" />


<img width="450" height="832" alt="Screenshot 2026-01-13 at 12 10 24 AM" src="https://github.com/user-attachments/assets/103c8e3c-d258-4327-a06f-22863184ed9f" />




---

# 📡 API Endpoints Documentation

## **Authentication APIs**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/signin-request` | Request OTP |
| POST | `/auth/signin-verify` | Verify OTP & Login |
| POST | `/auth/signout` | Logout user |
| GET | `/auth/profile` | Get logged user info |

## **Blog APIs**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/blogs` | Create blog (multipart) |
| GET | `/blogs` | Fetch all blogs |
| GET | `/blogs/:id` | Fetch single blog |
| PUT | `/blogs/:id` | Update blog |
| DELETE | `/blogs/:id` | Delete own blog |

---

# 🛡 Security Implementations

✔ HTTP-Only Cookies for JWT  
✔ Password Hashing (Bcrypt recommended)  
✔ CORS Restrictions  
✔ Protected Routes  
✔ Role Awareness for Blog Ownership  
✔ Server-side Validation  
✔ Email Verification (OTP)

---

# 🌐 Deployment Guide

### **Backend Deployment Options**
- Railway
- Render
- VPS (Ubuntu / Nginx)
- AWS EC2
- Heroku (legacy)

### **Frontend Deployment Options**
- Vercel
- Netlify
- Github Pages
- AWS Amplify

> Ensure to set correct `CLIENT_URL` & `SERVER_URL` in `.env`

---

# 🧪 Testing Scope

### **Unit Tests (Optional)**
- Auth Controller
- Blog Controller

### **Integration Tests**
- API Routes Testing (Jest / Postman)

---

# 🧯 Troubleshooting & FAQ

### ❓ `CORS Error`
➡ Add:
```js
app.use(cors({ origin: CLIENT_URL, credentials: true }))
```

### ❓ `OTP Not Sending`
➡ Check:
- SMTP credentials
- App Password (Gmail requires App Password)
- Less secure access settings

### ❓ `Cookies Not Set`
➡ For Local:
- Use `credentials: "include"` on frontend fetch
- Use `sameSite: "lax"` server side

---

# 🤝 Contributing

PRs and suggestions are welcome!  
Fork this repo → Create branch → Push → Open PR.

---

# 📜 License

This project is distributed under **MIT License** — free to use, distribute & modify.

---

# 👨‍💻 Author

Developed with ❤️ by **RANA NIKUNJ ⚜️**  
If you use it or like it, ⭐ the repo!

