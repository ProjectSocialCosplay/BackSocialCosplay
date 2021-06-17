# Cosplay (Back-end)

### 1. Présentation du projet

#### Situation déclenchante
Il nous a été demandé de produire un service dans le cadre de nos études pour la validation de notre dernière année. Pour ce faire, un tirage au sort a été fait, trois mots choisis au hasard (ancêtre, coq, uniforme) ainsi qu’une cible également choisie au hasard (télévor). Le mot uniforme nous a beaucoup inspirés, couplé au mot télévor . En effet nous somme tous fan de pop culture et l’idée de créer un espace pour passionnés nous est venu naturellement. Traiter le sujet du Cosplay nous est donc venu comme une évidence.

#### Situation initial
La communauté des Cosplayer n’a aucune plateforme qui leurs est dédiés pour le partage de leurs créations et de rencontre entre fans, alors que c’est une communauté qui regroupe beaucoup de passionnées.

#### Le projet
Nous avons donc décidé de partir sur une application mobile de "Réseau social multi-usage destiné à la communauté des Cosplayers" qui regroupe plusieurs services dont :

    - Partage de contenues,  de photo, vidéos des cosplays (partage DIY).
	- Vente de particulier à particulier d'accessoirs ou du costumes.
	- Partage d'événements à venir, point d’information.

#### Situation final
Notre application vas permettre à une communauté de se regrouper autour de la même passion qui est le Cosplay.

### 2. Status du projet

Cosplay est un projet en cours de développement, pour l'instant, pour la V1, seule la partie réseau social est disponible, il est possible de se créer un compte, partager du contenu, suivre ses amis.

Suite aux mesures sanitaires, nous avons décidé de mettre en attente le partage d'événements, car les regroupements de plus de 10 personnes dont encore interdit, néanmoins cette partie-là à bien été codée et pourras être implémentée par la suite.

Pour finir, nous n'avons pas encore eu le temps de démarrer la partie vente privée de particulier à particulier, mais ce sujet fut mûrement réfléchi et sera implémenté par la suite.

### 3. Instructions pour le lancement du projet Cosplay


Pour récupérer la partie Back-end du projet, veuillez lancer cette commande sur votre invite de commande :

`https://github.com/ProjectSocialCosplay/BackSocialCosplay.git`

Pour faciliter le lancement du projet nous avons choisi d'utiliser Docker (veillez à installer Docker sur votre environnement de travail.), rendez vous à la racine du projet et taper cette commande, cela vous permettra de démarrer le serveur :

`docker-compose up --build`

Pour faire des requêtes, rendez-vous sur :

`http://localhost:7000/graphql`

Pour récupérer la partie Front-End du projet, veuillez vous rendre sur ce lien :

`https://github.com/ProjectSocialCosplay/Front`

### 4. Technologies utilisées

Code : NodeJs

Base de donnée : MongoDB

Requêtes : Graphql

Tests : Jest