<template>
    <div>
        <h1 >{{about}}</h1>
    <p>
        What is Vuex: {{vuex.intro}}  |
    </p>
    <p>
        What Vuex: {{vuex.whyVuex}}  |
    </p>
    <v-btn v-bind:class="this.$store.state.isClicked ? 'red' : 'blue' " small @click="changeColor()">
        {{showText}}
      </v-btn>
    <v-btn small @click="getData()">
        Show Alert
      </v-btn>
    </div>
</template>

<script>
    export default {
        name : "ChildComponent",
        props : {
            about : String,
            vuex: Object,
            getData : Function,
        },
        data() {
            return {
                isClicked : this.$store.state.isClicked,
            }
        },
        computed: {
            showText() {
                console.log("Just Clicked")
                if (this.$store.state.isClicked === true) {
                    return "Red => Blue"
                }
                else {
                    return "Blue => Red"
                }
            },
        },
        methods: {
            changeColor(){
                this.$store.state.isClicked = !this.$store.state.isClicked;
            }
        }
    }
</script>

<style scoped>
.red { 
    background-color: red;
}
.blue { 
    background-color: blue;
}
</style>