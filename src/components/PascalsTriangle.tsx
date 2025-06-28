
import React, { useState, useEffect } from 'react';
import { useViewCount } from '@/hooks/useViewCount';

const PascalsTriangle = () => {
  const [triangle, setTriangle] = useState<number[][]>([]);
  const { viewCount, loading } = useViewCount('/');

  useEffect(() => {
    const generateTriangle = () => {
      const result: number[][] = [];
      
      for (let row = 0; row < 31; row++) {
        const currentRow: number[] = [];
        
        for (let col = 0; col <= row; col++) {
          if (col === 0 || col === row) {
            currentRow.push(1);
          } else {
            const prevRow = result[row - 1];
            currentRow.push(prevRow[col - 1] + prevRow[col]);
          }
        }
        
        result.push(currentRow);
      }
      
      return result;
    };

    setTriangle(generateTriangle());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-blue-900 mb-2">Pascal's Triangle</h1>
          <p className="text-blue-700">Rows 1-31</p>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          {triangle.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex items-center justify-center space-x-1 md:space-x-2 opacity-0 animate-fade-in"
              style={{
                animationDelay: `${rowIndex * 0.05}s`,
                animationFillMode: 'both'
              }}
            >
              {row.map((number, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-lg 
                           shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200
                           flex items-center justify-center min-w-[2.5rem] h-10 md:min-w-[3rem] md:h-12
                           text-blue-900 font-medium text-sm md:text-base"
                >
                  {number}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-blue-400/60 font-mono">
        {loading ? '...' : viewCount.toLocaleString()} views
      </div>
    </div>
  );
};

export default PascalsTriangle;
