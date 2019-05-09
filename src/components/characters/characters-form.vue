<template>
  <v-form @submit.prevent="$emit('submit', { name, nickname })">
    <v-layout wrap mt-3>
      <v-flex xs12>
        <p class="headline">{{ title }}</p>
      </v-flex>
      <v-flex xs12>
        <base-input
          label="Nombre"
          required
          :value="name"
          @input="$emit('input', { key: 'name', value: $event })"
        />
      </v-flex>
      <v-flex xs12>
        <base-input
          label="Alias"
          required
          :value="nickname"
          @input="$emit('input', { key: 'nickname', value: $event })"
        />
      </v-flex>
      <v-flex xs12>
        <base-input
          label="Avatar (url)"
          required
          :value="avatar"
          @input="$emit('input', { key: 'avatar', value: $event })"
        />
      </v-flex>
      <v-flex xs12>
        <base-button
          color="primary"
          round
          type="submit"
          :disabled="disableButton"
          :loading="disableButton"
        >Guardar</base-button>
        <base-button color="error" round @click.native="$emit('clear')">Cancelar</base-button>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
	name: 'characters-form',
	props: {
		avatar: {
			default: '',
			type: String,
		},
		name: {
			default: '',
			type: String,
		},
		nickname: {
			default: '',
			type: String,
		},
		disableButton: {
			default: false,
			type: Boolean,
		},
		title: {
			default: '',
			type: String,
		},
	},
};
</script>
