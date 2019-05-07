<template>
  <v-toolbar>
    <v-toolbar-side-icon @click="$emit('click', $event)"></v-toolbar-side-icon>
    <v-toolbar-title>Lava Jato</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Ayuda</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
	name: 'the-toolbar',
};
</script>
