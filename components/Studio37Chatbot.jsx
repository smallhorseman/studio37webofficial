import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Studio37Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#F3E3C3] text-[#1a1a1a] p-4 rounded-full shadow-lg hover:bg-[#E6D5B8] transition-all hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-[#262626] rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-[#F3E3C3] text-[#1a1a1a] p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Studio37 Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 text-[#F3E3C3]">
            <p className="text-sm mb-4">Hi! I'm here to help with any questions about Studio37's photography services.</p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 bg-[#1a1a1a] rounded text-sm hover:bg-[#333]">
                📸 View our portfolio
              </button>
              <button className="w-full text-left p-2 bg-[#1a1a1a] rounded text-sm hover:bg-[#333]">
                💰 Get pricing information
              </button>
              <button className="w-full text-left p-2 bg-[#1a1a1a] rounded text-sm hover:bg-[#333]">
                📅 Book a consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studio37Chatbot;
