// src/sections/Contact.jsx

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const ContactCard = ({ icon, title, children }) => (
  <div className="group relative overflow-hidden">
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-pink-100 p-4 shadow-sm hover:shadow-[0_20px_60px_-20px_rgba(225,29,72,.12)] transform hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-[#ff4d7a] to-[#ff6aa6] text-white shadow-md transform transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  </div>
);


const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [chars, setChars] = useState(0);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setStatus('');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: undefined }));
    if (name === 'message') setChars(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:4000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('Message sent — thanks!');
        setForm({ name: '', email: '', subject: '', message: '' });
        setChars(0);
      } else {
        setStatus('Send failed — try again');
        console.error('send failed', data.error);
      }
    } catch (err) {
      setStatus('Send failed — network error');
      console.error(err);
    }
    setTimeout(() => setStatus(''), 3500);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">Let's Work <span className="text-pink-600 dark:text-pink-400">Together</span></h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Have a project in mind? Let's discuss how I can help bring your ideas to life</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1 space-y-6">
            <ContactCard icon={<FaEnvelope className="text-lg" />} title="Email">pasindubanuka155@gmail.com</ContactCard>
            <ContactCard icon={<FaPhone className="text-lg" />} title="Phone">+94 789287469</ContactCard>
            <ContactCard icon={<FaMapMarkerAlt className="text-lg" />} title="Location">Pitipana North, Homagama, Sri Lanka</ContactCard>

            <div>
              <h4 className="text-base font-semibold text-gray-700 mb-3">Connect With Me</h4>
              <div className="flex gap-3">
                <a href="https://github.com/DKPBanuka" aria-label="GitHub" className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white border border-pink-100 shadow-sm text-pink-600 hover:scale-105 transform transition"> <FaGithub /> </a>
                <a href="https://www.linkedin.com/in/pasindu-banuka-216b7133b" aria-label="LinkedIn" className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white border border-pink-100 shadow-sm text-pink-600 hover:scale-105 transform transition"> <FaLinkedin /> </a>
                <a href="https://wa.me/94789287469" aria-label="Whatsapp" className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white border border-pink-100 shadow-sm text-pink-600 hover:scale-105 transform transition"> <FaWhatsapp /> </a>
              </div>
            </div>

            {/* Testimonials removed as requested */}
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-[0_40px_80px_-40px_rgba(225,29,72,.08)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} aria-label="Your Name" placeholder="Your Name" className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 transition" required />
                  {errors.name && <div className="text-xs text-pink-600 mt-1">{errors.name}</div>}
                  <input name="email" type="email" value={form.email} onChange={handleChange} aria-label="Email Address" placeholder="Email Address" className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 transition" required />
                  {errors.email && <div className="text-xs text-pink-600 mt-1">{errors.email}</div>}
                </div>

                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 transition" />
                {errors.subject && <div className="text-xs text-pink-600 mt-1">{errors.subject}</div>}

                <textarea name="message" value={form.message} onChange={handleChange} rows={8} placeholder="Message" className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 transition" />
                {errors.message && <div className="text-xs text-pink-600 mt-1">{errors.message}</div>}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{chars}/1000 characters</div>
                  <button
                    type="submit"
                    className={`w-fit px-6 py-2 rounded-lg font-semibold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                      ${status === 'Message sent — thanks!' ? 'bg-green-500 text-white scale-105' : 'bg-pink-500 text-white hover:bg-pink-600 scale-100'}
                      ${status === 'Message sent — thanks!' ? 'animate-pulse' : ''}`}
                    style={{
                      transition: 'background 0.3s, transform 0.5s cubic-bezier(.61,-0.01,.7,.99)',
                      minWidth: '180px',
                      fontSize: status === 'Message sent — thanks!' ? '1rem' : '0.95rem',
                    }}
                    disabled={status === 'Sending...'}
                  >
                    {status === 'Message sent — thanks!' ? (
                      <>
                        Message sent — thanks! <FaPaperPlane />
                      </>
                    ) : (
                      <>
                        Send Message <FaPaperPlane />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;