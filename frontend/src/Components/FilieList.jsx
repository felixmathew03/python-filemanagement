import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import API from '../api/api';

function FileList({refreshFlag}) {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFiles = async () => {
    try {
        const nextPage = page; // capture current page
        const res = await API.get(`files/?page=${nextPage}`);
        console.log(res.data.results);
        
        if (res.data.results) {
        setFiles((prev) => {
                const newFiles = res.data.results.filter(file => !prev.some(f => f.id === file.id));
                return [...prev, ...newFiles];
                });
        }

        if (res.data.next) {
        setPage(nextPage + 1); // update page only if there is more
        } else {
        setHasMore(false);
        }
    } catch (err) {
        console.error('Failed to fetch files:', err);
    }
    };

  useEffect(() => {
    fetchFiles(); // initial load
  }, [refreshFlag]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`files/${id}/`);
      setFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (err) {
      console.error('Error deleting file', err);
    }
  };

  const handleDownload = (path) => {
    window.open(`${path}`, '_blank');
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Files</h2>
      <InfiniteScroll
        dataLength={files.length}
        next={fetchFiles}
        hasMore={hasMore}
        loader={<p>Loading more files...</p>}
        endMessage={<p className="text-gray-500">No more files.</p>}
      >
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id} className="border p-3 rounded flex justify-between items-center">
              <span>{file.original_name || file.file}</span>
              <div className="space-x-2">
                <button onClick={() => handleDownload(file.file)} className="text-blue-600 hover:underline">
                  Download
                </button>
                <button onClick={() => handleDelete(file.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default FileList;
