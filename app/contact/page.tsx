"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import "./contact.css";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // États pour la roue
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 26 lettres dans le sens anti-horaire depuis le haut
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const degreesPerLetter = 360 / 26;
  const numberOfLights = 24;

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedLetter(null);
    
    const casinoAudio = new Audio('/casino.mp3');
    casinoAudio.play().catch(err => console.log('Erreur audio casino:', err));
    
    const randomDegrees = Math.floor(Math.random() * (300 - 60 + 1)) + 60;
    const newRotation = rotation + randomDegrees + 360 * 3;
    
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      
      const normalizedAngle = newRotation % 360 + degreesPerLetter / 2;
      const letterIndex = Math.floor(normalizedAngle / degreesPerLetter) % 26;
      
      const finalLetter = letters[letterIndex];
      setSelectedLetter(finalLetter);
      
      // Ajouter la lettre au message (majuscule si c'est la première lettre)
      setMessage(prev => {
        const trimmedPrev = prev.trim();
        const letterToAdd = trimmedPrev.length === 0 ? finalLetter : finalLetter.toLowerCase();
        return prev + letterToAdd;
      });
      
      if (mounted && wheelRef.current) {
        const rect = wheelRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y }
        });
      }
      
      const audio = new Audio('/whoosh.mp3');
      audio.play().catch(err => console.log('Erreur audio:', err));
    }, 3000);
  };

  return (
    <div className="contactContainer">
      <style jsx>{`
        @keyframes blinkLight {
          0%, 100% {
            opacity: 0.3;
            box-shadow: 0 0 5px 1px rgba(250, 204, 21, 0.5);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px 5px rgba(250, 204, 21, 1);
          }
        }
        .light-point {
          animation: blinkLight 1s ease-in-out infinite;
        }
        @keyframes glowBorder {
          0%, 100% {
            border-color: rgba(250, 204, 21, 0.5);
            box-shadow: 0 0 10px rgba(250, 204, 21, 0.3);
          }
          50% {
            border-color: rgba(250, 204, 21, 1);
            box-shadow: 0 0 10px rgba(250, 204, 21, 0.8);
          }
        }
        .glow-textarea {
          animation: glowBorder 2s ease-in-out infinite;
          background-color: rgba(250, 204, 21, 0.1) !important;
          border: 2px solid rgba(250, 204, 21, 0.5) !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
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
              alt="Logo Nuit Info Retro"
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
              <span className="contactInfoLabel">Telephone</span>
              <a href="tel:+33123456789" className="contactInfoValue">
                +33 1 23 45 67 89
              </a>
            </div>

            <div className="contactInfoItem">
              <span className="contactInfoLabel">Equipe</span>
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
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <form className="retroForm" style={{ flex: '1', maxWidth: '600px' }} onSubmit={async (e) => {
              e.preventDefault();
              
              try {
                // Envoyer les données à l'API
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name, email, message }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                  // Réinitialiser le formulaire
                  setName("");
                  setEmail("");
                  setMessage("");
                  setShowSuccessModal(true);
                  setTimeout(() => setShowSuccessModal(false), 3000);
                } else {
                  alert("Erreur lors de l'enregistrement du message");
                }
              } catch (error) {
                console.error('Erreur:', error);
                alert("Erreur lors de l'enregistrement du message");
              }
            }}>
              <h2 className="retroFormTitle">Formulaire secret 💾</h2>

              <div className="retroFormRow">
                <label className="retroLabel">
                  Nom
                  <input
                    type="text"
                    className="retroInput"
                    placeholder="Ton nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label className="retroLabel">
                  Email
                  <input
                    type="email"
                    className="retroInput"
                    placeholder="toi@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <label className="retroLabel">
                Message
                <textarea
                  className="retroTextarea glow-textarea"
                  rows={8}
                  placeholder="Balance toutes tes idées ici en utilisant la roue (tu peux mettre des espaces ou effacer des caractères)🔥"
                  value={message}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const lastChar = newValue[newValue.length - 1];
                    
                    // Autoriser la suppression (newValue plus court que message)
                    if (newValue.length < message.length) {
                      setMessage(newValue);
                    }
                    // Autoriser uniquement les espaces
                    else if (lastChar === ' ') {
                      setMessage(newValue);
                    }
                  }}
                  onKeyDown={(e) => {
                    // Bloquer toutes les touches sauf Backspace, Delete et Espace
                    if (e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== ' ') {
                      e.preventDefault();
                    }
                  }}
                />
              </label>

              <div className="retroFormActions">
                <Button type="submit" className="retroButton small">
                  ENVOYER
                </Button>
              </div>
            </form>

            {/* Section de la roue */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', paddingTop: '3rem' }}>
              <div
                ref={wheelRef}
                style={{
                  position: "relative",
                  width: "370px",
                  height: "370px",
                }}
              >
                {/* Points lumineux clignotants */}
                {Array.from({ length: numberOfLights }).map((_, i) => {
                  const angle = (i * 360) / numberOfLights;
                  const radius = 190;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={i}
                      className="pointer-events-none light-point"
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgb(250, 204, 21)",
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  );
                })}

                {/* Image de la roue */}
                <Image
                  src="/gambling.png"
                  alt="Wheel"
                  width={400}
                  height={400}
                  style={{
                    transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
                    transform: `rotate(${rotation}deg)`,
                  }}
                  priority
                />

                {/* Pointeur au-dessus */}
                <Image
                  src="/pointer.png"
                  alt="Pointer"
                  width={40}
                  height={40}
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(180deg)",
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                />
              </div>

              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className="bg-[var(--softgreen)] hover:bg-[var(--green)] text-[var(--darkgreen)] font-bold py-3 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{ 
                  fontFamily: "'Press Start 2P', Arial, sans-serif",
                  fontSize: '0.7rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                {isSpinning ? "EN COURS..." : "LANCER LA ROUE"}
              </Button>

              {selectedLetter && !isSpinning && (
                <div 
                  className="animate-bounce"
                  style={{
                    fontFamily: "'Press Start 2P', Arial, sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#d6ff95',
                    letterSpacing: '2px',
                    textShadow: '2px 2px 0 var(--green), 4px 4px 0 var(--darkgreen), 0 0 10px rgba(192, 222, 123, 0.6)'
                  }}
                >
                  Lettre tirée : {selectedLetter}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal de succès rétro */}
        {showSuccessModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in-out'
          }}>
            <div style={{
              backgroundColor: 'var(--darkgreen)',
              border: '4px solid rgb(250, 204, 21)',
              borderRadius: '0',
              padding: '3rem',
              maxWidth: '500px',
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.8), inset 0 0 20px rgba(250, 204, 21, 0.2)',
              animation: 'scaleIn 0.3s ease-out',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                animation: 'bounce 0.6s ease-in-out'
              }}>💾</div>
              <h2 style={{
                color: 'rgb(250, 204, 21)',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                textShadow: '0 0 10px rgba(250, 204, 21, 0.5)',
                fontFamily: 'monospace'
              }}>
                ENREGISTRÉ !
              </h2>
              <p style={{
                color: 'var(--lightgreen)',
                fontSize: '1.1rem',
                fontFamily: 'monospace'
              }}>
                Votre message a été sauvegardé avec succès 🎉
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
