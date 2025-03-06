'use client';
import { usePathname } from 'next/navigation';

export const CharacterSlot = ({
  character,
}: {
  character: React.ReactNode;
}) => {
  const id = usePathname().split('/').pop();

  if (!id) {
    return null;
  }

  return character;
};
