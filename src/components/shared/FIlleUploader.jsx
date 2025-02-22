import { Button } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (mediaUrl) {
      setFileUrl(mediaUrl);
    }
  }, [mediaUrl]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-center flex-col bg-dark-3
            rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {fileUrl ? (
          <>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
              <img src={fileUrl} alt="image" className="file_uploader-img" />
            </div>
            <p className="file_uploader-label">
              Click or drag photo to replace
            </p>
          </>
        ) : (
          <div className="file_uploader-box">
            <img
              src="./public/assets/icons/file-upload.svg"
              width={96}
              height={77}
              alt="file-upload"
            />
            <h3 className="base-medium text-light-2 mb-2 mt-6">
              Drag your photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">SVG,PNG,JPG</p>
            <Button type="button" variant="contained">
              Select From Computer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
