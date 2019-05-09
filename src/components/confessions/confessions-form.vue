<template>
  <v-form @submit.prevent="onSubmit">
    <v-layout wrap mt-3>
      <v-flex xs12>
        <p class="headline">{{ title }}</p>
      </v-flex>
      <v-flex xs12>
        <v-combobox
          v-model="author"
          item-value="id"
          item-text="name"
          label="Quién hizo la declaración?"
          :disabled="disableFields"
          :items="characters"
        ></v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-combobox
          v-model="involved"
          item-value="id"
          item-text="name"
          label="Quién está involucrado en la declaración?"
          :disabled="disableFields"
          :items="characters"
        ></v-combobox>
      </v-flex>
      <v-flex xs12>
        <base-input v-model="when" label="Fecha" placeholder="YYYY-MM-DD" mask="####-##-##"/>
      </v-flex>
      <v-flex xs12>
        <base-input
          label="Dinero"
          placeholder="La declaración incluye monto de coima?"
          type="number"
          v-model="money"
        />
      </v-flex>
      <v-flex xs12>
        <base-input
          label="Fuente"
          placeholder="URL como fuente de la declaración (noticia, imagen, otro documento)"
          v-model="link"
        />
      </v-flex>
      <v-flex xs12>
        <base-input
          label="Texto"
          placeholder="Descripción corta de la declaración (140 caractéres)"
          v-model="shortText"
        />
      </v-flex>
      <v-flex xs12>
        <v-textarea label="Texto" placeholder="Declaración completa" v-model="longText"/>
      </v-flex>
      <v-flex xs12 center>
        <base-button
          color="primary"
          round
          type="submit"
          :disabled="disableButton"
          :loading="disableButton"
        >Guardar</base-button>
        <base-button color="error" round @click.native="clearForm">Cancelar</base-button>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { FORM_ADD_STATUS } from '../characters/helper';
const initialData = {
	author: null,
	involved: null,
	money: 0,
	link: null,
	longText: '',
	shortText: '',
	when: null,
};

function data() {
	return {
		...initialData,
	};
}

function authorId() {
	return this.author ? this.author.id : null;
}

function clearForm() {
	this.involved = this.characters[1];
	this.money = 0;
	this.link = '';
	this.longText = '';
	this.shortText = '';
	this.when = null;
	this.$emit('clear');
}

function created() {
	const barata = this.characters.findIndex(c => c.name.includes('Barata'));
	if (barata > -1) {
		this.author = this.characters[barata];
	}
	this.involved = this.characters.find(c => c.name === 'Alan García');
}

function clearHandler(newVal) {
	this.clearForm();
}

function disableFields() {
	return this.status !== FORM_ADD_STATUS;
}

function involvedId() {
	return this.involved ? this.involved.id : null;
}

function links() {
	return this.link
		? [
				{
					type: 'link',
					url: this.link,
				},
		  ]
		: null;
}

function modelHandler(newVal) {
	if (newVal) {
		this.author = this.model.author;
		this.involved = this.model.involved;
		this.link = this.model.link;
		this.longText = this.model.longText;
		this.money = this.model.money;
		this.shortText = this.model.shortText;
		this.when = this.model.when;
	}
}

function onSubmit() {
	const confession = {
		authorId: this.authorId,
		involvedId: this.involvedId,
		links: this.links,
		longText: this.longText,
		money: this.money,
		shortText: this.shortText,
		when: this.when,
	};
	this.$emit('submit', confession);
}

export default {
	name: 'confessions-form',
	created,
	computed: {
		authorId,
		disableFields,
		involvedId,
		links,
	},
	data,
	props: {
		disableButton: {
			default: false,
			type: Boolean,
		},
		characters: {
			default: () => [],
			type: Array,
		},
		clear: {
			default: false,
			type: Boolean,
		},
		model: {
			default: () => null,
			type: Object,
		},
		status: {
			type: String,
		},
		title: {
			default: '',
			type: String,
		},
	},
	methods: {
		clearForm,
		onSubmit,
	},
	watch: {
		clear: {
			handler: clearHandler,
		},
		model: {
			deep: true,
			handler: modelHandler,
			immediate: true,
		},
	},
};
</script>
