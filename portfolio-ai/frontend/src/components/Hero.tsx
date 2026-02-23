import { motion } from 'framer-motion';
import { ChevronRight, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center pt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6"
                    >
                        Available for Full Time & Internships
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Hi, I'm <span className="text-gradient hover:brightness-125 transition-all">Isha Sharma</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                        Final-year B.Tech Student & Aspiring <span className="text-white font-semibold">Software Development Engineer</span>.
                        Passionate about building scalable web applications and solving complex problems.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-2 group shadow-lg shadow-blue-900/40"
                        >
                            View My Work
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <div className="flex items-center gap-3">
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
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="p-3 rounded-xl glass hover:bg-white/20 transition-all border border-white/10"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative flex justify-center"
                >
                    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 blur-[80px] absolute opacity-30 animate-pulse"></div>
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [3, 2, 3]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative glass-dark p-4 rounded-[40px] border-white/10 overflow-hidden transform"
                    >
                        <div className="bg-slate-800 w-full h-full rounded-[30px] flex items-center justify-center p-8">
                            <pre className="text-blue-400 text-xs md:text-sm font-mono overflow-hidden">
                                {`const developer = {
  name: 'Isha Sharma',
  role: 'Full Stack Developer',
  skills: ['React', 'Node.js', 'Java'],
  passionate: true,
  learning: 'Every day'
};`}
                            </pre>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
