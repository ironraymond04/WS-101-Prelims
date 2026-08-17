import type { PokemonListItem } from "../types/api";
import { Card } from "./Card";

// Extracts the numeric Pokémon ID from its PokéAPI resource URL,
// e.g. "https://pokeapi.co/api/v2/pokemon/25/" -> "25"
function idFromUrl(url: string): string {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? match[1] : "0";
}

function spriteUrl(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

interface ItemListProps {
  items: PokemonListItem[];
  onSelect: (name: string) => void;
  selectedName?: string | null;
}

export function ItemList({ items, onSelect, selectedName }: ItemListProps) {
  if (items.length === 0) {
    return <p className="item-list__empty">No Pokémon match your search.</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => {
        const id = idFromUrl(item.url);
        return (
          <Card
            key={item.name}
            title={item.name}
            imageUrl={spriteUrl(id)}
            onClick={() => onSelect(item.name)}
          >
            <span
              className={
                selectedName === item.name
                  ? "item-list__tag item-list__tag--active"
                  : "item-list__tag"
              }
            >
              #{id}
            </span>
          </Card>
        );
      })}
    </div>
  );
}
