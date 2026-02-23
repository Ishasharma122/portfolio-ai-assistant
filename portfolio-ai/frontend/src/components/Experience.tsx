import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            date: 'Jul 2022 - Present',
            role: 'Full Stack Developer',
            company: 'Personal Projects',
            points: [
                'Built full-stack applications including ThinkMate and StockSphere',
                'Focused on clean architecture and secure authentication',
                'Implemented real-time features using modern web technologies',
                'Actively seeking an entry-level Software Development Engineer opportunity'
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 scroll-mt-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    <span className="text-gradient">Experience</span>
                </motion.h2>
                <p className="text-slate-400">Project-based development work</p>
            </div>

            <div className="max-w-4xl mx-auto">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative pl-8 pb-12 border-l-2 border-white/10 last:pb-0"
                    >
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                        <div className="glass-dark p-8 rounded-[2rem] border-white/5 hover:border-blue-500/30 transition-colors group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                <div>
                                    <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{exp.role}</h3>
                                    <p className="text-blue-400 font-medium">{exp.company}</p>
                                </div>
                                <div className="px-4 py-1 rounded-full bg-white/5 text-slate-400 text-sm font-semibold border border-white/10 uppercase tracking-widest whitespace-nowrap">
                                    {exp.date}
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {exp.points.map((point, i) => (
                                    <li key={i} className="text-slate-300 flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
