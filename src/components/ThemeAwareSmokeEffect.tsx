import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

type SmokeTheme = 'default' | 'acid' | 'gold';

const ThemeAwareSmokeEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  const [smokeTheme, setSmokeTheme] = useState<SmokeTheme>('default');

  // Задаем тему дыма на основе текущего маршрута
  useEffect(() => {
    if (location.pathname === '/danger-zone') {
      setSmokeTheme('acid');
    } else if (location.pathname === '/artifact-quest') {
      setSmokeTheme('gold');
    } else {
      setSmokeTheme('default');
    }
  }, [location]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размер канваса равным размеру окна
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Инициализация канваса
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Класс для частиц дыма
    class SmokeParticle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      life: number;
      opacity: number;
      blur: number;

      constructor() {
        // Начальное положение - случайное по ширине, внизу экрана или сбоку
        const side = Math.random() > 0.5;
        if (side) {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + Math.random() * 20;
        } else {
          this.x = Math.random() > 0.5 ? -20 : canvas.width + 20;
          this.y = Math.random() * canvas.height;
        }
        
        // Размер частицы (значительно увеличим для большей заметности)
        this.radius = Math.random() * 90 + 60; // Еще больше увеличенные размеры
        
        // Цвет в зависимости от темы с повышенной непрозрачностью
        const alpha = Math.random() * 0.3 + 0.25; // Увеличили непрозрачность еще больше
        
        if (smokeTheme === 'acid') {
          // Кислотно-зеленый цвет (более яркий)
          const green = Math.floor(Math.random() * 55) + 200; // Яркий зеленый
          this.color = `rgba(100, ${green}, 50, ${alpha})`;
        } else if (smokeTheme === 'gold') {
          // Золотой цвет (более насыщенный)
          const gold = Math.floor(Math.random() * 30) + 215; // Золотой оттенок
          this.color = `rgba(${gold}, ${Math.floor(gold * 0.8)}, 0, ${alpha})`;
        } else {
          // Серый дым с большей насыщенностью и контрастностью
          const grayValue = Math.floor(Math.random() * 40 + 150); // Темнее серый для большего контраста
          this.color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${alpha})`;
        }
        
        // Скорость движения (слегка увеличена)
        this.velocity = {
          x: (Math.random() - 0.5) * 0.5, // Еще больше увеличили скорость по X
          y: -Math.random() * 0.7 - 0.3   // Еще больше увеличили скорость по Y
        };
        
        // Время жизни
        this.life = Math.random() * 180 + 180; // Увеличенное время жизни
        
        // Прозрачность
        this.opacity = Math.random() * 0.5 + 0.3; // Еще больше увеличенная прозрачность
        
        // Размытие
        this.blur = Math.random() * 4 + 3; // Еще больше увеличенное размытие
      }

      // Обновление позиции и состояния частицы
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;
        this.opacity -= 0.0006; // Еще больше замедлили исчезновение
        
        // Добавляем более выраженное случайное движение
        this.x += (Math.random() - 0.5) * 0.8;
        this.velocity.x += (Math.random() - 0.5) * 0.02;
        this.velocity.y += (Math.random() - 0.5) * 0.02;
        
        // Логика увеличения размера по мере подъема
        this.radius += 0.12;
      }

      // Отрисовка частицы с более выраженным эффектом
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.beginPath();
        
        // Создаем радиальный градиент для реалистичности
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        
        // Разбираем цвет на компоненты
        const colorParts = this.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (colorParts) {
          const r = parseInt(colorParts[1]);
          const g = parseInt(colorParts[2]);
          const b = parseInt(colorParts[3]);
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
          gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.6})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        }
        
        ctx.filter = `blur(${this.blur}px)`;
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Проверка, жива ли еще частица
      isDead() {
        return this.life <= 0 || this.y < -this.radius * 2 || this.opacity <= 0;
      }
    }

    // Массив для хранения частиц дыма
    const particles: SmokeParticle[] = [];

    // Сразу добавляем некоторое количество дыма при инициализации
    for (let i = 0; i < 20; i++) {
      particles.push(new SmokeParticle());
    }

    // Функция добавления новых частиц
    const addSmoke = () => {
      if (particles.length < 80) { // Еще больше увеличили максимальное количество частиц
        particles.push(new SmokeParticle());
      }
    };

    // Функция анимации
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Добавляем новые частицы с определенной вероятностью
      if (Math.random() > 0.8) { // Еще увеличили частоту появления
        addSmoke();
      }
      
      // Обновляем и отрисовываем каждую частицу
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Удаляем "мертвые" частицы
        if (particles[i].isDead()) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    };

    // Запускаем анимацию
    animate();

    // Очистка при размонтировании компонента
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [smokeTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.9 }} // Еще больше увеличили непрозрачность
    />
  );
};

export default ThemeAwareSmokeEffect;
