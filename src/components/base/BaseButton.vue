<template>
  <v-btn v-bind="$attrs">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
	name: 'base-button',
	inheritAttrs: false,
};
</script>
