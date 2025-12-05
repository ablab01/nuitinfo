
"use client";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";

import React, { useState } from "react";

export default function NirdPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full space-y-8">
          
          <section className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/25 p-8 shadow-2xl text-white space-y-4">
            <h1 className="text-3xl font-bold text-center text-[var(--lightgreen)]">
              Démarche NIRD<br />Numérique Inclusif, Responsable et Durable
            </h1>
          </section>


          <section className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/25 p-8 shadow-2xl text-white space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--lightgreen)]">Piliers du NIRD</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-[var(--softgreen)]">Inclusion</h3>
                <p className="text-base leading-relaxed opacity-90">Garantir un accès équitable au numérique et réduire la fracture numérique.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--softgreen)]">Responsabilité</h3>
                <p className="text-base leading-relaxed opacity-90">Promouvoir des usages réfléchis, des technologies souveraines et le respect des données personnelles.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--softgreen)]">Durabilité</h3>
                <p className="text-base leading-relaxed opacity-90">Lutter contre l'obsolescence programmée, maîtriser les coûts et favoriser la réutilisation.</p>
              </div>
            </div>
          </section>

          


          <section className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/25 p-8 shadow-2xl text-white space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--lightgreen)]">Problèmes de l'obsolescence programmée</h2>
            <p className="text-base leading-relaxed opacity-90">
              L'obsolescence programmée désigne la stratégie des fabricants visant à réduire délibérément la durée de vie des produits pour encourager leur remplacement fréquent. Dans le domaine du numérique, cela se traduit par des mises à jour logicielles qui ralentissent les appareils plus anciens, des composants matériels difficiles à réparer ou à remplacer, et une conception qui complique le recyclage. Cette pratique a des conséquences environnementales majeures, contribuant à l'augmentation des déchets électroniques et à l'épuisement des ressources naturelles.
            </p>
            <h3 className="font-semibold text-center text-[var(--softgreen)] mt-6">Obsolescence de Windows</h3>

            {isEnabled && (
              <div className="flex justify-center mt-4">
                <a
                  href="/nird/video1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--softgreen)] hover:bg-[var(--green)] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Vidéo explicative (Spectre Vidéo)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            )}

            {!isEnabled && (
              <div className="flex justify-center mt-4">
                <a
                  href="/nird/video1normal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--softgreen)] hover:bg-[var(--green)] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Vidéo explicative
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>

            )}

            <h3 className="font-semibold text-center text-[var(--softgreen)] mt-6">Obsolescence des logiciels</h3>

            {isEnabled && (
              <div className="flex justify-center mt-4">
                <a
                  href="/nird/video2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--softgreen)] hover:bg-[var(--green)] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Vidéo explicative (Spectre Vidéo)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            )}

            {!isEnabled && (
              <div className="flex justify-center mt-4">
                <a
                  href="/nird/video2normal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--softgreen)] hover:bg-[var(--green)] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Vidéo explicative
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>

            )}

            


          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2 text-white hover:bg-white/20 transition-all duration-300 border border-white/25"
              title={isEnabled ? "Activer la vidéo normale" : "Activer le spectre vidéo"}
            >
              <span className="text-sm">Mode spectral</span>
              <div className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${isEnabled ? 'bg-[var(--softgreen)]' : 'bg-gray-400'}`}>
                <span className={`absolute top-0 w-6 h-6 transition-transform duration-200 ease-in-out transform bg-white rounded-full shadow-md ${isEnabled ? 'translate-x-4 left-0' : 'left-0'}`}></span>
              </div>
            </button>
          </div>
          </section>

          
            <section className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/25 p-8 shadow-2xl text-white space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--lightgreen)]">La solution : Linux</h2>
              <p className="text-base leading-relaxed opacity-90">
                Linux est un système d'exploitation open source qui offre une alternative durable et responsable aux systèmes propriétaires. En adoptant Linux, les établissements éducatifs peuvent prolonger la durée de vie de leurs équipements informatiques, réduire les coûts liés aux licences logicielles, et favoriser un environnement numérique plus inclusif et respectueux de la vie privée.
              </p>
              <p className="text-base leading-relaxed opacity-90">
                Le collectif NIRD propose sa propre distribution Linux, <a href="https://nird.forge.apps.education.fr/linux/" className="text-[var(--softgreen)] hover:text-[var(--lightgreen)] underline transition-colors">Linux NIRD</a> , spécialement conçue pour répondre aux besoins des écoles et des établissements d'enseignement.
              </p>

          </section>

          <section className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/25 p-8 shadow-2xl text-white space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--lightgreen)]">Ressources et contact</h2>
            <p className="text-base leading-relaxed opacity-90">
              Pour en savoir plus sur la démarche NIRD, accéder aux ressources pédagogiques et techniques, ou rejoindre le réseau, consultez le site officiel : <a href="https://nird.forge.apps.education.fr/" className="text-[var(--softgreen)] hover:text-[var(--lightgreen)] underline transition-colors">nird.education</a>.
            </p>
          </section>

        </div>
      </main>
    </>

  );
}