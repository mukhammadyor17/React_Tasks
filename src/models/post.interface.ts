export interface Post {
  map(String: StringConstructor): unknown;
  id: number;
  title: string;
  body: string;
  reactions?: {
    likes?: number;
    dislikes?: number;
  };
  tags?: string[];
}
