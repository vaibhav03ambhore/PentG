// src/ThemeProvider.jsx
import React, { useState } from 'react';

const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState('light');

 const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
 };

 return (
    <div className={`theme-${theme}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { toggleTheme: toggleTheme })
      )}
    </div>
 );
};

export default ThemeProvider;