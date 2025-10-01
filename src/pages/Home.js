import React from 'react';
import { blogPosts } from '../data/blogData';
import '../styles/Home.css';

function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <div className="blog-header">
        <span className="blog-date">{post.date}</span>
        <span className="blog-category">{post.category}</span>
      </div>
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      <a href="#" className="read-more">Read full post</a>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <header className="home-header">
          <h1>Home</h1>
        </header>

        <section className="cards-section">
          <div className="info-cards">
            <div className="info-card">
              <h3>Get started</h3>
              <p>Read our getting started guide to get the most out of your Capitalmind subscription.</p>
              <a href="#" className="card-link">
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            
            <div className="info-card">
              <h3>Community</h3>
              <p>Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers</p>
              <a href="#" className="card-link">
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            
            <div className="info-card">
              <h3>Visit website</h3>
              <p>Keep up with our latest content on our website</p>
              <a href="#" className="card-link">
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="blog-section">
          <h2 className="section-title">Latest Posts</h2>
          <div className="blog-grid">
            {blogPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

