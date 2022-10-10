import { useDropzone } from "react-dropzone";
import React, {useState} from 'react'
import JarLogo from "./components/UI/JarLogo";

function App() {
  const [file, setFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFile) => {
      setFile(
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      );
    },
  });
  return (
    <div className="container">
      <header>
        <JarLogo />
        <h1>
          gif
          <br /> butter
        </h1>
      </header>
      <main>
        <h2>
          <i>Fast video to gif conversion</i>
        </h2>
        <div className="card file-upload" {...getRootProps()}>
          upload file
          <input {...getInputProps()} />
        </div>
      </main>
      <footer>
        <p>Made by Ryan</p>
      </footer>
    </div>
  );
}

export default App;
