<template>
  <div class="text-center">
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>
        <v-container class="text-xs-center">
          <v-progress-circular v-if="!isLoaded" 
            indeterminate model-value="20" color="primary" >
          </v-progress-circular>
        </v-container>
        <v-form v-if="isLoaded" >
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
               <v-text-field @input=updateFirstName :value="findStudentById($route.params.id).firstName" label="First Name" required> findStudentById($route.params.id).firstName</v-text-field>
                <v-text-field @input=updateLastName  :value="findStudentById($route.params.id).lastName" label="Last Name" required>findStudentById($route.params.id).lastName</v-text-field>
               </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br>
    <Students/>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
import Students from "./Students";

export default {
  data() {
    return {
        firstName: '',
        lastName: '',
    };
  },
  computed:{
    ...mapGetters([
      'isLoaded',
      'findStudentById',

  ])
  },

  methods: {
    async submit() {
      const student = this.findStudentById(this.$route.params.id);
      const firstName= this.firstName || student.firstName;
      const lastName= this.lastName || student.lastName;
      this.$store.dispatch('editStudent',{id:this.$route.params.id, names:{firstName: firstName, lastName: lastName}})
      //axios.put(`http://localhost:3000/students/${this.$route.params.id}`, { firstName: this.student.firstName, lastName: this.student.lastName});
    },
    updateFirstName(e){
      this.firstName=e;
      console.log('firstname', this.firstName);
    },
    updateLastName(e){
      this.lastName=e;
      console.log('lastname', this.lastName);
    },
  },
  components: {
      Students
  }
};
</script>