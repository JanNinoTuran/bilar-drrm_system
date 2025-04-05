import React from "react";
import { Helmet } from "react-helmet";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/auth/SignUpForm";
import { MapPin, Route, MessageCircle, BookOpen, Bell } from "lucide-react";

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Helmet>
        <title>Sign Up | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Create an L.I.G.T.A.S. account to receive personalized disaster alerts and access emergency resources"
        />
      </Helmet>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="mb-6 text-blue-100 leading-relaxed">
                Create an account to receive personalized disaster alerts and
                access critical resources for your location.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-blue-50">
                Benefits of joining:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span>Personalized location-based alerts</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <Route className="h-4 w-4 text-white" />
                  </div>
                  <span>Save evacuation routes and emergency contacts</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span>Participate in community forums</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <span>Access to premium preparedness guides</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 shadow-inner">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <span>Receive emergency notifications via SMS and email</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-blue-500">
                <p className="text-blue-100 text-sm">
                  Join over 5,000 residents in Bohol who rely on L.I.G.T.A.S.
                  for critical disaster information and emergency preparedness.
                </p>
              </div>
            </div>
          </div>

          <SignUpForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignUpPage;
