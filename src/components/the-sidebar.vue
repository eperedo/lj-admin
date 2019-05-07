<template>
  <v-navigation-drawer left temporary app :value="value" @input="$emit('input', $event)">
    <v-list dense nav shaped>
      <v-list-tile>
        <v-list-tile-content>
          <nuxt-link to="/">Home</nuxt-link>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <nuxt-link to="/">Personajes</nuxt-link>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <nuxt-link to="/">Declaraciones</nuxt-link>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
	name: 'the-sidebar',
	props: {
		value: {
			default: false,
			type: Boolean,
		},
	},
};
</script>
