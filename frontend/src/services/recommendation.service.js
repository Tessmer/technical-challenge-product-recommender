// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const { selectedFeatures, selectedPreferences, selectedRecommendationType } =
    formData;

  const scoredProducts = products
    .map((product) => {
      const preferenceMatches =
        product.preferences?.filter((preference) =>
          selectedPreferences.includes(preference)
        ).length || 0;
      const featureMatches =
        product.features?.filter((feature) =>
          selectedFeatures?.includes?.(feature)
        ).length || 0;

      const score = preferenceMatches + featureMatches;

      return { ...product, score };
    })
    .filter((product) => product.score > 0);

  if (selectedRecommendationType === 'MultipleProducts') {
    return scoredProducts.sort((a, b) => b.score - a.score);
  }

  if (selectedRecommendationType === 'SingleProduct') {
    const maxScore = Math.max(...scoredProducts.map((p) => p.score));

    const bestMatch = [...scoredProducts]
      .reverse()
      .find((product) => product.score === maxScore);

    return bestMatch ? [bestMatch] : [];
  }
  return [];
};

const recommendationService = {
  getRecommendations,
};

export default recommendationService;
