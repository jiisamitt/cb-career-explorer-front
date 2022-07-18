import api from '../api';

export default {
	// Request para obtener todos los años donde hay información
	getAllYears() {
		return api.get(`/imparted_career_year?required_fields=year&unique=1`);
	},

	// Request para obtener todos los tipos de institución
	getAllInstitutionTypes() {
		return api.get(`/institution_type`);
	},

	// Request para obtener todas las áreas de conocimiento según el tipo de institución
	getAllAreasByInstitutionType(institutionTypeId) {
		return api.get(`/area?institution_type__id=${institutionTypeId}`);
	},

	// Request para obtener carreras según área y según tipo de institución
	getAllCareersByAreaAndInstitutionType(institutionTypeId, areaId) {
		return api.get(`/career?type=${institutionTypeId}&area=${areaId}`);
	},

	// Request para obtener salario o empleabilidad promedio en carrera o un area
	getAverageSalaryOrEmployability(criteria, type, id) {
		if (criteria === 'Salary')
			if (type === 'Area')
				return api.get(
					`/salary?average_on=salary&related=career&related__area=${id}
				`
				);
			else
				return api.get(
					`/salary?average_on=salary&related=career&related_id=${id}`
				);
		else if (criteria === 'Employability')
			if (type === 'Area')
				return api.get(
					`/employability?average_on=percent_employability&related=career&related__area=${id}`
				);
			else
				return api.get(
					`/employability?average_on=percent_employability&related=career&related_id=${id}
				`
				);
	},
	// Request para obtener top 10 carreras según salario o empleabilidad y área
	getTopCareers(criteria, areaId, limit) {
		if (criteria === 'Salary')
			return api.get(`/career?order_by=-salary&area=${areaId}&limit=${limit}`);
		else if (criteria === 'Employability')
			return api.get(
				`/career?order_by=-employability&area=${areaId}&limit=${limit}`
			);
	},
	// Request para obtener carreras ordenadas por salario o empleabilidad (todas las áreas)
	getCareersOrderedBy(criteria) {
		if (criteria === 'Salary') return api.get(`/career?order_by=-salary`);
		else if (criteria === 'Employability')
			return api.get(`/career?order_by=-employability`);
	},
	// Request para obtener salario empleabilidad promedio por año de egresado según carrera y criterio
	getCareersByYearsAfterGrad(criteria, careerId) {
		if (criteria === 'Salary')
			return api.get(
				`/salary?related=career&related_id=${careerId}&group_by=years_after_grad&average_on=salary&sum_on=n_graduates&order_by=years_after_grad`
			);
		else if (criteria === 'Employability')
			return api.get(
				`/employability?related=career&related_id=${careerId}&group_by=years_after_grad&average_on=percent_employability&sum_on=n_graduates&order_by=years_after_grad`
			);
	},

	// Request para obtener salario o empleabilidad promedio de la carrera por nivel educativo (o institution_type)
	getCareersByLevel(criteria, careerId) {
		if (criteria === 'Salary')
			return api.get(
				`/subject_by_institution_type?subject=salary&related=career&related_code=${careerId}`
			);
		else if (criteria === 'Employability')
			return api.get(
				`/subject_by_institution_type?subject=employability&related=career&related_code=${careerId}`
			);
	},

	// Rquest para obtener empleabilidad promedio de la carrera por nivel educativo (institution_Type)
	getAverageEmployabilityByLevel(careerId) {
		return api.get(
			`/subject_by_institution_type?subject=employability&related=career&related_code=${careerId}`
		);
	},

	// Request para obtener la empleabilidad de la carrera por año
	getEmployabilityByYear(careerId) {
		return api.get(
			`/employability?related=career&related_id=${careerId}&group_by=years_after_grad&average_on=percent_employability&sum_on=n_graduates&order_by=years_after_grad`
		);
	},

	// Request para obtener top 10 o bottom 10 carreras según criteria y área
	getTopOrBottomCareersByArea(criteria, areaId) {
		return api.get(`/career?order_by=${criteria}&area=${areaId}&limit=10`);
	},

	// Request para obtener todas las carreras ordenadas según criteria, año y límite opcional
	getAllCareersByCriteria(criteria) {
		return api.get(`/career?year=<year>&order_by=${criteria}&limit=<optional>`);
	},
};
