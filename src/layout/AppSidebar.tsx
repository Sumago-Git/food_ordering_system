import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  GridIcon,
  HorizontaLDots,
 
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const commonNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
];

const adminNavItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Category Management",
    path: "/categorymanagement",
  },
  {
    icon: <UserCircleIcon />,
    name: "Menu Management",
    path: "/menumanagement",
  },
  {
    icon: <UserCircleIcon />,
    name: "App Feedback Management",
    path: "/appfeedbackmanagement",
  },
  {
    icon: <UserCircleIcon />,
    name: "Order Management",
    path: "/ordermanagement",
  },
];

const superAdminNavItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "App User Management",
    path: "/appusermanagement",
  },
  {
    icon: <UserCircleIcon />,
    name: "QR Code Management",
    path: "/qrcodemanagement",
  },
  {
    icon: <UserCircleIcon />,
    name: "Hotel Admin Users",
    path: "/hoteladminusers",
  },
  {
    icon: <UserCircleIcon />,
    name: "Hotels",
    path: "/hotels",
  },
  {
    icon: <UserCircleIcon />,
    name: "Reports",
    path: "/reports",
  },
  {
    icon: <UserCircleIcon />,
    name: "Feedback Management",
    path: "/feedbackmanagement",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const userRole = localStorage.getItem("role"); // "admin" or "superadmin"

  const isActive = (path: string) => location.pathname === path;

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              to={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems([
                ...commonNavItems,
                ...(userRole === "admin" ? adminNavItems : []),
                ...(userRole === "superadmin" ? superAdminNavItems : []),
              ])}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
