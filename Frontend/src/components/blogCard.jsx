import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
     <img
  src={`http://localhost:1030${blog.image}`}
  alt={blog.title}
  className="w-full h-40 object-cover rounded"
/>
      <h3 className="mt-3 font-semibold text-berry">{blog.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{blog.content}</p>
      <Link to={`/blog/${blog._id}`} className="text-pinkDark mt-2 inline-block">
        Read More →
      </Link>
    </div>
  );
};


export default BlogCard;
