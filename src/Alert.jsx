import { MdDoneOutline } from "react-icons/md";
import { MdOutlineDangerous } from "react-icons/md";
import WithAlert from "./WithAlert";
import { useEffect } from "react";

const themeMap = {
  success: {
    color: "bg-green-400",
    Icon: MdDoneOutline,
  },
  error: {
    color: "bg-red-400",
    Icon: MdOutlineDangerous,
  },
};

function Alert({ alert ,setAlert,removeAlert}) {

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        removeAlert();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alert]);

  if(!alert){
    return;
  }

  
  const { message, type } = alert;
  const { Icon, color } = themeMap[type];
  
  return (
    <div className="fixed w-full max-w-lg transform -translate-x-1/2 top-4 left-1/2">
      <div className={`flex shadow-lg rounded-lg ${color} text-white h-16`}>
        <div className={`py-2 px-4 rounded-l-lg flex items-center ${color}`}>
          <Icon className="text-xl" />
        </div>
        <div className="flex items-center justify-between w-full px-4 py-2 text-black bg-white border border-gray-200 rounded-r-lg border-l-transparent">
          <div className="flex gap-3">
            <div className="mb-1 text-sm font-bold text-gray-700">{type}</div>
            <div className="text-black text-md">{message}</div>
          </div>
          <button onClick={removeAlert} className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" viewBox="0 0 16 16" width="20" height="20">
              <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithAlert(Alert);
