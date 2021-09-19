<template>
  <v-row align="center" class="list px-3 mx-auto">
  <ChildComponent :about = "about" :vuex = "vuex" :getData = "getData"/>
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search 
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tutorials</v-card-title>

        <v-data-table
          :headers="this.$store.state.headers"
          :items="this.$store.state.tutorials"
          disable-pagination
          :hide-default-footer="false"
        >
          <template v-slot:[`item.actions`] = "{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="this.$store.state.tutorials.length > 0">
          <v-btn small color="error" @click="removeAllTutorials">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ChildComponent from "./ChildComponent.vue"
// import {mapActions} from 'vuex';
// import {mapGetters} from 'vuex';
// import {mapState} from 'vuex';
export default {
  name: "tutorials-list",
  components : { ChildComponent },
  data() {
    return {
      about : "Introduction to Vuex",
      vuex : {
        intro : "Vuex is a state management pattern + library for Vue.js applications",
        whyVuex: "Vuex gives us the ability to store and share reactive data across the app",
      },
    };
  },
  methods: {
    retrieveTutorials() {
      this.$store.dispatch('retrieveTutorials')
    },
    removeAllTutorials() {
      this.$store.dispatch('removeAllTutorials')
    },
    getData() {
      alert("Function Called !!!")
    },
    searchTitle(){
      this.$store.dispatch('searchTitle')
    },
    editTutorial(id) {
      this.$router.push({ name: "tutorial-details", params: { id: id } });
    },
    deleteTutorial(id) {
      this.$store.dispatch('deleteTutorial', id)
    },
  },
  computed: {
  //   ...mapState({
  //   title: state => state.title
  // }),
  title : {
    get () {
      return this.$store.state.title
    },
    set (value) {
      this.$store.commit('updateTitle', value)
    }
  }
  },
  created() {
    this.retrieveTutorials();
  },
}
</script>

<style>
.list {
  max-width: 750px;
}
</style>
