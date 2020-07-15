module.exports = (cpf) => {
	const verifiedCPF = cpf.toString()
	const testInput = /[0-9]{11}/.test(verifiedCPF)

	if (testInput) {
		const testCPF = (verifiedCPF) => {
			let sum = 0
			let rest = 0

			if (
				verifiedCPF == '00000000000' ||
				verifiedCPF == '11111111111' ||
				verifiedCPF == '22222222222' ||
				verifiedCPF == '33333333333' ||
				verifiedCPF == '44444444444' ||
				verifiedCPF == '55555555555' ||
				verifiedCPF == '66666666666' ||
				verifiedCPF == '77777777777' ||
				verifiedCPF == '88888888888' ||
				verifiedCPF == '99999999999'
			) {
				return false
			}

			for (i = 1; i <= 9; i++) {
				sum = sum + parseInt(verifiedCPF.substring(i - 1, i)) * (11 - i)
				rest = (sum * 10) % 11
			}

			if (rest == 10 || rest == 11) {
				rest = 0
			}

			if (rest != parseInt(verifiedCPF.substring(9, 10))) {
				return false
			}

			sum = 0
			for (i = 1; i <= 10; i++) {
				sum = sum + parseInt(verifiedCPF.substring(i - 1, i)) * (12 - i)
				rest = (sum * 10) % 11
			}

			if (rest == 10 || rest == 11) {
				rest = 0
			}

			if (rest != parseInt(verifiedCPF.substring(10, 11))) {
				return false
			}
			return true
		}
		if (testCPF(verifiedCPF)) {
			const registrationMask = (verifiedCPF) => {
				const arr = verifiedCPF.split('')
				const format =
					arr.slice(0, 3) +
					'.' +
					arr.slice(3, 6) +
					'.' +
					arr.slice(6, 9) +
					'-' +
					arr.slice(9, 11)

				const validateCPF = format.replace(/,/g, '')
				return validateCPF
			}
			return registrationMask(verifiedCPF)
		}
		return testCPF(verifiedCPF)
	}
}
