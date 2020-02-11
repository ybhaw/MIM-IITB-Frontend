export const state = () => {
  return {
    crudApp : {
      name : null,
      data : null,
      allHeaders: [],
      ignoredHeaders : ["isDeleted", "createdAt", "updatedAt"],
      ignoredHeadersRoot: ["isDeleted", "createdAt", "updatedAt"],
      headers: []
    }
  }
};

export const mutations = {
  crudUpdate : function(state, obj){
    if(obj.data==undefined) return;
    state.crudApp.name = obj.name;
    state.crudApp.data = obj.data;
    if(obj.data.length == 0)
      state.crudApp.headers = [];
    else
    {
      let keys = Object.keys(obj.data[0]);
      state.crudApp.allHeaders = keys;
      let ignored = [...new Set([...state.crudApp.ignoredHeadersRoot,...obj.ignoredHeaders])];
      state.crudApp.ignoredHeaders = ignored;
      state.crudApp.headers = keys.filter(c=>ignored.indexOf(c)<0);
    }
  }
};

export const getter = {

};

export const actions = {

};
