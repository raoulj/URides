<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-container>
          <v-flex><h2>Search for a Ride</h2></v-flex>
          <v-flex><v-text-field append-icon="search" solo @input="function (value){fetchDataFromApi(value)}"></v-text-field></v-flex>
        </v-container>
        <v-container>
          <v-data-table
              :headers="headers"
              :items="items"
              :loading="false"
              class="elevation-1"
              full-width
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.fname }}</td>
                <td class="text-xs-right">{{ props.item.lname }}</td>
                <td class="text-xs-right">{{ props.item.start }}</td>
                <td class="text-xs-right">{{ props.item.dest }}</td>
                <td class="text-xs-right">{{ props.item.date }}</td>
                <td class="text-xs-right">{{ props.item.time }}</td>
                <td class="text-xs-right">{{ props.item.hasGuests }}</td>
                <td class="text-xs-right">{{ props.item.guestsTotal }}</td>
              </template>
              <template slot="no-data">
                <v-flex class="align-center">
                  <v-icon>warning</v-icon>
                  <span>Your search "{{query}}"" has returned no results</span>
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
                query: '',
                headers: [
                  { text: 'First Name', value: 'fname' },
                  { text: 'Last Name', value: 'lname' },
                  { text: 'Origin', value: 'origin' },
                  { text: 'Destination', value: 'dest' },
                  { text: 'Date', value: 'date' },
                  { text: 'Time', value: 'time' },
                  { text: 'Has Guests?', value: 'hasGuests' },
                  { text: 'Number of Guests', value: 'guestsTotal' }
                ],
            };
        },
        created() {
              axios.get(`api/search`)
                  .then(response => {
                    this.items = response.data
                });
            },
        methods: {
            fetchDataFromApi(query) {
              this.query = query
               axios.get(`api/search?q=${query}`)
                  .then(response => {
                    this.items = response.data
                });
            },
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
