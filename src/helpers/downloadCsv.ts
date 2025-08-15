import type { FavoritePost } from '../store/features/favorites/favorites_slice';

const escapeCsvValue = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

const arrayToCsv = (data: FavoritePost[]) => {
  const header = ['id', 'title', 'body'];
  const rows = data.map((item) => [
    escapeCsvValue(item.id),
    escapeCsvValue(item.title),
    escapeCsvValue(item.body),
  ]);

  return [header, ...rows].map((row) => row.join(',')).join('\r\n');
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
