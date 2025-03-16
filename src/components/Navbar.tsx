import React, { useState, useEffect } from "react";
import { Camera, Menu, X } from "lucide-react";

const NAVBAR_HEIGHT = 64; // Height of the navbar in pixels

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      const scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - NAVBAR_HEIGHT);
      }
      setIsMenuOpen(false);
    }
  };

  // Update the intersection observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Get all entries that are currently intersecting
        const visibleSections = entries.filter((entry) => entry.isIntersecting);

        // If there are visible sections, set the active section to the one with the largest intersection ratio
        if (visibleSections.length > 0) {
          const mostVisible = visibleSections.reduce((prev, current) => {
            return prev.intersectionRatio > current.intersectionRatio
              ? prev
              : current;
          });
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1], // More threshold points for better accuracy
      }
    );

    // Observe all sections including div with id="contact"
    const sections = document.querySelectorAll(
      'section[id], div[id="contact"]'
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-2 text-gray-900 hover:text-amber-600 transition-colors"
            >
              <Camera className="h-8 w-8" />
              <span className="font-semibold text-xl">Lens & Light</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`
                    text-gray-700 hover:text-amber-600 transition-colors
                    ${
                      activeSection === id ? "font-semibold text-amber-600" : ""
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden fixed inset-x-0 top-16 bg-white shadow-lg transition-all duration-300 ease-in-out
            ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-full pointer-events-none"
            }
          `}
        >
          <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-colors
                  ${
                    activeSection === id
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: NAVBAR_HEIGHT }}
        />
      )}
    </>
  );
};

export default Navbar;
