<template>
  <v-app>
    <the-toolbar @click="toggleSidebar(true)"/>
    <the-sidebar :value="showSidebar" @input="toggleSidebar"/>
    <v-content>
      <v-container fluid>
        <nuxt-child/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import theSidebar from '@/components/the-sidebar.vue';
import theToolbar from '@/components/the-toolbar.vue';

function data() {
	return {
		showSidebar: false,
	};
}

function toggleSidebar(value) {
	this.showSidebar = value;
}

export default {
	name: 'layouts-default',
	components: {
		theSidebar,
		theToolbar,
	},
	data,
	methods: {
		toggleSidebar,
	},
};
</script>
