export async function fetchFromAPI<T>(
  endpoint: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    cache: 'no-store',
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request to ${endpoint} failed (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<T>;
}
