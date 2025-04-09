import { FileCode  } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2"> Finance Tracker</h3>
            {/* <p className="text-gray-400">Take control of your financial future</p> */}
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FileCode   size={24} />
            </a>
            <span className="text-gray-400">|</span>
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Akash Raikwar</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;