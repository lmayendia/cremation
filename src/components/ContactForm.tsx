import React, { useRef, useState } from 'react'
import { FormData } from '@/types';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        userEmail: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formRef = useRef<HTMLDivElement>(null);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch(`/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Required for JSON body
                },
                body: JSON.stringify(formData), // Stringify the data
            });

            if (!response.ok) {
                throw new Error("Failed to send the message");
            }

            setIsSubmitted(true);
            setFormData({ userEmail: "", subject: "", message: "" });
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
    <section id='contact' className='py-24'>
        <div
            ref={formRef}
            className={`relative flex items-center justify-center  transition-all duration-700 transform`}
        >
            <div className="bg-slate-50 rounded-xl shadow-lg p-8 md:p-16 max-w-3xl">
                {/* Form Heading */}
                <h1 className="text-4xl font-bold mb-4 text-center text-primary-800">
                    Contactanos
                </h1>
                <p className="text-center text-gray-800 mb-6 md:text-lg text-sm">
                    Nos pondremos en contacto lo antes posible contigo. Consulta todas las dudas que quieras, estamos aquí para trabajar contigo.
                </p>

                {/* Success Message */}
                {isSubmitted && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">
                        Tu mensaje ha sido enviado. ¡Gracias por querer trabajar con nosotros!
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                {/* Contact Form */}
                {!isSubmitted && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            placeholder="Tú email"
                            required
                            className="py-4 px-6 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Asunto"
                            required
                            className="py-4 px-6 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Escribe tu mensaje aquí"
                            required
                            className="py-4 px-6 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none h-32"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-4 px-6 rounded-xl transition ${isSubmitting
                                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                    : "bg-black text-white hover:bg-gray-800"
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                "Enviar mensaje"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>

    </section>)
}

export default ContactForm;