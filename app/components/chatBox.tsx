"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! **How can I help you today?**",
            sender: 'ai'
        }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const aiMessage: Message = {
                id: Date.now() + 1,
                text: data.reply,
                sender: 'ai',
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        /* CENTERED LAYOUT: h-screen and items-center centers the box on the page */
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4">
            
            {/* THE MAIN CHAT BOX: Increased width (max-w-2xl) and height */}
            <div className="flex flex-col h-[600px] w-full max-w-2xl border rounded-2xl shadow-2xl bg-white overflow-hidden">
                
                {/* Header */}
                <div className="p-4 bg-blue-600 text-white font-bold text-center shadow-md">
                    AI Travel Assistant
                </div>

                {/* Message Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            /* ALIGNMENT: Right for user, Left for AI */
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] px-4 py-3 shadow-sm ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' // Bubble tail on right
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none' // Bubble tail on left
                                }`}
                            >
                                {/* MARKDOWN STYLING: 'prose' enables bold/italics logic */}
                                <div className={`prose prose-sm max-w-none ${msg.sender === 'user' ? 'prose-invert' : ''}`}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Loading Animation */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-2xl rounded-tl-none animate-pulse text-sm">
                                AI is typing...
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your travel question..."
                        className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}