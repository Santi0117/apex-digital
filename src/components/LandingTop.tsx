import Hero from "./Hero";
import SectorsGrid from "./SectorsGrid";
import SectorBento from "./SectorBento";

export default function LandingTop() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <Hero />
        <SectorsGrid />
        <SectorBento />
      </div>
    </div>
  );
}
