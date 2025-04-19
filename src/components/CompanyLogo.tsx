import React from 'react';
import { Link } from 'react-router-dom';

const CompanyLogo: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Link to="/">
        <img 
          src="https://cdn.poehali.dev/files/74636bb0-7089-4be6-82d1-25d5d61da927.jpg" 
          alt="Check Out" 
          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-md shadow-lg transition-transform hover:scale-105" 
        />
      </Link>
    </div>
  );
};

export default CompanyLogo;
