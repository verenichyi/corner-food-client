export type FoodType = {
  _id: string;
  value: string;
};

export interface FoodModel {
  _id: string;
  tags: string[];
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: number;
  deliverTime: number;
  price: number;
  favoriteFoodForUserIds: string[];
}

export interface SearchFood {
  searchValue: string;
  foodType: string;
}
