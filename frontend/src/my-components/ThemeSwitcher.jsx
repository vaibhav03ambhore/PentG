// src/my-components/ThemeSwitcher.jsx
import React from 'react';

const ThemeSwitcher = ({ toggleTheme }) => {
 return (
    <button onClick={toggleTheme}>
      Theme
    </button>
 );
};

export default ThemeSwitcher;
