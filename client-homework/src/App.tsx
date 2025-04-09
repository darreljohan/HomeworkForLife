import { useContext } from "react";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Home from "./pages/Home/Home";

import PageProvider from "./context/PageProvider";
import { pageContext } from "./context/PageContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Setting from "./pages/Setting/Setting";
import Showcase from "./pages/Showcase/Showcase";
import { LoadingProvider } from "./context/LoadingProvider";

function AppContent() {
  const { page } = useContext(pageContext);

  const renderSlide = () => {
    switch (page) {
      case "Home":
        return <Home />;
      case "Register":
        return <Register />;
      case "Login":
        return <Login />;
      case "Setting":
        return <Setting />;
      case "Showcase":
        return <Showcase />;
      default:
        console.log(`Invalid page: ${page}`);
        return <Home />;
    }
  };

  return <>{renderSlide()}</>;
}

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <PageProvider>
          <AppContent />
        </PageProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
