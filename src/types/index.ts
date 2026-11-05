export type ProductCategory = 
  | 'Technology & Electronics'
  | 'Software & Digital Tools'
  | 'Home & Lifestyle'
  | 'Health & Wellness'
  | 'Beauty & Personal Care'
  | 'Business & Productivity'
  | 'Online Services';

export type AffiliateNetwork = 'Amazon Associates' | 'Awin' | 'CJ Affiliate' | 'ClickBank' | 'Direct Partner';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  brand: string;
  price: number;
  currency: string;
  priceVerifiedDate: string;
  store: string;
  affiliateNetwork: AffiliateNetwork;
  affiliateUrl: string;
  image: string;
  summary: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  buyersGuideNote: string;
  isFeatured?: boolean;
  isRecommended?: boolean;
  isEditorChoice?: boolean;
  ratingScore: number; // e.g. 9.4 out of 10 based on aggregated benchmark data
  comparisonHighlights?: string;
}

export interface ReviewArticle {
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  category: ProductCategory;
  readingTime: string;
  summary: string;
  author: string;
  recommendedProducts: string[]; // product IDs
  contentSections: {
    heading: string;
    body: string;
  }[];
}

export interface ClickRecord {
  id: string;
  productId: string;
  productName: string;
  store: string;
  network: AffiliateNetwork;
  timestamp: string;
  targetUrl: string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  affiliateTracking: boolean;
  hasConsented: boolean;
  consentDate?: string;
}
