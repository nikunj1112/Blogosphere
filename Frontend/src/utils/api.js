const BASE_URL = "http://localhost:1030/api";

/* ===============================
   AUTH APIs
=============================== */

// Signup
export const signupApi = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Direct Signin (optional)
export const signinApi = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Signin → Request OTP
export const signinRequestApi = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/signin-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Signin → Verify OTP
export const signinVerifyApi = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/signin-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Signout
export const signoutApi = async () => {
  const res = await fetch(`${BASE_URL}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

// Profile
export const getProfileApi = async () => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    credentials: "include",
  });
  return res.json();
};


/* ===============================
   BLOG APIs
=============================== */

// Create Blog + Image Upload
export const createBlogApi = async (formData) => {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    credentials: "include",
    body: formData, // multipart
  });
  return res.json();
};

// Get All Blogs
export const getAllBlogsApi = async () => {
  const res = await fetch(`${BASE_URL}/blogs`);
  return res.json();
};

// Get Blog By ID
export const getBlogByIdApi = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`);
  return res.json();
};

// Update Blog
export const updateBlogApi = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData, // multipart
  });
  return res.json();
};

// Delete Blog
export const deleteBlogApi = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};
