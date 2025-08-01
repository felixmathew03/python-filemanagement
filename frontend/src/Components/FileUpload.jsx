import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import API from '../api/api';

function FileUpload({ onUploadSuccess }) {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");

  const onDrop = async (acceptedFiles) => {
  const formData = new FormData();
  formData.append("file", acceptedFiles[0]);
  if (selectedFolder) {
    formData.append("folder", selectedFolder);
  }

  const accessToken = localStorage.getItem("access");

  try {
    await API.post("files/", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("File uploaded!");
    onUploadSuccess();

    // Optional: Reset input manually
    const fileInput = document.getElementById("file");
    if (fileInput) fileInput.value = ""; // Clear input to avoid re-trigger
  } catch (err) {
    console.error("Upload failed", err.response?.data || err);
    alert("Upload failed");
  }
};

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    const fetchFolders = async () => {
      const accessToken = localStorage.getItem("access");
      try {
        const response = await API.get("folders/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log(response.data.results);
        
        setFolders(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (err) {
        console.error("Failed to load folders", err);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      <label className="block mb-2 text-sm font-medium text-gray-700">Select Folder (optional):</label>
      <select
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
        className="mb-4 border border-gray-300 px-3 py-2 rounded w-full"
      >
        <option value="">-- No Folder --</option>
        {folders && (folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            📁 {folder.name}
          </option>
        )))}
      </select>

      <div  className="p-4 cursor-pointer">
        <label
          htmlFor="file" {...getRootProps()}
          className="h-[200px] w-full flex flex-col gap-5 items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-[10px] shadow-[0px_48px_35px_-48px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-20 fill-gray-600"
            >
              <path
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center">
            <span className="font-normal text-gray-600">
              Drag & drop file here or click to upload
            </span>
          </div>
          <input {...getInputProps()} id="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
