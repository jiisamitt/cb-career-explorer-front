<template>
	<div class="welcome-container">
		<!-- figures -->
		<div>
			<div class="welcome-circle"></div>
			<div class="welcome-square"></div>
			<div class="welcome-semi-circles">
				<div class="welcome-semi-circle-up"></div>
				<div class="welcome-semi-circle-down"></div>
			</div>

			<div class="welcome-triangle"></div>
		</div>
		<!-- end figures -->
		<!-- subcontainer -->
		<div class="welcome-subcontainer">
			<!-- title -->
			<h1 class="welcome-title">
				{{ $t('welcome.title') }}
			</h1>
			<!-- end title -->

			<!-- subtitle -->

			<h2 class="welcome-subtitle">
				{{ $t('welcome.subtitle1') }}
			</h2>
			<h2 class="welcome-subtitle">
				{{ $t('welcome.subtitle2') }}
			</h2>
			<!-- end subtitle -->

			<!-- start filters-->
			<v-select
				class="welcome-select"
				outlined
				background-color="white"
				@change="chosenInstitution"
				:items="institutions"
				items-text="label"
				items-value="id"
				:loading="institutions.length < 1"
			>
				<template v-slot:selection="{ item }">
					{{ item.label }}
				</template>
				<template v-slot:item="{ item }">
					{{ item.label }}
				</template>
				<template slot="label">
					{{ $t('welcome.select-institution-type') }}
				</template>
			</v-select>
			<v-select
				class="welcome-select"
				outlined
				background-color="white"
				:disabled="!institutionReady"
				@change="chosenArea"
				:items="areas"
				items-text="name"
				items-value="id"
				:loading="areas.length < 1 && institutionReady"
			>
				<template v-slot:selection="{ item }">
					{{ item.name }}
				</template>
				<template v-slot:item="{ item }"> {{ item.name }} </template
				><template slot="label">
					{{ $t('welcome.select-area') }}
				</template>
			</v-select>
			<v-select
				class="welcome-select"
				outlined
				background-color="white"
				:disabled="!areaReady"
				@change="chosenCareer"
				:items="careers"
				items-text="name"
				items-value="id"
				:loading="careers.length < 1 && areaReady"
			>
				<template v-slot:selection="{ item }">
					{{ item.name }}
				</template>
				<template v-slot:item="{ item }"> {{ item.name }} </template
				><template slot="label">
					{{ $t('welcome.select-career') }}
				</template>
			</v-select>
			<!-- end filters -->

			<!-- start button -->
			<v-btn class="welcome-btn" @click="search" :disabled="!readyToSearch">
				{{ $t('welcome.btn') }}
			</v-btn>
			<!-- end button -->
		</div>
		<!-- end subcontainer -->
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				name: 'Welcome',
				institutionReady: false,
				areaReady: false,
				readyToSearch: false,
				institution: {},
				area: {},
				career: {},
			};
		},
		mounted() {
			this.getInstitutions();
			/*.then((res) => {
					this.institutions = res;
					//console.log('institutitonss', this.institutions);
				});*/
		},
		methods: {
			...mapActions({
				getInstitutions: 'base/getAllInstitutionTypes',
				getAreas: 'base/getAllAreasByInstitutionType',
				getCareers: 'base/getAllCareersByAreaAndInstitutionType',
				setSelectedView: 'base/setSelectedView',
				setSearchValues: 'base/setSearchValues',
			}),
			chosenInstitution(institution) {
				this.institutionReady = true;
				this.areaReady = false;
				this.readyToSearch = false;
				this.institution = institution;
				this.area = {};
				this.career = {};
				this.getAreas(institution.id);
			},
			chosenArea(area) {
				this.areaReady = true;
				this.readyToSearch = false;
				this.area = area;
				this.career = {};
				this.getCareers({
					institutionTypeId: this.institution.id,
					areaId: this.area.id,
				});
			},
			chosenCareer(career) {
				this.readyToSearch = true;
				this.career = career;
			},
			search() {
				this.setSelectedView('General');
				this.setSearchValues({
					institution: this.institution,
					area: this.area,
					career: this.career,
				});
			},
		},
		computed: {
			...mapGetters({
				institutions: 'base/institutionTypes',
				areas: 'base/areas',
				careers: 'base/careers',
			}),
		},
	};
</script>
<style scoped>
	.welcome-select >>> fieldset {
		/*border-color: linear-gradient(
			to right,
			rgba(238, 119, 211, 1) rgba(86, 105, 251, 1)
		);*/
		border: 1px solid;
		border-color: rgba(86, 105, 251, 1);
	}
	.welcome-btn {
		float: right;
		text-transform: capitalize !important;
		color: var(--color-white-1) !important;
		background: var(--color-purple-1) !important;
	}
	.welcome-circle {
		position: absolute;
		top: 50rem;
		left: -1.5%;
		background: #f073d4;
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.welcome-square {
		position: absolute;
		top: 15rem;
		left: 10%;
		width: 80px;
		height: 80px;
		background: #5463ff;
	}
	.welcome-semi-circles {
		position: absolute;
		right: 5%;
		width: 80px;
	}
	.welcome-semi-circle-up {
		position: relative;
		width: 80px;
		height: 50px;
		background: #f073d4;
		-moz-border-radius: 100px 100px 0 0;
		-webkit-border-radius: 100px 100px 0 0;
		border-radius: 100px 100px 0 0;
	}
	.welcome-semi-circle-down {
		position: relative;
		right: 35px;
		transform: rotateX(180deg);
		width: 80px;
		height: 50px;
		background: #f073d4;
		-moz-border-radius: 100px 100px 0 0;
		-webkit-border-radius: 100px 100px 0 0;
		border-radius: 100px 100px 0 0;
	}
	.welcome-triangle {
		position: absolute;
		top: 43rem;
		right: 12%;
		width: 0;
		height: 0;
		border-right: 50px solid transparent;
		border-top: 50px solid transparent;
		border-left: 50px solid #00d8b4;
		border-bottom: 50px solid #00d8b4;
		transform: rotateY(180deg);
	}

	.welcome-container {
		background: radial-gradient(
			66.96% 66.96% at 50% 50%,
			#eef0ff 0%,
			#d0d6ff 100%
		);
		width: 100vw;
		height: 100%;
	}
	.welcome-subcontainer {
		width: 40%;
		height: 60%;
		margin: auto;
		margin-top: 8rem;
		margin-bottom: 8rem;
	}
	.welcome-title {
		letter-spacing: 1px;
		font-weight: bolder;
		margin-bottom: 1rem;
		color: var(--color-black-1);
	}
	.welcome-subtitle {
		font-weight: bold;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
		color: var(--color-black-1);
	}
	.welcome-steps {
		width: max-content;
		margin-left: auto;
		margin-right: auto;
	}
	.welcome-step-tag {
		background: var(--color-primary);
		border-radius: 2px;
		color: white;
		width: max-content;
		padding: 5px;
	}
	.welcome-step-text {
		font-weight: 400;
		width: 20rem;
		text-align: left;
	}
	.welcome-select {
		border: yellow;
	}
	@media (max-width: 700px) {
		.welcome-subcontainer {
			width: 90%;
			font-size: 0.7rem;
			margin-top: 2rem;
		}
		.welcome-circle {
			top: 17%;
			left: -45px;
			width: 60px;
			height: 60px;
		}
		.welcome-square {
			top: 20%;
			left: auto;
			right: -55px;
			width: 70px;
			height: 70px;
		}
		.welcome-semi-circles {
			right: auto;
			top: 41rem;
			left: 10%;
		}
		.welcome-semi-circle-up {
			width: 70px;
			height: 40px;
			-moz-border-radius: 100px 100px 0 0;
			-webkit-border-radius: 100px 100px 0 0;
			border-radius: 100px 100px 0 0;
		}
		.welcome-semi-circle-down {
			right: 35px;
			transform: rotateX(180deg);
			width: 70px;
			height: 40px;
			-moz-border-radius: 100px 100px 0 0;
			-webkit-border-radius: 100px 100px 0 0;
			border-radius: 100px 100px 0 0;
		}
		.welcome-triangle {
			top: 44rem;
			right: 7%;
			border-right: 35px solid transparent;
			border-top: 35px solid transparent;
			border-left: 35px solid #00d8b4;
			border-bottom: 35px solid #00d8b4;
		}
	}
</style>
