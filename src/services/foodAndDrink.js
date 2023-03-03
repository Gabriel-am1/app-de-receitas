const BASE_URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchRecipes = async (searchType, searchWord, category) => {
  const pathOption = searchType.option === 'ingredient' ? 'filter' : 'search';
  const categoryUrl = category === 'meals' ? BASE_URL_FOOD : BASE_URL_DRINK;

  const response = await fetch(
    `${categoryUrl}${pathOption}.php?${searchType.letter}=${searchWord}`,
  );

  const data = await response.json();

  if (data[category] === null) {
    throw new Error('Not found');
  }

  return data[category];
};
