import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 scroll-mt-20">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12"
                >
                    About <span className="text-gradient">Me</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-dark p-8 md:p-12 rounded-[2rem] text-left relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>

                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        I am a final-year B.Tech Computer Science student at IMS Engineering College with a strong passion for software development. My journey is fueled by a desire to build applications that are not only functional but also provide great user experiences.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        With a solid foundation in Data Structures and Algorithms (solving 400+ problems across platforms like LeetCode and GFG) and practical experience in full-stack development using the MERN stack, I enjoy tackling complex challenges. Whether it's architecting a scalable backend or crafting an intuitive frontend, I'm always eager to learn and implement the latest technologies.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
