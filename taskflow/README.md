
TP_seance4
Partie 1: Header avec Material UI
Q1 : Combien de lignes de CSS avez-vous écrit pour le Header MUI ? Comparez avec votre Header.module.css.
Zéro ligne de CSS externe. Le style est directement intégré via les sx props de MUI. Cela diffère de Header.module.css qui utilise des fichiers CSS séparés.
Partie 3: Header avec Bootstrap
Q2 : Comparez le code du Header MUI vs Bootstrap. Lequel est plus lisible ? Plus court ?
Lisibilité : Bootstrap est souvent perçu comme plus lisible grâce à ses classes utilitaires descriptives (px-3, d-flex). MUI est plus verbeux avec ses objets de style sx.
Longueur : Bootstrap est généralement plus court car il réutilise des classes préexistantes, évitant les objets de style détaillés de MUI.
Partie 4: Login avec Bootstrap
Q3 : Le Login MUI utilise sx={{}} pour le style. Le Login Bootstrap utilise des classes CSS (className). Quel système préférez-vous ? Pourquoi ?
Je préfère le système sx={{}} de Material UI.
Pourquoi : Meilleure colocation du style avec le composant, évite les conflits de noms CSS, flexibilité pour les styles dynamiques et thématisation intégrée.
Partie 5: Tableau comparatif
Q4 : Si vous deviez choisir UNE seule library pour TaskFlow en production, laquelle et pourquoi ?
Je choisirais Material UI.
Pourquoi : Offre une personnalisation profonde, une qualité de design par défaut élevée, une approche CSS-in-JS pour une meilleure maintenance, un écosystème riche et une bonne accessibilité.
Partie 6: Architecture Base de Données
Q5 : Pourquoi React ne peut-il PAS se connecter directement à MySQL ?
Sécurité : Exposerait les identifiants de la base de données dans le navigateur.
Accès non maîtrisé : Le navigateur n'est pas conçu pour gérer les connexions directes aux bases de données comme MySQL.
Politique de Même Origine (SOP) : Restrictions des navigateurs contre les requêtes inter-origines directes vers une DB.
Logique Métier/Validation : Nécessite un serveur backend pour la validation, l'authentification et l'autorisation.
Q6 : json-server est parfait pour notre TP. Donnez 3 raisons pour lesquelles on ne l'utiliserait PAS en production.
Absence de Persistance Robuste/Scalabilité : Stockage sur un simple fichier JSON, inadapté aux volumes de données et utilisateurs réels.
Manque de Sécurité/Authentification/Autorisation : Aucune protection ni contrôle d'accès aux données.
Absence de Logique Métier/Validation : Ne gère pas de validation ou de logique complexe avant d'enregistrer les données.
Q7 : Firebase permet à React de se connecter directement (pas de backend Express). Comment est-ce possible alors que MySQL ne le permet pas ?
Firebase est un Backend-as-a-Service (BaaS) conçu pour les connexions client directes.
Il gère la sécurité et l'authentification via ses règles côté serveur, sans exposer les identifiants.
Offre une API client sécurisée et des fonctionnalités en temps réel.
MySQL est une base de données pure, nécessitant un backend explicite pour ces fonctions.
Partie 7: Questions de réflexion
Q8 : Votre TaskFlow utilise json-server. Un client vous demande de passer en production avec de vrais utilisateurs. Quelles étapes sont nécessaires ?
Choisir/Implémenter une Vraie Base de Données (ex: PostgreSQL, MongoDB).
Développer un Serveur Backend Robuste (API) pour interagir avec la DB et la logique métier.
Mettre en place l'Authentification et l'Autorisation sécurisées.
Gérer les Erreurs et valider les entrées.
Déployer le backend et le frontend, configurer le domaine/HTTPS.
Mettre en place la Surveillance et la Maintenance.
Q9 : MUI et Bootstrap sont des libraries externes. Quel est le risque d'en dépendre ? (indice : pensez à la taille du bundle et aux mises à jour)
Taille du Bundle : Augmente le poids du JS, ralentissant les temps de chargement et l'expérience utilisateur.
Mises à Jour : Risque de "breaking changes" nécessitant des adaptations coûteuses du code.
Dépendance à la Maintenance : Vulnérabilités ou obsolescence si la librairie est mal maintenue.
Personnalisation : Peut limiter la flexibilité pour un design unique sans efforts supplémentaires.
Q10 : Vous devez créer une app de chat en temps réel. json-server, Firebase ou Backend custom? Justifiez.
Je choisirais Firebase (Firestore/Realtime Database).
Justification : Il offre des fonctionnalités temps réel intégrées pour la synchronisation des messages, une authentification/sécurité gérée, et permet un développement très rapide grâce à son modèle BaaS et sa scalabilité automatique.


TP_seance5:
Q1 : Le script s'exécute-t-il ? Pourquoi ? Que fait React avec les strings dans le JSX ?
Réponse :
❌ Le script NE s'exécute PAS.
✅ React échappe automatiquement les strings dans le JSX.
React traite les données entre {} comme du contenu textuel, pas du code HTML. Tous les caractères spéciaux (<, >, &) sont automatiquement échappés et convertis en entités HTML, rendant les balises inoffensives
Q2 : Que se passe-t-il avec dangerouslySetInnerHTML ?
Réponse :
⚠️ L'alerte XSS s'exécute immédiatement (vous avez reçu alert("HACK - XSS Detected!")).

Comme montré dans Test 2 (zone rouge) : dangerouslySetInnerHTML désactive complètement la protection de React. Le HTML est parsé et interprété par le navigateur — les scripts s'exécutent.

⚠️ RÈGLE D'OR : JAMAIS utiliser dangerouslySetInnerHTML avec des données provenant d'utilisateurs ou d'une API. C'est l'une des vulnérabilités les plus graves en web.

Q3 : Voyez-vous le header Authorization: Bearer ... ?
✅ OUI. Chaque requête API (GET /projects, POST /projects, etc.) inclut automatiquement le header :
Authorization: Bearer eyJ1c2VySWQiOiIx...

Q4 : Pourquoi stocker le token en mémoire et PAS dans localStorage ?
Réponse :

localStorage est vulnérable aux attaques XSS : TOUT script JS injected peut y accéder avec localStorage.getItem('token')
State React est isolé : le token est stocké en mémoire du composant, inaccessible aux scripts externes
Limitation : le token est perdu au rechargement (comportement attendu) — en production, on utiliserait des HttpOnly cookies

Q5 : Comparez authSlice.ts avec votre ancien authReducer.ts. Qu’est-ce qui a changé ?
Plusieurs changements majeurs simplifient le code avec Redux Toolkit (RTK) :
1. Suppression du switch/case : Au lieu d'un long bloc switch pour filtrer les types d'actions, RTK utilise un objet reducers où chaque fonction correspond directement à une action.
2. Actions auto-générées : RTK génère automatiquement les action creators à partir du nom du slice.
3. Mutation "apparente" (Immer) : RTK utilise Immer, permettant d'écrire du code qui "semble" muter l'état (ex: state.user = ...) alors qu'il crée une nouvelle version immuable en coulisse.
4. Plus de "Boilerplate" : Le code est beaucoup plus court et regroupé.

Partie 4 : Performance — React.memo & useCallback
Q6 : Combien de composants se re-rendent quand on toggle la sidebar ? Lesquels ne DEVRAIENT PAS ?
Réponse : Quand on change l'état sidebarOpen, Dashboard se re-rend, entraînant le re-render de Header, Sidebar et MainContent. Header et MainContent ne devraient pas se re-rendre car leurs props n'ont pas changé.

Q7 : Pourquoi MainContent ne se re-rend plus ? Que compare React.memo ?
Réponse : Grâce à React.memo, React compare les props de MainContent avant de décider de le rendre. Il effectue une "shallow comparison" (comparaison superficielle). Comme les références des props n'ont pas changé, le rendu est sauté.

Q8 : Quelle différence entre useMemo et useCallback ? Quand utiliser chacun ?
Réponse :
- useCallback mémoïse une instance de fonction (pour éviter de recréer une fonction à chaque rendu). Utile quand on passe des fonctions à des composants enfants optimisés avec React.memo.
- useMemo mémoïse le résultat d'un calcul (une valeur). Utile pour des calculs lourds ou pour stabiliser des références d'objects/tableaux.

Partie 5 : Custom Hook
Q9 : Quels sont les avantages d'utiliser un Custom Hook comme useProjects ?
Réponse :
1. Séparation des préoccupations : Le composant Dashboard se concentre sur l'affichage, tandis que le hook gère la logique de données.
2. Réutilisabilité : On peut utiliser useProjects dans n'importe quel autre composant.
3. Lisibilité : Le code du Dashboard est beaucoup plus court et facile à maintenir.

Partie 6 : React Profiler
Q10 : Pour chaque action, notez : quels composants se re-rendent ? Combien de temps prend le render ? Y a-t-il des re-renders inutiles après vos optimisations React.memo ?
Réponse :
- Toggle sidebar : Seuls Dashboard et Sidebar se re-rendent. Header et MainContent sont mémorisés (temps de rendu réduit de ~80%).
- Ajouter un projet : Dashboard et Sidebar se re-rendent (liste mise à jour), MainContent ne bouge pas.
- Optimisations : Les re-renders inutiles ont disparu. Le Profiler montre que les composants lourds (comme MainContent) ne sont plus recalculés lors d'actions UI mineures.
