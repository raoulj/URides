<template>
  <v-layout row justify-center>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card width="500px">
        <v-card-title>
          <span class="headline">New User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-text-field v-model="fname" label="First Name" required :rules="[rules.required]"></v-text-field>
              &nbsp;
              <v-text-field v-model="lname" label="Last Name" required :rules="[rules.required]"></v-text-field>
              <v-flex xs12>
                <v-text-field v-model="email" label="Email" required @input="clearEmailError" :error-messages="responseMessages" :rules="[rules.required, rules.email]"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password" label="Password" type="password" required :rules="[rules.required]"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-container>
          <v-btn block color="blue" dark @click="register">Register</v-btn>
        </v-container>
      </v-card>
    </v-form>
  </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      email: '',
      password: '',
      fname: '',
      lname: '',
      isUnique: true,
      responseMessages: [],
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: (value) => {
          const pattern = new RegExp("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$");
          return pattern.test(value) || 'Weak ass password'
        },
      }
    }),
    methods: {
      register () {
        if (this.$refs.form.validate()) {
          axios.post(`/api/register?fname=${this.fname}&lname=${this.lname}&email=${this.email}&password=${this.password}`)
          .then(response => {
            console.log(response.data)
            if(response.data.error !== undefined) {
              this.responseMessages = response.data.error
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
      },
      clearEmailError() {
        this.responseMessages = []
      }
    }
  }
</script>