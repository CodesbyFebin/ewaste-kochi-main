import { supabase } from '../db/supabase';

export interface BlogPostData {
  pillar: string;
  category: string;
  slug: string;
  title: string;
  excerpt: string;
  keywords: string;
  content?: string;
  date_published?: string;
}

export async function getAllBlogs(): Promise<BlogPostData[]> {
  const { data, error } = await supabase.from('blogs').select('pillar, category, slug, title, excerpt, keywords');
  if (error) throw error;
  return data as BlogPostData[];
}

export async function getBlogBySlug(slug: string): Promise<BlogPostData | undefined> {
  const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
  if (error) {
    if (error.code === 'PGRST116') return undefined; // Not found
    throw error;
  }
  return data as BlogPostData;
}

export async function getRelatedBlogs(category: string, currentSlug: string, limit: number = 10): Promise<BlogPostData[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('pillar, category, slug, title')
    .eq('category', category)
    .neq('slug', currentSlug)
    .limit(limit);
  if (error) throw error;
  return data as BlogPostData[];
}

export async function getBlogsByPillar(pillar: string, limit: number = 20): Promise<BlogPostData[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('pillar, category, slug, title, excerpt')
    .eq('pillar', pillar)
    .limit(limit);
  if (error) throw error;
  return data as BlogPostData[];
}

export async function getBlogsByCategory(category: string, limit: number = 20): Promise<BlogPostData[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('pillar, category, slug, title, excerpt')
    .eq('category', category)
    .limit(limit);
  if (error) throw error;
  return data as BlogPostData[];
}