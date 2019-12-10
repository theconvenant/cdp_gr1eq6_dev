_(dernière modification : 10/12/2019)_

# Installation

## Avec Docker

Pour installer le projet via docker, exécuter la commande :
* `docker-compose up`

## Sans Docker

### Pre-requis

Dans le cas d'une installation sans docker, il faut :

* Une base de données locale
* NodeJS v10
* NPM v6

Une fois les pré-requis installés :

* Dans le répertoire code faire `npm install`
* Modifiez le fichier `code/db_controller/database_header.js` avec la config de la base de données locale (voir **Modification de la base de données**).

**Attention** dans `database_header.js`, il faut modifier les partamètres de la base de données mais aussi les paramètres de la fonction de test de connection.

# Lancement de l'application

## Avec Docker

Pour lancer l'application avec docker, exécutez la commande :

* `docker-compose up`

## Sans Docker

Pour lancer l'application sans docker, depuis le dossier code, exécutez la commande :

* `node index.js`

# Configuration

## Modification du port

Le port sur lequel l'application s'exécute peux être modifier dans le fichier `/code/index.js` via la constante `port` ligne 5.

Le port par défaut étant 8080.

 ## Modification de la base de données

La configuration de la connection à la base de données se trouve dans le fichier `/code/db_controller/database_header.js`. Pour modifier la configuration, il faut modifier la variable `database`. Les valeurs modifiables sont :

* L'adresse de la base de données : `host`
* Le nom de l'utilisateur pour se connecter à la base : `user`
* Le mot de passe pour se connecter à la base : `password`
* Le nom de la base de données : `database`
* Le port utilisé pour accéder à la base de données : `port`