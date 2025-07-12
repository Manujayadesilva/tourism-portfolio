"use client"
import Image from 'next/image';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/client";




export default function Home() {

  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const querySnapshot = await getDocs(collection(db, "businesses"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBusinesses(data);
    };

    fetchBusinesses();
  }, []);


  return (
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
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
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
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">My Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold mb-3">Tourism Content Creation</h3>
              <p className="text-gray-700">Photos & videos for hotels, destinations, and guides to attract more tourists online.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold mb-3">Social Media Marketing</h3>
              <p className="text-gray-700">I help tourism brands reach and grow their audience across Instagram, TikTok, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold mb-3">Website & Branding Help</h3>
              <p className="text-gray-700">Clean, mobile-friendly websites and branding for local tourism services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
        <section id="featured" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Featured Tourism Businesses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businesses.map(biz => (
                  <div key={biz.id} className="bg-white shadow rounded-lg overflow-hidden">
                    <img src={biz.image} alt={biz.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{biz.name}</h3>
                      <p className="text-gray-600">{biz.description}</p>
                      <a href={biz.link} className="text-yellow-500 font-semibold inline-block mt-2" target="_blank" rel="noopener noreferrer">
                        Visit Website →
                      </a>
                    </div>
                  </div>
                ))}
              </div> 
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-20 bg-yellow-50 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              Whether you’re a traveler, hotel, or tour operator – I’d love to connect. Let’s grow together.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="mailto:heshanmanujaya@gmail.com"
                className="bg-white border border-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-100 transition"
              >
                Email Me
              </a>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Heshan Manujaya. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-4">
              <a href="https://instagram.com/yourusername" target="_blank" className="hover:text-yellow-400">Instagram</a>
              <a href="https://youtube.com/yourchannel" target="_blank" className="hover:text-yellow-400">YouTube</a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" className="hover:text-yellow-400">LinkedIn</a>
            </div>
          </div>
        </footer>

        




    </main>
  );
}
