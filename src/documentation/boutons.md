---
layout: default
title: Boutons
permalink: /boutons.html
---

# Les boutons

Pour créer un bouton, ajoutez la classe *.btn* à  n'importe quel élément de type a, button ou input[type="submit"].

<div class="doc-p">
	<div class="doc-p__preview">
		<button class="btn btn--primary">Bouton 1</button>
		<button class="btn btn--secondary">Bouton 2</button>
		<button class="btn btn--danger">Bouton danger</button>
	</div>
	<div class="doc-p__code">
		{% highlight css %}
		<button class="btn btn--primary">Bouton 1</button>
		<button class="btn btn--secondary">Bouton 2</button>
		<button class="btn btn--danger">Bouton danger</button>
		{% endhighlight %}
	</div>
</div>

## Taille des boutons

Pour jouer sur la taille des boutons :

<div class="doc-p">
	<div class="doc-p__preview">
		<button class="btn btn--primary btn--big">.btn .btn--primary .btn--big</button>
	</div>
	<div class="doc-p__code">
		{% highlight css %}
		<button class="btn btn--primary btn--big">Ici un gros bouton</button>
		{% endhighlight %}
	</div>
</div>
