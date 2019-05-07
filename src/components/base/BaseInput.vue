<template>
  <v-text-field v-bind="$attrs" v-on="$listeners"></v-text-field>
</template>

<script>
export default {
	name: 'base-input',
	inheritAttrs: false,
};
</script>
