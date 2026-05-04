import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-[900px] mx-auto px-6 sm:px-10 font-['Poppins',sans-serif]">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-[#1a4132] mb-8 font-['GiambattistaVsPetit',serif]">
          Terms & Conditions
        </h1>
        
        <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8] mb-6">
          Welcome to Envision Media. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before making a booking.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              1. Services Provided
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              Envision Media provides the following services:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              <li>Wedding and event photography</li>
              <li>Cinematography and videography</li>
              <li>Drone footage services</li>
              <li>Female-only photography services (upon request)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              2. Booking and Payment
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              To secure your booking, a non-refundable deposit is required. The remaining balance is due on or before the date of your event, unless otherwise agreed in writing. Payment methods accepted include bank transfer, credit/debit card, and cash.
            </p>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8] mt-3">
              All prices are subject to change. The price confirmed at the time of booking will be honored for that specific date and service.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              3. Cancellation and Refund Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              <li><strong>Cancellation by Client:</strong> If you cancel more than 60 days before your event, the deposit may be transferred to a future date (subject to availability). If you cancel within 60 days of your event, the deposit is non-refundable.</li>
              <li><strong>Cancellation by Envision Media:</strong> In the unlikely event that we need to cancel due to unforeseen circumstances, we will refund any payments made in full and assist in finding an alternative photographer/videographer.</li>
              <li><strong>Postponement:</strong> If you wish to postpone your event, we will endeavour to accommodate the new date subject to availability. Any price differences may apply.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              4. Delivery of Images and Videos
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              We aim to deliver your edited photographs within 8-12 weeks of your event date. Video deliverables typically take 12-16 weeks. Delivery times may vary depending on the complexity of the coverage and the time of year.
            </p>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8] mt-3">
              All images and videos will be delivered via an online gallery with download capabilities. Physical prints and albums are available as optional extras and may require additional delivery time.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              5. Image Usage and Copyright
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              Envision Media retains the copyright of all images and videos produced. The client is granted a license to use the images for personal, non-commercial use. We reserve the right to use images for promotional purposes, including but not limited to our website, social media, and marketing materials.
            </p>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8] mt-3">
              If you require exclusive usage rights, please discuss this with us prior to booking, and additional fees may apply.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              6. Liability
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              Our liability for any claim arising from our services is limited to the total amount paid for those services. We are not liable for any indirect, consequential, or special damages.
            </p>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8] mt-3">
              We strongly recommend that clients obtain appropriate event insurance to cover any unforeseen circumstances that may affect their event.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              7. Force Majeure
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              Envision Media shall not be liable for any failure to perform due to causes beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              8. Client Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              <li>Provide accurate event details and schedules</li>
              <li>Ensure access to the venue and any restricted areas</li>
              <li>Inform us of any specific requirements or restrictions</li>
              <li>Designate a point of contact on the day of the event</li>
              <li>Obtain necessary permissions for drone footage if applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              9. Equipment and Backup
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              We carry backup equipment to ensure coverage in case of technical failure. All footage and images are stored on multiple storage devices immediately after capture and backed up to cloud storage.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              10. Agreement
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              By making a booking with Envision Media, you acknowledge that you have read, understood, and agree to these Terms and Conditions. These terms represent the entire agreement between you and Envision Media.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] font-bold text-[#1a4132] mb-4 font-['GiambattistaVsPetit',serif]">
              11. Contact Information
            </h2>
            <p className="text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              For any questions or concerns regarding these Terms and Conditions, please contact us:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[#2c2c2c] text-[0.95rem] leading-[1.8]">
              <li>Email: Enquiries@myenvisionltd.com</li>
              <li>Phone: +44 7922 390123</li>
              <li>WhatsApp: +44 7922 390123</li>
            </ul>
          </section>

          <p className="text-[#2c2c2c] text-[0.85rem] leading-[1.8] pt-8 border-t border-[#C5A059]/30">
            Last updated: April 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;