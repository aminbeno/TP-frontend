Q1 : Comparez la structure de votre projet React (Vite) avec Next.js. Quelles différences ?
Réponse attendue : La structure Next.js est centrée sur le dossier app/ pour le routage par fichiers (ex: app/page.tsx pour l'accueil, app/login/page.tsx pour /login), incluant des fichiers layout.tsx pour les layouts globaux. React (Vite) avec react-router-dom a une structure plus libre et définit les routes dans le code (App.tsx). Next.js n'a pas de index.html ou main.tsx visibles au même titre car il gère son propre rendu côté serveur.

Q2 : Combien de fichiers avez-vous créé pour cette route ? Comparez avec React Router où il faut : le composant + la Route dans App.tsx + l'import.
Réponse attendue : Un seul fichier (app/login/page.tsx). En React Router, il faudrait créer le composant (LoginPage.tsx), l'importer dans App.tsx et ajouter une <Route> explicite. Next.js gère le routage par la structure des dossiers.
Q3 : En React, on utilisait useParams() pour récupérer l’id. En Next.js, comment est-il récupéré ? Quelle différence fondamentale ?
Réponse attendue : En Next.js, l'id est récupéré via la prop params passée par le SERVEUR au composant ProjectPage. La différence fondamentale est que useParams() est un hook côté CLIENT (CSR) tandis que la prop params en Next.js est fournie par le SERVEUR (SSR ou SSG), avant que le composant ne soit hydraté côté client.


Q5 : En React SPA, combien de lignes fallait-il pour charger les projets ? (useState + useEffect + fetch + .then + setProjects + loading). Combien ici ?
Réponse attendue : En React SPA, il fallait significativement plus de lignes (typiquement 10-15 lignes) pour gérer l'état de chargement, l'effet secondaire et la mise à jour des données. Ici, en Next.js Server Component, c'est beaucoup plus concis : 3 lignes (fetch, json, return).
Q6 : Ouvrez F12 > Network. Voyez-vous la requête GET /projects ? Pourquoi ?
Réponse attendue : Non, vous ne devriez PAS voir la requête /projects dans l'onglet Network du navigateur. La raison est que cette requête fetch est faite par le SERVEUR Next.js au moment de la construction de la page HTML. Le client reçoit directement le HTML déjà rempli avec les données des projets. C'est le principe du Server-Side Rendering (SSR).

Q7 : Pourquoi faut-il 'use client' ici et pas dans la page Dashboard ?
Réponse attendue : La page Dashboard est un Server Component car elle n'a pas d'interactivité (juste de l'affichage de données). La page Login est un Client Component parce qu'elle utilise des hooks React (useState, useRouter), gère des événements (onChange, onSubmit) et interagit avec le navigateur. 'use client' est obligatoire pour indiquer que ce code doit être exécuté côté client.
Q8 : En React, on utilisait useNavigate() de react-router-dom. En Next.js, quel est l'équivalent ?
Réponse attendue : En Next.js, l'équivalent de useNavigate() est le hook useRouter() (de next/navigation), utilisé avec router.push('/destination').
