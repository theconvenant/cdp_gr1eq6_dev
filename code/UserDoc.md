_(dernière modification : 10/12/2019)_

_(verion : 0.3.0)_

# SAF-SCRUM

SAF-SCRUM est une application Web qui a pour but d'aider la gestion de projets via la méthode agile Scrum. Elle permet de créer et d'accéder à un ou plusieurs projets. Pour chaque projet l'utilisateur pourra créer/modifier/supprimer des sprints, des issues et des tasks ainsi qu'ajouter/supprimer des collaborateurs aux projets. 

# Utilisation

## Lancer SAF-SCRUM

Pour lancer à SAF-SCRUM :

1. Suivez les instructions dans `Install.md`
2. Ouvrez le navigateur web de votre choix
3. Allez à l'adresse `localhost:8080`

Le port 8080 est le port par défaut et comme indiquer dans `Install.md`, il peux être changé.

## Gestion de compte

La possession d'un compte est nescessaire pour utiliser SAF-SCRUM.

### Création de compte

Si vous ne posséder pas encore de compte vous pouvez vous en créer un depuis la page d'acceuil :

1. Cliquez sur le texte **Create an account**
2. Renseignez vos identifiants : Email<span style="color:red">\*</span>, UserName<span style="color:red">\*</span> et Password<span style="color:red">\*</span>
3. Cliquez sur le bouton **SIGN IN**

_Les <span style="color:red">\*</span> indiquent un champ obligatoire_

**Attention**, veillez à bien saisir et retenir vos identifiants. La création du compte sera validée en cliquant sur le bouton **SIGN IN** et ce dernier ne pourra pas être modifié ultérieurement.

Une fois le compte créé, vous serez rediriger sur la fenêtre de connection.

### Connection à votre compte

Pour vous connecter à votre compte deduis la page d'acceuil :

1. Renseignez votre UserName<span style="color:red">\*</span> et votre Password<span style="color:red">\*</span>
2. Cliquez sur le bouton **LOG IN**

_Les <span style="color:red">\*</span> indiquent un champ obligatoire_

### Suppression du compte

Pour supprimer votre compte, une fois connecter :

1. Cliquer sur le bouton **Delete Account**
2. Confirmer la suppression

### Déconnection

Pour vous déconnecter, cliquez sur le bouton **logout** en haut à droite.

## Gestion des projets

Une fois connecté, vous serez redirigez sur la liste des projets auquels vous avez accès.

### Création d'un nouveau projet

Pour créer un nouveau projet :

1. Cliquez sur le bouton **Add Project**
2. Remplir les champs **Project name**<span style="color:red">\*</span> et **Description**
3. Cliquer sur le bouton **Validate**

_Les <span style="color:red">\*</span> indiquent un champ obligatoire_

Une fois créé, le projet apparait dans la liste des projets et peux être accédé en cliquant sur le bouton **Enter Project**

### Suppression d'un projet

Une fois le projet ouvert, depuis l'onglet **Project Management** :

1. Cliquez sur le bouton **Delete Project**
2. Confirmer la suppression

## Gestion des issues

Une fois un projet ouvert, vous pouvez gérer des issues.

### Création d'une nouvelle issue

Pour créer une issue, depuis l'onglet **Issues** :

1. Cliquez sur le bouton **Add Issue**
2. Renseignez les champs **User Story number**<span style="color:red">\*</span>, **Description**<span style="color:red">\*</span> et **Difficulty**<span style="color:red">\*</span>
3. Choisissez une priorité et un état via les champs à cocher **Priority** et **Sate**
4. Confirmez votre saisie avec le bouton **Validate**

_Les <span style="color:red">\*</span> indiquent un champ obligatoire_

### Modification d'une issue

Pour modifier une issue existante, depuis l'onglet **Issues** :

1. Cliquez sur le bouton **Modify** de l'issue à modifier
2. Modifiez les champs souhaités
3. Confimer les modifications avec le bouton **Validate**

### Suppression d'une issue

Pour supprimer une issue existante, depuis l'onglet **Issues** :

1. Cliquez sur le bouton **Remove** de l'issue à supprimer
2. Confimer la suppression


## Gestion des tâches

Une fois un projet ouvert, vous pouvez gérer des tâches.

### Création d'une nouvelle tâches

Pour créer une tâche, depuis l'onglet **Tasks** :

1. Cliquez sur le bouton **Add Tasks**
2. Renseignez les champs **Task id**<span style="color:red">\*</span> et **Description**<span style="color:red">\*</span>
3. Choisissez un état via le champs à cocher **Sate**
4. Choississez les dépendances avec les issues et les autres tâches via les champs à cocher **Related Issues** et **Dependency task id**
5. Choississez les membres associés avec le champ à cocher **Asscociated member**
6. Confirmez votre saisie avec le bouton **Validate**

_Les <span style="color:red">\*</span> indiquent un champ obligatoire_

### Modification d'une tâche

Pour modifier une tâche existante, depuis l'onglet **Tasks** :

1. Cliquez sur le bouton **Modify** de la tâche à modifier
2. Modifiez les champs souhaités
3. Confimer les modifications avec le bouton **Validate**

### Suppression d'une tâche

Pour supprimer une tâche existante, depuis l'onglet **Tasks** :

1. Cliquez sur le bouton **Remove** de la tâche à supprimer
2. Confimer la suppression

## Gestion des sprints

Une fois un projet ouvert, vous pouvez gérer des sprints.

### Création d'un nouveau sprint

Pour créer un sprint, depuis l'onglet **Sprints** :

1. Cliquez sur le bouton **Add Sprint**
2. Renseignez les champs **Sprint name**<span style="color:red">\*</span> et **Description**
3. Choisissez les dates de départ et fin du sprint via les champs **Starting dtae**<span style="color:red">\*</span> et **Ending date**<span style="color:red">\*</span>
4. Confirmez votre saisie avec le bouton **Validate**

_Les <span style="color:red">\*</span> indiquent un champ obligatoire_

### Suppression d'un sprint

Pour supprimer un sprint existant, depuis l'onglet **Sprints** :

1. Cliquez sur le bouton **Remove** du sprint à supprimer
2. Confimer la suppression

## Gestion des membres d'un projet

Une fois un projet ouvert, vous pouvez gérer les mebres qui participent au projet

### Ajout d'un membre au projet

Pour ajouter un membre à votre projet, depuis l'onglet **Project Management** :

1. Cliquez sur le bouton **Add member**
2. Renseignez l'userName du membre que vous souhaitez ajouter dans le champs **User name**style="color:red">\*</span>
3. Confirmez votre saisie avec le bouton **Validate**

Notez que l'userName renseigné doit correspondre à un compte enregistré dans la base de donné.

### Supprimer un membre du projet

Pour supprimer un membre de votre projet, depuis l'onglet **Project Management** :

1. Cliquez sur le bouton **Remove** du membre à supprimer
2. Confimer la suppression