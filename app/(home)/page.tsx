import Image from "next/image";
import PlayerCard from "@/components/home/PlayerCard";
import Banner from "@/components/home/Banner";
import News from "@/components/home/News";
import Matches from "@/components/home/Matches";
import Bracket from "@/components/home/Bracket";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 mb-10">
      {/* Boven */}
      <section className="flex justify-between">
        <div>
          <PlayerCard />
        </div>
        <div>
          <Banner />
        </div>
        <div>
          <News />
        </div>
      </section>

      {/* Onder */}
      <section className="flex justify-between">
        <div>
          <Matches />
        </div>
        <div>
          <Bracket />
        </div>
      </section>
    </main>
  );
}
