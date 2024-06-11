import { Link } from "react-router-dom";

export default function HomeSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center md:items-start gap-2">
      <img
        src="./src/assets/images/runner.webp"
        alt="a runner"
        className="img-shadow w-[calc(100%-15px)] mr-auto md:w-4/6 lg:w-1/2
         rounded-xl mb-4"
      />
      <h2>Votre sport en Streaming</h2>
      <p>Les avantages...</p>
      <Link
        to="/register"
        className="text-[var(--lightColor)] text-xl lg:text-2xl visited:text-[var(--lightColor)] bg-[var(--primaryColor)] p-2 md:p-3 lg:p-4 rounded-xl 
        flex item-center justify-center gap-2 mt-2"
      >
        <img
          src="./src/assets/images/logoPlay.png"
          alt=""
          className="w-5 h-5 md:w-6 lg:w-8 md:h-6 lg:h-8 m-auto"
        />
        Commencer
      </Link>
    </section>
  );
}
