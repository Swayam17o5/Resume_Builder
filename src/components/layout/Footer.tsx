import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-heading text-brand-800 text-xl font-bold">
              <span className="text-brand-600">AI</span> Resume Maker
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Create professional resumes in minutes
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => navigate("/about")}
              className="text-gray-600 hover:text-brand-600 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => navigate("/privacy")}
              className="text-gray-600 hover:text-brand-600 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => navigate("/terms")}
              className="text-gray-600 hover:text-brand-600 transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="text-gray-600 hover:text-brand-600 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 text-center text-gray-500 text-sm">
          &copy; {currentYear} AI Resume Maker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
