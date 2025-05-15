import { useEffect } from "react";

const ToastLogin = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="absolute top-25 right-1  bg-white border border-gray-300 shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 z-1000">
      <div className="absolute -top-2 right-2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-300"></div>
      <i className="bi bi-exclamation-circle-fill text-warning text-lg"></i>
      <span className="text-gray-800 text-sm whitespace-nowrap">{message}</span>
    </div>
  );
};

export default ToastLogin;