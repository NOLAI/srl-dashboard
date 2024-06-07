export default {
  namespaced: false,
  state() {
    return {
      essays: [],
      selectedEssays: []
    }
  },
  getters: {
    essays: (state) => {
      return state.essays
    },
    selectedEssays: (state) => {
      return state.selectedEssays
    }
  },
  actions: {
    async loadTraceData({ commit }, input) {
      const { username } = input
      return new Promise((resolve, reject) => {
        fetch(import.meta.env.VITE_API_URL + `/tracedata/${username}`)
          .then(async response => {
            if(response.ok){
              const essays = await response.json();
              commit('SET_ESSAYS', essays)
              commit('SET_SELECTED_ESSAYS', essays)
              resolve(response)
            }else{
              reject(response)
            }
          });
      });
    },
  },
  mutations: {
    SET_ESSAYS(state, essays) {
      state.essays = essays
    },
    SET_SELECTED_ESSAYS(state, selectedEssays) {
      state.selectedEssays = selectedEssays
    }
  }
}
