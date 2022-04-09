export function GetEpochValues(duration) {
	if (duration === 'Year') {
		return 52559
	} else if(duration === 'Month') {
		return 4380
	} else if(duration === 'Day') {
		return 144
	}
}