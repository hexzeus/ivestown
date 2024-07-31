'use client';  // Add this line at the top of the file

import { useEffect, useState } from 'react'

const Contact = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null // or a loading placeholder
    }

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
                <form className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="Message" className="w-full p-2 border rounded" rows={4}></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact