import Image from "next/image";
import { useRef, useState } from "react";
import uploadImg from "/public/cloud-upload-icon.svg";
import fileIcon from "/public/file-icon.svg";
import classes from "./DragDropInput.module.css";

const DragDropInput = (props) => {
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");
  const onFileDrop = (e) => {
    const video = e.target.files[0];
    if (video) {
      setFile(video);
      props.onFileChange(video);
    }
  };

  const fileRemove = () => {
    setFile(null);
    props.onFileChange(null);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={classes.dropFileInputContainer}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className={classes.dropFileInputLabel}>
          <Image src={uploadImg} layout="responsive"className={classes.cloudIcon} alt="" />
          <p>Drop your video here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {file ? (
        <div className={classes.dropFilePreview}>
          <p className={classes.dropFilePreviewTitle}>Ready to convert</p>
          <div className={classes.dropFilePreviewItem}>
            <Image src={fileIcon} layout='fill' alt="file icon" />
            <div className={classes.dropFilePreviewItemInfo}>
              <p>{file.name}</p>
            </div>
            <span
              className={classes.dropFilePreviewItemDelete}
              onClick={() => fileRemove()}
            >
              x
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DragDropInput;
