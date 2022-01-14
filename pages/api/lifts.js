import { createCallSignature } from 'typescript';
import { createLift } from '../../lib/redis';

export default async function handler(req, res) {
  const id = await createLift(req.body);
  res.status(200).json({ id });
}
