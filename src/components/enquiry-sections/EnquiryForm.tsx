import React, { useState } from 'react';
import { API } from '../../config';

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    servicesRequired: 'Photography',
    budgetRange: '£1000-£2000',
    eventVenue: '',
    guestCount: '',
    eventDate: '',
    eventType: '',
    referralSource: 'Google',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch(`${API}/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setStatus({ loading: false, success: true, error: '' });
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        servicesRequired: 'Photography',
        budgetRange: '£1000-£2000',
        eventVenue: '',
        guestCount: '',
        eventDate: '',
        eventType: '',
        referralSource: 'Google',
        message: ''
      });
      
      // Auto hide success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white relative z-20">
      <div className="max-w-[750px] mx-auto px-6 font-['Poppins',sans-serif]">
        <h3 className="text-center font-bold text-[1.25rem] md:text-[1.5rem] text-[#111] mb-12">
          Please submit your enquiry using the form below
        </h3>

        {status.success && (
          <div className="mb-8 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-center animate-fade-in">
             ✓ your message has been sent successfully
          </div>
        )}

        {status.error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-center">
             ✕ {status.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-7">
          {/* First Name */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">First Name:</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>
          
          {/* Last Name */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Last Name:</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>

          {/* Email */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Email:</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>

          {/* Contact Number */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Contact Number:</label>
            <input 
              type="tel" 
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>

          {/* Services Required */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5 relative">
            <label className="text-[0.85rem] font-bold text-[#111]">Services Required:</label>
            <select 
              name="servicesRequired"
              value={formData.servicesRequired}
              onChange={handleChange}
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none appearance-none text-[#2c2c2c]"
            >
              <option>Photography</option>
              <option>Cinematography</option>
              <option>Both</option>
            </select>
            <div className="absolute right-3 top-[34px] pointer-events-none text-[#C5A059] text-[0.6rem]">▼</div>
          </div>

          {/* Budget Range */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5 relative">
            <label className="text-[0.85rem] font-bold text-[#111]">Budget Range:</label>
            <select 
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none appearance-none text-[#2c2c2c]"
            >
              <option>£1000-£2000</option>
              <option>£2000-£3000</option>
              <option>£3000+</option>
            </select>
            <div className="absolute right-3 top-[34px] pointer-events-none text-[#C5A059] text-[0.6rem]">▼</div>
          </div>

          {/* 3 columns: Event Venue, Estimated Number of Guests, Event Date */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Event Venue:</label>
            <input 
              type="text" 
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Estimated Number of Guests:</label>
            <input 
              type="text" 
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Event Date:</label>
            <input 
              type="text" 
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              placeholder="e.g. 12/05/2026"
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>

          {/* Event Type */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-bold text-[#111]">Event Type:</label>
            <input 
              type="text" 
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              placeholder="e.g. Wedding, Birthday"
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none" 
            />
          </div>

          {/* Where Did You Find Us? */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5 relative">
            <label className="text-[0.85rem] font-bold text-[#111]">Where Did You Find Us?:</label>
            <select 
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full border border-[#C5A059] bg-white px-3 py-2.5 focus:outline-none appearance-none text-[#2c2c2c]"
            >
              <option>Google</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>Friend / Family</option>
            </select>
            <div className="absolute right-3 top-[34px] pointer-events-none text-[#C5A059] text-[0.6rem]">▼</div>
          </div>

          {/* Message */}
          <div className="col-span-12 flex flex-col gap-1.5 mt-2">
            <label className="text-[0.85rem] font-bold text-[#111]">Message:</label>
            <textarea 
              rows={5} 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-[#C5A059] bg-white p-3 focus:outline-none resize-none"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="col-span-12 flex flex-col items-center mt-6">
            <button 
              type="submit" 
              disabled={status.loading}
              className={`flex items-center gap-2 bg-[#021F10] text-[#C5A059] border-[1.5px] border-[#cfab65] font-['GiambattistaVsPetit',serif] rounded-full px-12 py-2.5 text-[1.1rem] font-bold tracking-[0.1em] transition-all ${status.loading ? 'opacity-70 cursor-wait pl-10 pr-12' : 'hover:bg-[#cfab65] hover:text-[#021F10]'}`}
            >
              {status.loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#C5A059]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SENDING...
                </>
              ) : (
                'SUBMIT ENQUIRY'
              )}
            </button>
            
            {/* Form feedback */}
            <div className="mt-4 h-6">
              {status.success && (
                <p className="text-green-600 font-bold text-sm animate-bounce text-center">✓ Message sent successfully!</p>
              )}
              {status.error && (
                <p className="text-red-600 font-bold text-sm text-center">⚠ {status.error}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;
