import { describe, expect, it, vi } from 'vitest';
import { authenticate } from '../middlewares/auth.middleware';
import jwt from 'jsonwebtoken';

// Token utilisé pour les tests
process.env.JWT_SECRET = 'secret_test';

describe('authenticate', () => {
  // Fonction qui crée un faux objet "res" d'Express
  const mockRes = () => {
    const res = {};

    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);

    return res;
  };

  it('renvoie 401 si le header Authorization est absent', () => {
    const req = { headers: {} }; // Requête sans header Authorization
    const res = mockRes(); // Objet réponse Express
    const next = vi.fn();

    // Vérifie que le middleware lance bien l'erreur attendue
    expect(() => {
      authenticate(req, res, next); //Appele la fonction (act)
    }).toThrow('Accès non autorisé aucun token fourni');

    // Vérifie que la requête ne continue pas next
    expect(next).not.toHaveBeenCalled();
  });

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

  it('appelle next() et renseigne req.user si le token est valide', () => {
    const payload = { userId: 1, role: 'user' };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const req = {
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
