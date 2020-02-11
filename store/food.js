export const state = () => {
  return {
    create: {
      name : "Rajma",
      expirable: false,
      foodTypes : []
    },
    foodTypeTemplate: {
      name : null,
      brand: null,
      expirable : false,
      value : 0
    }
  }
};

export const mutation = {
  addFoodType: function (state) {
    state.create.foodTypes.push(Object.assign({}, state.foodTypeTemplate));
  },
  removeFoodType: function (state) {
    state.create.foodTypes.pop();
  }
};
