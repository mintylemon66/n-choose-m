
import React, { useState, useEffect } from 'react';

const PascalsTriangle = () => {
  const [triangle, setTriangle] = useState<number[][]>([]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-blue-900 mb-2">Pascal's Triangle</h1>
          <p className="text-blue-700">Rows 1-31</p>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          {triangle.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex items-center justify-center space-x-1 md:space-x-2"
              style={{
                animation: `fadeIn 0.5s ease-in-out ${rowIndex * 0.05}s both`
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
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PascalsTriangle;
