import Image from "next/image";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Tableau de bord</h1>
      </main>
    </>
  );
}