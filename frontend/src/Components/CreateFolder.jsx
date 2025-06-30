import { useState } from 'react';
import API from '../api/api';

function CreateFolder({ onFolderCreated }) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access");
    try {
      await API.post("folders/", { name: folderName }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("Folder created!");
      setFolderName("");
      onFolderCreated(); // to refresh folder list
    } catch (err) {
      console.error("Error creating folder", err.response?.data || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">New Folder Name:</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateFolder;
