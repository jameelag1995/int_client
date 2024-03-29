import React, { useState } from "react";
import PropTypes from "prop-types";

const FileCard = ({ file, onDelete }) => {
    const [copySuccess, setCopySuccess] = useState(null);

    const handleCopyToClipboard = () => {
        const fileUrl = file.shareableLink;
        navigator.clipboard.writeText(fileUrl).then(
            () => setCopySuccess("Copied to clipboard!"),
            () => setCopySuccess("Failed to copy. Please copy manually.")
        );
    };

    return (
        <div className="file-card">
            {file.contentType.startsWith("image") ? (
                <img src={file.shareableLink} alt="Preview" />
            ) : file.contentType.startsWith("video") ? (
                <video controls>
                    <source src={file.shareableLink} type={file.contentType} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div>Unsupported file type</div>
            )}

            <div className="file-info">
                <h3>{file.filename}</h3>
                <button onClick={() => onDelete(file._id)}>Delete</button>
                <button onClick={handleCopyToClipboard}>
                    Copy URL to Clipboard
                </button>
                {copySuccess && <p>{copySuccess}</p>}
            </div>
        </div>
    );
};

export default FileCard;
