# Seconde chance — back-end API

> API RESTful sécurisée développée avec Node.js, Express 5 et MySQL pour alimenter la plateforme d'adoption d'animaux **Seconde chance**.  
> **Projet présenté dans le cadre de la validation du titre RNCP Développeur Web et Web Mobile (DWWM).**

---

## Présentation du projet

Ce dépôt contient le serveur back-end de la plateforme **Seconde chance**. Il fournit l'API REST nécessaire à la gestion du catalogue d'animaux, à l'authentification sécurisée des administrateurs et à la gestion des médias.

---

## Fonctionnalités de l'API

- **Authentification et autorisation :**
  - Connexion des administrateurs avec hachage fort des mots de passe (`bcrypt`).
  - Génération et vérification de jetons **JWT (JSON Web Tokens)** via middleware.
  - Gestion des rôles et protection des routes d'administration.
- **Gestion des animaux (CRUD) :**
  - Récupération publique des animaux avec filtres (espèce, âge, statut) et pagination.
  - Consultation de la fiche détaillée d'un animal.
  - Création, modification et suppression réservées aux administrateurs.
  - Suivi des statuts : `disponible`, `en cours d'adoption`, `adopté`.
- **Upload de médias :**
  - Stockage et optimisation des images d'animaux sur **Cloudinary**.

---

## Stack technique

- **Environnement et framework :** [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/)
- **Base de données :** [MySQL](https://www.mysql.com/) (Client [mysql2](https://github.com/sidorares/node-mysql2))
- **Sécurité et authentification :** `jsonwebtoken`, `bcrypt`, `express-validator`, `cors`
- **Gestion des fichiers / Cloud :** `multer`, `cloudinary`
- **Tests et quality :** [Vitest](https://vitest.dev/), `supertest` (tests d'intégration API), ESLint, Prettier
- **Outil Dev :** `nodemon`

---

## Installation et lancement local

### Prérequis
- **Node.js** (v18 ou supérieur)
- Un serveur **MySQL** actif
- Un compte **Cloudinary** (pour la gestion des images)

### 1. Cloner le dépôt
```bash
git clone [https://github.com/fatima-zerrouk/seconde-chance-back.git](https://github.com/fatima-zerrouk/seconde-chance-back.git)
cd seconde-chance-back
```

### 2. Configuration du fichier `.env`
Créez un fichier `.env` à la racine à partir du modèle ci-dessous :

```env
DB_HOST=le_host
DB_USER=identifiant
DB_PASSWORD=mot_de_passe
DB_NAME=nom_de_la_base_de_données
DB_PORT=le_port_de_la_base_de_données-MYSQL

PORT=le_port_choisi

JWT_SECRET=une_cle_secrete_a_definir

CLOUDINARY_URL=url cloudinary
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer la base de données
Importez votre fichier d'initialisation de base de données (ex: `schema.sql`) dans votre instance MySQL pour créer la base et les tables requises.

### 5. Démarrer le serveur
```bash
# Mode développement (avec rechargement automatique via Nodemon)
npm run dev

# Mode production
npm start
```
L'API sera accessible sur votre port `http://localhost:PORT`.

---

## Tests et qualité

```bash
# Exécuter les tests unitaires et d'intégration de l'API (Vitest + Supertest)
npm run test

# Analyse du code (Linter)
npm run lint

# Correction automatique du linting
npm run lint:fix

# Formatage automatique avec Prettier
npm run format
```

---

## Auteur

- **Fatima Zerrouk** - *Développeuse Web full-stack* 
