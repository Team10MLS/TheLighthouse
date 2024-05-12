// Need to import the HeroSection component into HomePage.jsx and render it.

import HeroSection from "../components/heroSection";

export default function HomePage() {
  return <>
    <HeroSection />
    <h1>Home</h1>
    <p>Put something interesting here!</p>
  </>;
}
