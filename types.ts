
export type Role = 'customer' | 'chef' | null;

export enum GamePhase {
  ROLE_SELECTION = 'ROLE_SELECTION',
  MENU_VIEW = 'MENU_VIEW',
  KITCHEN_MAKING = 'KITCHEN_MAKING',
  OVEN_BAKING = 'OVEN_BAKING',
  PIZZA_READY = 'PIZZA_READY'
}

export interface ToppingType {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface PizzaToppingInstance {
  id: string;
  typeId: string;
  x: number;
  y: number;
}

export interface PizzaRecipe {
  id: string;
  name: string;
  description: string;
  toppings: string[]; // array of topping IDs
}
