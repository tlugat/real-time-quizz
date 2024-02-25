# Étape 1 : Construire l'image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet dans le répertoire de travail
COPY . .

# Exposer le port sur lequel votre app tourne
EXPOSE 3000

# Commande pour démarrer votre application
CMD ["npm", "start"]
