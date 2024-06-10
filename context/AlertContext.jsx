import React, { createContext, useState } from 'react';

const AlertContext = createContext();

const MyAlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ type: 'success', message: '' });

    return <AlertContext.Provider value={[alert, setAlert]}>{children}</AlertContext.Provider>;
};

export { AlertContext, MyAlertProvider };
