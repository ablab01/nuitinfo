"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import "./contact.css";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="contactContainer">
      <div className="navbarWrapper">
        <Navbar />
      </div>

      <div className="retroGridBackground">
        <RetroGrid />
      </div>

      <main className="contactContent">
        <div className="contactHeader">
          <h1 className="contactTitle">CONTACT</h1>
          
        </div>

        <div className="contactLayout">

          <div className="contactLogoBox">
            <Image
              src="/logo_retro.png"
              alt="Logo du studio"
              width={315}
              height={315}
              className="contactLogo"
            />
          </div>

          <div className="contactInfo">
            <div className="contactInfoItem">
              <span className="contactInfoLabel">Email</span>
              <a href="mailto:nosleep4us@nuitinfo.com" className="contactInfoValue">
                contact@tonsite.com
              </a>
            </div>

            <div className="contactInfoItem">
              <span className="contactInfoLabel">Téléphone</span>
              <a href="tel:+33123456789" className="contactInfoValue">
                +33 1 23 45 67 89
              </a>
            </div>

            <div className="contactInfoItem">
              <span className="contactInfoLabel">Équipe</span>
              <ul className="teamList">
                <li>BEKKALI Abla - PAGNON Alexis - PHILIPPE Corentin - SANCHEZ Adam</li>
              </ul>
            </div>

            <Button
              type="button"
              className="retroButton"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "FERMER LE FORMULAIRE" : "ECRIRE UN MESSAGE"}
            </Button>
          </div>
        </div>

        {showForm && (
          <form className="retroForm">
            <h2 className="retroFormTitle">Formulaire secret 💾</h2>

            <div className="retroFormRow">
              <label className="retroLabel">
                Nom
                <input
                  type="text"
                  className="retroInput"
                  placeholder="Ton pseudo / ton nom"
                />
              </label>

              <label className="retroLabel">
                Email
                <input
                  type="email"
                  className="retroInput"
                  placeholder="toi@exemple.com"
                />
              </label>
            </div>

            <label className="retroLabel">
              Message
              <textarea
                className="retroTextarea"
                rows={4}
                placeholder="Balance toutes tes idées ici 🔥"
              />
            </label>

            <div className="retroFormActions">
              <Button type="submit" className="retroButton small">
                ENVOYER
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
