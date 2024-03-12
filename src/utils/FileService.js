// FileService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Replace with your server URL

const FileService = {
    getUploadedFiles: async (token) => {
        const response = await axios.get(`${API_BASE_URL}/get-my-files`, {
            headers: { Authorization: "Bearer" + token },
        });
        console.log(response);
        return response.data;
    },

    // upload file method
    uploadFile: async (file, token) => {
        const formData = new FormData();
        formData.append("uploadedFile", file);

        try {
            let res = await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer" + token,
                },
            });

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
};

export default FileService;
