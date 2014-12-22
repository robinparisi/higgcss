---
layout: page
title: Conventions
permalink: /conventions.html
---

## Table des matières

1. [La bible](#bible)
2. [Indentation](#whitespace)
3. [Commentaires](#comments)
4. [Format](#format)
5. [Nommage](#naming)

<a name="bible"></a>

## 1. La bible

* On évite l'utilisation des id qui sont bien trop spécifiques (sauf cas spéciaux, comme pour cibler un élément en js)
* On évite les sélecteurs en cascade dans la plupart des cas (ils ne permettent pas de réutiliser suffisament nos classes)
* L'utilisation d' *!important* doit être bannie (si votre code ne fonctionne que avec !important, c'est qu'il faut revoir votre casacade)
* Chaque élément doit être pensé pour être réutilisable (si je le sors du projet, est-ce qu'il fonctionnera toujours ?)
* Pensez au maximum CSS orienté objet... voir atomique ! (une lecture intéressante : http://bradfrostweb.com/blog/post/atomic-web-design)

Pour finir, il est important de faire la part des choses entre une classe réutilisable et une classe sémantique.
Par exemple, Higgcss fournit un nombre non négligeable de classes réutilisables qui permettent de réduire considérablement
le poids de nos CSS (exemple: `.left`, `.w30`, `.txtcenter`). On évite ainsi de réécrire ces propriétés plusieurs centaines de fois.
Toutefois, il ne faut pas **tomber dans les extrèmes** et se mettre à créer des classes réutilisables à tout va.



Quelques exemple à bannir :


{% highlight css %}
#header {
   ...
}

.header .menu ul li .current {
   ...
}

.content a {
    color: red !important;
}
{% endhighlight %}

<a name="whitespace"></a>

## 2. Indentation

* L'indentation se fait en espaces uniquement
* Le niveau d'indentation est fixé à **deux espaces**
* Évitez les espaces en fin de lignes
* Aucun espace avant les deux points, un espace après

{% highlight css %}
.selecteur {
  position: relative;
  display: block;
}
{% endhighlight %}

*Astuce* : L'indentation automatique de la plupart des IDE fonctionne sur ce modèle, il ne faut pas hésiter à l'utiliser.

<a name="comments"></a>

## 3. Commentaires

La façon de commenter doit être simple et **similaire** dans tout le code !

* Placez les commentaires sur une nouvelle ligne au-dessus de leur sujet
* Evitez les commentaires en fin de ligne
* Gardez une longueur de ligne de taille raisonnable, par exemple 80
  caractères
* Utilisez les commentaires comme bon vous semble pour diviser le code CSS en
  parties distinctes
* Rédigez vos commentaires avec des majuscules et des minuscules et gardez une
  indentation constante pour le texte.

Astuce: Paramètrez votre éditeur pour qu'il vous fournisse des raccourcis
claviers qui produisent des commentaires conventionnels.

#### Exemple :

{% highlight css %}
/* --------------------------------- */
/* ==Bloc de commentaire de section  */
/* --------------------------------- */

/* Bloc de commentaire de sous section */
/* ----------------------------------- */

/*
 * Groupe de bloc de commentaires.
 * Parfait pour les explications sur plusieurs lignes et la documentation.
 */

/* Commentaire simple */

{% endhighlight %}

<a name="format"></a>

## 4. Format

1. Un seul sélecteur par ligne dans les régles à plusieurs sélecteurs
2. Un espace avant l'accolade ouvrante d'une règle
3. Une déclaration par ligne dans un bloc de déclarations
5. Un espace après les deux points d'une déclaration
6. Ajoutez toujours un point-virgule à la fin de la dernière déclaration d’un
   bloc
7. Fermez l'accolade d'une règle au même niveau que le premier caractère de la
   règle
8. Sautez une ligne entre chaque règle.

```css
.selecteur-1,
.selecteur-2,
.selecteur-3 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    color: #333;
    background: #fff;
}
```

#### Ordre des déclarations

L'ordre des déclarations doit toujours obéir à la même règle. Pour un maximum de consistence, il
est préférable de commencer par les propriétés importantes relatives à la structure (positionnement et modèle de
boîte) puis de terminer par les rêgles de typo, l'arrière plan, les couleurs...

1. Content
2. Positionnement
3. Box
4. Texte
5. Décoration
6. Transformation & Transitions
7. Comportements

```css
.selecteur {
    content

    display
    float
    position

    width
    height
    border
    overflow

    text-align
    text-shadow
    font
    line-height
    letter-spacing

    color
    opacity
    background
    box-shadow
    animation

    transition
    transformation

    cursor
}
```


#### Exceptions et légers écarts

De gros blocs de déclarations uniques peuvent utiliser un format légèrement
différent, regroupées sur une seule ligne. Dans ce cas, il faut insérer un
espace après l'accolade ouvrante et avant l'accolade fermante.

```css
.selecteur-1 { width: 10%; }
.selecteur-2 { width: 20%; }
.selecteur-3 { width: 30%; }
```

Les longues valeurs de propriétés, séparées par des virgules - comme des
ensembles de dégradés et d'ombres - peuvent être agencées sur plusieurs lignes
de manière à améliorer la lisibilité et produire des fichiers diff plus utiles.
Divers formats peuvent alors être utilisés comme le montre l'exemple donné
ci-dessous :

```css
.selecteur {
    box-shadow:
        1px 1px 1px #000,
        2px 2px 1px 1px #ccc inset;
    background-image:
        linear-gradient(#fff, #ccc),
        linear-gradient(#f3c, #4ec);
}
```

#### Divers

* Utilisez des minuscules pour les valeurs hexadécimales, exemple : `#aaa`
* Utilisez toujours le même type de guillemets doubles, exemple : `content: ""`
* Il en va de même pour le HTML :  `input[type="checkbox"]`
* Ne pas spécifier d'unités pour les valeurs nulles
* Ne pas inscrire le 0 pour une propriété à virgule, exemple : `opacity: .8

<a name="naming"></a>
## 5. Nommage

Utilisez des noms clairs et réfléchis pour les classes HTML. Choisissez un
modèle de nommage cohérent et compréhensif qui a du sens à la fois dans les
fichiers HTML et dans les fichiers CSS.

* Toujours en minusucules
* Les mots sont **séparés par un tiret**
* Utilisez le même nom pour la classe et pour l'image associée (exemple : .icon-user et icon-user.png)

Enfin, il est important lors du nommage d'une classe de se concentrer sur **sa fonction** et non son apparence !!!

Mauvais : `text-red`
Bon     : `text-important`


```css
/* Exemple de code mal nommé */

.s-scr {
    overflow: auto;
}

.cb {
    background: #000;
}

/* Exemple de code bien nommé */

.is-scrollable {
    overflow: auto;
}

.column-body {
    background: #000;
}
```

