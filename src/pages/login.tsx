import React from "react";
import { Helmet } from "react-helmet";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { Bell, MapPin, BookOpen, Users } from "lucide-react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Helmet>
        <title>Sign In | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Sign in to your L.I.G.T.A.S. account to access personalized disaster alerts and resources"
        />
      </Helmet>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">
                Stay Informed, Stay Safe
              </h2>
              <p className="mb-6 text-blue-100 leading-relaxed">
                Sign in to receive personalized disaster alerts and access
                critical resources for your location.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg">Real-time disaster alerts</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg">Interactive evacuation maps</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg">Emergency preparedness guides</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg">Community support forums</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-blue-500">
                <p className="text-blue-100 italic">
                  "L.I.G.T.A.S. has been instrumental in keeping our community
                  safe during the recent typhoon season." - Barangay Captain,
                  Bilar
                </p>
              </div>
            </div>
          </div>

          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
