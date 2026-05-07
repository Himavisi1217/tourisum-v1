import React from 'react';
import { Globe, Heart, ShoppingCart, User } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import './Home.css';

const Home = () => {
  const { destinations } = useAppData();
  const trendingDestinations = (destinations || []).slice(0, 6);

  return (
    <div className="home-page-v2">
      <header className="home-top-strip">
        <div className="home-top-brand">SERENDIB TRAVELS</div>
        <div className="home-top-actions">
          <span><Heart size={14} /> Wishlist</span>
          <span><ShoppingCart size={14} /> Cart</span>
          <span><Globe size={14} /> EN/LKR</span>
          <span><User size={14} /> Profile</span>
        </div>
      </header>

      <section className="home-hero-v2">
        <div className="home-hero-overlay">
          <h1>Discover &amp; book things to do</h1>
          <form className="home-search-bar">
            <input type="text" placeholder="Search places or activities" />
            <select defaultValue="Anytime">
              <option>Anytime</option>
              <option>This week</option>
              <option>This month</option>
            </select>
            <select defaultValue="1 traveler">
              <option>1 traveler</option>
              <option>2 travelers</option>
              <option>3+ travelers</option>
            </select>
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="home-things-section">
        <div className="container">
          <h2>Things to do wherever you&apos;re going</h2>
          <div className="things-grid">
            {trendingDestinations.map((destination) => (
              <article key={destination.id} className="thing-card">
                <img src={destination.imageUrl} alt={destination.name} />
                <p>{destination.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
