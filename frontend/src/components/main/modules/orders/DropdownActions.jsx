import "./DropdownActions.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const DropdownActions = ({
  icon,
  statuses,
  currentStatus,
  onStateChange,
  onDetails,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState("right");
  const dropdownRef = useRef(null);
  const submenuRef = useRef(null);

  const statusMap = {
    Recibido: "received",
    "En proceso": "processing",
    Enviado: "shipped",
    Entregado: "delivered",
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    setSubmenuOpen(false);
  };

  const handleStateChange = (status, e) => {
    if (!isDisabled(status)) {
      onStateChange(statusMap[status] || status);
      closeDropdown();
    }
  };

  const handleDetailsClick = () => {
    onDetails();
    closeDropdown();
  };

  const isDisabled = (status) => {
    const statusOrder = ["received", "processing", "shipped", "delivered"];
    const currentStatusEnglish = statusMap[currentStatus] || currentStatus;
    const statusEnglish = statusMap[status] || status;
    return (
      statusOrder.indexOf(statusEnglish) <=
      statusOrder.indexOf(currentStatusEnglish)
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (isSubmenuOpen && submenuRef.current) {
      const submenuRect = submenuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (submenuRect.right > viewportWidth) {
        setSubmenuPosition("left");
      } else {
        setSubmenuPosition("right");
      }
    }
  }, [isSubmenuOpen]);

  return (
    <div className="dropdown-actions" ref={dropdownRef}>
      <button className="dropdown-actions-button" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={icon} />
      </button>

      {isDropdownOpen && (
        <ul className="dropdown-actions-menu">
          <li
            className="dropdown-actions-item dropdown-actions-has-submenu"
            onMouseEnter={toggleSubmenu}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            Cambiar estado{" "}
            <span style={{ paddingLeft: "10px" }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            {isSubmenuOpen && (
              <ul
                className={`dropdown-actions-submenu dropdown-actions-${submenuPosition}`}
                ref={submenuRef}
              >
                {statuses.map((status) => (
                  <li
                    key={status}
                    onClick={(e) => handleStateChange(status, e)}
                    className={`dropdown-actions-submenu-item ${
                      isDisabled(status) ? "dropdown-actions-disabled" : ""
                    }`}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="dropdown-actions-item" onClick={handleDetailsClick}>
            Ver detalles
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownActions;
