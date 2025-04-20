import React, { useEffect, useState } from 'react';

const BlinkingLogo: React.FC = () => {
  const [blinkingStates, setBlinkingStates] = useState<boolean[]>(Array(9).fill(true));
  
  // Буквы логотипа Check_Out (9 символов)
  const letters = ['C', 'h', 'e', 'c', 'k', '_', 'O', 'u', 't'];
  
  useEffect(() => {
    // Функция для случайного мигания букв
    const blinkLetters = () => {
      const randomIndex = Math.floor(Math.random() * letters.length);
      
      setBlinkingStates(prev => {
        const newState = [...prev];
        newState[randomIndex] = false; // Выключаем букву
        
        // Устанавливаем таймер для включения буквы обратно
        setTimeout(() => {
          setBlinkingStates(prevState => {
            const restoreState = [...prevState];
            restoreState[randomIndex] = true;
            return restoreState;
          });
        }, Math.random() * 500 + 100); // Буква будет выключена от 100 до 600 мс
        
        return newState;
      });
    };
    
    // Запускаем мигание с интервалом
    const intervalId = setInterval(() => {
      // Случайно определяем, будет ли мигание в этот раз
      if (Math.random() > 0.3) { // 70% шанс мигания в каждый интервал
        blinkLetters();
      }
    }, 1000); // Проверяем каждую секунду
    
    // Иногда делаем "короткое замыкание" - несколько букв мигают одновременно
    const shortCircuitInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% шанс короткого замыкания
        const numFlickers = Math.floor(Math.random() * 3) + 2; // 2-4 буквы
        
        // Создаем массив случайных индексов
        const indices: number[] = [];
        while (indices.length < numFlickers) {
          const idx = Math.floor(Math.random() * letters.length);
          if (!indices.includes(idx)) {
            indices.push(idx);
          }
        }
        
        // Выключаем выбранные буквы
        setBlinkingStates(prev => {
          const newState = [...prev];
          indices.forEach(idx => {
            newState[idx] = false;
          });
          return newState;
        });
        
        // Быстро мигаем несколько раз
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
          setBlinkingStates(prev => {
            const newState = [...prev];
            indices.forEach(idx => {
              newState[idx] = !prev[idx];
            });
            return newState;
          });
          
          flickerCount++;
          if (flickerCount >= 5) { // 5 миганий
            clearInterval(flickerInterval);
            
            // Восстанавливаем все буквы
            setTimeout(() => {
              setBlinkingStates(Array(9).fill(true));
            }, 200);
          }
        }, 100);
      }
    }, 5000); // Проверяем каждые 5 секунд
    
    return () => {
      clearInterval(intervalId);
      clearInterval(shortCircuitInterval);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="relative">
        <h1 className="text-6xl sm:text-8xl font-bold text-transparent mb-2">
          <span className="flex">
            {letters.map((letter, index) => (
              <span 
                key={index} 
                className={`
                  transition-all duration-100 
                  ${blinkingStates[index] 
                    ? 'text-quest-orange neon-text' 
                    : 'text-gray-800 opacity-20'}
                `}
                style={{
                  textShadow: blinkingStates[index] 
                    ? '0 0 5px #FF6B00, 0 0 10px #FF6B00, 0 0 15px #FF6B00, 0 0 20px #FF6B00, 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #fff' 
                    : 'none',
                  WebkitTextStroke: '1px #fff',
                  textStroke: '1px #fff'
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>
        
        <div className="absolute bottom-0 left-0 w-full h-px bg-quest-orange glow-line"></div>
      </div>
      
      <h2 className="text-xl sm:text-2xl text-quest-yellow mt-4 font-semibold">
        Квесты в реальности
      </h2>
    </div>
  );
};

export default BlinkingLogo;
