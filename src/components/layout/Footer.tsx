import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  Info,
  Shield,
  Heart,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps = {}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("w-full bg-slate-900 text-white", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <h2 className="font-bold text-2xl leading-10">L.I.G.T.A.S.</h2>
            </div>
            <p className="text-slate-300 text-sm">
              (Localized Information and Governance for Tracking and Alerting
              Settlers)
            </p>
            <p className="text-slate-300 text-sm">
              Providing real-time disaster information, educational resources,
              and interactive tools to help communities prepare for, respond to,
              and recover from disasters.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/map"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Interactive Map
                </a>
              </li>
              <li>
                <a
                  href="/guides"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Emergency Guides
                </a>
              </li>
              <li>
                <a
                  href="/alerts"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Alert System
                </a>
              </li>
              <li>
                <a
                  href="/population-statistics"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Population Statistics
                </a>
              </li>
              <li>
                <a
                  href="/inventory"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Inventory
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Emergency Hotline</p>
                  <p className="text-slate-300 text-sm">911</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Disaster Response</p>
                  <p className="text-slate-300 text-sm">+1 (555) 123-4567</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Medical Emergency</p>
                  <p className="text-slate-300 text-sm">+1 (555) 987-6543</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Report a Disaster</p>
                  <p className="text-slate-300 text-sm">+1 (555) 456-7890</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-slate-300 text-sm">
              Subscribe to our newsletter for the latest alerts and safety tips.
            </p>
            <form className="space-y-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </form>
            <div className="pt-2">
              <p className="text-xs text-slate-400">
                By subscribing, you agree to our{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-slate-400">
            © {currentYear} L.I.G.T.A.S. || Bilar DRRM Center. All rights
            reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="/about"
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              About Us
            </a>
            <a
              href="/privacy"
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          <p className="mb-4">
            Developed with <Heart className="inline h-5 w-5 text-red-500" /> for
            community safety and resilience.
          </p>

          {/* Partner Logos */}
          <div className="mt-4 border-t pt-6">
            <h4 className="text-sm font-medium text-slate-400 mb-4">
              Developed By: Full Stack Masters, Computing Society, Computer
              Science Department, College of Technology, Bohol Island State
              University ~ Bilar Campus
            </h4>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <img
                src="@/components/images/drrm.png"
                alt="DRRM Logo"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="@/components/images/bilar.png"
                alt="BilarLogo"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="@/components/images/BISU_BILAR.png"
                alt="BISU"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="@/components/images/Dev.png"
                alt="FullStackMasters"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="@/components/images/COT.png"
                alt="COT"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="@/components/images/COMSOC.png"
                alt="COMSOC"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
