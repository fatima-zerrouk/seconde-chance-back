import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import app from '../app.js';
import { resetDatabase } from '../../src/helpers/resetDatabase.js';
import jwt from 'jsonwebtoken';

// Secret utilisé uniquement pour signer les JWT pendant les tests
process.env.JWT_SECRET = 'secret_test';

// Avant chaque test, remet la base de données dans son état initial
// pour que chaque test soit indépendant des autres
beforeEach(async () => {
  await resetDatabase();
});

describe('GET /animals', () => {
  it("retourne 200 et la liste des animaux si l'admin est connecté", async () => {
    //  Préparation des données (Arrange)

    // Données qui seront stockées dans le JWT
    const adminPayload = { userId: 1, role: 'admin' };

    // Génère un token valide signé avec le secret de test
    const token = jwt.sign(adminPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //  Exécution de la requête (Act)

    // Simule une requête GET sur /api/animals
    // en envoyant le token dans le header Authorization
    const response = await request(app)
      .get('/api/animals/')
      .set('Authorization', `Bearer ${token}`);

    // Vérification du résultat (Assert)

    expect(response.status).toBe(200); // Vérifie que la route répond avec le code HTTP 200 (succès)

    // Vérifie que la propriété animals est bien un tableau
    expect(Array.isArray(response.body.animals)).toBe(true);

    // Vérifie que le tableau contient bien les deux animaux
    expect(response.body.animals).toHaveLength(2);
  });
});
