<template>
	<div class="searchbar-container">
		<v-autocomplete
			class="searchbar"
			:items="careers"
			items-text="label"
			items-value="id"
			background-color="#DDE1FE"
			color="#8996FC"
			item-color="#8996FC"
			placeholder="Buscar carrera"
			prepend-inner-icon="mdi-magnify"
			solo
			flat
			dense
			:disabled="careers < 1"
		>
			<template v-slot:selection="{ item }">
				{{ item.name }}
			</template>
			<template v-slot:item="{ item }">
				{{ item.name }}
			</template>
		</v-autocomplete>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters({
				careers: 'base/careers',
			}),
		},
		methods: {
			...mapActions({}),
		},
	};
</script>
<style scoped>
	.searchbar-container {
	}
	.searchbar {
		top: 1rem;
	}
	@media (max-width: 700px) {
		.searchbar-container {
			width: 65% !important;
		}
	}
</style>
