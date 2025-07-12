"use client"
import { useState } from "react";
import { db } from "@/firebase/client";
import { collection, addDoc } from "firebase/firestore";
import React from 'react';

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "businesses"), form);
      alert("Business added successfully!");
      setForm({ name: "", description: "", image: "", link: "" });
    } catch (error) {
      console.error("Error adding business:", error);
      alert("Failed to add business.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Business</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Website Link"
          value={form.link}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-yellow-400 text-black py-2 font-semibold rounded hover:bg-yellow-300">
          Add Business
        </button>
      </form>
    </div>
  );
}
