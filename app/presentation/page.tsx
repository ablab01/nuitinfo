import Image from "next/image";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6">
      <section className="max-w-4xl w-full rounded-2xl bg-black/20 backdrop-blur-xl border border-white/25 p-8 shadow-2xl text-white">
        
        <h1 className="text-3xl font-bold mb-6 text-[var(--lightgreen)]">Pourquoi une alternative aux plateformes centralisées ?</h1>
        <p className="text-base leading-relaxed opacity-90 mb-8">
          Face à l'influence grandissante des grandes entreprises technologiques, il devient essentiel d'aider les enseignants, les familles et les enfants à comprendre les risques liés à une dépendance totale aux plateformes centralisées : collecte massive de données, opacité des algorithmes, perte de contrôle sur nos outils numériques. Sensibiliser à ces enjeux, c'est redonner du pouvoir aux utilisateurs et encourager l'adoption de solutions indépendantes, éthiques et durables.
        </p>

        <div className="border-t border-white/20 my-8"></div>

        <h1 className="text-3xl font-bold mb-6 text-[var(--lightgreen)]">Présentation de l'initiative NIRD</h1>

        <p className="text-base leading-relaxed opacity-90 mb-8">
          C'est pour répondre à ces dangers et proposer une alternative constructive qu'est née l'initiative NIRD. Ensemble, nous pouvons construire un environnement numérique où chacun garde la maîtrise de ses informations, favorise l'innovation locale et protège les générations futures.
        </p>

        <div className="flex justify-end">
          <a 
            href="/nird" 
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--softgreen)] hover:bg-[var(--green)] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            En savoir plus
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </main>

    </>
  );
}