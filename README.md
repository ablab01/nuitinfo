<p align="center">
  <img src="./app/favicon.ico" alt="Logo du projet" width="160" />
</p>

<h1 align="center">NOSLEEP4US — Projet Next.js Nuit de l'Info 2025 🎮</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn/ui-111827?style=for-the-badge" />
</p>

---

## 📦 Présentation

Ce projet est un site web développé avec **Next.js (App Router)**, combinant une esthétique  
inspirée du sujet proposé combinant plusieurs packages de NextJS.

Technologies principales :
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- CSS personnalisé
- Composants UI custom (`RetroGrid`, `Navbar`, `confettis`...)

---

## 🧑‍💻 Installation & Utilisation

---

## 1️⃣ Télécharger le projet

### Option A — Cloner avec Git 

```bash
git clone <URL_DU_REPO>
cd <nom-du-projet>
```

## 2️⃣ Installer les dépendances

Une fois dans le dossier du projet, installe les packages :

```bash
npm install
# ou
yarn
# ou
pnpm install
# ou
bun install
```

---

## 3️⃣ Lancer le projet

Démarre le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ensuite, ouvre ton navigateur :

👉 http://localhost:3000

Le site se recharge automatiquement quand tu modifies les fichiers.

---

## 🛠️ Composants UI (shadcn/ui)

Le projet utilise **shadcn/ui** pour les composants.

Pour en ajouter de nouveaux :

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dialog
```

Les composants sont ajoutés automatiquement dans :

```
components/ui/
```

---

## 🎨 Personnalisation des couleurs

Les couleurs sont définies dans :

```
app/globals.css
```

Avec : 

```css
:root {
  --green: #1d6517;
  --darkgreen: #054204;
  --softgreen: #79b425;
  --lightgreen: #c0de7b;
  --blue: #55a6c3;
}
```

Modifier ces valeurs changera toute l’identité visuelle.

---

## 🌿 Thème & animations

Fonctionnalités visuelles :

- Background animé en dégradé
- Grille rétro dynamique (`RetroGrid`)
- Style arcade
- Boutons personnalisés
- Formulaire rétro
- Dark mode supporté

---
## 🎮 Easter egg

Un easter egg est intégré dans le projet :

👉 **Easter egg :**  
En cliquant sur le **logo en haut du site**, vous êtes redirigé vers une page spéciale contenant un flux caméra et audio.

Ce contenu a été réalisé à partir d’un défi de projet effectué lors du module d’informatique, explorant l’utilisation des flux multimédia (vidéo et audio) en temps réel.

---
## 🧪 Dépannage

### Le projet ne démarre pas ?
- Vérifie Node.js ≥ 18
- Supprime les dépendances :
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm run dev
  ```

---

## 💚 Crédits

Équipe NOSLEEP4US :
BEKKALI Abla - PAGNON Alexis - PHILIPPE Corentin - SANCHEZ Adam

---

## 📜 Licence

Projet personnel / interne  
Utilisation libre à but non commercial.
