import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const Context = createContext({
  isAuthentication : false,
})

const AppWrapper = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
     value={{
      isAuthentication, 
      setIsAuthentication, 
      user, 
      setUser,
    }}
    >
       <App />
    </Context.Provider>
  ) 
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
