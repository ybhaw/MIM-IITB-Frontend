export const state = () => {
  return {
    token : null,
    user: null
  }
};
export const mutations = {
  setToken(state,token) {
    state.token = token;
    localStorage.setItem("token",token);
  },
  setUser(state,user){
    state.user = user;
  },
  setLocalToken(state,token)
  {
    state.token = localStorage.getItem("token");
  }
};

export const getter = {
  get(state){
    return state.token;
  }
};
