import React, { useState } from "react";

export default function UploadWidget({ setInfo, images, setImages }) {
    const [formData, setFormData] = useState({});

    function handleOpenWidget() {
        let myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dazruk99u",
                uploadPreset: "jameelag",
                maxFileSize: 10 * 1024 * 1024,
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info);
                    const secureUrl = result.info.secure_url;
                    setImages((prev) => [...prev, secureUrl]);
                    setInfo(result.info);
                }
            }
        );
        myWidget.open();
    }
    return (
        <div>
            <button onClick={handleOpenWidget}>Upload Image</button>
        </div>
    );
}
