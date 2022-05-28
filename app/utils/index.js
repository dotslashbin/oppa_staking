
export function GetEpochValues(duration) {
	if (duration === 'Year') {
		return 52559
	} else if(duration === 'Month') {
		return 4380
	} else if(duration === 'Day') {
		return 144
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