Higgccs
======

Philosophie
-----------

Higgcss est un micro framework CSS bénéficiant d'une approche modulaire rendant facile son appropriation. Il vous encourage à ne garder que ce dont vous avez réellement besoin tout en proposant une structure de base simple et évolutive.


Higgcss en 1 minute
----------------------------------

```
├── 1.base
│   ├── _00-mixins.less           // quelques mixins utiles
│   ├── _01-reset.less            // reset minimaliste 
│   ├── _02-typography.less       // permet d'assurer le rythme vertical
│   ├── _03-helpers.less          // helpers divers (accessibilité, ux, etc...)
│   ├── _04-alignment.less        // alignement du texte et des blocs (OOCSS)
│   ├── _05-spacing.less          // espacements (OOCSS)
│   ├── _06-layout.less           // positionnement de base (float, table-cells, inline-block)
│   ├── _07-width.less            // quelques classes OOCSS pour jouer sur la largeur
│   ├── _08-grid.less             // système de grilles configurable basé sur less
│   ├── _09-rwd.less              // modifications de base pour le responsive
│   └── _10-debug.less            // tout ce qui touche au debug (inutile en production)
├── 2.modules
│   ├── _buttons.less       
│   ├── _forms.less
│   ├── _pagination.less
│   ├── _tables.less
│   └── _tooltips.less
├── 3.structure
│   ├── _01-fonts.less            // ici les déclarations de polices custom
│   ├── _02-icons.less            // ici les déclarations des polices d'icônes
│   ├── _11-layout.less           // tout ce qui touche au squelette de base du site (header, navigation, content, footer, etc...)
│   ├── _12-main.less             // ce qui peut se généraliser (titres, listes, liens, etc...)
│   ├── _13-modules.less          // ce qui peut être packagé sous forme de module propre au site
│   ├── _21-rwd.less              // responsive global
│   ├── _22-rwd-tablet.less       // ce qui s'applique aux tablettes
│   └── _23-rwd-smartphone.less   // ce qui s'applique aux mobiles
├── 4.pages
│   └── empty                     // styles spécifiques par page (ex: une page de login)
├── 5.vendors 
│   └── empty                     // style en rapport avec tout ce qui vient de l'extérieur
├── _config.less                  // quelques variables de configurations bien utiles qui agissent aussi sur les modules
└── style.less                    // le point d'entrée, c'est le fichier qui gère les imports et respecte la cascade 
```

Tester Higgcss
-----------------------

1) Installer les dépendances nécessaires au développement

```
npm install
```

2) Lancement d'un petit serveur en local capable d'écouter les changements

```
gulp watch
```

Licence
-------

Higgcss est distribué sous [licence MIT](https://github.com/robinparisi/higgcss/blob/master/LICENSE).

Crédits
-------

Higgcss est basé sur l'excellent framework KNACSS (http://knacss.com/). Si vous cherchez un framework léger et compréhensible, je vous conseille d'y jeter un oeil :)
