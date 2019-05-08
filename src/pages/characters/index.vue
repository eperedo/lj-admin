<template>
  <ApolloQuery :query="require('@/graphql/characters/list.gql')" :variables="{ limit, offset }">
    <template v-slot="{ result: { loading, error, data } }">
      <characters-list
        v-if="data"
        :rows="data.characters"
        @add="showForm"
        @edit="showDataInForm($event, 'edit')"
        @remove="showDataInForm($event, 'remove')"
      />
      <ApolloMutation
        :mutation="title.graphql.query"
        :variables="title.graphql.variables"
        :update="onUpdate"
        @done="submitCharacter"
      >
        <template v-slot="{ mutate, loading }">
          <pre v-if="loading">
						Loading...
					</pre>
          <characters-form
            :title="title.title"
            :disable-button="loading"
            v-bind="character"
            @clear="clearForm"
            @input="handleChange"
            @submit="mutate"
          ></characters-form>
        </template>
      </ApolloMutation>
    </template>
  </ApolloQuery>
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
		limit: 50,
		offset: 0,
		characterId: null,
		character: {
			avatar: '',
			name: '',
			nickname: '',
		},
		status: FORM_ADD_STATUS,
	};
}

function clearForm() {
	this.status = FORM_ADD_STATUS;
	this.characterId = null;
	this.character.avatar = '';
	this.character.name = '';
	this.character.nickname = '';
}

function handleChange({ key, value }) {
	this.character[key] = value;
}

function onUpdate(store, { data: { insert_characters } }) {
	const query = {
		query: require('@/graphql/characters/list.gql'),
		variables: {
			limit: this.limit,
			offset: this.offset,
		},
	};
	const data = store.readQuery(query);
	if (this.status === FORM_ADD_STATUS) {
		data.characters.push(insert_characters.returning[0]);
	} else if (this.status === FORM_REMOVE_STATUS) {
		const characterIndex = data.characters.findIndex(
			c => c.id === this.characterId,
		);
		data.characters.splice(characterIndex, 1);
	} else if (this.status === FORM_EDIT_STATUS) {
		const characterIndex = data.characters.findIndex(
			c => c.id === this.characterId,
		);
		data.characters[characterIndex].title = this.character.title;
		data.characters[characterIndex].nickname = this.character.nickname;
		data.characters[characterIndex].avatar = this.character.avatar;
	} else {
		throw Error('INVALID FORM STATUS');
	}
	store.writeQuery({ ...query, data });
}

function showDataInForm(row, status) {
	this.status = status;
	this.characterId = row.id;
	this.character.avatar = row.avatar;
	this.character.name = row.name;
	this.character.nickname = row.nickname;
}

function showForm() {
	this.clearForm();
	this.status = FORM_ADD_STATUS;
}

function submitCharacter() {
	this.clearForm();
}

function title() {
	const formInfo = {
		title: '',
		graphql: {
			action: '',
			query: {},
			variables: null,
		},
	};
	if (this.status === FORM_ADD_STATUS) {
		formInfo.title = 'Agregar Personaje';
		formInfo.graphql.query = require('@/graphql/characters/insert.gql');
		formInfo.graphql.variables = this.character;
	} else if (this.status === FORM_EDIT_STATUS) {
		formInfo.title = 'Editar Personaje';
		formInfo.graphql.query = require('@/graphql/characters/edit.gql');
		formInfo.graphql.variables = {
			id: this.characterId,
			...this.character,
		};
	} else if (this.status === FORM_REMOVE_STATUS) {
		formInfo.graphql.query = require('@/graphql/characters/remove.gql');
		formInfo.graphql.variables = {
			id: this.characterId,
		};
		formInfo.title = 'Eliminar Personaje';
	}
	return formInfo;
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
		onUpdate,
		showDataInForm,
		showForm,
		submitCharacter,
	},
};
</script>
