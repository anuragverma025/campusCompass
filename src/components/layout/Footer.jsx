import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
        <div>
          <p className="font-semibold text-[#0F172A]">
            Campus Compass
          </p>
          <p className="text-[#94A3B8] mt-0.5">
            Student Life Assistant &mdash; College Project Demo &copy; {year}
          </p>
        </div>

        <div className="flex items-center gap-4 text-[#94A3B8]">
          <span>React + Vite</span>
          <span>&bull;</span>
          <span>localStorage Only</span>
          <span>&bull;</span>
          <span>No Backend</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
