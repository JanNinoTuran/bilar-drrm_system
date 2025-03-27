import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ligtasLogo from "@/components/images/Ligtas.png";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  Menu,
  Search,
  User,
  LogIn,
  MapPin,
  BookOpen,
  AlertTriangle,
  Users,
  Package,
  Home,
  Warehouse,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onMenuToggle?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  isLoggedIn: propIsLoggedIn = false,
  userName: propUserName = "Guest User",
  userAvatar = "",
  onMenuToggle = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get auth context
  const { user, isLoggedIn: contextIsLoggedIn } = useAuth();

  // Use context values if available, otherwise use props
  const isLoggedIn = contextIsLoggedIn || propIsLoggedIn;

  // Get user's full name from context or use prop
  const userName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email.split("@")[0]
    : propUserName;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle();
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <a href="/dashboard" className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-md mr-2">
              <img
                src={ligtasLogo}
                alt="L.I.G.T.A.S. Logo"
                className="h-10 w-10"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-600">L.I.G.T.A.S.</h1>
              <p className="text-xs text-gray-500 -mt-1">Bilar DRRM System</p>
            </div>
          </a>
        </div>

        {/* Main Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1 flex-shrink-0">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/dashboard"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                  )}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/map"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                  )}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Disaster Map
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/guides"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                  )}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Emergency Guides
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/alerts"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                  )}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Alert System
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/evacuation-centers"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                  )}
                >
                  <Warehouse className="mr-2 h-4 w-4" />
                  Evacuation Centers
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* User Controls */}
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "transition-all duration-300 overflow-hidden",
              isSearchOpen ? "w-64" : "w-0",
            )}
            style={{ flexShrink: 0 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={onProfileClick}
            >
              <Avatar>
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">
                {userName}
              </span>
            </div>
          ) : (
            <Button variant="default" size="sm" className="ml-2" asChild>
              <a href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={toggleMobileMenu}
      ></div>

      <div
        className={cn(
          "fixed top-0 left-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-md mr-2">
              <img
                src="/ligtas-logo.png"
                alt="L.I.G.T.A.S. Logo"
                className="h-5 w-5"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-600">L.I.G.T.A.S.</h1>
              <p className="text-xs text-gray-500 -mt-1">Disaster Response</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Home className="mr-3 h-5 w-5 text-blue-500" />
                Home
              </a>
            </li>
            <li>
              <a
                href="/map"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <MapPin className="mr-3 h-5 w-5 text-blue-500" />
                Disaster Map
              </a>
            </li>
            <li>
              <a
                href="/guides"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <BookOpen className="mr-3 h-5 w-5 text-blue-500" />
                Emergency Guides
              </a>
            </li>
            <li>
              <a
                href="/alerts"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <AlertTriangle className="mr-3 h-5 w-5 text-blue-500" />
                Alert System
              </a>
            </li>
            <li>
              <a
                href="/evacuation-centers"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Warehouse className="mr-3 h-5 w-5 text-blue-500" />
                Evacuation Centers
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <Avatar>
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </div>
          ) : (
            <Button className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
