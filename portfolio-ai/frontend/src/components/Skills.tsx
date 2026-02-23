import { motion } from 'framer-motion';
import { Code, Layout, Database, Terminal, Settings } from 'lucide-react';

const Skills = () => {
    const skillGroups = [
        {
            title: 'Languages',
            icon: <Code className="text-blue-400" />,
            skills: ['Java', 'JavaScript (ES6+)']
        },
        {
            title: 'Frontend',
            icon: <Layout className="text-purple-400" />,
            skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material-UI', 'Bootstrap']
        },
        {
            title: 'Backend & DB',
            icon: <Database className="text-green-400" />,
            skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL']
        },
        {
            title: 'Tools & DevOps',
            icon: <Settings className="text-orange-400" />,
            skills: ['Git/GitHub', 'Docker', 'Kubernetes (Basic)', 'CI/CD', 'VS Code']
        },
        {
            title: 'Core Concepts',
            icon: <Terminal className="text-red-400" />,
            skills: ['DSA', 'OOPS', 'DBMS', 'Operating Systems', 'Networking']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 scroll-mt-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    My <span className="text-gradient">Skillset</span>
                </motion.h2>
                <p className="text-slate-400">The technology stack I use to bring ideas to life.</p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {skillGroups.map((group) => (
                    <motion.div
                        key={group.title}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="glass-dark p-8 rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300 shadow-inner overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                {group.icon}
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-white transition-colors tracking-tight">{group.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map(skill => (
                                <motion.span
                                    key={skill}
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-default font-medium"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;

