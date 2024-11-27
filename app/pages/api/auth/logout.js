export default async function handler(req, res) {
    if (req.method === 'POST') {
      res.status(200).json({ message: 'Déconnexion réussie.' });
    } else {
      res.status(405).json({ message: 'Méthode non autorisée.' });
    }
  }