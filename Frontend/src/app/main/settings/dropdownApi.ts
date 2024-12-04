// Simulating API calls with local storage

export interface DropdownItem {
	id: number;
	name: string;
}

export interface DropdownCategory {
	id: string;
	name: string;
	items: DropdownItem[];
}

const STORAGE_KEY = 'dropdownCategories';

const getCategories = (): DropdownCategory[] => {
	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData ? JSON.parse(storedData) : [];
};

const saveCategories = (categories: DropdownCategory[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const dropdownApi = {
	getCategories: async (): Promise<DropdownCategory[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(getCategories());
			}, 500);
		});
	},

	addCategory: async (name: string): Promise<DropdownCategory> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const categories = getCategories();
				const newCategory: DropdownCategory = {
					id: Date.now().toString(),
					name,
					items: []
				};
				categories.push(newCategory);
				saveCategories(categories);
				resolve(newCategory);
			}, 500);
		});
	},

	addItem: async (categoryId: string, name: string): Promise<DropdownItem> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const categories = getCategories();
				const category = categories.find((c) => c.id === categoryId);

				if (category) {
					const newItem: DropdownItem = {
						id: Date.now(),
						name
					};
					category.items.push(newItem);
					saveCategories(categories);
					resolve(newItem);
				} else {
					throw new Error('Category not found');
				}
			}, 500);
		});
	},

	updateItem: async (categoryId: string, item: DropdownItem): Promise<DropdownItem> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const categories = getCategories();
				const category = categories.find((c) => c.id === categoryId);

				if (category) {
					const index = category.items.findIndex((i) => i.id === item.id);

					if (index !== -1) {
						category.items[index] = item;
						saveCategories(categories);
						resolve(item);
					} else {
						throw new Error('Item not found');
					}
				} else {
					throw new Error('Category not found');
				}
			}, 500);
		});
	},

	deleteItem: async (categoryId: string, itemId: number): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const categories = getCategories();
				const category = categories.find((c) => c.id === categoryId);

				if (category) {
					category.items = category.items.filter((i) => i.id !== itemId);
					saveCategories(categories);
					resolve();
				} else {
					throw new Error('Category not found');
				}
			}, 500);
		});
	}
};
