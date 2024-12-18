import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className="bg-primary-500 relative overflow-hidden min-h-lvh h-full -z-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6">
                {/* Text Section */}
                <div className="text-left  md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Únete a nuestro equipo
                    </h1>
                    <p className="text-lg text-white mb-6">
                        Descubre la libertad de trabajar con nosotros. Sin comisiones ni cargos ocultos. Nosotros encontramos los clientes, tú solo los esperas. ¡Es así de sencillo!
                    </p>
                    <a href='#contact' className="bg-black text-xl text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition">
                        ¡Contáctanos!
                    </a>
                </div>

                {/* Image Section */}
                <div className="relative w-full mt-10 md:mt-0 h-96 max-w-2xl">
                    {/* Stain */}
                    <Image
                        src="/images/business-sales-meeting.jpg"
                        alt="Teamwork"
                        fill
                        className="relative rounded-lg shadow-lg object-cover w-72 h-72"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold uppercase text-slate-100">Trabajar con nosotros es asi de sencillo</h2>
                    <p className="text-xl font-light text-slate-300 mt-4">
                        From automating tasks to optimizing growth, we build software that scales seamlessly.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-24 gap-10">
                    {/* Feature 1 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Image width={100} height={100} src="icons/no-comision.svg" alt="Powerful Yet Elegant" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-2xl font-semibold text-slate-100">Sin comisiones</h3>
                        <p className="text-slate-300 mt-2">
                            No cobramos comisiones por trabjar con nosotros.
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1 }}
                    >
                        <Image width={100} height={100} src="icons/lupa.svg" alt="Secure Yet Easy" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-2xl font-semibold text-slate-100">Sin costos ocultos</h3>
                        <p className="text-slate-300 mt-2">
                            Únete a la red mas grande de latinoamerica de servicios funerarios y descubre como haremos crecer tu negocio
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <Image width={100} height={100} src="icons/world.svg" alt="Complex Yet Seamless" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-2xl font-semibold text-slate-100">Nosotros invertimos, tu ganas</h3>
                        <p className="text-slate-300 mt-2">
                            Traemos los clientes hasta tu negocio. Asegura el crecimiento sin invertir un centavo.
                        </p>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <Image width={100} height={100} src="icons/growth.svg" alt="Scalable for Growth" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-2xl font-semibold text-slate-100">Crecimiento</h3>
                        <p className="text-slate-300 mt-2">
                            Con nuestra cartera de clientes haremos crecer tu negocio como nunca antes.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="text-center mt-16 relative z-10"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true }} // Ensures animation triggers only once
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <a href='#contact' className="bg-primary-500 text-white py-4 px-8 text-lg rounded-lg hover:bg-primary-600 shadow-lg hover:shadow-xl transition-all duration-300">
                        Contactanos
                    </a>
                </motion.div>


            </div>
        </section>
    );
};

export default Hero;
