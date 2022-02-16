import { GameMode } from '.prisma/client';

const gameModes: GameMode[] = [
  { id: 0, name: 'Solo Showdown', description: '' },
  { id: 1, name: 'Duo Showdown', description: '' },
];

export default gameModes;
