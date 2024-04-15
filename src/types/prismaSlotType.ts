export const prismaSlotType = [
  'Banniere-Basse',
  'Banniere-Haute',
  'Habillage',
  'Native',
  'Out-Of-Banner',
  'Pave-Bas',
  'Pave-Bas2',
  'Pave-Haut',
  'Pave-Haut2',
  'Pave-Haut2-Desktop',
  'Postitiel',
] as const;

export type PrismaSlotType = typeof prismaSlotType[number];
