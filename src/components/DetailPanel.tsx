import { useFetch } from "../hooks/useFetch";
import type { PokemonDetail } from "../types/api";

interface DetailPanelProps {
  name: string;
  onClose: () => void;
}

export function DetailPanel({ name, onClose }: DetailPanelProps) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const state = useFetch<PokemonDetail>(url);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="detail-panel__close"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        {(state.status === "idle" || state.status === "loading") && (
          <p className="detail-panel__loading">Loading {name}…</p>
        )}

        {state.status === "error" && (
          <p className="detail-panel__loading">
            Couldn't load {name}: {state.error}
          </p>
        )}

        {state.status === "success" && (
          <DetailContent pokemon={state.data} />
        )}
      </div>
    </div>
  );
}

function DetailContent({ pokemon }: { pokemon: PokemonDetail }) {
  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <>
      {artwork && (
        <img className="detail-panel__image" src={artwork} alt={pokemon.name} />
      )}
      <h2 className="detail-panel__name">
        {pokemon.name} <span>#{pokemon.id}</span>
      </h2>
      <div className="detail-panel__types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="detail-panel__meta">
        <span>Height: {pokemon.height / 10} m</span>
        <span>Weight: {pokemon.weight / 10} kg</span>
        <span>Base XP: {pokemon.base_experience}</span>
      </div>
      <ul className="detail-panel__stats">
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>
            <span className="detail-panel__stat-label">{s.stat.name}</span>
            <span className="detail-panel__stat-bar">
              <span
                className="detail-panel__stat-fill"
                style={{ width: `${Math.min(s.base_stat, 100)}%` }}
              />
            </span>
            <span className="detail-panel__stat-value">{s.base_stat}</span>
          </li>
        ))}
      </ul>
    </>
  );
}