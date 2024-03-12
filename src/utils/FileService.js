// FileService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Replace with your server URL

const FileService = {
    getUploadedFiles: async (token) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/files/get-files`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log("Response:", response.data);
            return response.data.myFiles;
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
            throw error; // rethrow the error to propagate it to the caller
        }
    },

    // upload file method
    uploadFile: async (file, token) => {
        const data = {
            filename: file.public_id,
            contentType: file.resource_type,
            shareableLink: file.url,
        };

        try {
            let res = await axios.post(
                `${API_BASE_URL}/upload`,
                data,

                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(res);
            return res.data;
        } catch (err) {
            throw err.message || "Something went wrong!";
        }
    },

    generateShareableLink: async (fileId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/generate-link`, {
                fileId,
            });
            return response.data.link;
        } catch (error) {
            console.error("Error generating shareable link:", error);
            throw error;
        }
    },
    deleteFile: async (fileId, token) => {
        try {
            console.log("Deleting file");
            const response = await axios.delete(`${API_BASE_URL}/delete-file`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                data: {
                    fileId: fileId,
                },
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    },
};

export default FileService;
