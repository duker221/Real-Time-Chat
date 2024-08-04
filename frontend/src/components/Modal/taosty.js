import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => {
  ToastContainer.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default notify;
