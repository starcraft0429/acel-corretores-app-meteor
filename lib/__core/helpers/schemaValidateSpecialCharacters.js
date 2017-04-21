function validateSpecialCharacters(value) {
	if (/^[a-zA-Z- ]*$/.test(value) == false) {
		return false;
	} else {
		return true;
	}
}

export default function schemaValidateSpecialCharacters() {
	const value = this.value;
	if (!validateSpecialCharacters(value)) return 'invalid';
}

global.validateSpecialCharacters = validateSpecialCharacters;
