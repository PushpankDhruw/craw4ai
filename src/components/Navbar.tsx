"use client";
import { useScroll, motion, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";
import SearchModal from "./SearchModal";
import lottie, { AnimationItem } from "lottie-web"; // Import lottie-web

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null); // Ref for the Lottie container div
  const animationInstance = useRef<AnimationItem | null>(null); // Ref for the Lottie animation instance

  // Update isMobile state based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust the breakpoint as needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transformations for the logo and navbar margin on scroll (only for desktop)
  const logoSize = useTransform(scrollY, [0, 150], [120, 90]); // Shrink logo from 120px to 90px
  const paddingY = useTransform(scrollY, [0, 150], [20, 16]); // Shrink padding on y-axis
  const boxShadow = useTransform(
    scrollY,
    [0, 150],
    ["none", "0 2px 4px rgba(0, 0, 0, 0.1)"]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (animationInstance.current) {
      if (isOpen) {
        animationInstance.current.playSegments([30, 0], true); // Play in reverse (X to hamburger)
      } else {
        animationInstance.current.playSegments([0, 30], true); // Play forward (hamburger to X)
      }
    }
  };

  useEffect(() => {
    // Initialize the Lottie animation when the component is mounted
    if (lottieRef.current) {
      animationInstance.current = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c1189790ba90f79577_menu-button.json", // Lottie JSON URL
      });
    }

    return () => {
      // Cleanup animation instance on component unmount
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 w-full z-50 bg-white text-[#1f4d8f] border-b border-[#1f4d8f]"
        style={{
          boxShadow,
          paddingTop: isMobile ? undefined : paddingY,
          paddingBottom: isMobile ? undefined : paddingY,
        }}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 p-2 lg:px-0">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6 transition-all duration-300">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                home
              </Link>
            </li>
            <li>
              <Link
                href="/books"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                books <ChevronDownIcon className="w-4 h-4 inline ml-2" />
              </Link>
            </li>
            <li>
              <Link
                href="/people"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                people <ChevronDownIcon className="w-4 h-4 inline ml-2" />
              </Link>
            </li>
            <li>
              <Link
                href="/lists"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                lists
              </Link>
            </li>
            <li>
              <Link
                href="/series"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                series
              </Link>
            </li>
            <li>
              <Link
                href="/top-100/all-books"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                top 100
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                blog
              </Link>
            </li>
            <button onClick={toggleModal} className="flex items-center">
              <Image
                src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c118979050eff795d3_search-icon.svg"
                alt="Search icon"
                width={20}
                height={20}
              />
            </button>
          </ul>

          {/* Logo */}
          <Link href="/" className="text-lg font-bold p-2 flex items-center">
            <motion.div style={{ width: isMobile ? undefined : logoSize }}>
              <Image
                src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c11897901726f79575_good-books-logo.svg"
                alt="Good Books Logo"
                width={120}
                height={120}
                className="w-auto h-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Search and Hamburger Menu Icons for Mobile */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Search Icon for Mobile */}
            <button onClick={toggleModal} className="text-blue-600 p-2">
              <Image
                src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c118979050eff795d3_search-icon.svg"
                alt="Search icon"
                width={30} // Adjust width
                height={30} // Adjust height
                className="w-8 h-8" // Use Tailwind classes for responsive design
              />
            </button>

            {/* Animated Hamburger Menu Icon for Mobile */}
            <button onClick={toggleMenu} className="text-blue-600 text-2xl p-2">
              {/* Lottie Animation Container */}
              <div ref={lottieRef} style={{ width: 30, height: 30 }} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 bg-white shadow-lg rounded p-4 mx-4">
            <Link
              href="/"
              className="block text-blue-600 hover:text-blue-800 mb-2"
            >
              home
            </Link>
            <Link
              href="/books"
              className="block text-blue-600 hover:text-blue-800 mb-2"
            >
              books ▼
            </Link>
            <Link
              href="/people"
              className="block text-blue-600 hover:text-blue-800 mb-2"
            >
              people ▼
            </Link>
            <Link
              href="/lists"
              className="block text-blue-600 hover:text-blue-800 mb-2"
            >
              lists
            </Link>
            <Link
              href="/series"
              className="block text-blue-600 hover:text-blue-800 mb-2"
            >
              series
            </Link>
            <Link
              href="/top-100/all-books"
              className="block text-blue-600 hover:text-blue-800 mb-2"
            >
              top 100
            </Link>
            <Link
              href="/blog"
              className="block text-blue-600 hover:text-blue-800"
            >
              blog
            </Link>
          </div>
        )}
      </motion.header>

      {/* Search Modal */}
      {isModalOpen && (
        <SearchModal isOpen={isModalOpen} onClose={toggleModal} />
      )}
    </>
  );
};

export default Navbar;
