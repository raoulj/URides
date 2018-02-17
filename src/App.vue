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
          <v-list-tile avatar>
            <v-list-tile-avatar :size="50" class="pl-5">
              <img src="static/logo.png">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
          value="true"
          disabled
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile class="xs-center">
          <v-avatar :size="120" :tile="true"></v-avatar>
        </v-list-tile>
      </v-list>
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
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app dark color="primary">
      <v-flex class="justify-center">
        <span >&copy; 2018 - University Rides</span>
      </v-flex>
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
        { icon: 'home', title: 'Home' },
        { icon: 'question_answer', title: 'About' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'University Rides'
    }
  },
  name: 'App'
}
</script>
