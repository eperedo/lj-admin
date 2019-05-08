<template>
  <ApolloQuery
    :query="require('@/graphql/confessions/list.gql')"
    :variables="{
			limit,
			offset,
		}"
  >
    <template v-slot="{ result: { data } }">
      <confessions-form
        v-if="status && data"
        :characters="data.characters"
        :clear="clearForm"
        :model="confession"
        @clear="hideForm"
        @submit="onSubmit"
      ></confessions-form>
      <confessions-list
        v-if="data"
        :rows="data.confessions"
        @add="add"
        @edit="showDataInForm"
        @remove="showDataInForm"
      ></confessions-list>
    </template>
  </ApolloQuery>
</template>

<script>
import {
	FORM_ADD_STATUS,
	FORM_REMOVE_STATUS,
	FORM_EDIT_STATUS,
} from '../../components/characters/helper';
import confessionsForm from '@/components/confessions/confessions-form.vue';
import confessionsList from '@/components/confessions/confessions-list.vue';

function data() {
	return {
		clearForm: false,
		confessionId: null,
		confession: {
			authorId: null,
			involvedId: null,
			money: 30,
			link: null,
			longText: '',
			shortText: '',
			when: null,
		},
		limit: 50,
		offset: 0,
		status: null,
	};
}

function add() {
	this.status = FORM_ADD_STATUS;
}

function graphqlInfo() {
	const query = {
		mutation: null,
	};
	if (this.status === FORM_ADD_STATUS) {
		query.mutation = require('@/graphql/confessions/insert.gql');
	} else if (this.status === FORM_EDIT_STATUS) {
		query.mutation = require('@/graphql/confessions/edit.gql');
	} else if (this.status === FORM_REMOVE_STATUS) {
		query.mutation = require('@/graphql/confessions/remove.gql');
	}
	return query;
}

function hideForm() {
	this.status = null;
	this.confession = null;
	this.confessionId = null;
}

async function onSubmit(confession) {
	let variables = confession;
	if (this.status === FORM_REMOVE_STATUS) {
		variables = { id: this.confessionId };
	}
	await this.$apollo.mutate({
		mutation: this.graphqlInfo.mutation,
		update: this.update,
		variables,
	});
	this.clearForm = !this.clearForm;
}

function showDataInForm(row) {
	this.status = FORM_REMOVE_STATUS;
	this.confessionId = row.id;
	this.confession = row;
	this.confession.link = row.links[0].url;
}

function update(store, { data: { insert_confessions, update_confessions } }) {
	const query = {
		query: require('@/graphql/confessions/list.gql'),
		variables: {
			limit: this.limit,
			offset: this.offset,
		},
	};
	const data = store.readQuery(query);
	if (this.status === FORM_ADD_STATUS) {
		data.confessions.push(insert_confessions.returning[0]);
	} else if (this.status === FORM_REMOVE_STATUS) {
		const confessionIndex = data.confessions.findIndex(
			c => c.id === this.confessionId,
		);
		if (confessionIndex > -1) {
			data.confessions.splice(confessionIndex, 1);
		}
	} else if (this.status === FORM_EDIT_STATUS) {
		const confessionIndex = data.confessions.findIndex(
			c => c.id === this.confessionId,
		);
		if (confessionIndex > -1) {
			data.confessions[confessionIndex].links = update_confessions.links;
			data.confessions[confessionIndex].longText = update_confessions.longText;
			data.confessions[confessionIndex].money = update_confessions.money;
			data.confessions[confessionIndex].shortText =
				update_confessions.shortText;
			data.confessions[confessionIndex].when = update_confessions.when;
		}
	}
	store.writeQuery({ ...query, data });
}

export default {
	name: 'pages-confessions',
	components: {
		confessionsForm,
		confessionsList,
	},
	computed: {
		graphqlInfo,
	},
	data,
	methods: {
		add,
		hideForm,
		onSubmit,
		showDataInForm,
		update,
	},
};
</script>
