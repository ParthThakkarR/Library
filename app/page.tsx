"use client"; // Required for useState

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/app/globals.css';


// Custom styles can be added here or in globals.css
const pageStyles = `
  .hero-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
  }
  .book-cover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .book-cover:hover {
    transform: translateY(-8px);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }
`;

export default function LandingPage() {
  const [libraryHours, setLibraryHours] = useState('9:00 AM - 8:00 PM');

  useEffect(() => {
    const today = new Date().getDay();
    if (today === 0) setLibraryHours('Closed');
    else if (today === 6) setLibraryHours('10:00 AM - 6:00 PM');
    else setLibraryHours('9:00 AM - 8:00 PM');
  }, []);

  return (
    <>
      <style>{pageStyles}</style>
      <div>
        {/* Header */}
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <i className="bi bi-book-half fs-4 me-2 text-primary"></i>
              <span className="fw-bold fs-5">City Library</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <Link href="/login" className="btn btn-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="hero-bg text-white py-5">
            <div className="container text-center py-5">
              <h1 className="display-3 fw-bold mb-3">Your Gateway to Knowledge</h1>
              <p className="lead mb-4 col-lg-8 mx-auto">Discover worlds of wonder, learning, and adventure. Start your search here.</p>
              <form className="col-lg-7 mx-auto">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
                  <input type="search" placeholder="Search for books, authors, or subjects..." className="form-control border-0 shadow-none" />
                  <button type="submit" className="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </section>

          {/* Key Information Section */}
          <section className="bg-light py-5">
            <div className="container">
              <div className="row g-4 text-center">
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <i className="bi bi-clock-history fs-1 text-primary mb-3"></i>
                      <h3 className="h5 fw-bold mb-2">Today's Hours</h3>
                      <p className="card-text text-muted">{libraryHours}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <i className="bi bi-geo-alt-fill fs-1 text-primary mb-3"></i>
                      <h3 className="h5 fw-bold mb-2">Our Location</h3>
                      <p className="card-text text-muted">University Road, Rajkot, Gujarat</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 bg-primary-subtle">
                    <div className="card-body p-4">
                      <i className="bi bi-person-vcard-fill fs-1 text-primary mb-3"></i>
                      <h3 className="h5 fw-bold mb-2">Get a Library Card</h3>
                      <p className="card-text text-muted mb-3">Join our community and unlock a world of resources for free!</p>
                      <a href="/login" className="fw-bold text-primary text-decoration-none">Learn More <i className="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Books Section */}
          <section className="py-5">
            <div className="container">
              <h2 className="text-center fw-bold h2 mb-5">New Arrivals</h2>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
                {/* Book Items */}
                {[
                  { title: "The Midnight Library", author: "Matt Haig", color: "6366f1" },
                  { title: "Klara and the Sun", author: "Kazuo Ishiguro", color: "34d399" },
                  { title: "Project Hail Mary", author: "Andy Weir", color: "fbbf24" },
                  { title: "The Four Winds", author: "Kristin Hannah", color: "f87171" },
                  { title: "Crying in H Mart", author: "Michelle Zauner", color: "60a5fa" },
                  { title: "Atomic Habits", author: "James Clear", color: "a78bfa" }
                ].map((book, index) => (
                  <div className="col" key={index}>
                    <div className="text-center book-cover">
                      <img src={`https://placehold.co/300x450/${book.color}/ffffff?text=Book+Title`} alt="Book Cover" className="img-fluid rounded shadow mb-3" />
                      <h6 className="fw-bold mb-0">{book.title}</h6>
                      <p className="text-muted small">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <h5 className="fw-bold mb-3">About City Library</h5>
                <p className="text-white-50">Your community hub for learning, discovery, and connection. Serving Rajkot since 1965.</p>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                <h5 className="fw-bold mb-3">Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white-50 text-decoration-none">My Account</a></li>
                  <li><a href="#" className="text-white-50 text-decoration-none">Ask a Librarian</a></li>
                  <li><a href="#" className="text-white-50 text-decoration-none">Policies</a></li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <h5 className="fw-bold mb-3">Follow Us</h5>
                <div>
                  <a href="#" className="text-white-50 me-3 fs-5"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-white-50 me-3 fs-5"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="text-white-50 fs-5"><i className="bi bi-instagram"></i></a>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="text-center text-white-50">
              <p>&copy; {new Date().getFullYear()} City Central Library. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
