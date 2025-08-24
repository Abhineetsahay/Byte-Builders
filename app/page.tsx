import HeatMap from  '@/components/heatmap'
import LandingPage from "@/components/Landing";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      {/* <LandingPage /> */}
      <HeatMap/>
    </div>
  );
}
