export interface ServiceInfo {
  id: number;
  provider: {
    id: number;
    username: string;
    email: string;
    phone: string;
    first_name: null;
    last_name: null | string;
    role: string;
    avatar: null;
  };
  title: string;
  description: string;
  experience: 5;
  place_of_provision: string;
  type: Array<number>;
  price: object;
  status: number;
  images: {
    id: number;
    image: string;
  }[];
  salon_name: string;
  address: string;
  avg_rating: null | number;
  comments_quantity: number;
  created_at: string;
  updated_a: string;
  is_favorited: boolean;
  price_list_entries: { id: number; title: string; price: number }[];
  title_photo?: {
    id: string
    image: string | null
    title_photo: boolean;
  }
}
