import { useEffect, useState } from "react";
import API from "../api/api";

function Profile() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    profile_picture: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    API.get("profile/")
      .then((res) => {
        setForm({
          username: res.data.username,
          email: res.data.email,
          profile_picture: res.data.profile_picture,
        });
        setPreview(res.data.profile_picture);
      })
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, profile_picture: e.target.files[0] }));
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", form.username);
    data.append("email", form.email);
    if (form.profile_picture instanceof File) {
      data.append("profile_picture", form.profile_picture);
    }

    try {
      const res = await API.patch("profile/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {preview && (
          <img
            src={`http://localhost:8000${preview}`}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Email"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
