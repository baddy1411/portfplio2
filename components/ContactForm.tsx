
import React, { useState } from 'react';
import { Icons } from './Icons';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('submitting');
    
    // Construct Mailto Link
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:badrish41@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Email Client
    window.location.href = mailtoLink;
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after showing success message
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-md animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-xs font-bold uppercase text-neutral-500 tracking-wider ml-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
            placeholder="John Doe"
            disabled={status !== 'idle'}
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-xs font-bold uppercase text-neutral-500 tracking-wider ml-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
            placeholder="john@example.com"
            disabled={status !== 'idle'}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="text-xs font-bold uppercase text-neutral-500 tracking-wider ml-1">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all resize-none"
          placeholder="Tell me about your project..."
          disabled={status !== 'idle'}
        />
      </div>

      <button
        type="submit"
        disabled={status !== 'idle'}
        className={`mt-2 flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${
          status === 'success'
            ? 'bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/50 cursor-default'
            : 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 hover:bg-teal-600 dark:hover:bg-teal-300 hover:text-white dark:hover:text-teal-950 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed'
        }`}
      >
        {status === 'submitting' ? (
          <>
            <Icons.Loader2 className="animate-spin" size={16} />
            Opening Mail...
          </>
        ) : status === 'success' ? (
          <>
            <Icons.Check size={16} />
            Message Ready!
          </>
        ) : (
          <>
            Send Message
            <Icons.Send size={16} />
          </>
        )}
      </button>
    </form>
  );
};