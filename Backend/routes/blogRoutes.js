import express from 'express';
import multer from 'multer';
import auth from '../middlewares/authMiddleware.js';

import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/blogs'); // folder exists? ensure yes
  },
  filename: function (req, file, cb) {
    cb(null, 'Blog-img-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post('/', auth, upload.single('image'), createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);
router.put('/:id', auth, upload.single('image'), updateBlog);
router.delete('/:id', auth, deleteBlog);

export default router;
