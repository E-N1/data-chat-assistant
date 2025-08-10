import type { NextApiRequest, NextApiResponse } from 'next';

const chats = [
  { id: '1', title: 'Chat 1' },
  { id: '2', title: 'Chat 2' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(chats);
}