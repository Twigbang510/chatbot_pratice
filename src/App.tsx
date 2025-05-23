import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { store } from "./hooks/store";
function App() {
  return (
    <div className="mainSection">
      <Sidebar />
      <div className="chatSection">
        <Nav />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
