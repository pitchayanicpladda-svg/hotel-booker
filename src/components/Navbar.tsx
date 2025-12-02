import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? "bg-transparent"
          : "bg-card/95 backdrop-blur-md shadow-soft"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="font-display text-xl font-bold text-foreground">S</span>
            </div>
            <span
              className={`font-display text-2xl font-semibold ${
                isHomePage ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              StaySiam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-accent ${
                isHomePage ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              หน้าแรก
            </Link>
            <Link
              to="/search"
              className={`font-medium transition-colors hover:text-accent ${
                isHomePage ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              ค้นหาโรงแรม
            </Link>
            <Link
              to="/promotions"
              className={`font-medium transition-colors hover:text-accent ${
                isHomePage ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              โปรโมชั่น
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant={isHomePage ? "outline-light" : "outline"}
              size="sm"
              className="gap-2"
            >
              <User className="w-4 h-4" />
              เข้าสู่ระบบ
            </Button>
            <Button variant="gold" size="sm">
              สมัครสมาชิก
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${
              isHomePage ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card rounded-b-xl overflow-hidden shadow-card"
            >
              <div className="p-4 space-y-4">
                <Link
                  to="/"
                  className="block py-2 font-medium text-foreground hover:text-accent"
                  onClick={() => setIsOpen(false)}
                >
                  หน้าแรก
                </Link>
                <Link
                  to="/search"
                  className="block py-2 font-medium text-foreground hover:text-accent"
                  onClick={() => setIsOpen(false)}
                >
                  ค้นหาโรงแรม
                </Link>
                <Link
                  to="/promotions"
                  className="block py-2 font-medium text-foreground hover:text-accent"
                  onClick={() => setIsOpen(false)}
                >
                  โปรโมชั่น
                </Link>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <User className="w-4 h-4" />
                    เข้าสู่ระบบ
                  </Button>
                  <Button variant="gold" size="sm" className="flex-1">
                    สมัครสมาชิก
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
