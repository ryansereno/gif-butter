import JarLogo from "./components/UI/JarLogo";
import DragDropInput from "./components/DragDropInput/DragDropInput";

function App() {
  return (
    <div className="container">
      <header>
        <JarLogo />
        <h1>
          gif
          <br /> butter
        </h1>
      </header>
      <main className="box">
        <h2>
          <i>Fast video to gif conversion</i>
        </h2>
        <DragDropInput />
      </main>
      <footer>
        <p>Made by Ryan</p>
      </footer>
    </div>
  );
}

export default App;
