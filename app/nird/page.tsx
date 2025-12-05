
"use client";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";

import React, { useState } from "react";

export default function NirdPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <>
      <Navbar />
      <main className="min-h-screen text-gray-900 py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="space-y-2 bg-white rounded-xl shadow p-6">
            <h1 className="text-3xl font-bold text-center">
              Démarche NIRD<br />Numérique Inclusif, Responsable et Durable
            </h1>
          </header>


          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">Piliers du NIRD</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold">Inclusion</h3>
                <p>Garantir un accès équitable au numérique et réduire la fracture numérique.</p>
              </div>
              <div>
                <h3 className="font-semibold">Responsabilité</h3>
                <p>Promouvoir des usages réfléchis, des technologies souveraines et le respect des données personnelles.</p>
              </div>
              <div>
                <h3 className="font-semibold">Durabilité</h3>
                <p>Lutter contre l'obsolescence programmée, maîtriser les coûts et favoriser la réutilisation.</p>
              </div>
            </div>
          </section>

          


          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">Problèmes de l'obsolescence programmée</h2>
            <p>
              L'obsolescence programmée désigne la stratégie des fabricants visant à réduire délibérément la durée de vie des produits pour encourager leur remplacement fréquent. Dans le domaine du numérique, cela se traduit par des mises à jour logicielles qui ralentissent les appareils plus anciens, des composants matériels difficiles à réparer ou à remplacer, et une conception qui complique le recyclage. Cette pratique a des conséquences environnementales majeures, contribuant à l'augmentation des déchets électroniques et à l'épuisement des ressources naturelles.
            </p>
            <h3 className="font-semibold text-center">Obsolescence de Windows</h3>

            {isEnabled && (
              <div className="flex justify-center">
                <a
                  href="/nird/video1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Vidéo explicative (Spectre Vidéo)
                </a>
              </div>
            )}

            {!isEnabled && (
              <div className="flex justify-center">
                <a
                  href="/nird/video1normal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Vidéo explicative
                </a>
              </div>

            )}

            <h3 className="font-semibold text-center">Obsolescence des logiciels</h3>

            {isEnabled && (
              <div className="flex justify-center">
                <a
                  href="/nird/video2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Vidéo explicative (Spectre Vidéo)
                </a>
              </div>
            )}

            {!isEnabled && (
              <div className="flex justify-center">
                <a
                  href="/nird/video2normal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Vidéo explicative
                </a>
              </div>

            )}

            


          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-0 transition-colors"
              title={isEnabled ? "Activer la vidéo normale" : "Activer le spectre vidéo"}
            >
              <span className="mr-2"></span>
              <div className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${isEnabled ? 'bg-blue-600' : 'bg-gray-400'}`}>
                <span className={`absolute top-0 w-6 h-6 transition-transform duration-200 ease-in-out transform bg-white rounded-full shadow-md ${isEnabled ? 'translate-x-4 left-0' : 'left-0'}`}></span>
              </div>
            </button>
          </div>
          </section>

          
            <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">La solution : Linux</h2>
              <p>
                Linux est un système d'exploitation open source qui offre une alternative durable et responsable aux systèmes propriétaires. En adoptant Linux, les établissements éducatifs peuvent prolonger la durée de vie de leurs équipements informatiques, réduire les coûts liés aux licences logicielles, et favoriser un environnement numérique plus inclusif et respectueux de la vie privée.
              </p>
              <p>
                Le collectif NIRD propose sa propre distribution Linux, <a href="https://nird.forge.apps.education.fr/linux/" className="text-blue-600 underline">Linux NIRD</a> , spécialement conçue pour répondre aux besoins des écoles et des établissements d'enseignement.
              </p>

          </section>

          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">Ressources et contact</h2>
            <p>
              Pour en savoir plus sur la démarche NIRD, accéder aux ressources pédagogiques et techniques, ou rejoindre le réseau, consultez le site officiel : <a href="https://nird.forge.apps.education.fr/" className="text-blue-600 underline">nird.education</a>.
            </p>
          </section>

        </div>
      </main>
    </>

  );
}