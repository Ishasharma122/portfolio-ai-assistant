import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Github, ExternalLink, LayoutDashboard, Sparkles, MessageCircle } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    tech: string[];
    icon: ReactNode;
    github: string;
    demo: string | null;
    dashboard?: string;
}

const Projects = () => {
    const projects: Project[] = [
        {
            title: 'ThinkMate - AI Chat App',
            description: 'A full-stack AI conversational platform using Groq-hosted LLaMA 3.3 (70B) model. Features real-time responses, persistent chat history, and voice input.',
            tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Groq (LLaMA)'],
            icon: <Sparkles className="text-blue-400" />,
            github: 'https://github.com/Ishasharma122/ThinkMate',
            demo: null
        },
        {
            title: 'StockSphere',
            description: 'Stock trading simulation platform with secure JWT auth, portfolio tracking, and interactive trading dashboard.',
            tech: ['MERN Stack', 'Chart.js', 'JWT', 'Bcrypt'],
            icon: <LayoutDashboard className="text-purple-400" />,
            github: 'https://github.com/Ishasharma122/StockSphere',
            demo: 'https://stocksphere-frontend.onrender.com',
            dashboard: 'https://stocksphere-dashboard-ko13.onrender.com'
        },
        {
            title: 'LiveLink',
            description: 'Real-time chat and collaboration app with instant messaging using Socket.io and Material-UI design.',
            tech: ['MERN Stack', 'Socket.io', 'MUI', 'Axios'],
            icon: <MessageCircle className="text-green-400" />,
            github: 'https://github.com/Ishasharma122/LiveLink',
            demo: 'https://livelinkfrontend.onrender.com'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="projects" className="py-20 scroll-mt-20">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>
                <p className="text-slate-400 text-lg">Selected full-stack applications demonstrating my development skills</p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.title}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="glass-dark rounded-[2.5rem] border-white/5 overflow-hidden group hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full shadow-xl hover:shadow-blue-900/20"
                    >
                        <div className="p-8 md:p-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-blue-500/10 transition-colors shadow-inner overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10">{project.icon}</div>
                                </div>
                                <div className="flex gap-2">
                                    {project.github && (
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                            className="p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all text-slate-400 hover:text-white"
                                            title="View GitHub"
                                        >
                                            <Github size={20} />
                                        </motion.a>
                                    )}
                                    {project.demo && (
                                        <motion.a
                                            href={project.demo}
                                            target="_blank"
                                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                            className="p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all text-slate-400 hover:text-white"
                                            title="Live Demo"
                                        >
                                            <ExternalLink size={20} />
                                        </motion.a>
                                    )}
                                    {project.dashboard && (
                                        <motion.a
                                            href={project.dashboard}
                                            target="_blank"
                                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                            className="p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all text-slate-400 hover:text-white bg-blue-500/5"
                                            title="Admin Dashboard"
                                        >
                                            <LayoutDashboard size={20} />
                                        </motion.a>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors tracking-tight">{project.title}</h3>
                            <p className="text-slate-400 mb-8 flex-grow leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:border-white/20 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;

