import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
    const sizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`relative flex items-center justify-center font-black ${sizes[size]} ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl rotate-12 opacity-20 group-hover:rotate-45 transition-transform duration-500"></div>
            <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <span className="relative text-gradient">IS</span>
        </motion.div>
    );
};

export default Logo;
