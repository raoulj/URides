<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
        </v-list>
      </v-toolbar>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile
          active
          v-for="(item, i) in items"
          v-if="isLoggedIn || !item.login_required"
          :key="i"
          :to="{name: item.component}"
          color="primary"
        >
          <v-list-tile-action>
            <v-icon color="primary">{{item.icon}}</v-icon>
          </v-list-tile-action >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn" :to="{name: 'Search'}" @click="logout">
          <v-list-tile-action>
            <v-icon color="primary">exit_to_app</v-icon>
          </v-list-tile-action >
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-toolbar 
      color="primary"
      dark
      app
      fixed
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
      <v-avatar tile>
        <img src="static/logo-inverted.png">
      </v-avatar>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!isLoggedIn" flat :to="{name:'Register'}">Register</v-btn>
        <v-btn v-if="!isLoggedIn" flat :to="{name:'Login'}">Login</v-btn>
       <h4 class="mt-4 pr-5 h1"v-else>Hello, {{fname}}!</h4>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app dark color="primary">
        <span >&copy; 2018 - University Rides</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'home', title: 'Search All Trips', component: 'Search', login_required: false },
        { icon: 'description', title: 'About', component: 'About', login_required: false },
        { icon: 'phone', title: 'Contact Us', component: 'Contact', login_required: false },
        { icon: 'note_add', title: 'Create', component: 'Create', login_required: true },
        { icon: 'find_in_page', title: 'My Trips', component: 'UserProfile', login_required: true},
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'UniversityRides',
      email: '',
      fname: '',
      isLoggedIn: ''
    }
  },
  mounted() {
    this.email = this.$cookie.get('user')
    this.fname = this.$cookie.get('fname')
  },
  watch: {
    email: function(val) {
        this.isLoggedIn = this.email
    },
    fname: function(val) {
        this.isLoggedIn = this.fname
    },
  },
  methods: {
    logout() {
      this.$cookie.delete('user')
      this.$cookie.delete('fname')
      this.$router.go()
    }
  },
  name: 'App'
}
</script>
<!-- TODO: figure out how to invert logout button color -->
<style scoped>
  .exit_to_app {
    color: "blue";
  }
</style>
