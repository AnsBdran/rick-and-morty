const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);
export const getCharacters = async (query?: string) => {
  const response = await fetch(
    `${API_BASE_URL}/character` + (query ? `?name=${query}` : "")
  );
  console.log("in query", API_BASE_URL);
  return await response.json();
};

export const getCharacterById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  return response.json();
};

export const getEpisodesByIds = async (ids: number[]) => {
  if (ids.length === 0) return [];
  const response = await fetch(`${API_BASE_URL}/episode/${ids.join(",")}`);
  const data = await response.json();
  // API returns single object if one id, array if multiple
  return Array.isArray(data) ? data : [data];
};
