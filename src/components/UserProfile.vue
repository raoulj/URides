<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-container>
          <v-flex><h2>Your Rides</h2></v-flex>
        </v-container>
        <v-container>
          <v-dialog v-model="editdialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline"> Edit Item </span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-select
                        :items="locations" 
                        v-model="editedItem.start" 
                        label="From" 
                        auto 
                        append-icon="map" 
                        hide-details
                      ></v-select>
                      <v-select
                        :items="locations"
                        v-model="editedItem.dest"
                        label="To"
                        auto
                        append-icon="map"
                        hide-details
                      ></v-select>
                    </v-flex>
                    <v-flex xs5>
                      <v-menu
                        ref="date_menu"
                        lazy
                        :close-on-content-click="false"
                        v-model="location_menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        min-width="290px"
                        :return-value.sync="editedItem.date"
                      >
                        <v-text-field
                          slot="activator"
                          label="Date"
                          v-model="editedItem.date"
                          append-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="editedItem.date" @change="$refs.date_menu.save(editedItem.date)"no-title scrollable></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs2></v-flex>
                    <v-flex xs5>
                      <v-menu
                          ref="time_menu"
                          lazy
                          :close-on-content-click="false"
                          v-model="time_menu"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          max-width="290px"
                          min-width="290px"
                          :return-value.sync="editedItem.time"
                        >
                          <v-text-field
                            slot="activator"
                            label="Time"
                            append-icon="access_time"
                            v-model="editedItem.time"
                            readonly
                          ></v-text-field>
                          <v-time-picker v-model="editedItem.time" @change="$refs.time_menu.save(editedItem.time)"></v-time-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs5>
                      <v-text-field label="Number of guests" mask="##" v-model="editedItem.guestsTotal" append-icon="people"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-data-table
              :headers="headers"
              :items="items"
              :loading="false"
              class="elevation-1"
              full-width
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.start }}</td>
                <td class="text-xs-right">{{ props.item.dest }}</td>
                <td class="text-xs-right">{{ props.item.date }}</td>
                <td class="text-xs-right">{{ props.item.time }}</td>
                <td class="text-xs-right">{{ props.item.hasGuests }}</td>
                <td class="text-xs-right">{{ props.item.guestsTotal }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="grey">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red lighten-1">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <template slot="no-data">
                <v-flex class="align-center">
                  <v-icon>warning</v-icon>
                  <span>You do not have any trips yet :(</span>
                  </v-flex>                  
                </v-alert>
              </template>
            </v-data-table>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                items: [],
                headers: [
                  { text: 'Origin', value: 'origin' },
                  { text: 'Destination', value: 'dest' },
                  { text: 'Date', value: 'date' },
                  { text: 'Time', value: 'time' },
                  { text: 'Has Guests?', value: 'hasGuests' },
                  { text: 'Number of Guests', value: 'guestsTotal' },
                  { text: 'Actions', value: 'name', sortable: false }
                ],
                editdialog: false,
                editedIndex: -1,
                editedItem: {
                  id: 0,
                  origin: '',
                  destination: '',
                  date: '',
                  time: '',
                  hasGuests: false,
                  guestsTotal: 0
                },
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
                location_menu: false,
                date_menu: false,
                date_modal: false,
                time_menu: false,
                time_modal: false,
              };
        },

        watch: {
          editdialog (val) {
            val || this.close()
          }
        },
        created() {
          var email = this.$cookie.get('user')
          axios.get(`api/my_rides?email=${email}`)
            .then(response => {
              this.items = response.data
          });
        },
        methods: {
            editItem (item) {
              this.editedIndex = this.items.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.editdialog = true
            },

            deleteItem (item) {
                        axios.post(`/api/delete-ride?id=${this.editedItem._id}`)
              const index = this.items.indexOf(item)
              // if (confirm('Are you sure you want to delete this item?')) { 
              this.items.splice(index, 1)
              console.log('test')
    
            },

            close () {
              this.editdialog = false
              setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
              }, 300)
            },

            save () {
              console.log(this.editedItem)
              Object.assign(this.items[this.editedIndex], this.editedItem)

              this.close()

              axios.post(`/api/edit-ride?id=${this.editedItem._id}&fname=${this.editedItem.fname}&lname=${this.editedItem.lname}&email=${this.editedItem.email}&start=${this.editedItem.start}&dest=${this.editedItem.dest}&date=${this.editedItem.date}&time=${this.editedItem.time}&guest_count=${this.editedItem.guestsTotal}&hasGuests=${this.editedItem.guestsTotal > 0 ? "Yes" : 'No'}`)
              .then(response => {
                if(response.data.error !== undefined) {
                  alert(response.data.error)
                } else {
                  // suceeded ride creation
                }
              });
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
