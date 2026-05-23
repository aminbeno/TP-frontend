
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
Q8: En React SPA, ProtectedRoute affichait brièvement le Dashboard avant de rediriger. Ici, que se passe-t-il ?
Réponse:
Ici, la page protégée ne se charge MÊME PAS. Le middleware intercepte la requête HTTP avant que le serveur ne commence à générer le HTML de la page. Si l'utilisateur n'est pas authentifié, la redirection vers la page de login est effectuée immédiatement, sans qu'aucun contenu de la page protégée ne soit jamais envoyé au navigateur. Cela élimine le "flash" de contenu potentiellement sensible qui pouvait survenir dans un React SPA.
Q9: Le middleware.ts est à la racine, pas dans app/. Pourquoi ?
Réponse:
Le fichier middleware.ts doit être placé à la racine du projet (au même niveau que le répertoire app/) car il s'exécute à un niveau très bas dans le cycle de vie de la requête de Next.js. Il intercepte les requêtes entrantes avant qu'elles n'atteignent le gestionnaire de route (app/) et puisse même décider si une route doit être rendue ou non. Le placer à la racine lui donne la capacité d'agir globalement sur toutes les requêtes avant le traitement de l'application.

Q10: Le layout est un Server Component. Il lit le cookie DIRECTEMENT avec cookies(). En React SPA, comment faisait-on ? (indice : useAuth(), Context, state)
Réponse:
Dans un React SPA, pour lire l'état d'authentification dans un composant de layout :
Contexte d'authentification : Un AuthContext serait créé pour stocker l'état de l'utilisateur.
Hook useAuth()/AuthService : Un hook personnalisé (useAuth()) ou un service lirait le token JWT (généralement depuis localStorage) ou des cookies (via document.cookie si non httpOnly) après le montage initial de l'application.
useState et useEffect : L'état de l'utilisateur serait géré par useState au sein du fournisseur de contexte, et useEffect serait utilisé pour initialiser cet état en lisant le stockage persistant. Les composants consommateurs utiliseraient useContext(AuthContext) pour accéder à l'état de l'utilisateur.
En Next.js, le Server Component accède directement aux cookies de la requête HTTP entrante, simplifiant l'intégration de l'authentification côté serveur.

Q11: Server Actions vs API Routes — lequel utiliseriez-vous pour un formulaire de création de projet ? Pour une app mobile qui consomme la même API ?
Réponse:
Pour un formulaire de création de projet dans l'application Next.js : Une Server Action. Elle est optimisée pour l'interaction avec l'interface utilisateur de Next.js, simplifie la gestion des formulaires et permet une mise à jour efficace du cache et du rendu via revalidatePath.
Pour une application mobile qui consomme la même API : Une API Route. Les applications mobiles sont des clients HTTP externes qui nécessitent des endpoints RESTful standardisés (GET, POST, PUT, DELETE) retournant des données JSON pour interagir avec le backend.
Q12: En React SPA, l'auth était : Context + useReducer + JWT mémoire + ProtectedRoute. En Next.js c'est : cookies + middleware. Quel avantage de sécurité ?
Réponse:
L'approche Next.js avec les cookies httpOnly et le middleware offre un avantage de sécurité significatif, principalement contre les attaques XSS (Cross-Site Scripting) et pour une gestion de session côté serveur plus robuste.
Cookies httpOnly : Empêche l'accès aux cookies de session via JavaScript côté client (document.cookie), ce qui signifie qu'un script XSS injecté ne peut pas voler le cookie de session de l'utilisateur.
Middleware côté serveur : Intercepte les requêtes avant même que la page ne soit rendue. Si l'authentification échoue, aucune partie du contenu protégé n'est jamais envoyée au navigateur, éliminant les "flashs" de contenu sensible que l'on pouvait voir avec les ProtectedRoute côté client.
Q13: Si vous arrêtez json-server, les API Routes fonctionnent-elles toujours ? Pourquoi ?
Réponse:
Oui, si vous avez migré vos API Routes pour lire et écrire directement dans db.json (comme indiqué dans la partie 3), elles fonctionneront toujours.
Pourquoi : Les API Routes de Next.js prennent alors le rôle de votre backend pour cette fonctionnalité. Elles ne délèguent plus la persistance des données à un serveur externe comme json-server mais gèrent elles-mêmes la lecture et l'écriture du fichier db.json directement sur le serveur Next.js.
Q14: Le cookie est HttpOnly. Un script XSS injecté dans la page peut-il le voler?
Réponse:
Non. L'attribut HttpOnly sur un cookie est une mesure de sécurité spécifiquement conçue pour empêcher les scripts côté client (y compris les scripts XSS) d'accéder au cookie. Même si un attaquant réussit à injecter du JavaScript malveillant sur votre page, il ne pourra pas lire, modifier ou voler le cookie HttpOnly via document.cookie ou d'autres API JavaScript.

TP-Next_seance3:
Q1: Run npx prisma studio. Voyez-vous les données dans les tables Project et User?
Réponse:
Oui, après avoir exécuté npx prisma studio, vous devriez voir les données initiales que vous avez insérées via le script seed.ts dans les tables Project et User.
Q2: Comparez ce code avec l'ancien (fs.readFileSync + JSON.parse + push + writeFileSync). Combien de lignes en moins ?
Réponse:
Avec Prisma, le code est significativement plus concis. Pour les opérations GET et POST de base, on réduit d'environ 10-15 lignes de code par opération (sans compter les fonctions utilitaires readDB/writeDB). Prisma gère l'ouverture/fermeture du fichier, la sérialisation/désérialisation JSON, et la logique CRUD, ce qui réduit considérablement le boilerplate.
Q3: Supprimez db.json. L'app fonctionne-t-elle toujours ? Pourquoi ?
Réponse:
Non, si vous supprimez db.json (et que vous n'avez pas re-exécuté npx prisma migrate dev et npx tsx prisma/seed.ts), l'application ne fonctionnera pas correctement.
Pourquoi : Prisma utilise dev.db (par défaut pour SQLite) comme fichier de base de données. Si ce fichier (ou la base de données associée à DATABASE_URL) est supprimé, Prisma ne trouvera plus les données ou la structure de la base de données, ce qui entraînera des erreurs lors des requêtes. Le fichier db.json de la partie précédente n'est plus utilisé une fois Prisma mis en place.
Q4: Pourquoi le Server Component peut appeler prisma.project.findMany() directement mais un Client Component ('use client') ne peut PAS?
Réponse:
Un Server Component s'exécute entièrement sur le serveur et a donc un accès direct aux ressources côté serveur comme la base de données via l'instance Prisma. Il peut exécuter n'importe quel code Node.js.
Un Client Component, marqué 'use client', s'exécute dans le navigateur. Le navigateur n'a pas un accès direct aux fichiers du serveur ni à l'instance Prisma. Tenter d'appeler prisma.project.findMany() dans un Client Component entraînerait une erreur car l'objet prisma ne serait pas défini ou ne pourrait pas se connecter à la base de données depuis le navigateur. Pour qu'un Client Component accède aux données, il doit faire une requête HTTP (par exemple, via fetch) à une API Route ou appeler une Server Action.
Q5: Ouvrez F12 > Network > Font. Combien de requêtes externes voyez-vous pour la police ?
Réponse:
Zéro.
La police (Inter dans cet exemple) est téléchargée par Next.js au moment du build et est ensuite servie localement par le serveur Next.js. Il n'y a pas de requête externe vers Google Fonts lors du chargement de l'application, ce qui améliore les performances et la confidentialité.
Q6: Avec generateStaticParams, les pages /projects/1 et /projects/2 sont générées quand ? Au build ou à chaque requête ?
Réponse:
Les pages /projects/1 et /projects/2 (et toutes les pages listées par generateStaticParams) sont générées au moment du build. C'est le principe de la génération de site statique (SSG) : les pages HTML sont pré-rendues et prêtes à être servies très rapidement.
Q7: Si un nouveau projet est créé après le build, la page /projects/3 existe-t-elle ?
Réponse:
Par défaut, oui, Next.js génère les nouvelles pages à la demande (fallback dynamique). Si un utilisateur demande /projects/3 après le build et que ce projet n'a pas été pré-généré, Next.js tentera de générer cette page à la volée.
Cependant, ces pages générées à la demande ne seront pas aussi rapides que les pages pré-générées au build pour la première requête, car elles nécessitent un rendu serveur (SSR) au moment de la demande. Elles seront ensuite cachées pour les requêtes futures.
Q8: Votre app est déployée ! Quelle est l'URL? Testez le login, la création de projet, la navigation.
Réponse:
L'URL de l'application déployée sur Vercel sera généralement https://<votre-nom-de-projet>.vercel.app.
Après le déploiement, vous pouvez tester le login (admin@taskflow.com / password123), la création de projet et la navigation. Notez que pour une vraie production, SQLite n'est pas recommandé sur Vercel à cause du système de fichiers en lecture seule.
Q9: Remplissez ce tableau :
Caractéristique	React SPA (Vite)	Next.js Full-Stack
Routing	Côté client (React Router DOM), nécessite JS.	Fichier-based (App Router), côté serveur (rendu initial) et client (hydratation).
Data fetching	Côté client (fetch, Axios) après le montage du composant.	Côté serveur (Server Components, API Routes, Server Actions) ou client.
Mutations (CRUD)	Côté client (fetch, Axios) vers un backend externe.	Server Actions (intégrées), API Routes (pour APIs génériques).
Auth	Context API, useState, JWT en mémoire/localStorage, ProtectedRoute côté client.	Cookies httpOnly côté serveur, middleware côté serveur, Server Actions pour login/logout.
Base de données	Requiert un backend séparé (Node.js/Express, Python/Django, etc.).	Peut être intégré (API Routes, Server Actions) avec ORM comme Prisma (accès direct aux Server Components).
Déploiement	Frontend (Vite) sur CDN statique, Backend sur un serveur (Heroku, AWS EC2...).	Monorepo sur Vercel (Next.js gère frontend et backend, Serverless Functions).
SEO	Difficile (nécessite pré-rendu ou services tiers), contenu non indexé par défaut.	Excellent (Server-Side Rendering, Static Site Generation par défaut), contenu indexable.
Performance	Temps de chargement initial potentiellement lent (bundle JS lourd), puis rapide.	Très rapide (SSR/SSG, optimisation d'images, de polices), meilleur score Lighthouse.
Nombre de projets	Typiquement petit à moyen, avec une forte séparation front/back.	De petit à très grand, très polyvalent, gère de multiples stratégies de rendu.
Q10: Si vous deviez créer une startup demain, choisiriez-vous React SPA + Express ou Next.js full-stack? Pourquoi ?
Réponse:
Je choisirais Next.js full-stack.
Pourquoi :
Productivité et Rapidité de Développement : Next.js offre une approche "full-stack" intégrée (routing basé sur les fichiers, Server Components, Server Actions, API Routes) qui réduit considérablement le boilerplate et la complexité par rapport à la gestion de deux projets séparés (React SPA + Express). Cela permet de développer plus rapidement, ce qui est crucial pour une startup.
Performance Out-of-the-Box : Next.js est conçu pour la performance avec SSR, SSG, optimisation automatique des images (next/image), des polices (next/font), et du code. Ces optimisations sont essentielles pour l'expérience utilisateur et le SEO dès le départ.
SEO : Le rendu côté serveur (SSR/SSG) de Next.js assure une excellente indexation par les moteurs de recherche sans effort supplémentaire, ce qui est vital pour la visibilité d'une nouvelle startup.
Expérience Développeur : L'écosystème Next.js est mature, bien documenté et offre une expérience développeur fluide avec des outils comme Vercel pour le déploiement.
Évolutivité : Next.js est très évolutif, capable de gérer des applications de toute taille. L'approche Serverless Functions pour les API Routes et Server Actions est bien adaptée aux architectures modernes.

