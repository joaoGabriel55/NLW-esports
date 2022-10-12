import LogoImg from "./assets/nlw-logo.svg";
import CreateAdBanner from "./components/CreateAdBanner";
import GameBanner from "./components/GameBanner";
import { useGames } from "./hooks/useGames";
import "./styles/main.css";

function App() {
  const { games } = useGames();

  return (
    <div className="max-w-[1344px] mx-auto fle x flex-col items-center my-20">
      <img src={LogoImg} alt="NLW Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({ id, bannerUrl, title, _count }) => (
          <GameBanner
            key={id}
            bannerUrl={bannerUrl}
            title={title}
            adsCount={_count.ads}
          />
        ))}
      </div>
      <CreateAdBanner />
    </div>
  );
}

export default App;
