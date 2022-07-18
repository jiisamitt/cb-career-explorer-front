<template>
	<div>
		<!-- left -->
		<span
			class="general-switch"
			:class="classGetter('left')"
			@click="handleClick('left')"
			>{{ left }}</span
		>
		<!-- right -->
		<span
			class="general-switch"
			:class="classGetter('right')"
			@click="handleClick('right')"
			>{{ right }}</span
		>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leftOrRight: 'left',
			};
		},
		props: {
			left: {
				type: String,
				required: true,
			},
			right: {
				type: String,
				required: true,
			},
		},
		methods: {
			handleClick(clickedElement) {
				if (clickedElement != this.leftOrRight) {
					if (clickedElement === 'left') {
						this.leftOrRight = 'left';
						this.$emit('handleChange', 'Salary');
					} else {
						this.leftOrRight = 'right';
						this.$emit('handleChange', 'Employability');
					}
				}
			},

			classGetter(type) {
				if (this.leftOrRight === type) {
					return 'general-info-selector-selected';
				}
			},
		},
	};
</script>

<style scoped>
	.general-switch {
		background: #dde1fe;
		border-radius: 4px;
		padding: 0.5rem 1rem 0.5rem 1rem;
		color: #9aa5fd;
		cursor: pointer;
		margin: 0.3rem;
	}
	.general-info-selector-selected {
		background: #5669fb;
		color: white;
	}
	.general-info-selector-left:first-letter {
		text-transform: uppercase;
	}
	.general-info-selector-right:first-letter {
		text-transform: uppercase;
	}
</style>
