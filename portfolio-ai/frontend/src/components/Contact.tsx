import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!WEB3FORMS_KEY) {
            setErrorMsg('Contact form is not configured yet. Please email me directly.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        const form = e.currentTarget;
        const data = new FormData(form);
        data.append('access_key', WEB3FORMS_KEY);

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });
            const json = await res.json();
            if (res.ok && json.success) {
                setStatus('success');
                form.reset();
            } else {
                setErrorMsg(json?.message || 'Submission failed.');
                setStatus('error');
            }
        } catch {
            setErrorMsg('Network error. Please check your connection.');
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 scroll-mt-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    Get in <span className="text-gradient">Touch</span>
                </motion.h2>
                <p className="text-slate-400">Let's connect and build something amazing together.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    {[
                        { icon: <Mail size={24} />, label: 'Email Me', value: 'ishasharma1273@gmail.com' },
                        { icon: <Phone size={24} />, label: 'Call Me', value: '+91 9871548507' },
                        { icon: <MapPin size={24} />, label: 'Location', value: 'Ghaziabad, Uttar Pradesh' }
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-6 group">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                                <p className="text-lg font-medium">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-dark p-8 rounded-[2rem] border-white/10"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-12 text-center gap-4"
                            >
                                <CheckCircle2 size={56} className="text-green-400" />
                                <h3 className="text-2xl font-bold">Message Sent!</h3>
                                <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-4 px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        required
                                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <input
                                    name="subject"
                                    type="text"
                                    placeholder="Subject"
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Message"
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                ></textarea>

                                {status === 'error' && (
                                    <div className="flex items-start gap-2 text-red-400 text-sm">
                                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                        {errorMsg || 'Something went wrong. Please try again or email me directly.'}
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2 group"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
