import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_-18px_rgba(0,0,0,.10)] ring-1 ring-pink-50 border-t border-pink-50/40 text-gray-900 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-wide">© {new Date().getFullYear()}  Pasindu Banuka</span>
          <span className="text-xs bg-pink-50/40 rounded px-2 py-1 ml-2"> DevOps Engineer | Full Stack Developer</span>
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="https://github.com/DKPBanuka" target="_blank" rel="noopener" className="hover:text-gray-500 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.646.349-1.088.635-1.34-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.578.688.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/pasindu-banuka-216b7133b" target="_blank" rel="noopener" className="hover:text-[#0064e6] transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a7.5 7.5 0 0113 0" /></svg>
          </a>
          <a href="https://wa.me/94789287469" target="_blank" rel="noopener" className="hover:text-green-500 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.13 1.61 5.93L0 24l6.07-1.59A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-2.12-.55-4.13-1.61-5.93zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.6.95.96-3.51-.24-.38A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1.01-1 2.46s1.03 2.85 1.18 3.05c.15.2 2.03 3.2 5.01 4.36.7.3 1.25.48 1.68.61.43.13.82.12 1.13.07.31-.05.96-.39 1.1-.77.14-.38.14-.71.1-.77-.04-.06-.15-.1-.43-.24z" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
