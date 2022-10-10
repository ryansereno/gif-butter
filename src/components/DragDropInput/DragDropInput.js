import { useRef, useState } from "react";
import uploadImg from "../../assets/cloud-upload-regular-240.png";
import fileIcon from "../../assets/file-icon.svg";
import './DragDropInput.css'

const DragDropInput = (props) => {
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");
  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      props.onFileChange(file);
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
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drop your video here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {file ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to convert</p>
          <div className="drop-file-preview__item">
            <img src={fileIcon} alt="file icon" />
            <div className="drop-file-preview__item__info">
              <p>{file.name}</p>
              <p>{file.size}B</p>
            </div>
            <span
              className="drop-file-preview__item__del"
              onClick={() => fileRemove()}
            >x
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DragDropInput;
