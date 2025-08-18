import React, { useState } from 'react';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { FiSend } from 'react-icons/fi';
import { useAdmin } from '../../../context/admin-context';
import { useTheme } from '../../../context/theme-context';

const NewsletterForm = () => {
  const { sendNewsletterToAll } = useAdmin();
  const { theme } = useTheme();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendNewsletterToAll(subject, content);
      setSubject('');
      setContent('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="py-6">
      <SectionHeader
        title="Newsletter"
        description="Compose and send a plain-text newsletter to all active subscribers"
        icon={<FiSend size={24} />}
      />

      <form onSubmit={handleSubmit} className={`mt-6 rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-black/20 backdrop-blur-lg border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="mb-4">
          <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            required
            className={`w-full rounded-md px-4 py-3 outline-none transition-colors ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20' : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-200'}`}
          />
        </div>
        <div className="mb-6">
          <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Plain text content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Type your message... (no colors, just text)"}
            rows={10}
            required
            className={`w-full rounded-md px-4 py-3 outline-none transition-colors ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20' : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-200'}`}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSending}
            className={`px-6 py-3 rounded-md transition-colors ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
          >
            {isSending ? 'Sending…' : 'Send Newsletter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;