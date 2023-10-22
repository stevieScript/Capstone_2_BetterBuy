const Api = require('../api');

jest.mock('../api');

describe('getLandingPage', () => {
	it('should return an object with items for each category', async () => {
		const categoryMap = {
			1: 'category1',
			2: 'category2',
			3: 'category3',
		};
		const mockResponses = [
			{data: ['item1', 'item2']},
			{data: ['item3', 'item4']},
			{data: ['item5', 'item6']},
		];
		Api.getLandingPage.mockImplementation((id) => {
			return Promise.resolve(mockResponses[id - 1]);
		});

		const result = await Api.getLandingPage(categoryMap);

		expect(result).toEqual({
			category1: ['item1', 'item2'],
			category2: ['item3', 'item4'],
			category3: ['item5', 'item6'],
		});
	});

	it('should handle null or undefined responses', async () => {
		const categoryMap = {
			1: 'category1',
			2: 'category2',
		};
		const mockResponses = [{data: ['item1', 'item2']}, null];
		Api.getLandingPage.mockImplementation((id) => {
			return Promise.resolve(mockResponses[id - 1]);
		});

		const result = await Api.getLandingPage(categoryMap);

		expect(result).toEqual({
			category1: ['item1', 'item2'],
			category2: null,
		});
	});
});

