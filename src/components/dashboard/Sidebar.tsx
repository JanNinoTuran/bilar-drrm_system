import React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Bell,
  LogOut,
  Home,
  Shield,
  MapPin,
  FileText,
  HelpCircle,
  Package,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  userName?: string;
  userAvatar?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName: propUserName = "User",
  userAvatar = "",
  onClose = () => {},
}) => {
  // Get auth context
  const { user, logout } = useAuth();

  // Get user's full name from context or use prop
  const userName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email.split("@")[0]
    : propUserName;
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 shadow-lg flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt={userName} />
            ) : (
              <AvatarFallback className="bg-blue-600 text-white">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">{userName}</h3>
            <p className="text-sm text-gray-500">Resident</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full justify-start"
        >
          <User className="mr-2 h-4 w-4" />
          View Profile
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/dashboard">
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </a>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/map">
              <MapPin className="mr-2 h-5 w-5" />
              Disaster Map
            </a>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/alerts">
              <Bell className="mr-2 h-5 w-5" />
              Alert System
            </a>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/guides">
              <Shield className="mr-2 h-5 w-5" />
              Emergency Guides
            </a>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/resources">
              <FileText className="mr-2 h-5 w-5" />
              Resources
            </a>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/dashboard#news-management">
              <FileText className="mr-2 h-5 w-5" />
              News Management
            </a>
          </Button>

          <Separator className="my-2" />

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/settings">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </a>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/help">
              <HelpCircle className="mr-2 h-5 w-5" />
              Help & Support
            </a>
          </Button>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
