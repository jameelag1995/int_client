// Home.js
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import FileService from "../../utils/FileService.js"; // Replace with the correct path
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { logout, accessToken } = useAuth();
    const onDrop = useCallback(async (acceptedFiles) => {
        const validFiles = acceptedFiles.filter((file) => {
            const validExtensions = [
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".bmp",
                ".mp4",
                ".avi",
                ".mov",
            ];
            const isValidExtension = validExtensions.some((ext) =>
                file.name.toLowerCase().endsWith(ext)
            );
            return isValidExtension;
        });

        const newFiles = await Promise.all(
            validFiles.map(async (file) => {
                const uploadedFile = await FileService.uploadFile(
                    file,
                    accessToken
                );
                return {
                    file,
                    tags: [], // Add your tagging logic here
                    fileId: uploadedFile._id,
                    shareableLink: await FileService.generateShareableLink(
                        uploadedFile._id
                    ),
                };
            })
        );

        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".bmp",
            ".mp4",
            ".avi",
            ".mov",
        ],
    });

    const removeFile = async (fileId) => {
        try {
            await FileService.deleteFile(fileId);
            setUploadedFiles((files) =>
                files.filter((f) => f.fileId !== fileId)
            );
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const files = await FileService.getUploadedFiles(accessToken);
                setUploadedFiles(files);
            } catch (error) {
                console.error("Error fetching uploaded files:", error);
            }
        };

        fetchFiles();
    }, []);
    const handleLogout = async () => {
        console.log("logout clicked");
        const resr = await logout();
        console.log(res);
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (!accessToken) navigate("/");
    }, [accessToken]);
    return (
        <div className="Page">
            <button
                onClick={handleLogout}
                style={{ backgroundColor: "#b82b2b" }}
            >
                Logout
            </button>
            <h2>Home</h2>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drag and drop files here, or click to select files</p>
            </div>

            {uploadedFiles.length > 0 && (
                <div className="Page">
                    <h3>Uploaded Files</h3>
                    <ul>
                        {uploadedFiles.map((item) => (
                            <li
                                style={{
                                    margin: "1em",
                                    padding: "1em",
                                    display: "flex",
                                    gap: "1em",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                key={item.fileId}
                            >
                                <strong>{item.file.name}</strong>{" "}
                                <h2 onClick={() => removeFile(item.fileId)}>
                                    X
                                </h2>
                                <p>Shareable Link: {item.shareableLink}</p>
                            </li>
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
