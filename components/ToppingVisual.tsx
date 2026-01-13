
import React from 'react';

interface ToppingVisualProps {
  typeId: string;
  size?: 'sm' | 'md' | 'lg';
}

const ToppingVisual: React.FC<ToppingVisualProps> = ({ typeId, size = 'md' }) => {
  const sizeClasses = {
    sm: 'scale-50',
    md: 'scale-75',
    lg: 'scale-100',
  };

  const renderTopping = () => {
    switch (typeId) {
      case 'pepperoni':
        return (
          <div className="w-10 h-10 bg-red-600 rounded-full border-2 border-red-800 shadow-md flex items-center justify-center overflow-hidden">
            <div className="absolute w-1 h-1 bg-red-900 rounded-full top-2 left-3 opacity-30"></div>
            <div className="absolute w-2 h-2 bg-red-900 rounded-full bottom-2 right-2 opacity-20"></div>
            <div className="absolute w-1.5 h-1.5 bg-red-900 rounded-full top-5 right-3 opacity-25"></div>
          </div>
        );
      case 'mushroom':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-7 bg-stone-200 rounded-t-full border-b-2 border-stone-300 shadow-sm relative">
              <div className="absolute top-1 left-3 w-2 h-1 bg-stone-300 rounded-full opacity-40"></div>
            </div>
            <div className="w-4 h-5 bg-stone-300 rounded-b-md"></div>
          </div>
        );
      case 'olive':
        return (
          <div className="w-6 h-6 rounded-full border-[7px] border-stone-900 shadow-sm"></div>
        );
      case 'pepper':
        return (
          <div className="w-10 h-10 border-4 border-green-500 rounded-2xl rotate-12 flex items-center justify-center bg-green-500/10">
            <div className="w-4 h-4 border-2 border-green-400 rounded-full opacity-40"></div>
          </div>
        );
      case 'pineapple':
        return (
          <div className="w-8 h-8 bg-yellow-400 rounded-sm rotate-[15deg] border-b-4 border-r-2 border-yellow-600 shadow-sm flex items-center justify-center">
            <div className="w-full h-[1px] bg-yellow-500 rotate-45 opacity-30"></div>
            <div className="w-full h-[1px] bg-yellow-500 -rotate-45 opacity-30"></div>
          </div>
        );
      case 'ham':
        return (
          <div className="w-10 h-8 bg-pink-300 rounded-md border-b-4 border-pink-400 shadow-sm flex flex-col justify-around py-1">
            <div className="w-full h-[1px] bg-pink-400 opacity-40"></div>
            <div className="w-full h-[1px] bg-pink-400 opacity-40"></div>
          </div>
        );
      case 'onion':
        return (
          <div className="w-12 h-12 rounded-full border-[3px] border-purple-300 flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 rounded-full border-2 border-purple-200 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-[1px] border-purple-100"></div>
            </div>
          </div>
        );
      case 'corn':
        return (
          <div className="w-4 h-5 bg-yellow-400 rounded-full border-b-2 border-yellow-600 shadow-sm"></div>
        );
      case 'basil':
        return (
          <div className="w-8 h-12 bg-green-700 rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] rotate-45 border-l-2 border-green-800 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-green-900 opacity-40"></div>
          </div>
        );
      default:
        return <div className="w-8 h-8 bg-gray-300 rounded-full"></div>;
    }
  };

  return (
    <div className={`transition-transform duration-300 ${sizeClasses[size]}`}>
      {renderTopping()}
    </div>
  );
};

export default ToppingVisual;
