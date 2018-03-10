<template>
  <v-card dismissible >
      <v-container>
  <v-flex><h2>Welcome to <strong>URides</strong>!</h2></v-flex>
  <h3>What are we?</h3>
  URides is <strong>the</strong> solution to your on-campus transportation needs as a student or faculty.  

  <h3>Need a ride?</h3>  Register an account and immediately unlock the ability to request a golf-cart pickup.  One of our vetted student-employees will drive up to your entryway to take you wherever you need to go, all on the University's dime!
  <h3>More questions?</h3>
  Check out our About section on the left to learn more!
  <v-spacer></v-spacer>
  <v-spacer></v-spacer>
  <v-layout row justify-space-between>
    <v-flex></v-flex>
  <v-flex>
    <v-btn align-center dark color="info" to="register">Let's Go!</v-btn>
    <v-btn align-center dark color="info" @click="close">Hide Message</v-btn>
  </v-flex>
</v-layout>
</v-container>
  </v-card>
</template>

<script>
    import FirstVisit from './FirstVisit.vue'
    import axios from 'axios'

    export default {
      methods: {
          close() {
            this.$emit('close')
          },
      },
    };
</script>
