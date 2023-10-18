import Api from '../api';

/* Helper function for landing page
 *
 *this function will get 5 items per category id
 *from the ebay api
 *and return an array of objects
 * it is just used to clean up the landing page
 */
// const categoryIds = [293, 9355, 165255, 1277, 11450];

let categoryMap = {
	293: 'electronics',
	9355: 'cellPhones',
	165255: 'instruments',
	1527: 'jewelry',
	11450: 'clothing',
}; // example category IDs

export async function getLandingPage() {
	const ids = Object.keys(categoryMap);

	// Initiate all requests concurrently
	const responses = await Promise.all(ids.map((id) => Api.getLandingPage(id)));

	// Map the responses back to the categoryMap
	const items = {};
	for (let i = 0; i < ids.length; i++) {
		items[categoryMap[ids[i]]] = responses[i].data;
	}

	return items;
}

