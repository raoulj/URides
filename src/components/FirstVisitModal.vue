<template>
  <v-dialog v-model="isFirstView" max-width="500px">
  <v-card>
    <v-card-title class="headline">
      Welcome First-Time Visitor
    </v-card-title>
    <v-card-text>
      <v-btn color="primary" dark @click.stop="dialog3 = !dialog3">Open Dialog 3</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
  export default {
    props: [
      'isFirstView',
    ],
  }
</script>
