import { useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { SearchBar } from "./components/SearchBar";
import { ItemList } from "./components/ItemList";
import { DetailPanel } from "./components/DetailPanel";
import type { PokemonListResponse } from "./types/api";
import "./App.css";

const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

function AppContent() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const listState = useFetch<PokemonListResponse>(LIST_URL);

  const filteredItems = useMemo(() => {
    if (listState.status !== "success") return [];
    const query = search.trim().toLowerCase();
    if (!query) return listState.data.results;
    return listState.data.results.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [listState, search]);

  return (
    <div className={`app app--${theme}`}>
<header className="app__header">
        <div className="app__header-top">
          <h1>Pokémon Explorer</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      <main className="app__main">
        <section className="app__list">
          {listState.status === "loading" && <p>Loading Pokémon…</p>}
          {listState.status === "error" && (
            <p className="app__error">Failed to load list: {listState.error}</p>
          )}
          {listState.status === "success" && (
            <ItemList
              items={filteredItems}
              onSelect={setSelected}
              selectedName={selected}
            />
          )}
        </section>
      </main>

      {selected && (
        <DetailPanel name={selected} onClose={() => setSelected(null)} />
      )}

      <footer className="app__footer">
        Developed by: Raymond Christian A. Galanza<br />
        A WS101 - 80104 Prelim Project 
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
