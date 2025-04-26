/**
 * AI Chatbot Application
 * 
 * This is a React-based AI chatbot application that provides:
 * - A modern, responsive UI with a floating chat interface
 * - Integration with OpenAI's GPT model for intelligent responses
 * - Real-time chat functionality with message history
 * - Professional presentation of AI-related information
 */

import React, { useState } from 'react';
import axios from 'axios';

// Define the structure of a chat message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Image URLs for the application
const IMAGES = {
  main: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
  ai1: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
  ai2: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
  ai3: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
};

function App() {
  // State management for chat functionality
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  /**
   * Handles the submission of a new chat message
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat history
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to backend API
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });

      // Add assistant response to chat history
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Emmanuel.O AI ChatbotPlatform</h1>
          <p className="text-gray-600">Explore our services and features</p>
        </header>
        
        {/* AI Information Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src={IMAGES.main}
                alt="AI Technology" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fascinating Facts About AI Chatbots</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">🤖 Continuous Learning</h3>
                  <p className="text-gray-600">Modern AI chatbots can learn from each interaction, constantly improving their responses and understanding of human language.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800">🌍 Multilingual Capabilities</h3>
                  <p className="text-gray-600">Advanced chatbots can communicate in multiple languages, breaking down language barriers in global communication.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">⚡ 24/7 Availability</h3>
                  <p className="text-gray-600">Unlike human agents, AI chatbots can provide instant responses around the clock, ensuring constant support for users.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800">💡 Contextual Understanding</h3>
                  <p className="text-gray-600">Modern AI can understand context and maintain conversation history, making interactions more natural and meaningful.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Technology in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <img 
                src={IMAGES.ai1}
                alt="AI Technology 1"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <h3 className="font-medium">Neural Networks</h3>
                <p className="text-sm">Advanced machine learning architecture</p>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={IMAGES.ai2}
                alt="AI Technology 2"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <h3 className="font-medium">Data Processing</h3>
                <p className="text-sm">Real-time data analysis and insights</p>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={IMAGES.ai3}
                alt="AI Technology 3"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <h3 className="font-medium">Smart Automation</h3>
                <p className="text-sm">Efficient workflow automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">Emmanuel AI Assistant</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-gray-100 text-gray-800 p-4 rounded-lg max-w-[80%]">
                    Thinking...
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 