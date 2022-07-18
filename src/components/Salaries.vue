<template>
	<div>
		<Average
			:data-type="'Salaries'"
			:general="false"
			:area="area"
			:career="career"
			:value="valueCareer"
		/>
		<br />
		<Average
			:data-type="'Salaries'"
			:general="true"
			:area="area"
			:career="career"
			:value="valueGeneral"
		/>
	</div>
</template>

<script>
	import Average from './Average.vue';
	export default {
		components: {
			Average,
		},
		props: {
			area: {
				type: String,
				required: true,
			},
			career: {
				type: String,
				required: true,
			},
			valueCareer: {
				type: Number,
				default: 0,
			},
			valueGeneral: {
				type: Number,
				default: 0,
			},
		},
	};
</script>

<style scoped></style>
