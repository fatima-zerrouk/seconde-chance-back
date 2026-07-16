import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import app from '../app.js';
import { resetDatabase } from '../../src/helpers/resetDatabase.js';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'secret_test';

// Remet la base de données dans son état initial
beforeEach(async () => {
  await resetDatabase();
});

describe('GET /animals', () => {
  it("retourne 200 et la liste des animaux si l'admin est connecté", async () => {
    const adminPayload = { userId: 1, role: 'admin' };

    // Génère un token valide signé avec le secret de test
    const token = jwt.sign(adminPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Simule une requête GET sur /api/animals
    const response = await request(app)
      .get('/api/animals/')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    // Vérifie que la propriété animals est bien un tableau
    expect(Array.isArray(response.body.animals)).toBe(true);

    // Vérifie que le tableau contient bien les deux animaux
    expect(response.body.animals).toHaveLength(2);
  });
});
