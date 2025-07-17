"use client"
import Image from 'next/image';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/client";
import { motion } from "framer-motion";
import CountUp from "react-countup";




export default function Home() {

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "businesses"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);


  return (
    <>
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="bg-black/60 w-full h-full absolute top-0 left-0" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white">Heshan Manujaya</h1>
          <p className="text-xl md:text-2xl text-white mt-4">Promoting Sri Lanka to the World</p>
          <div className="mt-6 space-x-4">
            <button className="px-6 py-3 bg-yellow-400 rounded-full text-black font-semibold">Work With Me</button>
            <button className="px-6 py-3 border border-white rounded-full text-white">Explore Destinations</button>
          </div>
          
          {/* Hero Stats */}
          <div className="mt-8 text-white/80 text-sm">
            <div className="flex items-center justify-center gap-1">
              <span>Promoting</span>
              <span className="text-yellow-400 font-bold text-lg">
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <CountUp 
                    end={businesses.length || 25} 
                    duration={3}
                    delay={1}
                  />
                )}+
              </span>
              <span>local businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-6 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <Image 
          src="/profile.jpg"
          alt="Profile"
          width={160}
          height={160}
          className="w-40 h-40 mx-auto rounded-full mb-4 border-4 border-yellow-400"
        />
        <p className="text-lg text-gray-700 leading-relaxed">
          I&apos;m Heshan, a passionate travel content creator and digital marketer based in Sri Lanka.
          I help local businesses grow their visibility through digital storytelling, engaging content,
          and smart online promotions. I love exploring hidden gems and connecting travelers with unforgettable local experiences.
        </p>
      </motion.section>

      {/* Services */}
      <motion.section 
        id="services" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-100 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">My Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-semibold mb-3">Tourism Content Creation</h3>
              <p className="text-gray-700">Photos & videos for hotels, destinations, and guides to attract more tourists online.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-semibold mb-3">Social Media Marketing</h3>
              <p className="text-gray-700">I help tourism brands reach and grow their audience across Instagram, TikTok, and more.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-semibold mb-3">Website & Branding Help</h3>
              <p className="text-gray-700">Clean, mobile-friendly websites and branding for local tourism services.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Businesses */}
        <motion.section 
          id="featured" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Featured Tourism Businesses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businesses.map((biz, index) => (
                  <motion.div 
                    key={biz.id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white shadow rounded-lg overflow-hidden"
                  >
                    <Image 
                      src={biz.image} 
                      alt={biz.name} 
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{biz.name}</h3>
                      <p className="text-gray-600">{biz.description}</p>
                      <a href={biz.link} className="text-yellow-500 font-semibold inline-block mt-2" target="_blank" rel="noopener noreferrer">
                        Visit Website →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div> 
              
              {/* Live Business Count */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl inline-block">
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <span className="text-2xl">🎉</span>
                    <span className="text-gray-700">Over</span>
                    <span className="text-3xl font-bold text-yellow-600">
                      {loading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        <CountUp 
                          end={businesses.length || 25} 
                          duration={2.5}
                          delay={0.5}
                          enableScrollSpy={true}
                          scrollSpyOnce={true}
                        />
                      )}
                    </span>
                    <span className="text-gray-700">tourism businesses promoted and counting!</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Join our growing community of featured businesses
                  </p>
                </div>
              </motion.div>
          </div>
        </motion.section>


        {/* Contact Section */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="py-24 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Let's Work Together</h2>
            <p className="text-lg text-gray-600 mb-10">
              Are you a hotel, travel brand, or local business looking to grow your presence? Reach out today!
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <svg className="w-10 h-10 text-yellow-500 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M16 2H8C5.8 2 4 3.8 4 6v12c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4z" />
                </svg>
                <p className="font-semibold">Email</p>
                <a href="mailto:heshanmanujaya@gmail.com" className="text-sm text-gray-500 hover:underline mt-1">heshanmanujaya@gmail.com</a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <svg className="w-10 h-10 text-green-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 15.5a16.9 16.9 0 0 1-7-2.3A16.8 16.8 0 0 1 4.5 4c-.3-.5-.1-1 .3-1.3l2.2-2.2a1 1 0 0 1 1.3-.1C9.6 1.6 11 3.5 11.5 4c.2.2.2.5.1.7l-1.3 2.7c.9 1.7 2.6 3.4 4.3 4.3l2.7-1.3c.3-.1.5 0 .7.1.5.5 2.4 1.9 3.6 3.3.3.4.2 1-.1 1.3l-2.1 2.1c-.4.4-.9.5-1.3.3z" />
                </svg>
                <p className="font-semibold">WhatsApp</p>
                <a href="https://wa.me/94771234567" target="_blank" className="text-sm text-gray-500 hover:underline mt-1">Chat Now</a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <svg className="w-10 h-10 text-blue-500 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M8 17l4-4-4-4m8 8l-4-4 4-4" />
                </svg>
                <p className="font-semibold">Instagram DM</p>
                <a href="https://instagram.com/yourusername" target="_blank" className="text-sm text-gray-500 hover:underline mt-1">@yourusername</a>
              </motion.div>
            </div>

            <div className="text-sm text-gray-500">
              Prefer a direct call or project pitch? <span className="font-medium text-gray-800">Let’s schedule it!</span>
            </div>
          </div>
        </motion.section>


        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            
            <div>
              <h4 className="text-xl font-semibold mb-2">Heshan Manujaya</h4>
              <p className="text-sm text-gray-400">
                Travel content creator & marketing partner promoting Sri Lanka through digital experiences.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-yellow-400">About Me</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Services</a></li>
                <li><a href="#featured" className="hover:text-yellow-400">Featured</a></li>
                <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/yourusername" target="_blank" className="hover:text-yellow-400 text-2xl" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/yourchannel" target="_blank" className="hover:text-yellow-400 text-2xl" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" className="hover:text-yellow-400 text-2xl" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Heshan Manujaya. All rights reserved.
          </div>
        </footer>


        




    </main>

    {/* Floating WhatsApp Button */}
    <motion.a
      href="https://wa.me/94771234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
      </svg>
    </motion.a>
    </>
  );
}
