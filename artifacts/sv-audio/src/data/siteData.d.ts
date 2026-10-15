export type Product = {
  id: string;
  brand: string;
  name: string;
  description: string;
  category: string;
  price?: string;
  image?: string;
};

export type Branch = {
  name: string;
  address: string;
  phones: string[];
  hours: string;
  map: string;
};

export type ContactPhone = {
  display: string;
  tel: string;
};

export type SocialLink = {
  name: string;
  url: string;
};

export const phone: string;
export const whatsappDisplay: string;
export const contactPhones: ContactPhone[];
export const offer: { enabled: boolean; text: string; detail: string };
export const categories: string[];
export const brands: string[];
export const products: Product[];
export const branches: Branch[];
export const social: SocialLink[];
