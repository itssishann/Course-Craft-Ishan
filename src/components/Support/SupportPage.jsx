import React, { useEffect } from 'react';
import { FaComments } from 'react-icons/fa';

const SupportPage = () => {
  useEffect(() => {
    // Maximize Tawk.to chat only on support page
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20 flex flex-col items-center text-center">
      <div className="bg-white shadow-xl rounded-3xl px-8 py-12 max-w-3xl w-full">
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <FaComments className="text-5xl" />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          We're Here to Help!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Got a question or need support? Our team is available 24/7. Just click the chat icon in the
          bottom-right corner to start a conversation with us using <strong>Tawk.to</strong>.
        </p>
        <p className="text-sm text-gray-500 italic">
          Real humans. Real help. Real-time.
        </p>
      </div>

      <p className="mt-10 text-sm text-gray-400">
        Live chat powered by Tawk.to — connecting you instantly with our support team.
      </p>
    </div>
  );
};

export default SupportPage;
