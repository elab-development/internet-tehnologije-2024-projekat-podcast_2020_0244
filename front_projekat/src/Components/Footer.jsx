import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-8 rounded-t-lg shadow-lg">
      <div className="container mx-auto text-center text-sm px-4">
        <p>
          &copy; {new Date().getFullYear()} Podkasti. Sva prava zadržana.
        </p>
        <p className="mt-1 text-gray-400">
          Kreirano za sve ljubitelje podkasta.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

