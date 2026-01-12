import { useEffect, useState } from "react";
import { getAllBlogsApi } from "../utils/api";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllBlogsApi();
    setBlogs(res);
  };

  return (
    <div className="w-full font-playfair text-foreground bg-[#FFF9FD]">

      {/* HERO */}
      <section className="px-4 py-10 md:py-24 text-center bg-gradient-to-b from-[#FFE6F3] to-[#FFF8FC]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          Share Your Stories with the World
        </h1>
        <p className="mt-4 max-w-xl md:max-w-2xl mx-auto text-base sm:text-lg opacity-80 leading-relaxed">
          A modern blogging platform where ideas come to life.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Link
            to="/create"
            className="px-7 py-3 rounded-xl font-semibold tracking-tight text-white flex items-center gap-2
            bg-gradient-to-r from-[#C05A82] to-[#9D4F73]
            hover:opacity-95 hover:scale-[1.02] transition-all duration-200 shadow-md w-full sm:w-auto justify-center"
          >
            Start Writing <FiArrowRight size={18} />
          </Link>

          <a
            href="#featured"
            className="px-7 py-3 rounded-xl font-semibold tracking-tight border w-full sm:w-auto
            border-[#C15B88] text-[#C15B88]
            hover:bg-[#C15B8820] hover:scale-[1.02] transition-all duration-200 text-center"
          >
            Explore Blogs
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 px-4 bg-[#FFF9FD]">
        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight mb-10">
          Crafted For Writers
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { icon: "📖", title: "Rich Content", desc: "Create elegant blog posts with images and rich formatting." },
            { icon: "🔒", title: "Secure Access", desc: "Authentication keeps your content safe and private." },
            { icon: "🌍", title: "Community", desc: "Connect with fellow writers and readers across the globe." }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE2EE] flex justify-center items-center text-2xl shadow-sm border border-[#F4C0D4]">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm opacity-75 leading-relaxed max-w-[220px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POSTS MASONRY SECTION */}
      <section id="featured" className="py-12 px-4 bg-white scroll-mt-24">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Stories</h2>
          <p className="text-sm opacity-80 mt-2">Handpicked articles from our talented writers</p>
        </div>

        {/* MASONRY GRID */}
        <div className="max-w-7xl mx-auto mt-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="break-inside-avoid rounded-2xl shadow-md border border-[#F0B8D1] bg-[#FFF7FA] overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {blog.image && (
                <img
                  src={`http://localhost:1030/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
              )}

              <div className="p-4 flex flex-col">
                <h3 className="font-semibold text-lg leading-snug text-gray-800 mb-2">{blog.title}</h3>

                <p className="text-sm opacity-75 leading-relaxed line-clamp-4 mb-3">
                  {blog.content}
                </p>

                <div className="flex justify-between items-center text-[11px] opacity-70 mb-2">
                  <span className="flex items-center gap-1">
                    <FaUser size={12} /> {blog.author?.name || "Unknown"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt size={12} />
                    {new Date(blog.createdAt).toDateString()}
                  </span>
                </div>

                <Link
                  to={`/blog/${blog._id}`}
                  className="text-[#C05A82] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto"
                >
                  Read More <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default Home;
