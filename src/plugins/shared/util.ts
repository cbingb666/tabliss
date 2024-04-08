
export const getIcon = (domain: string, size = 32) => {
  return `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=${32}`
}

export const getDomain = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch (e) {
    return null;
  }
};
