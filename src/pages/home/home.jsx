// Home.js
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import FileService from "../../utils/FileService.js"; // Replace with the correct path
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget.jsx";
import FileCard from "../../components/Card/Card.jsx";

const Home = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { logout, accessToken } = useAuth();

    const removeFile = async (fileId) => {
        try {
            await FileService.deleteFile(fileId);
            setUploadedFiles((files) => files.filter((f) => f._id !== fileId));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    const fetchFiles = async () => {
        try {
            const files = await FileService.getUploadedFiles(accessToken);
            console.log("files:", files);
            setUploadedFiles(files);
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
        }
    };
    useEffect(() => {
        if (!accessToken) navigate("/");
        if (accessToken) {
            fetchFiles();
            console.log("useEffect uploaded files", uploadedFiles);
        }
    }, [accessToken]);
    const handleLogout = async () => {
        console.log("logout clicked");
        const res = await logout();
        console.log(res);
    };
    const [info, setInfo] = useState({});
    const [data, setData] = useState([]);
    const saveFiles = async () => {
        await FileService.uploadFile(info, accessToken);
        await fetchFiles();
    };
    const navigate = useNavigate();
    return (
        <div className="Page">
            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: "#b82b2b",
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                }}
            >
                Logout
            </button>
            <h2>Home</h2>
            {/* <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drag and drop files here, or click to select files</p>
            </div> */}
            <UploadWidget setImages={setData} images={data} setInfo={setInfo} />
            <button onClick={saveFiles}>save</button>
            {uploadedFiles.length > 0 && (
                <div className="Page">
                    <h3>Uploaded Files</h3>
                    <ul>
                        {uploadedFiles?.map((item) => (
                            <FileCard
                                key={item._id}
                                file={item}
                                onDelete={removeFile}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const dropzoneStyles = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
};

export default Home;
