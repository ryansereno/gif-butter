import Head from 'next/head'
import React, { useState, useEffect } from "react";
import JarLogo from "../components/UI/JarLogo";
import DragDropInput from "../components/DragDropInput/DragDropInput";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Spinner from '../components/UI/Spinner'
const ffmpeg = createFFmpeg({
  log: true,
  corePath: "http://localhost:3000/ffmpeg-core.js",
});

export default function Home() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    setReady(true);
  };
  useEffect(() => {
    load();
  }, []);
  const uploadHandler = (file) => {
    setVideo(file);
  };
  const convertToGif = async () => {
    setIsProcessing(true);
    // Write the file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      "2.5",
      "-ss",
      "2.0",
      "-f",
      "gif",
      "out.gif"
    );

    // Read the result
    const data = ffmpeg.FS("readFile", "out.gif");

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
    setIsProcessing(false);
  };
  return ready ? (
    <div className="container">
      <Head>
        <title>gifButter</title>
        <link rel="icon" href="/gif-butter.png" />
      </Head>
      <header>
        <JarLogo />
        <h1>
          gif
          <br /> butter
        </h1>
      </header>
      {!gif && !isProcessing && (
        <main className="box">
          <h2>
            <i>Smooth, low bandwidth gif conversion</i>
          </h2>
          {!video && <DragDropInput onFileChange={uploadHandler} />}
          {video && (
            <video
              controls
              width="250"
              src={URL.createObjectURL(video)}
            ></video>
          )}
          {video && (
            <button className="btn-submit" onClick={video && convertToGif}>
              Convert
            </button>
          )}
        </main>
      )}
      {!gif && isProcessing && (
        <main className="box">
          <Spinner color="lightgray" />
          <p className="loading-text" >We're mixing up a fresh gif for you;)</p>
          
        </main>
      )}
      {gif && !isProcessing && (
        <main className="box">
          <img src={gif} width="250" />
          <a href={gif} download="output.gif">
            <button className="btn-download" onClick={() => {}}>
              Download
            </button>
          </a>
          <button
            className="btn-reset"
            onClick={() => {
              setGif(null);
              setVideo(null);
            }}
          >
            Convert Another
          </button>
        </main>
      )}
      <footer>
        <p>
          Made with ❤️️ by&nbsp;
          <a href="https://good-molecule-a96.notion.site/Hey-I-m-Ryan-cb8c78b661cf4d879afd6ae8b0c169c9">
            Ryan
          </a>
        </p>
      </footer>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
