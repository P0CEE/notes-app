# README - Projet Web App

Ce projet est une application web développée avec React et Docker. Il utilise Docker Compose pour orchestrer les conteneurs de l'application React et de l'API JSON Server.

## Étapes réalisées :

1. Configuration des services dans \`docker-compose.yml\`.
2. Développement de l'application React.
3. Mise en place de la communication avec l'API JSON Server.

## Prérequis :

- Docker
- Docker Compose
  

## Utilisation :

1. Clonez ce dépôt sur votre machine :
```
git clone [https://github.com/votre-utilisateur/votre-repo.git](https://github.com/P0CEE/notes-app.git)
```

2. Accédez au répertoire du projet :
```
cd notes-app
```

3. Démarrez les conteneurs avec Docker Compose :
```
docker-compose up -d 
```

## Modification du Proxy: 

1. Accédez au répertoire web-app : 
```
cd notes-app/web-app
```

2. Modifier l'ip du proxy avec celle de sa machine : 
```
"proxy": "http://93.127.202.166:4000/"

Remplacez 93.127.202.166 par l'adresse IP de votre machine.
```
