export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readingTime: string;
  relatedArticles?: number[];
  tags?: string[];
  authorAvatar?: string;
  authorBio?: string;
  is_active?: boolean;
}
