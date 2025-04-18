import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface QuestCardProps {
  image: string;
  title: string;
  link: string;
  alt: string;
}

const QuestCard: React.FC<QuestCardProps> = ({ image, title, link, alt }) => {
  return (
    <Link to={link}>
      <Card className="w-full h-80 overflow-hidden transition-all duration-300 hover:scale-105 bg-black border-quest-yellow">
        <CardContent className="p-0 h-full flex flex-col items-center justify-center">
          <div className="relative w-full h-3/4 overflow-hidden">
            <img 
              src={image || '/placeholder.svg'} 
              alt={alt} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-1/4 flex items-center justify-center bg-quest-black">
            <h3 className="text-xl font-bold text-quest-orange text-center px-4">{title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuestCard;
