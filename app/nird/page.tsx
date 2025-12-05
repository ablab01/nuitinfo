"use client";

import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function Home() {
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
  const degreesPerLetter = 360 / 26; // ~13.85°
  const numberOfLights = 24; // Nombre de points lumineux autour de la roue

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedLetter(null);
    
    // Jouer le son casino au début
    const casinoAudio = new Audio('/casino.mp3');
    casinoAudio.play().catch(err => console.log('Erreur audio casino:', err));
    
    const randomDegrees = Math.floor(Math.random() * (300 - 60 + 1)) + 60;
    const newRotation = rotation + randomDegrees + 360 * 3; // Ajoute 3 tours complets pour l'effet
    
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      
      // Calculer la lettre finale
      const normalizedAngle = newRotation % 360 + degreesPerLetter / 2;

      // Compenser pour que la flèche soit au centre de la section
      const letterIndex = Math.floor(normalizedAngle / degreesPerLetter) % 26;
      console.log('Angle: ' + normalizedAngle);
      console.log('LetterIndex: ' + letterIndex);

      
      setSelectedLetter(letters[letterIndex]);
      
      // Jouer le son whoosh
      const audio = new Audio('/whoosh.mp3');
      audio.play().catch(err => console.log('Erreur audio:', err));
      
      // Déclencher les confettis au centre de la roue
      if (wheelRef.current) {
        const rect = wheelRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y }
        });
      }
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
        <h1 className="text-4xl font-bold text-[var(--lightgreen)]">NIRD</h1>
        
        <div ref={wheelRef} className="relative inline-block">
          {/* Points lumineux clignotants */}
          {mounted && Array.from({ length: numberOfLights }).map((_, index) => {
            const angle = (360 / numberOfLights) * index;
            const radius = 200; // Distance du centre
            const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
            const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
            
            return (
              <div
                key={index}
                className="absolute w-3 h-3 rounded-full bg-yellow-400 pointer-events-none animate-blink"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  animationDelay: `${(index * 1000) / numberOfLights}ms`,
                }}
              />
            );
          })}
          
          <Image 
            src="/gambling.png" 
            alt="Roue de la fortune" 
            width={400} 
            height={400}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
            }}
          />
          <Image 
            src="/pointer.png" 
            alt="Pointeur" 
            width={40} 
            height={40}
            className="absolute top-[3%] left-1/2 -translate-x-1/2 pointer-events-none z-80"
            style={{ transform: 'rotate(180deg)' }}
          />
        </div>

        <Button
          onClick={spinWheel}
          disabled={isSpinning}
          size="lg"
        >
          {isSpinning ? "La roue tourne..." : "Choisir votre lettre"}
        </Button>

        {selectedLetter && (
          <div className="text-2xl font-bold text-[var(--lightgreen)] animate-bounce">
            Lettre sélectionnée : {selectedLetter}
          </div>
        )}
      </main>
    </>
  );
}