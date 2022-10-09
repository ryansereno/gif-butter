import JarLogo from "./components/UI/JarLogo";

function App() {
  return (
    <div className="container">
      <header>
        <JarLogo />
        <h1>gif<br/> butter</h1>
      </header>
      <main>
        <h2><i>Fast video to gif conversion</i></h2>
        <div className="card file-upload">upload file</div>
      </main>
      <footer>
        <p>Made by Ryan</p>
      </footer>
    </div>
  );
}

export default App;
