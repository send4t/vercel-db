import React from "react";
import { MoonIcon } from "../styles/MoonIcon.jsx";
import { SunIcon } from "../styles/SunIcon.jsx";
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const isSelected = theme === 'dark';

  const handleToggle = () => {
    setTheme(isSelected ? 'light' : 'dark');
  };

  const renderIcon = () => {
    if (isSelected) {
      return <MoonIcon />;
    } else {
      return <SunIcon />;
    }
  };

  const renderText = () => {
    if (isSelected) {
      return <span className="ml-2 text-gray-500">Light mode</span>;
    } else {
      return <span className="ml-2 text-gray-500">Dark mode</span>;
    }
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer flex items-center">
      {renderIcon()}
      {renderText()}
    </div>
  );
};

export default ThemeSwitch;
