<template>
	<div class="">
		<v-card>
			<v-progress-circular
				v-if="loading"
				class="mb2 mt2"
				:size="70"
				:width="7"
				color="purple base-1"
				indeterminate
			></v-progress-circular>
			<div v-else>
				<v-card-title
					class="text-h6 shades--text text--base-1 ranking-modal-title"
				>
					<div class="mt1">
						{{ $t('general.ranking') }}
					</div>
				</v-card-title>

				<v-card-text>
					<v-expansion-panels
						focusable
						class="mb1 ranking-modal-panels-container"
					>
						<v-expansion-panel
							v-for="(career, index) in careers"
							:key="index"
							:class="
								career.id === careerId
									? 'white--text purple base-2 mb3'
									: 'white--text purple base-3 mb3'
							"
						>
							<v-expansion-panel-header>
								<span class="ranking-modal-rank">{{ index + 1 }}</span>
								{{ career.name }}
								<template v-slot:actions>
									<v-icon color="white"> $expand </v-icon>
								</template></v-expansion-panel-header
							>
							<v-expansion-panel-content>
								<v-simple-table class="black--text shades transparent mt1">
									<template v-slot:default>
										<tr>
											<th class="text-left">Tipo de Institución</th>
											<th class="text-left">Area de conocimiento</th>
											<th class="text-left">Salario</th>
											<th class="text-left">Empleabilidad</th>
										</tr>
										<tr>
											<td class="text-left">
												{{ getInstitutionName(career.type) }}
											</td>
											<td class="text-left">{{ getAreaName(career.area) }}</td>
											<td class="text-left">{{ addDot(career.salary) }}</td>
											<td class="text-left">
												{{ Math.round(career.employability) }}%
											</td>
										</tr>
									</template>
								</v-simple-table>
							</v-expansion-panel-content>
							<v-divider></v-divider>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						class="white--text text-none"
						@click="showTop = true"
						color="purple base-1"
					>
						{{ $t('general.ranking-download') }}</v-btn
					>
				</v-card-actions>
			</div>
		</v-card>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				careers: [],
				loading: true,
			};
		},
		mounted() {
			this.getCareers({
				criteria: this.shownInfo,
			}).then((res) => {
				this.careers = res;
				this.loading = false;
			});
		},
		computed: {
			...mapGetters({
				institutions: 'base/institutionTypes',
				areas: 'base/areas',
			}),
		},
		props: {
			shownInfo: {
				type: String,
			},
			areaId: {
				type: Number,
			},
			careerId: {
				type: Number,
			},
		},
		methods: {
			...mapActions({
				getCareers: 'base/getCareersOrderedBy',
			}),
			getInstitutionName(id) {
				return this.institutions.find((institution) => institution.id === id)
					.label;
			},
			getAreaName(id) {
				return this.areas.find((area) => area.id === id).name;
			},
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
	.ranking-modal-rank {
		background: var(--color-primary);
		border-radius: 3px;
		min-height: 25px;
		min-width: 25px;
		max-width: 35px;
		color: white;
		margin-right: 1rem;
		padding-top: 0.3rem;
		text-align: center;
	}
	.ranking-modal-panels-container {
		max-height: 40rem;
		overflow-y: scroll;
	}
	.ranking-modal-title {
		font-size: 1.2rem;
		text-align: left;
		word-break: keep-all;
	}
	@media (max-width: 700px) {
		.ranking-modal-title {
			font-size: 0.7rem;
		}
	}
</style>
