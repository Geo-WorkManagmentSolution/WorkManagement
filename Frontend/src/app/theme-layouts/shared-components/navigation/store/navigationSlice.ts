import { createEntityAdapter, createSelector, createSlice, PayloadAction, WithSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'app/store/store';
import { PartialDeep } from 'type-fest';
import { FuseFlatNavItemType, FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import { selectUserPermissions, selectUserRole } from 'src/app/auth/user/store/userSlice';
import FuseNavigationHelper from '@fuse/utils/FuseNavigationHelper';
import i18next from 'i18next';
import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import FuseUtils from '@fuse/utils';
import navigationConfig from 'app/configs/navigationConfig';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const navigationAdapter = createEntityAdapter<FuseFlatNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	FuseNavigationHelper.flattenNavigation(navigationConfig)
);

/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: FuseNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(FuseNavigationHelper.appendNavItem(navigation, FuseNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: FuseNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(FuseNavigationHelper.prependNavItem(navigation, FuseNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<FuseNavItemType>): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(FuseNavigationHelper.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(FuseNavigationHelper.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors<RootState>((state) => state.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action: PayloadAction<FuseNavItemType[]>) {
			return navigationAdapter.setAll(state, FuseNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(navigationSlice);
navigationSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof navigationSlice> {}
}

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
    [selectNavigationAll, selectUserRole, selectUserPermissions, selectCurrentLanguageId],
    (navigationSimple, userRole, userPermissions) => {
        const navigation = FuseNavigationHelper.unflattenNavigation(navigationSimple);
		console.log("navigation",navigation);
		
		function setAdditionalData(data: FuseNavItemType[]): FuseNavItemType[] {
			console.log("Setting additional data for navigation items...");
			// console.log("Input data:", data);
		
			return data?.map((item) => {
				const hasPermission = Boolean(FuseUtils.hasPermission(item?.auth, userRole, userPermissions));
				// console.log(`Processing item: ${item?.title || "Unnamed Item"}`);
				// console.log("Item permissions:", item?.auth);
				// console.log("User role:", userRole);
				// console.log("User permissions:", userPermissions);
				// console.log("Has permission:", hasPermission);
		
				const translatedTitle = item?.translate && item?.title ? i18next.t(`navigation:${item?.translate}`) : item?.title;
				// console.log("Translated title (if applicable):", translatedTitle);
		
				const children = item?.children ? setAdditionalData(item?.children) : undefined;
				// console.log("Children (if applicable):", children);
		
				const newItem = {
					hasPermission,
					...item,
					...(translatedTitle ? { title: translatedTitle } : {}),
					...(children ? { children } : {}),
				};
				// console.log("Updated item:", newItem);
				
				return newItem;
			});
		}
		

        const translatedValues = setAdditionalData(navigation);
		console.log("tranlated navigation",translatedValues);
		

        return translatedValues;
    }
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => {
	return FuseNavigationHelper.flattenNavigation(navigation);
});

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
