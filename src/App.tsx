import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { store } from "./hooks/store";
import { useAppSelector } from "./hooks/hooks";
function App() {
  const sidebarVisible = useAppSelector((state) => state.chat.sidebarVisible);
  console.log("Class:", `chatSection ${!sidebarVisible ? "expand" : ""}`);
  return (
    <div className="mainSection">
      <Sidebar />
      <div className={`chatSection ${!sidebarVisible ? "expand" : ""}`}>
        <Nav />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
