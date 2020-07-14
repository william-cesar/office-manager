const registrationValidator = (cpf) => {
	const testInput = /[0-9]{11}/.test(cpf)

	if (testInput) {
		const testCPF = (cpf) => {
			let sum = 0
			let rest = 0

			if (cpf == '00000000000') {
				return false
			}

			for (i = 1; i <= 9; i++) {
				sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
				rest = (sum * 10) % 11
			}

			if (rest == 10 || rest == 11) {
				rest = 0
			}

			if (rest != parseInt(cpf.substring(9, 10))) {
				return false
			}

			sum = 0
			for (i = 1; i <= 10; i++) {
				sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
				rest = (sum * 10) % 11
			}

			if (rest == 10 || rest == 11) {
				rest = 0
			}

			if (rest != parseInt(cpf.substring(10, 11))) {
				return false
			}

			return true
		}

		if (testCPF) {
			const registrationMask = (cpf) => {
				const arr = cpf.split('')
				const format =
					arr.slice(0, 3) +
					'.' +
					arr.slice(3, 6) +
					'.' +
					arr.slice(6, 9) +
					'-' +
					arr.slice(9, 11)

				const formatedCPF = format.replace(/,/g, '')
				return formatedCPF
			}
			return registrationMask(cpf)
		}
		return testCPF(cpf)
	}
}

module.exports = registrationValidator
