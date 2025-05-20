import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
function App() {
  return (
    <>
      <Nav />
      <div className="chatSection">
        <Sidebar />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
