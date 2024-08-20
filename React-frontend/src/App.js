import React, { useEffect, useState, lazy, Suspense } from "react";

const Login = lazy(() => import('./Components/Login'));
const Register = lazy(() => import('./Components/Register'));
const MainPage = lazy(() => import("./Components/MainPage"));

const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div> 
  </div>
);

const LOCAL_STORAGE_KEYS = {
  NAME: "name",
  AUTH_TOKEN: "auth-token"
};

function useAuth() {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const name = localStorage.getItem(LOCAL_STORAGE_KEYS.NAME);
      if (name) {
        setAuth({
          authenticated: true,
          token: localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN) || "",
        });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { auth, setAuth, loading };
}

function App() {
  const { auth, setAuth, loading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        {!auth.authenticated ? (
          isRegister ? 
            <Register setAuth={setAuth} setIsRegister={setIsRegister} /> : 
            <Login setAuth={setAuth} setIsRegister={setIsRegister} />
        ) : (
          <MainPage />
        )}
      </Suspense>
    </div>
  );
}


const styles = `
  .loading-spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
  }

  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #3498db;
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;
