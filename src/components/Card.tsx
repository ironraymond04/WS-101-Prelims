import type { ReactNode } from "react";

interface CardProps {
  title: string;
  imageUrl?: string | null;
  children?: ReactNode;
  onClick?: () => void;
}

export function Card({ title, imageUrl, children, onClick }: CardProps) {
  return (
    <div
      className="card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {imageUrl && <img className="card__image" src={imageUrl} alt={title} />}
      <h3 className="card__title">{title}</h3>
      {children && <div className="card__body">{children}</div>}
    </div>
  );
}
