
import Image from "next/image";
import PlayerCard from "@/components/home/PlayerCard";
import Banner from "@/components/home/Banner";
import News from "@/components/home/News";
import Matches from "@/components/home/Matches";
import Bracket from "@/components/home/Bracket";
import BackgroundLines from "@/components/layout/BackgroundLines";
export default function Home() {
  return (
    <main className="flex flex-col gap-5 mb-10 min-h-screen">
      <BackgroundLines />

      {/* Boven */}
      <section className="flex flex-col lg:flex-row justify-between gap-6 mt-8">
        <div className="flex-1">
          <PlayerCard />
        </div>
        <div className="flex-2">
          <Banner />
        </div>
        <div className="flex-1">
          <News />
        </div>
      </section>

      {/* Onder */}
      <section className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1">
          <Matches />
        </div>
        <div className="flex-1">
          <Bracket />
        </div>
      </section>
    </main>
  );

}
