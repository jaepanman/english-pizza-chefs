
import { ToppingType, PizzaRecipe } from './types';

export const TOPPINGS: ToppingType[] = [
  { id: 'pepperoni', name: 'Pepperoni', emoji: '🍕', color: 'bg-red-500', description: 'Spicy red circles.' },
  { id: 'mushroom', name: 'Mushroom', emoji: '🍄', color: 'bg-stone-300', description: 'Little white umbrellas.' },
  { id: 'olive', name: 'Black Olives', emoji: '🫒', color: 'bg-stone-800', description: 'Salty black rings.' },
  { id: 'pepper', name: 'Bell Pepper', emoji: '🫑', color: 'bg-green-500', description: 'Crunchy green slices.' },
  { id: 'pineapple', name: 'Pineapple', emoji: '🍍', color: 'bg-yellow-400', description: 'Sweet yellow chunks.' },
  { id: 'ham', name: 'Ham', emoji: '🥓', color: 'bg-pink-300', description: 'Pink salty meat.' },
  { id: 'onion', name: 'Onion', emoji: '🧅', color: 'bg-purple-200', description: 'Purple veggie rings.' },
  { id: 'corn', name: 'Corn', emoji: '🌽', color: 'bg-yellow-200', description: 'Small sweet yellow seeds.' },
  { id: 'basil', name: 'Basil Leaf', emoji: '🍃', color: 'bg-green-600', description: 'Fresh green herb.' },
];

export const PIZZA_RECIPES: PizzaRecipe[] = [
  {
    id: 'classic_red',
    name: 'The Classic Red',
    description: 'A traditional favorite with spicy pepperoni, mushrooms, and fresh basil.',
    toppings: ['pepperoni', 'mushroom', 'basil']
  },
  {
    id: 'tropical_island',
    name: 'Tropical Island',
    description: 'Sweet and salty! This one has pineapple, ham, and sweet corn.',
    toppings: ['pineapple', 'ham', 'corn']
  },
  {
    id: 'garden_party',
    name: 'Garden Party',
    description: 'A veggie delight with bell peppers, mushrooms, onions, and black olives.',
    toppings: ['pepper', 'mushroom', 'onion', 'olive']
  },
  {
    id: 'cheesy_morning',
    name: 'The Cheesy Morning',
    description: 'Perfect for any time. Made with ham, corn, and purple onions.',
    toppings: ['ham', 'corn', 'onion']
  },
  {
    id: 'spicy_forest',
    name: 'Spicy Forest',
    description: 'Bold flavors! Pepperoni, mushrooms, bell peppers, and olives.',
    toppings: ['pepperoni', 'mushroom', 'pepper', 'olive']
  },
  {
    id: 'green_herb',
    name: 'The Herb Garden',
    description: 'Light and fresh with basil leaves, onions, olives, and bell peppers.',
    toppings: ['basil', 'onion', 'olive', 'pepper']
  }
];
