import React, { useEffect, useRef } from 'react';

const SmokeEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        
        // Размер частицы
        this.radius = Math.random() * 40 + 20;
        
        // Оттенок серого с альфа-каналом
        const grayValue = Math.floor(Math.random() * 40 + 150); // Значение от 150 до 190
        this.color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0.1)`;
        
        // Скорость движения
        this.velocity = {
          x: (Math.random() - 0.5) * 0.3,
          y: -Math.random() * 0.5 - 0.1
        };
        
        // Время жизни
        this.life = Math.random() * 100 + 100;
        
        // Прозрачность
        this.opacity = Math.random() * 0.3 + 0.1;
        
        // Размытие
        this.blur = Math.random() * 2 + 1;
      }

      // Обновление позиции и состояния частицы
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;
        this.opacity -= 0.001;
        
        // Добавляем случайное движение
        this.x += (Math.random() - 0.5) * 0.3;
        this.velocity.x += (Math.random() - 0.5) * 0.01;
        this.velocity.y += (Math.random() - 0.5) * 0.01;
        
        // Логика увеличения размера по мере подъема
        this.radius += 0.05;
      }

      // Отрисовка частицы
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.beginPath();
        
        // Создаем радиальный градиент для реалистичности
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        
        const grayValue = parseInt(this.color.split(',')[0].split('(')[1]);
        gradient.addColorStop(0, `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0)`);
        
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

    // Функция добавления новых частиц
    const addSmoke = () => {
      if (particles.length < 50) { // Ограничиваем количество частиц
        particles.push(new SmokeParticle());
      }
    };

    // Функция анимации
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Добавляем новые частицы с определенной вероятностью
      if (Math.random() > 0.9) {
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default SmokeEffect;
