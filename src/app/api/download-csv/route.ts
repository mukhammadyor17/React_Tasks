import { NextRequest, NextResponse } from 'next/server';
import { Post } from '../../../models/post.interface';

const escapeCsvValue = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

const arrayToCsv = (data: Post[]) => {
  const header = ['id', 'title', 'body'];
  const rows = data.map((item) => [
    escapeCsvValue(item.id),
    escapeCsvValue(item.title),
    escapeCsvValue(item.body),
  ]);

  return [header, ...rows].map((row) => row.join(',')).join('\r\n');
};

export async function GET(req: NextRequest) {
  const dataParam = req.nextUrl.searchParams.get('data');
  if (!dataParam) {
    return NextResponse.json({ error: 'No data provided' }, { status: 400 });
  }

  let parsed;
  try {
    parsed = JSON.parse(dataParam);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const csvData = arrayToCsv(parsed);

  return new NextResponse(csvData, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${parsed.length}_items.csv"`,
    },
  });
}
