import HomePage from "./component/Page-Home/HomePage";
import { AuthProvider } from "./component/Provider-Auth/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </>
  );
}

export default App;
