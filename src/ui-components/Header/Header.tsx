import type { MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  className?: string;
};

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
];

export const Header = ({ className = "" }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLinkClick = (e: MouseEvent, url: string) => {
    if (url.startsWith("#")) return;
    e.preventDefault();
    void navigate(url);
  };

  return (
    <nav className={`header-container ${className}`}>
      <ul className="header">
        {links.map(({ link, label }) => (
          <li key={link} className="header-item">
            <NavLink
              to={link}
              className={({ isActive }) => (isActive ? "header-item active" : "header-item")}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};