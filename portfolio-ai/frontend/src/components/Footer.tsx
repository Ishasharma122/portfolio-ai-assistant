import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo.tsx';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-slate-900 bg-slate-950/80">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center mb-6">
                    <Logo size="md" />
                </div>
                <div className="flex justify-center gap-6 mb-8">
                    {[
                        { icon: <Github size={24} />, href: 'https://github.com/Ishasharma122' },
                        { icon: <Linkedin size={24} />, href: 'https://linkedin.com/in/ishasharma1273' },
                        { icon: <Mail size={24} />, href: 'mailto:ishasharma1273@gmail.com' }
                    ].map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Isha Sharma. All rights reserved. Built with React & FastAPI.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
