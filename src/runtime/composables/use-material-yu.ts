export const useMaterialYu = () => {
  const toToken = (systemToken: string, componentToken?: string) => {
    if (componentToken) {
      return `var(--${componentToken.replace(/\./g, '-')}, var(--${systemToken.replace(/\./g, '-')}))`;
    } else {
      return `var(--${systemToken.replace(/\./g, '-')})`;
    }
  };

  return {
    toToken,
  };
};
