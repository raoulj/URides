<template>
  <v-layout row justify-center>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card width="500px">
        <v-card-title>
          <span class="headline">Account Sign-in</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="email" label="Email" :rules="[rules.required, rules.email]"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password" label="Password" type="password" :rules="[rules.required]"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-container>
          <v-btn block color="blue" dark @click="login">Login</v-btn>
        </v-container>
      </v-card>
    </v-form>
    <v-dialog v-model="dialog3" max-width="500px">
    <v-card>
  <v-card-title>
    <span>Dialog 3</span>
    <v-spacer></v-spacer>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
      </v-card-actions>
      <v-card-text>Test</v-card-text>
    </v-card>
  </v-dialog>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  export default {
    data() { 
      return {
        dialog3: false,
        valid: true,
        dialog: false,
        email: '',
        password: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
  },
  methods: {
      login () {
        if (this.$refs.form.validate()) {
          axios.post(`/api/login?email=${this.email}&password=${this.password}`)
          .then(response => {
            console.log(response.data)
            if(response.data.error !== undefined) {
              //failed login
              alert(response.data.error)
            } else {
              // suceeded login
              this.$cookie.set('user', response.data.email, 1);
              this.$cookie.set('fname', response.data.fname, 1);
              this.$router.go()
              this.$router.push('/')
            }
            this.user = response.user
          });
        }
      }
  }
}
</script>