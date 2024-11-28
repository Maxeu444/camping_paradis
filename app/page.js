"use client";
import BaseLayout from "./layouts/BaseLayout";
import Button from "./components/Button";

export default function HomePage() {
  const handleClick = () => {
    alert("Bienvenue au Camping Paradis !");
  };

  return (
    <BaseLayout>
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Bienvenue au Camping Paradis</h1>
        <p>Découvrez des hébergements de rêve pour vos vacances.</p>
        <Button text="Réservez maintenant" onClick={handleClick} />
      </section>
    </BaseLayout>
  );
}
