export const formatDate = function (date: Date) {
	const formattedDate = date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
	return formattedDate
}
