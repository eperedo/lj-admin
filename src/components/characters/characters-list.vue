<template>
  <v-layout row wrap>
    <v-flex xs12 mb-3>
      <base-button @click.native="$emit('add', $event)" color="primary" round>Agregar</base-button>
    </v-flex>
    <v-flex xs12>
      <v-data-table :headers="headers" hide-actions :items="rows" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.nickname }}</td>
          <td class="text-xs-center">
            <base-button fab flat small @click.native="$emit('edit', props.item)">
              <v-icon small color="green">edit</v-icon>
            </base-button>
            <base-button fab flat small @click.native="$emit('remove', props.item)">
              <v-icon small color="red">delete</v-icon>
            </base-button>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
function data() {
	return {
		headers: [
			{
				sortable: false,
				text: 'Nombre',
				value: 'name',
			},
			{
				sortable: false,
				text: 'Alias',
				value: 'nickname',
			},
			{
				align: 'center',
				sortable: false,
				text: 'Acciones',
			},
		],
	};
}

export default {
	name: 'characters-list',
	data,
	props: {
		rows: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
