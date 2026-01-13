
import React from 'react';
import { TOPPINGS } from '../constants';
import ToppingVisual from './ToppingVisual';

interface PizzaToppingProps {
  typeId: string;
  x: number;
  y: number;
  onRemove: () => void;
}

const PizzaTopping: React.FC<PizzaToppingProps> = ({ typeId, x, y, onRemove }) => {
  const topping = TOPPINGS.find(t => t.id === typeId);
  if (!topping) return null;

  return (
    <div 
      className="absolute cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 select-none z-10 hover:scale-110 transition-transform"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={`Remove ${topping.name}`}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
    >
      <ToppingVisual typeId={typeId} size="lg" />
    </div>
  );
};

export default PizzaTopping;
