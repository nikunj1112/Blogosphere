import { useState, useRef } from "react";
import { createBlogApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitBlog = async () => {
    if (!form.title || !form.content) {
      return toast.error("Title & Content required");
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    if (image) fd.append("image", image);

    setLoading(true);
    const res = await createBlogApi(fd);
    setLoading(false);

    if (res?.message === "Blog created") {
      toast.success("Blog Published 🎉");
      navigate("/");
    } else {
      toast.error(res?.message || "Failed to publish");
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setImage(file);
  };

  // DRAG EVENTS
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // DROP EVENT
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFEDFA]/80 flex justify-center items-start pt-24 pb-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl border border-[#FFB8E0] rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-[#BE5985] mb-6 text-center">
          ✍️ Create a New Blog
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-medium text-[#BE5985]">Title</label>
          <input
            className="mt-1 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] transition outline-none"
            placeholder="Amazing Blog Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="text-sm font-medium text-[#BE5985]">Content</label>
          <textarea
            className="mt-1 w-full p-3 border border-[#FFB8E0] rounded-lg h-40 focus:ring-2 focus:ring-[#EC7FA9] transition outline-none"
            placeholder="Write something amazing here..."
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        {/* 🚀 DRAG & DROP IMAGE UPLOAD */}
        <div
          className={`mt-4 border-2 rounded-xl p-6 text-center transition cursor-pointer ${
            dragActive
              ? "border-[#EC7FA9] bg-[#FFEDFACC]"
              : "border-dashed border-[#FFB8E0]"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {!image ? (
            <p className="text-[#BE5985] font-medium">
              Drag & Drop an Image Here or <span className="underline">Browse</span>
            </p>
          ) : (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full max-h-64 object-cover rounded-lg border border-[#FFB8E0] shadow"
              />
              <p className="text-sm text-gray-500 mt-2">{image.name}</p>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />
        </div>

        {/* Publish Button */}
        <button
          onClick={submitBlog}
          disabled={loading}
          className="mt-6 w-full py-3 bg-[#BE5985] text-white rounded-lg font-semibold shadow-md hover:bg-[#A0436F] transition disabled:bg-[#EC7FA9]"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Need to go back?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#BE5985] cursor-pointer font-semibold hover:underline"
          >
            Home
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateBlog;
