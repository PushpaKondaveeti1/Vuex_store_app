<template>
 <v-flex sm8 offset-sm2>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Students</v-toolbar-title>
      </v-toolbar>
      <v-container class="text-xs-center">
        <v-progress-circular v-if="! $store.getters.isLoaded" 
            indeterminate model-value="20" color="primary" >
        </v-progress-circular>
      </v-container>
      <v-list>
        <v-list-tile v-for="(student, index) in $store.getters.students" :key="index" :to="'editStudent/' + index">
          <v-list-tile-content>
            <v-list-tile-title v-text="student.fullName"></v-list-tile-title>
              <!--<div v-for="(score, key) in scoresById(student.id)" :key="key">
                Scores: {{ score }}
             </div>-->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>  
import { mapState } from "vuex";

export default {
    data() {
        return {
  
        }
    },
    computed:{ 
      ...mapState({
      students: state =>  state.students,
      scores: state => state.scores,
    }),
  },
  methods:{
    scoresById(id) {
       return  this.scores.filter(score => score.id === id);
    }
  } 
};
</script>