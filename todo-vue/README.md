Q1 — Fichier .vue (3 sections) vs .tsx (tout mélangé)
Vue sépare le HTML (<template>), la logique (<script>) et le CSS (<style>) dans un seul fichier mais avec des blocs distincts. C'est plus lisible pour des devs venant du HTML classique. L'inconvénient : trois langages dans un seul fichier peut sembler artificiel.
React met tout dans le JS/TSX : avantage de la puissance de JS pour le template (conditions, boucles en pur JS), mais mélange logique et rendu ce qui peut devenir difficile à lire sur de grands composants.

Q2 — Pourquoi React n'a pas de two-way binding natif ?
React suit le principe du flux de données unidirectionnel (one-way data flow) : la vue est une fonction pure du state. Cela rend le comportement prévisible et facile à déboguer — on sait toujours quelle fonction a modifié le state. Le two-way binding de Vue est une abstraction qui fait le même travail en coulisse (:value + @input), mais cachée. React préfère l'explicite au magique.

Q3 — Vue permet tasks.value.push(), React interdit tasks.push() — pourquoi ?
Vue utilise un Proxy JavaScript pour envelopper les objets réactifs. Quand on fait tasks.value.push(data), le Proxy intercepte cette mutation et notifie le système de réactivité pour mettre à jour le DOM. React n'utilise pas de Proxy : il compare les références (===). Si on mute le tableau sans le remplacer, la référence reste identique, React pense que rien n'a changé et ne re-render pas.

Q4 — useEffect(fn, []) vs onMounted(fn) — lequel est plus lisible ?
onMounted est plus lisible : le nom dit exactement ce qui se passe (exécuté au montage du composant). useEffect est plus générique — il gère le montage, les mises à jour et le démontage selon le tableau de dépendances. React a choisi le tableau de dépendances pour unifier tous les effets de bord dans un seul hook au lieu d'avoir componentDidMount, componentDidUpdate, componentWillUnmount séparés comme en class components.

Q5 — Props fonctions (React) vs événements (Vue) — lequel est plus proche du HTML natif ?
Vue est plus proche du HTML natif. En HTML, les éléments émettent des événements (click, input, change) que le parent écoute avec addEventListener. Vue reproduit ce mécanisme avec emit + @event. React passe des fonctions en props comme n'importe quelle autre donnée, ce qui est plus uniforme en JavaScript mais moins cohérent avec le modèle DOM.

Q6 — En Vue, si on oublie @delete, que se passe-t-il ?
L'événement est silencieusement ignoré. L'enfant appelle emit('delete', id), mais personne ne l'écoute côté parent, donc rien ne se passe. Pas de crash, pas d'erreur console. C'est plus permissif que React mais peut rendre les bugs plus difficiles à détecter.

Q7 — useParams + useNavigate (React) vs useRoute + useRouter (Vue) — vraiment différent ?
Non, la logique est identique. Les deux frameworks séparent la lecture des paramètres de la navigation programmatique en deux hooks/composables distincts. Seuls les noms changent. Le concept sous-jacent est le même : accéder au contexte du router injecté par le provider/plugin.

Q8 — Routes dans le JSX (React) vs fichier de config (Vue) — avantage de Vue ?
La séparation Vue offre plusieurs avantages : la config des routes est centralisée et lisible d'un coup, le lazy-loading est plus explicite (() => import(...)), et les routes peuvent être générées dynamiquement ou importées depuis un fichier JSON sans polluer les composants. En React, les routes mélangées au JSX peuvent devenir difficiles à maintenir sur de grandes apps.

Q9 — Redux Toolkit vs Pinia — comptez les concepts
Redux Toolkit : createSlice + configureStore + Provider + useSelector + useDispatch + dispatch(action()) = 6 concepts minimum.
Pinia : defineStore + useTaskStore() = 2 concepts. Pinia est objectivement moins verbeux et plus facile à apprendre.

Q10 — dispatch(addTask(title)) vs store.addTask(title) — lequel est plus intuitif ?
store.addTask(title) est clairement plus intuitif : c'est un appel de méthode direct, comme n'importe quel objet JavaScript. dispatch(addTask(title)) est plus abstrait — il faut comprendre le pattern action/reducer/dispatcher.
Avantage de Redux : les DevTools avec le time-travel debugging (rejouer et revenir en arrière dans l'historique des actions), très puissant pour déboguer des apps complexes. Pinia a des DevTools mais sans ce niveau de contrôle.

Q11 — Concepts identiques vs fondamentalement différents
Identiques (juste les noms changent) :

Routing (useParams ↔ useRoute, useNavigate ↔ useRouter)
Lifecycle au montage (useEffect(fn,[]) ↔ onMounted)
Props parent→enfant (:prop dans les deux)
State management (store, actions, state réactif)

Fondamentalement différents :

Réactivité : React = immutabilité + re-render, Vue = Proxy + mutation directe
Two-way binding : inexistant nativement en React, natif avec v-model en Vue
Template : JSX (JS pur) vs directives HTML (v-for, v-if, v-model)
Communication enfant→parent : callback props (React) vs système d'événements (Vue)


Q12 — Vue est-il plus "magique" ? Avantage ou inconvénient ?
Oui, Vue est plus magique : v-model, les mutations directes avec Proxy, <style scoped> automatique. C'est un avantage pour la productivité et la lisibilité, surtout pour des apps de taille moyenne. C'est un inconvénient pour le contrôle : quand quelque chose ne marche pas, comprendre pourquoi le Proxy a raté une mutation ou pourquoi v-model ne se met pas à jour est plus difficile que de suivre un setState explicite. React est plus verbeux mais plus prévisible et transparent.

Q13 — App e-commerce 50+ pages, équipe de 10 devs, dashboard admin complexe → React ou Vue ?
React. Raisons :

Écosystème plus large (Next.js pour le SSR/SSG, librairies UI mature comme shadcn/ui, Radix)
Plus de devs disponibles sur le marché pour une équipe de 10
TypeScript support historiquement plus solide
Redux DevTools avec time-travel pour déboguer des workflows complexes
Next.js App Router pour le routing file-based et les Server Components, critique pour le SEO e-commerce
Meilleure adoption dans les grandes entreprises = plus de ressources/documentation


Q14 — Débutant sans expérience de framework → React ou Vue en premier ?
Vue. Raisons :

La séparation <template> / <script> / <style> est plus proche du HTML/CSS/JS qu'un débutant connaît
v-model, v-for, v-if sont plus lisibles que JSX pour quelqu'un qui vient du HTML
Moins de concepts abstraits à apprendre d'un coup (pas de hooks rules, pas d'immutabilité stricte au début)
Les messages d'erreur sont souvent plus clairs
Une fois Vue maîtrisé, passer à React est plus facile que l'inverse