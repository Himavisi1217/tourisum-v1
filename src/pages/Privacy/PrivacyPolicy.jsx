import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container section" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        <strong>Effective Date:</strong> April 27, 2026
      </p>

      <div style={{ lineHeight: '1.6', color: 'var(--color-dark)' }}>
        <p style={{ marginBottom: '1rem' }}>
          Welcome to <strong>Serendib Travels</strong> (“we,” “our,” or “us”), a travel planning and vehicle rental platform designed to help users discover destinations, plan trips, and rent vehicles conveniently.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, mobile applications, and related services (“Services”).
        </p>
        <p style={{ marginBottom: '2rem' }}>
          By using our Services, you agree to the practices described in this Privacy Policy.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
        <p style={{ marginBottom: '1rem' }}>We may collect the following types of information:</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>1.1 Personal Information</h3>
        <p style={{ marginBottom: '0.5rem' }}>When you create an account, make a booking, or contact us, we may collect:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing address</li>
          <li>National ID / Passport details (if required for vehicle rentals)</li>
          <li>Driver’s license information</li>
          <li>Payment details</li>
          <li>Profile photo (optional)</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>1.2 Travel & Booking Information</h3>
        <p style={{ marginBottom: '0.5rem' }}>We may collect information related to your travel activities, including:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Trip destinations</li>
          <li>Booking details</li>
          <li>Vehicle rental history</li>
          <li>Pickup and drop-off locations</li>
          <li>Travel preferences</li>
          <li>Search history on the platform</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>1.3 Device & Technical Information</h3>
        <p style={{ marginBottom: '0.5rem' }}>When you use our Services, we may automatically collect:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device type</li>
          <li>Operating system</li>
          <li>App version</li>
          <li>Log data</li>
          <li>Cookies and usage analytics</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>1.4 Location Information</h3>
        <p style={{ marginBottom: '0.5rem' }}>With your permission, we may collect your location data to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Show nearby vehicles or travel services</li>
          <li>Improve route recommendations</li>
          <li>Enhance travel planning features</li>
        </ul>
        <p style={{ marginBottom: '2rem' }}>You can disable location access through your device settings.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
        <p style={{ marginBottom: '0.5rem' }}>We use your information to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          <li>Create and manage your account</li>
          <li>Process bookings and payments</li>
          <li>Provide travel planning recommendations</li>
          <li>Facilitate vehicle rentals</li>
          <li>Verify identity and eligibility for rentals</li>
          <li>Improve platform performance and user experience</li>
          <li>Send booking confirmations and updates</li>
          <li>Respond to customer support requests</li>
          <li>Prevent fraud, abuse, and unauthorized activity</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Sharing of Information</h2>
        <p style={{ marginBottom: '1rem' }}>We may share your information with:</p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>3.1 Service Providers</h3>
        <p style={{ marginBottom: '0.5rem' }}>Third-party providers that help operate our Services, such as:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Payment processors</li>
          <li>Hosting providers</li>
          <li>Customer support tools</li>
          <li>Analytics providers</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>3.2 Vehicle Owners / Rental Partners</h3>
        <p style={{ marginBottom: '1rem' }}>When you book a vehicle, relevant details may be shared with the vehicle owner or rental partner to complete the booking.</p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>3.3 Legal Requirements</h3>
        <p style={{ marginBottom: '0.5rem' }}>We may disclose information if required by law or to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          <li>Comply with legal obligations</li>
          <li>Protect our rights and users</li>
          <li>Prevent fraud or security threats</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Cookies & Tracking Technologies</h2>
        <p style={{ marginBottom: '0.5rem' }}>We use cookies and similar technologies to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Remember user preferences</li>
          <li>Improve website functionality</li>
          <li>Analyze platform traffic</li>
          <li>Personalize user experience</li>
        </ul>
        <p style={{ marginBottom: '2rem' }}>You can control cookie preferences through your browser settings.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>5. Data Security</h2>
        <p style={{ marginBottom: '0.5rem' }}>We implement reasonable security measures to protect your information from:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Unauthorized access</li>
          <li>Loss</li>
          <li>Misuse</li>
          <li>Disclosure</li>
          <li>Alteration</li>
        </ul>
        <p style={{ marginBottom: '2rem' }}>However, no internet-based service is completely secure, and we cannot guarantee absolute security.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>6. Data Retention</h2>
        <p style={{ marginBottom: '0.5rem' }}>We retain personal information only as long as necessary to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          <li>Provide our Services</li>
          <li>Fulfill legal obligations</li>
          <li>Resolve disputes</li>
          <li>Enforce agreements</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>7. Your Rights</h2>
        <p style={{ marginBottom: '0.5rem' }}>Depending on your location and applicable laws, you may have the right to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Access your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent</li>
          <li>Object to certain processing activities</li>
        </ul>
        <p style={{ marginBottom: '2rem' }}>To exercise these rights, contact us using the information below.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>8. Third-Party Links</h2>
        <p style={{ marginBottom: '2rem' }}>Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of external websites.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>9. Children’s Privacy</h2>
        <p style={{ marginBottom: '2rem' }}>Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>10. International Data Transfers</h2>
        <p style={{ marginBottom: '2rem' }}>If you access our Services from outside Sri Lanka, your information may be transferred and processed in countries where data protection laws may differ from your jurisdiction.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>11. Changes to This Privacy Policy</h2>
        <p style={{ marginBottom: '1rem' }}>We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a revised effective date.</p>
        <p style={{ marginBottom: '2rem' }}>We encourage users to review this policy periodically.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>12. Contact Us</h2>
        <p style={{ marginBottom: '0.5rem' }}>If you have any questions regarding this Privacy Policy, you may contact us at:</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Serendib Travels</strong></p>
        <p style={{ marginBottom: '0.5rem' }}>Email: <a href="mailto:support@serendibtravels.com">support@serendibtravels.com</a></p>
        <p style={{ marginBottom: '0.5rem' }}>Phone: +94 70 123 4567</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
