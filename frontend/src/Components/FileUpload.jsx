import { useDropzone } from 'react-dropzone';
import API from '../api/api';

function FileUpload({ onUploadSuccess }) {
  const onDrop = async (acceptedFiles) => {
  const formData = new FormData();
  formData.append("file", acceptedFiles[0]);

  const accessToken = localStorage.getItem("access");

  try {
    await API.post("files/", formData, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("File uploaded!");
    onUploadSuccess();
  } catch (err) {
    console.error("Upload failed", err.response?.data || err);
    alert("Upload failed");
  }
};


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border p-4 cursor-pointer">
      <input {...getInputProps()} />
      <p>Drag & drop file here or click to upload</p>
    </div>
  );
}

export default FileUpload;
