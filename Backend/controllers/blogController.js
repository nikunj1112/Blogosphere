// import Blog from "../models/blogModel.js";

// // CREATE BLOG
// export const createBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const image = req.file ? `/uploads/blogs/${req.file.filename}` : null;

//     if (!title || !content)
//       return res.status(400).json({ message: "All fields are required" });

//     const newBlog = new Blog({
//       title,
//       content,
//       image,
//       author: req.userId,
//       createdAt: new Date()
//     });

//     await newBlog.save();
//     return res.status(201).json({ message: "Blog created", blog: newBlog });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // UPDATE BLOG
// export const updateBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const blog = await Blog.findById(blogId);

//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     if (blog.author.toString() !== req.userId)
//       return res.status(403).json({ message: "Unauthorized" });

//     const image = req.file ? `/uploads/${req.file.filename}` : blog.image;

//     blog.title = req.body.title || blog.title;
//     blog.content = req.body.content || blog.content;
//     blog.image = image;
//     blog.updatedAt = new Date();
//     await blog.save();

//     return res.status(200).json({ message: "Blog updated", blog });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // DELETE BLOG
// export const deleteBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const blog = await Blog.findById(blogId);

//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     if (blog.author.toString() !== req.userId)
//       return res.status(403).json({ message: "Unauthorized" });

//     await blog.deleteOne();
//     return res.status(200).json({ message: "Blog deleted" });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // GET ALL BLOGS
// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate("author", "name email");
//     return res.status(200).json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

 

// // GET SINGLE BLOG
// export const getSingleBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate("author", "name email");
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     return res.status(200).json(blog);

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// }; 


import Blog from "../models/blogModel.js";

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `blogs/${req.file.filename}` : null;

    if (!title || !content)
      return res.status(400).json({ message: "All fields are required" });

    const newBlog = new Blog({
      title,
      content,
      image,
      author: req.userId
    });

    await newBlog.save();
    return res.status(201).json({ message: "Blog created", blog: newBlog });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET SINGLE BLOG
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const image = req.file ? `blogs/${req.file.filename}` : blog.image;

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.image = image;

    await blog.save();

    return res.status(200).json({ message: "Blog updated", blog });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
