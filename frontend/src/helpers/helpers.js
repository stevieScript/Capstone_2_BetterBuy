import Api from '../api';

/* Helper function for landing page
 *
 *this function will get 5 items per category id
 *from the ebay api
 *and return an array of objects
 * it is just used to clean up the landing page
 */
const categoryIds = [293, 9355, 165255, 1277, 11450];

// let ids = [
// 	{electronics: 293},
// 	{cellPhones: 9355},
// 	{instruments: 165255},
// 	{home: 1277},
// 	{clothing: 11450},
// ];

let categoryMap = {
	293: 'electronics',
	9355: 'cellPhones',
	165255: 'instruments',
	1527: 'jewelry',
	11450: 'clothing',
}; // example category IDs

// export async function getLandingPage() {
// 	try {
// 		const requests = categoryIds.map(async (id) => {
// 			const response = await Api.getLandingPage(id);
// 			return response;
// 		});
// 		const responses = await Promise.all(requests);

// 		return responses;
// 	} catch (error) {
// 		console.error('Error fetching data:', error);
// 	}
// }

// export async function getLandingPage() {
// 	const items = [];
// 	for (let id of categoryIds) {
// 		const response = await Api.getLandingPage(id);
// 		console.log(response.data);
// 		items.push(response.data);
// 	}
// 	return items;
// }

//working
// export async function getLandingPage() {
// 	const items = {};
// 	for (let id of Object.keys(myMap)) {
// 		const response = await Api.getLandingPage(id);
// 		items[myMap[id]] = response.data;
// 	}
// 	return items;
// }

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

