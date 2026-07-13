import { describe, expect, it, vi } from 'vitest';
import { authenticate } from '../middlewares/auth.middleware';
import jwt from 'jsonwebtoken';

// Token utilisé pour les tests
process.env.JWT_SECRET = 'secret_test';

describe('authenticate', () => {
  // Fonction qui crée un faux objet "res" d'Express
  const mockRes = () => {
    const res = {};

    // Simule res.status()
    // mockReturnValue(res) permet d'écrire res.status(401).json(...)
    res.status = vi.fn().mockReturnValue(res);

    // Simule res.json()
    res.json = vi.fn().mockReturnValue(res);

    return res;
  };

  // Test 1 : aucun token envoyé
  it('renvoie 401 si le header Authorization est absent', () => {
    // Arrange (prépare les données)
    const req = { headers: {} }; // Simule une requête sans header Authorization
    const res = mockRes(); // Simule l'objet réponse Express
    const next = vi.fn(); // Simule la fonction next() d'Express

    // Act et Assert
    // Vérifie que le middleware lance bien l'erreur attendue
    expect(() => {
      authenticate(req, res, next); //Appele la fonction (act)
    }).toThrow('Accès non autorisé aucun token fourni'); //Vérifie le résultat (Assert)

    // Vérifie que la requête ne continue pas next
    expect(next).not.toHaveBeenCalled();
  });

  // Test 2 : token invalide
  it('renvoie 401 si le token est invalide', () => {
    const req = {
      // Simule une requête avec un faux token
      headers: { authorization: 'Bearer token_invalide' },
    };
    const res = mockRes();
    const next = vi.fn();

    // Vérifie que le middleware détecte le token invalide
    expect(() => {
      authenticate(req, res, next);
    }).toThrow('Session expirée ou token invalide');

    expect(next).not.toHaveBeenCalled();
  });

  // Test 3 : token valide
  it('appelle next() et renseigne req.user si le token est valide', () => {
    // Données qui seront stockées dans le JWT
    const payload = { userId: 1, role: 'user' };

    // Génère un vrai token signé avec le même jwt secret
    // que celui dans le middleware
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const req = {
      // Simule une requête avec un header Authorization valide
      headers: { authorization: `Bearer ${token}` },
    };

    const res = mockRes();
    const next = vi.fn();

    authenticate(req, res, next); // Exécute le middleware

    expect(next).toHaveBeenCalled(); // Vérifie que la requête est autorisée à continuer

    // Vérifie que les informations du JWT ont bien été ajoutées à req.user
    expect(req.user).toMatchObject(payload);
  });
});
