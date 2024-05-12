import { NavLink } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section-text">
        <h1>Share and Contribute</h1>
        <NavLink to="/sign-up" className="join-now-button">Join now</NavLink>
      </div>
      <div className="hero-section-image">
        {/* image here */}
      </div>
    </section>
  );
}



