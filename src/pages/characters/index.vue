<template>
  <div>
    <characters-list
      :rows="rows"
      @add="showForm"
      @edit="showDataInForm($event, 'edit')"
      @remove="showDataInForm($event, 'remove')"
    />
    <characters-form
      :title="title"
      v-bind="character"
      @clear="clearForm"
      @input="handleChange"
      @submit="submitCharacter"
    ></characters-form>
  </div>
</template>

<script>
import charactersList from '@/components/characters/characters-list';
import charactersForm from '@/components/characters/characters-form.vue';
import {
	FORM_ADD_STATUS,
	FORM_EDIT_STATUS,
	FORM_REMOVE_STATUS,
} from '@/components/characters/helper';

function data() {
	return {
		character: {
			avatar: '',
			name: '',
			nickname: '',
		},
		rows: [
			{
				name: 'Alan García',
				nickname: 'Cabollo Loco',
			},
			{
				name: 'Luis Nava',
				nickname: 'Chalán',
			},
		],
		status: FORM_ADD_STATUS,
	};
}

function clearForm() {
	this.status = FORM_ADD_STATUS;
	this.character.avatar = '';
	this.character.name = '';
	this.character.nickname = '';
}

function handleChange({ key, value }) {
	this.character[key] = value;
}

function showDataInForm(row, status) {
	this.status = status;
	this.character.name = row.name;
	this.character.nickname = row.nickname;
}

function showForm() {
	this.clearForm(this);
	this.status = FORM_ADD_STATUS;
}

function submitCharacter(event) {
	this.clearForm(this);
}

function title() {
	if (this.status === FORM_ADD_STATUS) {
		return 'Agregar Personaje';
	} else if (this.status === FORM_EDIT_STATUS) {
		return 'Editar Personaje';
	} else if (this.status === FORM_REMOVE_STATUS) {
		return 'Eliminar Personaje';
	}
	return '';
}

export default {
	name: 'pages-characters',
	components: {
		charactersForm,
		charactersList,
	},
	computed: {
		title,
	},
	data,
	methods: {
		clearForm,
		handleChange,
		showDataInForm,
		showForm,
		submitCharacter,
	},
};
</script>
