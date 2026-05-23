
TP-Next_seance1
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
Q9 : Que voyez-vous dans le code source HTML ? Y a-t-il les noms des projets ?
Réponse attendue : Vous verrez principalement une balise <div id="root"></div> vide, suivie par l'inclusion de scripts JavaScript. Les noms des projets ne seront PAS présents directement dans le HTML initial. Ils sont injectés par JavaScript après le chargement et l'exécution du client (CSR).
Q10 : Que voyez-vous cette fois ? Les noms des projets sont-ils dans le HTML ?
Réponse attendue : Vous verrez le HTML complet de la page, incluant les noms des projets et toute la structure de la page. C'est la preuve du Server-Side Rendering (SSR) : le serveur pré-rend le HTML avec les données, ce qui est bon pour le SEO (Google peut lire le contenu) et pour l'expérience utilisateur (la page s'affiche instantanément).
Q11 : Le Header dans layout.tsx ne se re-monte pas quand on navigue. En React Router, comment faisait-on pour obtenir ce comportement ?
Réponse attendue : En React Router, il fallait souvent placer le Header en dehors des <Routes> (ou l'inclure dans un composant de layout parent qui enveloppe les Routes) pour qu'il ne soit pas démonté/remonté à chaque changement de route. Les layout de Next.js fournissent nativement ce comportement.
Q12 : En Next.js, si je veux un layout spécifique au Dashboard (avec Sidebar), où est-ce que je crée le fichier ?
Réponse attendue : Vous créeriez un fichier layout.tsx à l'intérieur du dossier app/dashboard/. Ce layout s'appliquerait alors à toutes les pages de ce segment d'URL (/dashboard et ses sous-routes).
Q13 : Le Dashboard est un Server Component. Peut-il utiliser onClick ? Pourquoi ?
Réponse attendue : Non, un Server Component ne peut PAS utiliser directement des gestionnaires d'événements interactifs comme onClick. Les Server Components sont rendus sur le serveur et ne sont pas hydratés avec des fonctionnalités JavaScript côté client par défaut. Ils ne génèrent que du HTML statique ou pré-rendu.
Q14 : Si je veux ajouter un bouton « + Nouveau projet » sur le Dashboard, dois-je transformer TOUTE la page en Client Component ?
Réponse attendue : Non. Next.js permet la composition de Client et Server Components. Vous pouvez créer un petit composant Client Component (par exemple, un AddProjectButton.tsx avec 'use client') qui contient le bouton et sa logique onClick/useState, puis importer et utiliser ce composant dans votre Dashboard (qui reste un Server Component).
Q15 : json-server tourne sur :4000. Le fetch dans le Server Component se fait depuis le SERVEUR Next.js. Le navigateur ne voit jamais l'URL :4000. Quel avantage de sécurité cela apporte ?
Réponse attendue : L'avantage principal est la sécurité des clés API et des informations sensibles. Si la base de données réelle (pas json-server) nécessitait une clé API ou des identifiants, ils resteraient toujours sur le serveur Next.js. Le navigateur client ne les verrait jamais, ce qui empêcherait leur interception ou leur utilisation malveillante par un utilisateur final. Cela protège également la base de données contre les requêtes directes non autorisées depuis le client.

TP-Next_seance2:
Q1 : En React SPA, que fallait-il faire après un POST pour voir le nouveau projet ? (indice : setProjects). Ici ?
Réponse attendue : En React SPA, après un POST, il fallait généralement appeler setProjects avec les nouvelles données (ou refetcher toutes les données) pour que l'état local soit mis à jour et déclenche un re-rendu. Ici, en Next.js, il n'y a rien à faire côté client, car revalidatePath('/dashboard') dans la Server Action demande au serveur de reconstruire la page dashboard et de la servir fraîchement au navigateur.
Q3 : Le bouton supprimer est un <form> avec un <input type="hidden">. Pourquoi pas un onClick ?
Réponse attendue : Le Dashboard est un Server Component. Les Server Components ne peuvent pas gérer directement les événements interactifs côté client comme onClick. L'utilisation d'un <form> avec une action vers une Server Action est la façon native et recommandée en Next.js d'envoyer des données au serveur sans JavaScript côté client explicite (ou avec un minimum de JS géré par React pour l'envoi de formulaire).
Q4 : Testez http://localhost:3000/api/projects dans le navigateur. Que voyez-vous ?
Réponse attendue : Vous devriez voir la liste de vos projets en JSON, servie par votre propre API Route intégrée.
Q5 : Quelle est la différence entre une API Route et une Server Action ?
Réponse attendue :
API Route : Un endpoint HTTP (GET, POST, PUT, DELETE) autonome. Il est utilisé pour construire une API RESTful classique. Il peut être appelé par n'importe quel client HTTP (frontend web, application mobile, autre service backend) et est idéal pour les intégrations externes.
Server Action : Une fonction JavaScript qui s'exécute sur le serveur, généralement déclenchée directement par un événement de formulaire (<form action={myServerAction}>) ou un appel depuis un composant client (avec useTransition). Elle est plus étroitement intégrée au rendu de React et est conçue pour l'interaction entre le frontend et le backend au sein d'une application Next.js, souvent pour des mutations de données sans rechargement complet de la page.
Q6 : Comparez ce Login avec celui de React SPA. Combien de useState en moins ?
Réponse attendue : Dans cette version Next.js, on utilise principalement useActionState qui gère l'état d'envoi (pending) et l'état de la réponse (state, contenant l'erreur ici). C'est potentiellement deux useState en moins (pour loading et error) par rapport à une implémentation React SPA classique où il fallait gérer explicitement loading, error, email, password avec useState.
Q7 : Après le login, ouvrez F12 > Application > Cookies. Voyez-vous le cookie 'session' ? Pouvez-vous le lire avec document.cookie dans la console ?
Réponse attendue : Oui, vous devriez voir le cookie session dans l'onglet "Application" > "Cookies" de F12. Cependant, si vous essayez de le lire dans la console JavaScript avec document.cookie, vous ne devriez PAS le voir. Ceci confirme que le cookie est httpOnly et n'est pas accessible via JavaScript côté client.