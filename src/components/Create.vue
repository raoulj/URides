<template>
  <v-layout row justify-center>
      <v-card width="500px">
        <v-card-title>
          <span class="headline">Add a new Ride!</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container grid-list-md>
              <v-layout wrap>
                  <v-flex xs12>
                    <v-select
                      :items="locations"
                      v-model="origin"
                      label="From"
                      required
                      :rules=[rules.required]
                      auto
                      append-icon="map"
                    ></v-select>
                    &nbsp;
                    <v-select
                      :items="locations"
                      v-model="destination"
                      label="To"
                      auto
                      required
                      :rules=[rules.required]
                      append-icon="map"
                    ></v-select>
                  </v-flex>
                  <v-flex xs5>
                    <v-menu
                      ref="location_menu"
                      lazy
                      :close-on-content-click="false"
                      v-model="location_menu"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      min-width="290px"
                      :return-value.sync="date"
                    >
                      <v-text-field
                        slot="activator"
                        label="Date"
                        v-model="date"
                        required
                        :rules=[rules.required]
                        append-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date" @change="$refs.location_menu.save(date)"no-title scrollable></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs2></v-flex>
                  <v-flex xs5>
                    <v-menu
                        ref="date_menu"
                        lazy
                        :close-on-content-click="false"
                        v-model="date_menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        max-width="290px"
                        min-width="290px"
                        :return-value.sync="time"
                      >
                        <v-text-field
                          slot="activator"
                          label="Time"
                          required
                          :rules=[rules.required]
                          append-icon="access_time"
                          v-model="time"
                          readonly
                        ></v-text-field>
                        <v-time-picker v-model="time" @change="$refs.date_menu.save(time)"></v-time-picker>
                      </v-menu>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field label="Number of guests" mask="##" v-model="guests" append-icon="people"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn block color="blue" dark @click="submit">Create</v-btn>
                  </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({
      locations: [
        'Brown',
        'Forbes',
        'Scully',
        'Sherrerd',
        'Little',
        'Mathey',
        'Pyne',
        'Rocky',
        'Whitman',
        'Wilson',
      ],
      dialog: false,
      fname: '',
      lname: '',
      origin: '',
      destination: '',
      date: '',
      time: null,
      location_menu: false,
      date_menu: false,
      date_modal: false,
      time_menu: false,
      time_modal: false,
      valid: true,
      guests: 0,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: (value) => {
          const pattern = new RegExp("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$");
          return pattern.test(value) || 'Weak password'
        }
      },
    }),
    computed: {
      is_multiple: function() {
        return this.guests > 0 ? "Yes" : 'No'
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {

          var email = this.$cookie.get('user')
          axios.post(`/api/create-ride?email=${email}&start=${this.origin}&dest=${this.destination}&date=${this.date}&time=${this.time}&guest_count=${this.guests}&is_multiple=${this.is_multiple}`)
          .then(response => {
            console.log(response.data)
            if(response.data.error !== undefined) {
              alert(response.data.error)
            } else {
              // suceeded ride creation
              this.$router.go()
              this.$router.push('/')
            }
          });
        }
      }
    }
  }
</script>