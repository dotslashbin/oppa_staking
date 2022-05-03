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

export function GetTimeTillNextEpoch(frequency, startTime) {
	const timeNow = new Date()

	const startTimeInDate = new Date(0)
	startTimeInDate.setUTCSeconds(startTime)

	const differenceInSeconds = (timeNow - startTimeInDate) / 1000;
	const minutes = differenceInSeconds / 60; 
	const numberOfEpochFrequencies = minutes / frequency

	const remaining = differenceInSeconds - (numberOfEpochFrequencies * frequency)*120

	return remaining
}