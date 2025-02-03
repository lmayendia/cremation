import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className="bg-primary-500 relative overflow-hidden min-h-screen -z-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 md:py-20 px-4 md:px-6">
                {/* Text Section */}
                <div className="text-center md:text-left md:w-1/2 md:pr-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Aliados en el Momento Más Importante
                    </h1>
                    <h2 className="text-primary-200 mb-4 md:text-5xl">
                        Conectamos a la Industria Funebre con Familias que Necesitan su Servicio
                    </h2>
                    <p className="text-base sm:text-lg text-white mb-6">
                        Conviértase en nuestro aliado estratégico y reciba solicitudes directas de cremación de manera constante.
                        Nos encargamos de toda la logística comercial: pagos, captación de clientes y soporte continuo.
                        Juntos, podemos ofrecer un servicio compasivo y profesional a las familias en su momento de necesidad.
                    </p>
                    <a
                        href='#contact'
                        className="inline-block bg-black text-lg sm:text-xl text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition"
                        aria-label="Sea Nuestro Aliado"
                    >
                        ¡Conviertase en nuestro Aliado!
                    </a>
                </div>

                <div className="relative w-full mt-10 md:mt-0 md:w-1/2 aspect-[4/3]">
                    <Image
                        src="/images/provider-hero.png"
                        alt="Profesional en funeraria atendiendo con compasión"
                        fill
                        priority
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold uppercase text-slate-100">Beneficios de Ser Nuestro Proveedor</h2>
                    <p className="text-lg sm:text-xl font-light text-slate-300 mt-4">
                        Una asociación donde todos ganan: las familias reciben atención inmediata y las funerarias incrementan sus ingresos sin costos adicionales.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    {/* Feature 1 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Image width={100} height={100} src="icons/no-comision.svg" alt="Cero Comisiones" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-100">Cero Comisiones por Transacción</h3>
                        <p className="text-slate-300 mt-2">
                            Usted recibe el 100% del valor acordado. Nosotros nos quedamos con una pequeña tarifa del cliente final.
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1 }}
                    >
                        <Image width={100} height={100} src="icons/network.svg" alt="Red de Clientes" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-100">Red de Clientes Garantizada</h3>
                        <p className="text-slate-300 mt-2">
                            Acceso inmediato a nuestra base de familias que necesitan servicios de cremación en tiempo real.
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <Image width={100} height={100} src="icons/payments.svg" alt="Pagos Seguros" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-100">Pagos Automatizados y Seguros</h3>
                        <p className="text-slate-300 mt-2">
                            Transacciones protegidas con sistema de liberación de fondos tras confirmación del servicio.
                        </p>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <Image width={100} height={100} src="icons/growth.svg" alt="Crecimiento" className="w-16 h-16 mb-4 transform hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-100">Crecimiento sin Esfuerzo</h3>
                        <p className="text-slate-300 mt-2">
                            Nuestro marketing digital atrae clientes nuevos para usted las 24 horas.
                        </p>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    className="text-center mt-16 relative z-10"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <a
                        href='#contact'
                        className="inline-block bg-primary-500 text-white py-3 px-6 sm:py-4 sm:px-8 text-lg rounded-lg hover:bg-primary-600 shadow-lg hover:shadow-xl transition-all duration-300"
                        aria-label="Quiero Ser Proveedor Preferido"
                    >
                        ¡Quiero Ser Proveedor Preferido!
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;