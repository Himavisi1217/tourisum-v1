import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, ShieldCheck, Clock, ThumbsUp } from 'lucide-react';
import './Home.css';
import { useAppData } from '../../context/AppDataContext';

const Home = () => {
  const { announcements, blogs } = useAppData();
  const featuredAnnouncement = announcements[0];
  const latestBlogs = blogs.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section section-dark">
        <div className="container hero-container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-content"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Explore Sri Lanka in Comfort
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Premium vehicle rentals with professional drivers for the ultimate island travel experience
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button className="btn-primary" style={{ marginTop: '2.5rem', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Start Booking
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {featuredAnnouncement ? (
        <section className="section" style={{ paddingBottom: '1rem' }}>
          <div className="container">
            <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
              {featuredAnnouncement.imageUrl ? (
                <img src={featuredAnnouncement.imageUrl} alt={featuredAnnouncement.title} style={{ width: '100%', maxHeight: '260px', objectFit: 'cover' }} />
              ) : null}
              <div style={{ padding: '1.5rem' }}>
                <h3>{featuredAnnouncement.title}</h3>
                <p style={{ color: 'var(--color-muted)' }}>{featuredAnnouncement.message}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Booking Widget */}
      <section className="booking-widget-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring", bounce: 0.4 }}
            className="booking-widget card"
          >
            <h3 style={{ color: 'var(--color-darkest)' }}>Quick booking</h3>
            <form className="booking-form">
              <div className="form-group">
                <label><Calendar size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }}/> Pickup date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label><Calendar size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }}/> Return date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label><MapPin size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }}/> Pickup location</label>
                <select>
                  <option>Colombo Airport (BIA)</option>
                  <option>Colombo City</option>
                  <option>Kandy</option>
                  <option>Galle</option>
                </select>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px' }}>Search</button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Latest Blogs</h2>
          </div>
          <div className="grid-3">
            {latestBlogs.map((blog) => (
              <article key={blog.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {blog.coverImageUrl ? (
                  <img src={blog.coverImageUrl} alt={blog.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                ) : null}
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>{blog.title}</h3>
                  <p style={{ color: 'var(--color-muted)' }}>{blog.excerpt}</p>
                  <Link to={`/blogs/${blog.id}`} className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Fleet */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', paddingTop: '6rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2>Our Fleet</h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto' }}>Choose from our range of well-maintained vehicles suitable for any group size.</p>
          </div>
          
          <motion.div 
            className="grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="card fleet-card">
              <div className="fleet-img-placeholder" style={{ backgroundColor: 'var(--color-very-light)', height: '180px', borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🚗</div>
              <div style={{ padding: '1.5rem' }}>
                <h3>Standard Car</h3>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Perfect for 2-3 travelers. Toyota Prius, Honda Fit or similar.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', fontSize: '1.2rem', color: 'var(--color-darkest)' }}>From $45/day</span>
                  <button className="btn-secondary">Select</button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card fleet-card" style={{ border: '2px solid var(--color-medium)' }}>
              <div className="fleet-img-placeholder" style={{ backgroundColor: 'var(--color-very-light)', height: '180px', borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                🚙
                <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--color-darkest)', color: 'var(--color-cream)', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>Popular</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3>Premium SUV</h3>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Ideal for families. Toyota Land Cruiser Prado or similar.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', fontSize: '1.2rem', color: 'var(--color-darkest)' }}>From $85/day</span>
                  <button className="btn-primary">Select</button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card fleet-card">
              <div className="fleet-img-placeholder" style={{ backgroundColor: 'var(--color-very-light)', height: '180px', borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🚐</div>
              <div style={{ padding: '1.5rem' }}>
                <h3>Passenger Van</h3>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Great for groups of 6-10. Toyota Hiace or similar.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', fontSize: '1.2rem', color: 'var(--color-darkest)' }}>From $70/day</span>
                  <button className="btn-secondary">Select</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2>Popular Destinations</h2>
          </div>
          
          <motion.div 
            className="grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['Kandy', 'Mirissa', 'Nuwara Eliya', 'Galle Fort'].map((dest, i) => (
              <motion.div variants={itemVariants} key={dest} className="card dest-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-very-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <MapPin size={28} color="var(--color-medium)" />
                </div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-darkest)' }}>{dest}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Explore beautiful landscapes and culture.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2>Why Choose Us</h2>
          </div>
          <motion.div 
            className="grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <ShieldCheck size={32} />, title: "Professional Drivers", desc: "Experienced and verified local drivers." },
              { icon: <Star size={32} />, title: "Premium Vehicles", desc: "Clean, air-conditioned, and well maintained." },
              { icon: <Clock size={32} />, title: "24/7 Support", desc: "Round-the-clock customer assistance." },
              { icon: <ThumbsUp size={32} />, title: "Best Prices", desc: "Transparent pricing with no hidden charges." }
            ].map((feature, i) => (
              <motion.div variants={itemVariants} key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', backgroundColor: 'var(--color-white)' }}>
                <div style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>{feature.icon}</div>
                <h4 style={{ marginBottom: '1rem', color: 'var(--color-darkest)' }}>{feature.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>Ready to explore Sri Lanka?</h2>
            <p style={{ color: 'var(--color-light)', marginBottom: '3rem', fontSize: '1.2rem' }}>Book your journey today and experience the island like never before.</p>
            <button className="btn-secondary" style={{ backgroundColor: 'var(--color-very-light)', color: 'var(--color-darkest)', border: 'none', padding: '1rem 3rem', fontSize: '1.1rem' }}>
              Book your trip
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
