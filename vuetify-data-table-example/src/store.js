import Vue from "vue";
import Vuex from "vuex";
import TutorialDataService from "./services/TutorialDataService";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // modifying states must be in "mutations", not anywhere else
//   strict: true,
  state: {
    isClicked: false,
    tutorials: [],
    title: "",
    headers: [
      { text: "Title", align: "start", sortable: false, value: "title" },
      { text: "Description", value: "description", sortable: false },
      { text: "Status", value: "status", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
  },
  getters: {
  },
  mutations: {
    updateTitle (state, title) {
        console.log(title)
        state.title = title
      },
    retrieveTutorials: (state, payload) => {
        if (payload.length > 0) {
            state.tutorials = payload.map(tutorial => {
                return {
                    id: tutorial.id,
                    title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
                    description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
                    status: tutorial.published ? "Published" : "Pending",
                }
            })
        }
        else {
            state.tutorials = []
        }
    }, 
    removeAllTutorials : (state) => {
        state.tutorials = []
    }
  },
  actions: {
    retrieveTutorials: (context) => {
        TutorialDataService.getAll()
          .then((response) => {
            context.commit('retrieveTutorials', response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      removeAllTutorials: (context) => {
        TutorialDataService.deleteAll()
          .then((response) => {
            console.log(response.data);
            context.commit('removeAllTutorials', response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      searchTitle: ({commit, state}) => {
        TutorialDataService.findByTitle(state.title)
          .then((response) => {
            commit('retrieveTutorials', response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      deleteTutorial: ({dispatch}, payload) => {
        TutorialDataService.delete(payload)
          .then(() => {
            dispatch('retrieveTutorials')
          })
          .catch((e) => {
            console.log(e);
          });
      },
  }
});
