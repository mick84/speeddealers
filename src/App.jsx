import { AuthContextProvider } from "./context/AuthContext";
import Router from "./Routes/routes";
import "./App.css";
import Navbar from "./components/Navbar";
import StoreContextProvider from "./context/AdminContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <StoreContextProvider>
          <Navbar />
          <Router />
        </StoreContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
