"use client";

import React, { useEffect, useState } from "react";
import { db, storage } from "@/firebase/client";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Business {
  id?: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

export default function AdminPage() {
  const [form, setForm] = useState<Business>({
    name: "",
    description: "",
    image: "",
    link: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Realtime Fetch
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "businesses"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Business[];
      setBusinesses(data);
    });
    return () => unsub();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) return "";
    const storageRef = ref(storage, `business_images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageUrl = file ? await uploadImage() : form.image;
      const newData = { ...form, image: imageUrl };

      if (editingId) {
        await updateDoc(doc(db, "businesses", editingId), newData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "businesses"), newData);
      }

      setForm({ name: "", description: "", image: "", link: "" });
      setFile(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit business.");
    }
  };

  const handleEdit = (business: Business) => {
    setForm(business);
    setEditingId(business.id || null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this business?")) {
      await deleteDoc(doc(db, "businesses", id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {editingId ? "Edit Business" : "Add a New Business"}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Website Link"
          value={form.link}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-400">
          {editingId ? "Update Business" : "Add Business"}
        </button>
      </form>

      {/* Display List */}
      <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {businesses.map((biz) => (
          <div key={biz.id} className="bg-white p-4 rounded shadow flex flex-col">
            <img src={biz.image} alt={biz.name} className="h-40 object-cover rounded mb-3" />
            <h2 className="text-xl font-bold">{biz.name}</h2>
            <p className="text-sm text-gray-700 mb-2">{biz.description}</p>
            <a href={biz.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-2">
              Visit Website
            </a>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleEdit(biz)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(biz.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
