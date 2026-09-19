import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { NewsArticle } from '@/lib/data/types'
import type { Database } from '@/types/database'
const COLUMNS='id, author_id, title, slug, excerpt, content, cover_image_url, cover_image_alt, status, published_at, created_at, updated_at'
export class AdminNewsDataError extends Error {}
export type NewsWriteValues=Omit<Database['public']['Tables']['news_articles']['Insert'],'slug'>
export async function getAdminNews(filters:{title?:string;status?:'draft'|'published'}):Promise<NewsArticle[]>{const s=await createClient();let q=s.from('news_articles').select(COLUMNS).order('updated_at',{ascending:false}).order('id');if(filters.title)q=q.ilike('title',`%${filters.title.replace(/[\\%_]/g,'\\$&')}%`);if(filters.status)q=q.eq('status',filters.status);const{data,error}=await q;if(error)throw new AdminNewsDataError('News unavailable');return data}
export async function getAdminNewsById(id:string):Promise<NewsArticle|null>{const s=await createClient();const{data,error}=await s.from('news_articles').select(COLUMNS).eq('id',id).maybeSingle();if(error)throw new AdminNewsDataError('Article unavailable');return data}
export async function createAdminNews(values:NewsWriteValues){const s=await createClient(),base=slugify(values.title)||'article';let slug=base,available=false;for(let i=1;i<=100;i++){const{data,error}=await s.from('news_articles').select('id').eq('slug',slug).maybeSingle();if(error)throw new AdminNewsDataError('Create failed');if(!data){available=true;break}slug=`${base}-${i+1}`}if(!available)throw new AdminNewsDataError('Create failed');const{data,error}=await s.from('news_articles').insert({...values,slug}).select('id,slug').single();if(error)throw new AdminNewsDataError('Create failed');return data}
export async function updateAdminNews(id:string,values:NewsWriteValues){const s=await createClient();const{data,error}=await s.from('news_articles').update(values).eq('id',id).select('id,slug').single();if(error)throw new AdminNewsDataError('Update failed');return data}
export async function setAdminNewsStatus(id:string,published:boolean){const s=await createClient();const{data,error}=await s.from('news_articles').update({status:published?'published':'draft',published_at:published?new Date().toISOString():null}).eq('id',id).select('id,slug').single();if(error)throw new AdminNewsDataError('Status failed');return data}
function slugify(v:string){return v.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
