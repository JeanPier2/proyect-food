import {
  startGetData,
  getRecipes,
  getRecipesDetails,
  getDiets,
  errorGetData,
} from './spoonacularSlice';

export const apiGetRecipes = (dispatch) => {
  dispatch(startGetData());
  try {
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => dispatch(getRecipes(data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipesAsc = (dispatch) => {
  dispatch(startGetData());
  try {
    fetch('http://localhost:3001/recipes/asc')
      .then((res) => res.json())
      .then((data) => dispatch(getRecipes(data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipesDesc = (dispatch) => {
  dispatch(startGetData());
  try {
    fetch('http://localhost:3001/recipes/desc')
      .then((res) => res.json())
      .then((data) => dispatch(getRecipes(data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipesByDiet = (dispatch, diets) => {
  dispatch(startGetData());
  try {
    fetch(`http://localhost:3001/recipes/diet/${diets}`)
      .then((res) => res.json())
      .then((data) => dispatch(getRecipes(data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipeScore = (dispatch, order) => {
  dispatch(startGetData());
  console.log('Entre a getRecipeScore');
  try {
    fetch('http://localhost:3001/recipes/')
      .then((res) => res.json())
      .then((data) => {
        let recipeScore = [];
        if (order === 'highScoreASC') {
          recipeScore = data.sort(function (x, y) {
            if (x.healthScore > y.healthScore) {
              return -1;
            }
            if (x.healthScore < y.healthScore) {
              return 1;
            }
            return 0;
          });
        } else if (order === 'highScoreDESC') {
          recipeScore = data.sort(function (x, y) {
            if (x.healthScore < y.healthScore) {
              return -1;
            }
            if (x.healthScore > y.healthScore) {
              return 1;
            }
            return 0;
          });
        }
        dispatch(getRecipes(recipeScore));
      });
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiSearchRecipes = (dispatch, title) => {
  dispatch(startGetData());
  try {
    fetch(`http://localhost:3001/recipes/search/${title}`)
      .then((res) => res.json())
      .then((data) => dispatch(getRecipes(data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiRecipeById = (dispatch, id) => {
  dispatch(startGetData());
  try {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch(getRecipesDetails(data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetDiets = (dispatch) => {
  dispatch(startGetData());
  try {
    fetch('http://localhost:3001/type/diets')
      .then((res) => res.json())
      .then((data) => dispatch(getDiets(data.typeDiets)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const postRecipe = (dispatch, data) => {
  dispatch(startGetData());
  try {
    fetch('http://localhost:3001/recipes/createRecipe', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    dispatch(errorGetData());
  }
};
