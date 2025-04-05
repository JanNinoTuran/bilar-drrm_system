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
  User,
  LogIn,
  MapPin,
  BookOpen,
  AlertTriangle,
  Users,
  Package,
  Home,
  Warehouse,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle();
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 z-50">
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
        <nav className="hidden md:flex items-center space-x-2 flex-shrink-0">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/dashboard"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200",
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
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200",
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
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200",
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
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200",
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
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200",
                  )}
                >
                  <Warehouse className="mr-2 h-4 w-4" />
                  Evacuation Centers
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/reports"
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200",
                  )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Report
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* User Controls */}
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative hover:bg-blue-50 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b border-gray-200 p-3 bg-blue-50">
                <h3 className="font-semibold text-blue-700">Notifications</h3>
                <p className="text-xs text-gray-500">
                  You have 3 unread notifications
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flood Warning</p>
                      <p className="text-xs text-gray-500">
                        Flash flood warning for Bilar area. Seek higher ground
                        immediately.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        10 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Evacuation Center Update
                      </p>
                      <p className="text-xs text-gray-500">
                        Bilar Central School evacuation center is now open.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Emergency Guide</p>
                      <p className="text-xs text-gray-500">
                        New guide for landslide safety has been published.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-blue-600 text-xs"
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {isLoggedIn ? (
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
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
            <Button
              variant="default"
              size="sm"
              className="ml-2 shadow-sm hover:shadow transition-all duration-200"
              asChild
            >
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
            <li>
              <a
                href="/reports"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FileText className="mr-3 h-5 w-5 text-blue-500" />
                Submit Report
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
