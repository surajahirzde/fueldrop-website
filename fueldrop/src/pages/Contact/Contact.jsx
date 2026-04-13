import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // FormSubmit endpoint with your random string
    const formEndpoint = 'https://formsubmit.co/ajax/27a84a5d10c8b72fb274e40b7f45b117';
    
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject || 'No Subject',
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        // 5 seconds baad success message hide ho jayega
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fdct-page">
      <div className="fdct-hero">
        <span>Get In Touch</span>
        <h1>
          Contact <span>Us</span>
        </h1>
        <p>Have a question? Need a quote? Our team is ready to help 24×7.</p>
      </div>

      <section className="fdct-content fd-section">
        <div className="fd-container fdct-grid">
          
          {/* LEFT INFO */}
          <div className="fdct-info">
            <h2>Let's Talk</h2>
            <p>
              Whether you're a small business owner or managing a large fleet,
              our team will find the right solution for you.
            </p>

            <div className="fdct-contact-items">

              <div className="fdct-item">
                <div className="fdct-item-icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div>
                  <strong>Call Us</strong>
                  <span>+91-921133 6186</span>
                  <span>Mon–Sat 8AM – 8PM</span>
                </div>
              </div>

              <div className="fdct-item">
                <div className="fdct-item-icon">
                  <i className="fa fa-envelope"></i>
                </div>
                <div>
                  <strong>Email Us</strong>
                  <span>oncallfuel88@gmail.com</span>
                  <span>Response within 2 hours</span>
                </div>
              </div>

              <div className="fdct-item">
                <div className="fdct-item-icon">
                  <i className="fa fa-map-marker-alt"></i>
                </div>
                <div>
                  <strong>Head Office</strong>
                  <span>SC0-4,Dayal Bagh, sector-39</span>
                  <span>FARIDABAD-121009</span>
                </div>
              </div>

            </div>
          </div>

          
          {/* RIGHT FORM */}
          <div className="fdct-form-wrap">
            {submitStatus === 'success' ? (
              <div className="fdct-success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="fdct-form">
                <h3>Send a Message</h3>

                {submitStatus === 'error' && (
                  <div className="fdct-error-message">
                    Failed to send message. Please try again.
                  </div>
                )}

                <div className="fdct-row">
                  <div className="fdct-field">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="fdct-field">
                    <label>Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="fdct-row">
                  <div className="fdct-field">
                    <label>Phone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="fdct-field">
                    <label>Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="fdct-field">
                  <label>Message *</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="fdct-submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} 
                  {!isSubmitting && <i className="fa fa-arrow-right"></i>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}