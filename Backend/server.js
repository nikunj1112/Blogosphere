// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import path from 'path';



// import connectDB from '../Backend/config/db.js';
// import authRoutes from '../Backend/routes/authRoutes.js';
// import blogRoutes from '../Backend/routes/blogRoutes.js';
// // import otpRoutes from '../Backend/routes/otpRouters.js';

// const app = express();
// const PORT = 1030;
// connectDB();
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true
//     })
// );
// app.use(express.json());
// app.use(cookieParser());

// app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);
// // app.use('/api/otp', otpRoutes);
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost: ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from '../Backend/config/db.js';
import authRoutes from '../Backend/routes/authRoutes.js';
import blogRoutes from '../Backend/routes/blogRoutes.js';

const app = express();
const PORT = 1030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ⭐ Static serve /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


export default app;
