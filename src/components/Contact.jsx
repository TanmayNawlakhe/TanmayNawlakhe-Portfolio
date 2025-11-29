import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <footer className="w-full bg-[#141212] text-white py-16 px-6 md:px-24 border-t border-slate-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-light mb-2">Let's Connect</h2>
          <p className="text-slate-300 font-light text-sm">Open for internships and collaborative projects.</p>
        </div>
        <div className="flex gap-4">
          <a href="mailto:tanawlakhe@gmail.com"  className="p-3 bg-slate-900 rounded-full hover:bg-slate-800 hover:text-blue-400 transition-all border border-slate-800">
            <Mail size={20} />
          </a>
          <a href="https://github.com/TanmayNawlakhe" target="_blank" rel="noreferrer"  className="p-3 bg-slate-900 rounded-full hover:bg-slate-800 hover:text-blue-400 transition-all border border-slate-800">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/tanmay-nawlakhe" target="_blank" rel="noreferrer"  className="p-3 bg-slate-900 rounded-full hover:bg-slate-800 hover:text-blue-400 transition-all border border-slate-800">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
      <div className="mt-12 text-center text-slate-700 text-xs font-light">© 2025 Tanmay Nawlakhe.</div>
    </footer>
  );
}
