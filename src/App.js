import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllRoutes } from './Allroutes/allroutes';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
      position="top-center"

      />
      <Routes>
        {
          AllRoutes?.map(({ path, component }, index) => {
            return <Route key={index} path={path} element={component} />
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
