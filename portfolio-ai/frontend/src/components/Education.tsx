import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
    return (
        <section id="education" className="py-20 scroll-mt-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    My <span className="text-gradient">Education</span>
                </motion.h2>
            </div>

            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-dark p-8 md:p-10 rounded-3xl relative overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <GraduationCap size={40} />
                        </div>
                        <div>
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                                <h3 className="text-2xl font-bold">IMS Engineering College</h3>
                                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400">2022 - 2026</span>
                            </div>
                            <p className="text-xl text-blue-400 font-medium mb-2 text-left">Bachelor of Technology</p>
                            <p className="text-slate-400 mb-6 text-left">Computer Science & Engineering</p>

                            <div className="flex items-center gap-4">
                                <div className="px-6 py-2 rounded-xl bg-slate-800 border border-slate-700">
                                    <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider mb-1">Current CGPA</span>
                                    <span className="text-xl font-bold text-white">7.52 / 10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
