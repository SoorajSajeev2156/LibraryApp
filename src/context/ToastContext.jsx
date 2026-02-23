import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <div className="toast">{toast}</div>}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
