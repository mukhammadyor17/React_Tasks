import type { FavoritePost } from '../store/features/favorites/favorites_slice';

const arrayToCsv = (data: FavoritePost[]) => {
  return [
    'Favorite posts',
    ...data.map(
      (item: FavoritePost) => ` ${item.id}. ${item.title}. ${item.body}`
    ),
  ].join('\n');
};

export const downloadFile = (data: FavoritePost[]) => {
  const fileName = `${data.length}_items.csv`;
  const csvData = arrayToCsv(data);

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', fileName);
  pom.click();
};
