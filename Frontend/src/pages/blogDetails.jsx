import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogByIdApi, deleteBlogApi, updateBlogApi } from "../utils/api";
import { useAuth } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [newImage, setNewImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef();

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    const res = await getBlogByIdApi(id);
    setBlog(res);
    setForm({ title: res.title, content: res.content });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure to delete this blog?")) return;

    const res = await deleteBlogApi(id);
    if (res?.message === "Blog deleted") {
      toast.success("Blog Deleted 🗑️");
      navigate("/");
    } else {
      toast.error("Failed to delete ❌");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const img = e.dataTransfer.files[0];
    if (!img || !img.type.startsWith("image/")) {
      return toast.error("Only images allowed!");
    }
    setNewImage(img);
    toast.success("New Image Selected 🎉");
  };

  const handleFileSelect = (e) => {
    const img = e.target.files[0];
    if (!img || !img.type.startsWith("image/")) {
      return toast.error("Only images allowed!");
    }
    setNewImage(img);
    toast.success("New Image Selected 🎉");
  };

  const handleUpdate = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    if (newImage) fd.append("image", newImage);

    const res = await updateBlogApi(id, fd);
    if (res?.message === "Blog updated") {
      toast.success("Blog Updated 🎉");
      setEditMode(false);
      setNewImage(null);
      loadBlog();
    } else {
      toast.error(res?.message || "Update failed ❌");
    }
  };

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  const isOwner = user?._id === blog.author?._id;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-[#FFEDFA]/80">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 ml-10 mb-6 px-4 py-2 rounded-lg 
        bg-white text-[#A6406D] font-medium shadow-sm border border-[#FFB8E0]
        hover:bg-[#EC7FA9] hover:text-white hover:shadow-lg hover:scale-[1.05]
        transition-all duration-200"
      >
        ← <span className="hidden sm:flex">Back</span>
      </button>

      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-10">

          {/* LEFT IMAGE / DRAG & DROP */}
          <div className="md:w-1/3 flex flex-col items-start">
            <label className="text-sm1 font-medium text-[#BE5985] mb-1 block "> Image : </label>
            <AnimatePresence mode="wait">
              {!editMode ? (
                <motion.img
                  key="showImage"
                  initial={{ opacity: 0, scale: .98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: .25 }}
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : `http://localhost:1030/uploads/${blog.image}`
                  }
                  className="w-full max-h-[430px] rounded-xl shadow-lg object-cover"
                  alt="blog"
                />
              ) : (
                <motion.div
                  key="dropZone"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .2 }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current.click()}
                  className={`w-full max-h-[430px] h-[350px] flex items-center justify-center rounded-xl cursor-pointer border-2 border-dashed transition 
                  ${dragOver
                      ? "border-[#BE5985] bg-[#FFE2F1]"
                      : "border-[#FFB8E0] bg-[#FFF7FA]"
                    }`}
                >
                  <p className="text-[#BE5985] font-semibold">
                    Drag & Drop Image or Click to Select
                  </p>
                  <input
                    type="file"
                    ref={fileRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* RIGHT CONTENT */}
          {/* RIGHT CONTENT */}
          <div className="md:w-1/2 flex flex-col">
            <p className="text-xs2 text-gray-500 mb-5">
              {new Date(blog.createdAt).toDateString()}
            </p>

            {!editMode ? (
              <h1 className="text-3xl font-bold text-[#BE5985] my-3">{blog.title}</h1>
            ) : (
              <div className="mb-4">
                <label className="text-sm font-medium text-[#BE5985] mb-1 block">Title :</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="p-2 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition w-full"
                />
              </div>
            )}

            {!editMode ? (
              <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
            ) : (
              <div className="mb-4">
                <label className="text-sm font-medium text-[#BE5985] mb-1 block">Content : </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="p-2 border border-[#FFB8E0] rounded-lg h-44 resize-none focus:ring-2 focus:ring-[#EC7FA9] outline-none transition w-full"
                />
              </div>
            )}

            <p className="mt-3 text-lg text-gray-600">
              ✍️ Author: <span className="font-semibold text-[#BE5985]">{blog.author?.name}</span>
            </p>

            {isOwner && (
              <div className="flex gap-3 mt-8">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-5 py-2 rounded-full bg-[#EC7FA9] text-white font-medium hover:bg-[#BE5985]"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="px-5 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setEditMode(false); setNewImage(null); }}
                      className="px-5 py-2 rounded-full bg-gray-400 text-white font-medium hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {!editMode && (
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 rounded-full bg-red-600 text-white font-medium hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
