import React from 'react';

const Navbar = ({ onNavClick, view }) => {
  return (
    <div className="navbar">
      <button
        onClick={() => onNavClick('Pending')}
        className={view === 'Pending' ? 'active' : ''}
      >
        Pending
      </button>
      <button
        onClick={() => onNavClick('Completed')}
        className={view === 'Completed' ? 'active' : ''}
      >
        Completed
      </button>
    </div>
  );
};

export default Navbar;
