
import React, { useState } from 'react';
import { Role, GamePhase, PizzaToppingInstance, PizzaRecipe } from './types';
import { TOPPINGS, PIZZA_RECIPES } from './constants';
import Button from './components/Button';
import PizzaTopping from './components/PizzaTopping';
import ToppingVisual from './components/ToppingVisual';
import { getChefReview } from './geminiService';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(null);
  const [phase, setPhase] = useState<GamePhase>(GamePhase.ROLE_SELECTION);
  const [pizzaToppings, setPizzaToppings] = useState<PizzaToppingInstance[]>([]);
  const [chefReview, setChefReview] = useState<string>('');
  const [showRecipeBook, setShowRecipeBook] = useState<boolean>(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const handleStartGame = (selectedRole: Role) => {
    setRole(selectedRole);
    setPhase(GamePhase.MENU_VIEW);
  };

  const handleToKitchen = () => {
    setPhase(GamePhase.KITCHEN_MAKING);
  };

  const handleBakePizza = () => {
    setPhase(GamePhase.OVEN_BAKING);
    
    const uniqueToppingIds: string[] = Array.from(new Set<string>(pizzaToppings.map(t => t.typeId)));
    
    Promise.all([
      getChefReview(uniqueToppingIds),
      new Promise<void>(resolve => setTimeout(resolve, 3000))
    ]).then(([review]) => {
      setChefReview(review);
      setPhase(GamePhase.PIZZA_READY);
    });
  };

  const resetGame = () => {
    setRole(null);
    setPhase(GamePhase.ROLE_SELECTION);
    setPizzaToppings([]);
    setChefReview('');
    setSelectedRecipeId(null);
    setShowRecipeBook(false);
  };

  const addTopping = (typeId: string) => {
    const newTopping: PizzaToppingInstance = {
      id: Math.random().toString(36).substr(2, 9),
      typeId,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
    };
    setPizzaToppings([...pizzaToppings, newTopping]);
  };

  const removeTopping = (id: string) => {
    setPizzaToppings(pizzaToppings.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto flex flex-col items-center justify-center">
      
      {/* HEADER */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl text-orange-600 mb-2 drop-shadow-sm">Pizza Partner</h1>
        <p className="text-xl text-orange-800 font-semibold">Fun English Learning Game!</p>
      </header>

      {/* PHASE: ROLE SELECTION */}
      {phase === GamePhase.ROLE_SELECTION && (
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center w-full animate-in fade-in zoom-in duration-500">
          <h2 className="text-3xl text-orange-700 mb-8">Choose Your Job!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="group cursor-pointer p-6 rounded-2xl border-4 border-dashed border-orange-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
              onClick={() => handleStartGame('customer')}
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">😋</div>
              <h3 className="text-2xl mb-2">Customer</h3>
              <p className="text-gray-600">Choose a pizza and tell the chef your order!</p>
            </div>
            <div 
              className="group cursor-pointer p-6 rounded-2xl border-4 border-dashed border-red-200 hover:border-red-500 hover:bg-red-50 transition-all"
              onClick={() => handleStartGame('chef')}
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">👨‍🍳</div>
              <h3 className="text-2xl mb-2">Pizza Chef</h3>
              <p className="text-gray-600">Check the menu and make what the customer wants!</p>
            </div>
          </div>
        </div>
      )}

      {/* PHASE: MENU VIEW (Shared but behaves differently) */}
      {phase === GamePhase.MENU_VIEW && (
        <div className="bg-white rounded-3xl p-8 shadow-xl w-full animate-in slide-in-from-right duration-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl text-orange-700">The Pizza Menu 🍕</h2>
            <Button variant="secondary" onClick={handleToKitchen}>Go to Kitchen</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {PIZZA_RECIPES.map(recipe => (
              <div 
                key={recipe.id} 
                className={`p-6 rounded-2xl border-4 transition-all cursor-pointer ${
                  selectedRecipeId === recipe.id ? 'border-orange-500 bg-orange-50 scale-105' : 'border-orange-100 hover:border-orange-300'
                }`}
                onClick={() => setSelectedRecipeId(recipe.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-orange-900">{recipe.name}</h3>
                  <div className="flex space-x-1">
                    {recipe.toppings.slice(0, 3).map(tid => (
                      <ToppingVisual key={tid} typeId={tid} size="sm" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">{recipe.description}</p>
                <div className="bg-white/50 p-2 rounded-lg">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-wider">Ingredients:</p>
                  <p className="text-sm text-orange-900 font-medium">
                    {recipe.toppings.map(tid => TOPPINGS.find(t => t.id === tid)?.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-yellow-100 rounded-xl border-l-4 border-yellow-500 text-yellow-800">
            {role === 'customer' ? (
              <p><strong>Order time!</strong> Tell your partner: "Hello! I would like <strong>{selectedRecipeId ? PIZZA_RECIPES.find(r => r.id === selectedRecipeId)?.name : 'The Classic Red'}</strong>, please!"</p>
            ) : (
              <p><strong>Chef Duty:</strong> Look at the recipes above to memorize what goes on each pizza!</p>
            )}
          </div>
        </div>
      )}

      {/* PHASE: KITCHEN MAKING */}
      {phase === GamePhase.KITCHEN_MAKING && (
        <div className="bg-white rounded-3xl p-8 shadow-xl w-full animate-in slide-in-from-right duration-500 relative min-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl text-orange-700">Pizza Kitchen 🥘</h2>
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setShowRecipeBook(!showRecipeBook)}>
                {showRecipeBook ? 'Close Menu' : 'View Menu'}
              </Button>
              <Button variant="danger" onClick={handleBakePizza} disabled={pizzaToppings.length === 0}>
                Bake Pizza!
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Pizza Board */}
            <div className="relative w-full aspect-square max-w-[400px] bg-[#f5d08b] rounded-full border-[12px] border-orange-800 shadow-inner overflow-hidden mx-auto">
              <div className="absolute inset-5 bg-red-600 rounded-full border-4 border-red-700 opacity-80 shadow-inner"></div>
              <div className="absolute inset-8 bg-[#ffef96] rounded-full border-2 border-[#f6e05e] opacity-95 shadow-lg"></div>
              {pizzaToppings.map(t => (
                <PizzaTopping key={t.id} typeId={t.typeId} x={t.x} y={t.y} onRemove={() => removeTopping(t.id)} />
              ))}
            </div>

            {/* Topping Pantry */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4 text-orange-900">Ingredients Pantry:</h3>
              <div className="grid grid-cols-3 gap-3">
                {TOPPINGS.map(topping => (
                  <button
                    key={topping.id}
                    onClick={() => addTopping(topping.id)}
                    className="flex flex-col items-center p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors shadow-sm active:scale-95 h-24 justify-center"
                  >
                    <ToppingVisual typeId={topping.id} size="md" />
                    <span className="text-xs font-bold mt-2 text-orange-900">{topping.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RECIPE BOOK OVERLAY */}
          {showRecipeBook && (
            <div className="absolute inset-0 bg-white/95 z-50 p-8 rounded-3xl shadow-2xl overflow-y-auto animate-in fade-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-orange-800">Chef's Recipe Book</h3>
                <Button onClick={() => setShowRecipeBook(false)}>Back to Cooking</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PIZZA_RECIPES.map(recipe => (
                  <div key={recipe.id} className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <h4 className="text-xl font-bold text-orange-900 mb-1">{recipe.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {recipe.toppings.map(tid => (
                        <div key={tid} className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full text-sm border border-orange-100">
                          <ToppingVisual typeId={tid} size="sm" />
                          <span className="font-bold">{TOPPINGS.find(t => t.id === tid)?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE: OVEN BAKING */}
      {phase === GamePhase.OVEN_BAKING && (
        <div className="bg-gray-900 rounded-3xl p-12 shadow-2xl w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-500 animate-pulse"></div>
          <h2 className="text-4xl text-orange-400 mb-8 brand-font">Baking in the Oven...</h2>
          <div className="relative inline-block">
             <div className="text-9xl mb-4 float">🔥</div>
          </div>
          <p className="text-xl text-orange-200 mt-8">Wait for the heat! Gemini Chef is reviewing your creation...</p>
        </div>
      )}

      {/* PHASE: PIZZA READY */}
      {phase === GamePhase.PIZZA_READY && (
        <div className="bg-white rounded-3xl p-8 shadow-xl w-full animate-in zoom-in duration-700 text-center">
          <h2 className="text-4xl text-green-600 mb-4 brand-font">Mamma Mia! Delicious!</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="relative w-64 h-64 bg-[#eec26e] rounded-full border-8 border-orange-900 shadow-xl overflow-hidden pizza-spin">
              <div className="absolute inset-4 bg-yellow-500 rounded-full opacity-90 shadow-inner"></div>
              {pizzaToppings.map(t => (
                <div 
                  key={t.id} 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                  <ToppingVisual typeId={t.typeId} size="md" />
                </div>
              ))}
            </div>

            <div className="flex-1 bg-green-50 p-6 rounded-2xl border-4 border-green-200 relative">
               <div className="absolute -top-6 -left-4 text-5xl">👨‍🍳</div>
               <h3 className="text-xl font-bold text-green-800 mb-2 text-left">Chef Gemini says:</h3>
               <p className="text-lg text-green-900 italic font-medium leading-relaxed text-left">
                 "{chefReview}"
               </p>
            </div>
          </div>

          <div className="border-t-2 pt-8">
            <p className="text-xl mb-6 font-bold text-gray-700">Want to play again?</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={resetGame}>Change Roles</Button>
              <Button variant="secondary" onClick={() => {
                setPizzaToppings([]);
                setPhase(GamePhase.MENU_VIEW);
              }}>Order Another Pizza!</Button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 text-orange-900/40 text-sm font-medium">
        Pizza Partner English Academy &copy; 2024
      </footer>
    </div>
  );
};

export default App;
