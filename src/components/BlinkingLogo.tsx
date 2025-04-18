import React, { useEffect, useState } from 'react';

const BlinkingLogo: React.FC = () => {
  const title = "Check_Out";
  const [letters, setLetters] = useState<{ char: string; isVisible: boolean }[]>([]);

  useEffect(() => {
    // Инициализация букв
    const initialLetters = title.split('').map(char => ({
      char,
      isVisible: true
    }));
    setLetters(initialLetters);

    // Мигание букв
    const interval = setInterval(() => {
      setLetters(prevLetters => {
        // Выбираем случайную букву для мигания
        const randomIndex = Math.floor(Math.random() * prevLetters.length);
        
        return prevLetters.map((letter, index) => {
          if (index === randomIndex) {
            return { ...letter, isVisible: !letter.isVisible };
          }
          return letter;
        });
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-6xl font-extrabold text-center">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`character ${letter.isVisible ? 'text-quest-orange' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.2s ease-in-out' }}
        >
          {letter.char}
        </span>
      ))}
      <span className="block mt-2 text-3xl text-quest-orange">КВЕСТЫ МГН</span>
    </h1>
  );
};

export default BlinkingLogo;
