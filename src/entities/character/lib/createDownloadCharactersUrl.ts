import type { Character } from '../model';

const convertCharactersToCsv = (characters: Character[] = []) => {
  const headers = [
    'id',
    'name',
    'status',
    'species',
    'type',
    'gender',
    'origin_name',
    'location_name',
    'image',
    'episode',
    'url',
  ];

  const headerRow = headers.join(',');

  const dataRows = characters.map(character => {
    return headers
      .map(header => {
        let value: string;

        switch (header) {
          case 'origin_name':
            value = character.origin.name;
            break;
          case 'location_name':
            value = character.location.name;
            break;
          case 'episode':
            value = character.episode.length > 0 ? character.episode[0] : '';
            break;
          default:
            value = String(character[header as keyof Character]);
        }

        if (
          typeof value === 'string' &&
          (value.includes(',') || value.includes('\n'))
        ) {
          value = `"${value.replace(/"/g, '""')}"`;
        }

        return value;
      })
      .join(',');
  });

  const csvString = [headerRow, ...dataRows].join('\n');

  return csvString;
};

export const createDownloadCharactersUrl = (characters: Character[]) => {
  const blob = new Blob([convertCharactersToCsv(characters)], {
    type: 'text/csv',
  });
  const url = URL.createObjectURL(blob);

  return url;
};
