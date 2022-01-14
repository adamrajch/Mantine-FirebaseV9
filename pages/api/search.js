import { searchLifts } from '../../lib/redis';

export default async function handler(req, res) {
  const q = req.query.q;
  const lifts = await searchLifts(q);
  res.status(200).json({ lifts });
}
