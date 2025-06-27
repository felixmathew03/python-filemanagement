import FileList from './FilieList';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
    const [refreshFlag, setRefreshFlag] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };
  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev); 
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📂 My Drive</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Upload Files</h2>
          {/* Scroll to upload area if needed */}
          <button
            onClick={() => document.getElementById("upload-area")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add File
          </button>
        </div>
        <div id="upload-area" className="mt-4">
          <FileUpload onUploadSuccess={handleRefresh}/>
        </div>
      </div>

      {/* Categories (Placeholder UI) */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {["Images", "Documents", "Videos", "Others"].map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-gray-300 transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* File List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Files</h2>
        <FileList refreshFlag={refreshFlag}/>
      </div>
    </div>
  );
}

export default Dashboard;
