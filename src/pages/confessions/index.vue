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
      <confessions-list v-if="data" :rows="data.confessions" @add="add"></confessions-list>
    </template>
  </ApolloQuery>
</template>

<script>
import { FORM_ADD_STATUS } from '../../components/characters/helper';
import confessionsForm from '@/components/confessions/confessions-form.vue';
import confessionsList from '@/components/confessions/confessions-list.vue';

function data() {
	return {
		clearForm: false,
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

function hideForm() {
	this.status = null;
}

async function onSubmit(confession) {
	await this.$apollo.mutate({
		mutation: require('@/graphql/confessions/insert.gql'),
		update: this.update,
		variables: {
			...confession,
		},
	});
	this.clearForm = !this.clearForm;
}

function update(store, { data: { insert_confessions } }) {
	const query = {
		query: require('@/graphql/confessions/list.gql'),
		variables: {
			limit: this.limit,
			offset: this.offset,
		},
	};
	const data = store.readQuery(query);
	data.confessions.push(insert_confessions.returning[0]);
	store.writeQuery({ ...query, data });
}

export default {
	name: 'pages-confessions',
	components: {
		confessionsForm,
		confessionsList,
	},
	data,
	methods: {
		add,
		hideForm,
		onSubmit,
		update,
	},
};
</script>
