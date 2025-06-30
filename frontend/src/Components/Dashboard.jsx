import FileList from './FilieList';
import FileUpload from './FileUpload';
import CreateFolder from './CreateFolder';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(""); 

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight">📁 MyDrive</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content Area */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        {/* Upload Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upload New Files</h2>
            <button
              onClick={() =>
                document.getElementById("upload-area")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm transition"
            >
              + Add File
            </button>
          </div>
          <div id="upload-area" className="bg-gray-50 border border-dashed border-gray-300 p-6 rounded-lg shadow-sm">
            <CreateFolder onFolderCreated={handleRefresh} />
            <FileUpload onUploadSuccess={handleRefresh} />
          </div>
        </section>

        {/* Categories - Optional UI */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {["Images", "Documents", "Videos", "Others"].map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-300 cursor-pointer transition"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* File List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Files</h2>
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <FileList refreshFlag={refreshFlag} selectedFolder={selectedFolderId} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
