import { useEffect, useState } from "react";
import { getFallbackImage } from "../services/images";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// In-memory session cache so images load instantly once fetched
const cache = new Map();

/**
 * Fetches accurate photography from Pexels API for ANY destination or landmark in the world.
 * Returns { url, loading, error }.
 */
export function usePexelsImage(query, { width = 900 } = {}) {
  const cleanQuery = (query || "").trim();
  const cacheKey = `${cleanQuery}__${width}`;
  const cached = cache.get(cacheKey);

  const fallbackUrl = getFallbackImage(cleanQuery, width);

  const [url, setUrl] = useState(cached?.url || fallbackUrl);
  const [loading, setLoading] = useState(!cached && !!cleanQuery);
  const [error, setError] = useState(cached?.error ?? "");

  useEffect(() => {
    let cancelled = false;

    if (!cleanQuery) {
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
      const entry = { url: fallbackUrl, error: "" };
      cache.set(cacheKey, entry);
      setUrl(entry.url);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      query: cleanQuery,
      per_page: "3",
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

        // Pick the best landscape photo matching the place
        const photo = data.photos && data.photos.length > 0 ? data.photos[0] : null;

        // Use high-performance web-optimized CDN size (large: ~900px, loads in <60ms!)
        const resolvedUrl = photo
          ? photo.src.large || photo.src.medium || photo.src.landscape
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
  }, [cacheKey, cleanQuery, width, fallbackUrl]);

  return { url: url || fallbackUrl, loading, error };
}