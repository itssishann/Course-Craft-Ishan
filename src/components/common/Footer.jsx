import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6">
      <div className="max-w-screen-xl mx-auto text-center sm:text-left">
        {/* Logo and Company Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <img src="https://ik.imagekit.io/ijhfycf53/Course-Assets/logo.png?updatedAt=1731312772965" alt="Course Craft Logo" className="h-8" />
          </div>
          <p className="text-sm mt-4 sm:mt-0">Trusted by students in 10+ cities and beyond. Over 5 million success stories.</p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-semibold mb-2">Quick Links</h5>
            <ul>
              <li><Link to="/contact-us" className="text-sm text-gray-400 hover:text-white">Contact us</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-400 hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Learning</h5>
            <ul>
              <li><Link to="/dashboard" className="text-sm text-gray-400 hover:text-white">Dashboard</Link></li>
              <li><Link to="/resources" className="text-sm text-gray-400 hover:text-white">Learning Resources</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-400 hover:text-white">Manage Account</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Support</h5>
            <ul>
              <li><Link to="/support" className="text-sm text-gray-400 hover:text-white">Support</Link></li>
              <li><Link to="/faqs" className="text-sm text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link to="/student-support" className="text-sm text-gray-400 hover:text-white">Student Support</Link></li>
              <li><Link to="/refund-policy" className="text-sm text-gray-400 hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebook className="text-xl" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaLinkedin className="text-xl" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">© Course Craft 2025, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
