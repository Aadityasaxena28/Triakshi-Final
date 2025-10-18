
export interface RawProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  discount?: number;         // optional if backend may omit
  image?: string;
  images?:string[];
  type: string;             //class:subclass
  availability: string; // allow unknown strings without breaking
  category: string;
  rating?:number;
  // braodcategory: string;
  created_at: string;        // ISO datetime string from API
  description?: string;
  // Not being used currently
  // weight?: number; 
  benefits?: string[];    // optional array of benefits
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;          // defaulted to 0 if missing
  image?: string;
  images?:string[];
  availability:string;
  rating:number;
  // braodcategory: string;
  type: string;
  category: string;
  createdAt: Date;
  description: string;       // defaulted to ""
  // Not being used currently
  // weight?: number; 
  benefits?: string[];    // optional array of benefits
}
export function toProduct(raw: RawProduct): Product {
  return {
    id: raw._id,
    name: raw.name,
    price: raw.price,
    quantity: raw.quantity,
    discount: raw.discount ?? 0,
    image: raw.image,
    images: raw.images,
    availability: raw.availability,
    category: raw.category,
    rating:raw.rating??5,
    // braodcategory: raw.braodcategory,
    type: raw.type,
    createdAt: new Date(raw.created_at),
    description: raw.description ?? "",
    // weight: raw.weight,
    benefits: raw.benefits,
  };
}


