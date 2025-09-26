import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <div className="w-[100%] min-height-screen flex justify-center items-center">
        <div className=" w-full">
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
