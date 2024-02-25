
# Mon Projet

## Lancer le Projet

### Prérequis
- Docker installé sur votre machine.

### Étapes
1. Clonez le dépôt :
   ```
   git clone <URL_DU_DÉPÔT>
   ```
2. Construisez l'image Docker :
   ```
   docker build -t real-time-quizz .
   ```
3. Lancez le conteneur :
   ```
   docker run -d -p 80:80 real-time-quizz
   ```

## Accès
- Frontend : http://localhost
- Backend : Utilisez le port configuré pour le backend, par exemple http://localhost:3000 pour accéder à l'API.

