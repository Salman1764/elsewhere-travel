import { useEffect, useState } from "react";
import { getFallbackImage } from "../services/images";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// Module-level cache: the same query is only ever fetched once per
// session, even if the component that asked for it unmounts and
// remounts (e.g. navigating back to a destination page).
const cache = new Map();

/**
 * Fetches a photo URL from the Pexels Search API for a given query.
 * Returns { url, loading, error }. `url` always has a usable value
 * (real photo or curated fallback), so callers never need their own fallback.
 */
export function usePexelsImage(query, { width = 1400 } = {}) {
  const cacheKey = `${query}__${width}`;
  const cached = cache.get(cacheKey);

  const fallbackUrl = getFallbackImage(query, width);

  // Initialize immediately with cached or instant high-speed CDN photo
  // Eliminates blank/late loading states completely!
  const [url, setUrl] = useState(cached?.url || fallbackUrl);
  const [loading, setLoading] = useState(!cached && !fallbackUrl);
  const [error, setError] = useState(cached?.error ?? "");

  useEffect(() => {
    let cancelled = false;

    if (!query) {
      setLoading(false);
      return;
    }

    if (cache.has(cacheKey)) {
      const entry = cache.get(cacheKey);
      setUrl(entry.url);
      setError(entry.error || "");
      setLoading(false);
      return;
    }

    if (!API_KEY) {
      const entry = {
        url: fallbackUrl,
        error: "",
      };
      cache.set(cacheKey, entry);
      setUrl(entry.url);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      query,
      per_page: "1",
      orientation: "landscape",
    });

    fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Pexels request failed (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;

        const photo = data.photos && data.photos[0];
        const resolvedUrl = photo
          ? `${photo.src.landscape}&w=${width}`
          : fallbackUrl;

        const entry = { url: resolvedUrl, error: "" };
        cache.set(cacheKey, entry);
        setUrl(entry.url);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;

        const entry = { url: fallbackUrl, error: err.message };
        cache.set(cacheKey, entry);
        setUrl(entry.url);
        setError(entry.error);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cacheKey, query, width, fallbackUrl]);

  return { url: url || fallbackUrl, loading, error };
}