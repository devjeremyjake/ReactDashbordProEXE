const Validation = (values) => {
	let errors = {};
	if (!values.name) {
		errors.name = 'Name is Required.';
	}
	if (!values.email) {
		errors.email = 'Email is Required.';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email is Invalid.';
	}
	return errors;
};

export default Validation;
