<template>
  <ApolloQuery
    :query="require('@/graphql/confessions/list.gql')"
    :variables="{
			limit,
			offset,
		}"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <confessions-list v-if="data" :rows="data.confessions"></confessions-list>
    </template>
  </ApolloQuery>
</template>

<script>
import confessionsList from '@/components/confessions/confessions-list.vue';

function data() {
	return {
		limit: 50,
		offset: 0,
	};
}

export default {
	name: 'pages-confessions',
	components: {
		confessionsList,
	},
	data,
};
</script>
