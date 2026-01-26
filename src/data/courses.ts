import type { Course } from '../@types/course';

export const coursesData: Course[] = [
  {
    id: 'intro-html',
    title: 'Structure & Sémantique',
    description: 'Posez les fondations solides de vos applications web avec HTML5.',
    language: 'HTML',
    difficulty: 'Débutant',
    link: '/courses/html-semantic',
    lessons: [
      {
        id: '1-1',
        title: '1.1 Introduction au Web',
        content: `
# Introduction au Web

Le World Wide Web (WWW) est un système d'information en ligne qui permet l'accès à des documents interconnectés via Internet.

## Les trois piliers du Web

### 1. HTML (HyperText Markup Language)
HTML est le langage de balisage utilisé pour structurer le contenu des pages web. Il définit la structure et le sens du contenu.

### 2. CSS (Cascading Style Sheets)
CSS est le langage de style utilisé pour décrire la présentation d'un document HTML. Il contrôle l'apparence visuelle des éléments.

### 3. JavaScript
JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux pages web.

## Comment fonctionne une page web ?

Quand vous tapez une URL dans votre navigateur :
1. Le navigateur envoie une requête au serveur
2. Le serveur renvoie le fichier HTML
3. Le navigateur analyse le HTML et affiche la page
4. Les fichiers CSS et JS sont chargés pour styliser et dynamiser la page

## Votre première page HTML

Voici un exemple simple de page HTML :

\`\`\`html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma première page</title>
</head>
<body>
    <h1>Bonjour le monde !</h1>
    <p>Ceci est ma première page web.</p>
</body>
</html>
\`\`\`
        `,
        isCompleted: true
      },
      {
        id: '1-2',
        title: '1.2 Les Balises Essentielles',
        content: `
# Les Balises Essentielles HTML

Les balises HTML sont les éléments de base qui structurent votre page web. Chaque balise a une signification sémantique.

## Structure de base

### DOCTYPE
\`\`\`html
<!DOCTYPE html>
\`\`\`
Déclare que le document est un document HTML5.

### html
\`\`\`html
<html lang="fr">
\`\`\`
Élément racine du document. L'attribut \`lang\` indique la langue.

### head
\`\`\`html
<head>
    <meta charset="UTF-8">
    <title>Mon titre</title>
</head>
\`\`\`
Contient les métadonnées du document.

### body
\`\`\`html
<body>
    <!-- Contenu visible de la page -->
</body>
\`\`\`
Contient le contenu visible de la page.

## Balises de contenu

### Titres (h1 à h6)
\`\`\`html
<h1>Titre principal</h1>
<h2>Sous-titre</h2>
\`\`\`

### Paragraphes
\`\`\`html
<p>Ceci est un paragraphe de texte.</p>
\`\`\`

### Liens
\`\`\`html
<a href="https://example.com">Lien vers un site</a>
\`\`\`

### Images
\`\`\`html
<img src="image.jpg" alt="Description de l'image">
\`\`\`

### Listes
\`\`\`html
<ul>
    <li>Élément 1</li>
    <li>Élément 2</li>
</ul>

<ol>
    <li>Premier élément</li>
    <li>Deuxième élément</li>
</ol>
\`\`\`

## Balises sémantiques HTML5

\`\`\`html
<header>En-tête de la page</header>
<nav>Navigation</nav>
<main>Contenu principal</main>
<section>Section de contenu</section>
<article>Article indépendant</article>
<aside>Contenu complémentaire</aside>
<footer>Pied de page</footer>
\`\`\`

Ces balises donnent du sens à votre contenu et améliorent l'accessibilité.
        `,
        isCompleted: false
      },
    ]
  },
  {
    id: 'css-mastery',
    title: 'Design & Tailwind',
    description: 'Créez des interfaces modernes et responsives sans quitter votre HTML.',
    language: 'CSS',
    difficulty: 'Débutant',
    link: '/courses/css-basic',
    lessons: [
      {
        id: '2-1',
        title: '2.1 Introduction à CSS',
        content: `
# Introduction à CSS

CSS (Cascading Style Sheets) est le langage utilisé pour styliser les pages web. Il contrôle l'apparence visuelle de vos éléments HTML.

## Comment ajouter du CSS ?

### 1. CSS en ligne (inline)
\`\`\`html
<p style="color: blue; font-size: 16px;">Texte stylisé</p>
\`\`\`

### 2. CSS interne (dans head)
\`\`\`html
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
\`\`\`

### 3. CSS externe (recommandé)
\`\`\`html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

## Sélecteurs CSS

### Sélecteur d'élément
\`\`\`css
p {
    color: blue;
}
\`\`\`

### Sélecteur de classe
\`\`\`css
.ma-classe {
    font-size: 20px;
}
\`\`\`

### Sélecteur d'id
\`\`\`css
#mon-id {
    background-color: yellow;
}
\`\`\`

## Propriétés CSS courantes

### Couleurs
\`\`\`css
color: red;              /* Couleur du texte */
background-color: #fff;  /* Couleur de fond */
\`\`\`

### Dimensions
\`\`\`css
width: 100px;    /* Largeur */
height: 50px;    /* Hauteur */
\`\`\`

### Marges et espacement
\`\`\`css
margin: 10px;     /* Marge extérieure */
padding: 20px;    /* Marge intérieure */
\`\`\`

### Bordures
\`\`\`css
border: 1px solid black;  /* Bordure simple */
border-radius: 5px;       /* Coins arrondis */
\`\`\`

## Le modèle de boîte CSS

Chaque élément HTML est une boîte rectangulaire composée de :
- Contenu (content)
- Rembourrage (padding)
- Bordure (border)
- Marge (margin)

\`\`\`css
.box {
    width: 200px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
}
\`\`\`
        `,
        isCompleted: false
      },
    ]
  },
  {
    id: 'js-logic',
    title: 'Logique JavaScript',
    description: 'Maîtrisez les concepts fondamentaux pour dynamiser vos sites.',
    language: 'JS',
    difficulty: 'Intermédiaire',
    link: '/courses/js-variables',
    lessons: [
      {
        id: '3-1',
        title: '3.1 Introduction à JavaScript',
        content: `
# Introduction à JavaScript

JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux pages web. Il s'exécute côté client dans le navigateur.

## Où écrire du JavaScript ?

### 1. Dans une balise script
\`\`\`html
<script>
    console.log("Hello World!");
</script>
\`\`\`

### 2. Dans un fichier externe
\`\`\`html
<script src="script.js"></script>
\`\`\`

## Variables

### Déclaration de variables
\`\`\`javascript
var ancienneVariable = "Hello";  // À éviter
let variableModifiable = "Hello";
const constante = "World";
\`\`\`

### Types de données
\`\`\`javascript
let chaine = "Hello World";     // String
let nombre = 42;                // Number
let booleen = true;             // Boolean
let tableau = [1, 2, 3];        // Array
let objet = {nom: "John"};      // Object
\`\`\`

## Opérateurs

### Opérateurs arithmétiques
\`\`\`javascript
let a = 10;
let b = 5;
console.log(a + b);  // 15
console.log(a - b);  // 5
console.log(a * b);  // 50
console.log(a / b);  // 2
console.log(a % b);  // 0
\`\`\`

### Opérateurs de comparaison
\`\`\`javascript
console.log(5 == "5");   // true (égalité lâche)
console.log(5 === "5");  // false (égalité stricte)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true
console.log(5 > 3);      // true
console.log(5 < 3);      // false
\`\`\`

## Conditions

### if...else
\`\`\`javascript
if (age >= 18) {
    console.log("Majeur");
} else {
    console.log("Mineur");
}
\`\`\`

### switch
\`\`\`javascript
switch (jour) {
    case "lundi":
        console.log("Début de semaine");
        break;
    case "vendredi":
        console.log("Bientôt le weekend");
        break;
    default:
        console.log("Jour normal");
}
\`\`\`

## Fonctions

### Déclaration de fonction
\`\`\`javascript
function saluer(nom) {
    return "Bonjour " + nom;
}

console.log(saluer("Alice"));  // "Bonjour Alice"
\`\`\`

### Fonction fléchée (ES6)
\`\`\`javascript
const saluer = (nom) => {
    return \`Bonjour \${nom}\`;
};

console.log(saluer("Bob"));  // "Bonjour Bob"
\`\`\`

## Événements

### Gestionnaire d'événement
\`\`\`html
<button id="monBouton">Cliquez-moi</button>

<script>
    document.getElementById("monBouton").addEventListener("click", function() {
        alert("Bouton cliqué !");
    });
</script>
\`\`\`

JavaScript permet de rendre vos pages web interactives en réagissant aux actions des utilisateurs.
        `,
        isCompleted: false
      },
    ]
  }
];
