<template>
	<div class="average-container">
		<!-- start title -->
		<div style="color: black; font-size: 1.3rem; white-space: nowrap">
			<div v-if="general && option === 'Salary'">
				{{ $t('general.average-values.salaries-general') }}
			</div>
			<div v-if="general && option === 'Employability'">
				{{ $t('general.average-values.employability-general') }}
			</div>
			<div v-if="!general && option === 'Salary'">
				{{ $t('general.average-values.salaries-career') }}
			</div>
			<div v-if="!general && option === 'Employability'">
				{{ $t('general.average-values.employability-career') }}
			</div>
		</div>
		<!-- end title -->

		<!-- start career or area name -->
		<div>{{ name }}</div>

		<!-- end career or area name -->

		<!-- start value -->
		<div v-if="option === 'Salary' && value" class="average-value">
			${{ addDot(value) }}
		</div>

		<div v-else-if="option === 'Employability' && value" class="average-value">
			{{ addDot(value) }} {{ $t('general.average-values.employability-2') }}
		</div>
		<div v-else class="average-value">
			{{ $t('general.average-values.not-available') }}
		</div>

		<!-- end value -->
	</div>
</template>

<script>
	export default {
		props: {
			general: {
				type: Boolean,
				required: true,
			},
			option: {
				type: String,
			},
			name: {
				type: String,
			},
			value: {
				type: Number,
			},
		},
		methods: {
			// this function adds a dot to the number if it is higher than 1000 and make it int
			addDot(number) {
				number = Math.round(number);
				if (number >= 1000) {
					return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
				}
				return number;
			},
		},
	};
</script>

<style scoped>
	.average-container {
		width: 100%;
		padding: 0.6rem 0rem 0rem 0.6rem;
		background: white;
		border-radius: 6px;
		text-align: left;
		color: var(--color-black-1);
	}
	.average-value {
		font-size: 1.65rem;
		font-weight: 700;
		color: var(--color-purple-1);
	}
	@media (max-width: 700px) {
		.average-container {
			padding: 0.8rem 0rem 0rem 0.8rem;
		}
		.average-value {
			font-size: 1.3rem;
			font-weight: 700;
			color: var(--color-purple-1);
		}
	}
</style>
