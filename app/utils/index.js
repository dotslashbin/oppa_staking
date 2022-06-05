
export function GetMinutesFromTimeUnit(duration) {
	if (duration === 'Year') {
		return 525599
	} else if(duration === 'Month') {
		return 43800
	} else if(duration === 'Day') {
		return 1440
	}
}

export function GetAllowedStakablePercentage() {
	return 90;
}

export function GetPercentageFromValue(percentage, totalValue) {
	const amontToSubtract =  (100 * percentage) / totalValue;
	return (totalValue - amontToSubtract)
}

export function GetTimeTillNextEpoch(frequency, differenceInSeconds) {
	const accumulated = (60*frequency)
	return differenceInSeconds%accumulated
}

export function HasTimePassedMinimum(frequency, differenceInSeconds) {
	const differenceInMins = differenceInSeconds / 60

	return differenceInMins > frequency? true:false
}