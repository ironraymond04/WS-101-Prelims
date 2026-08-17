import { useEffect, useReducer } from "react";
import type { FetchState } from "../types/api";

// Actions that can be dispatched against the fetch state machine.
type FetchAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; error: string };

function fetchReducer<T>(
  _state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", data: action.payload };
    case "FETCH_ERROR":
      return { status: "error", error: action.error };
    default:
      return _state;
  }
}

/**
 * Generic data-fetching hook.
 * `T` is the shape of the successfully-fetched payload.
 *
 * Returns a discriminated union (`FetchState<T>`) so consumers can
 * narrow on `.status` before touching `.data` or `.error`, e.g.:
 *
 *   const state = useFetch<PokemonDetail>(url);
 *   if (state.status === "success") state.data.name // typed, safe
 */
export function useFetch<T>(url: string | null): FetchState<T> {
  const [state, dispatch] = useReducer(
    fetchReducer<T>,
    { status: "idle" } as FetchState<T>
  );

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function run() {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await fetch(url as string, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const json: unknown = await res.json();
        dispatch({ type: "FETCH_SUCCESS", payload: json as T });
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return; // request was cancelled, ignore
        }
        const message = err instanceof Error ? err.message : "Unknown error";
        dispatch({ type: "FETCH_ERROR", error: message });
      }
    }

    run();

    return () => controller.abort();
  }, [url]);

  return state;
}
