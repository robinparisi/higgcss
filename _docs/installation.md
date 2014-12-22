---
layout: docs
title: Introduction et installation
permalink: /docs/introduction.html
---

## Higccss ?

Higgcss est un micro framework CSS bénéficiant d'une approche modulaire rendant facile son appropriation.
Il vous encourage à ne garder que ce dont vous avez réellement besoin tout en proposant une structure de base simple
et évolutive.

## Installation

La façon la plus simple d'inclure Higgcss au sein d'un projet est de l'utiliser avec Less. Récupérez la dernière version
sur <a href="https://github.com/robinparisi/higgcss">Github</a> et copiez le dossier less à l'endroit souhaitté dans votre
projet.


Un exemple de tâche gulp pour compiler Higgcss :


{% highlight javascript %}
var less            = require('gulp-less');
var minifyCSS       = require('gulp-minify-css');
var autoprefixer    = require('gulp-autoprefixer');

gulp.task('less', function () {
    gulp.src('less/style.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe('dist/css/style.css'));
});
{% endhighlight %}

**Important** : Les préfixes vendeurs doivent être gérés au travers d'un outil (pré/post processeur) et ne sont pas intégrés au framework.

