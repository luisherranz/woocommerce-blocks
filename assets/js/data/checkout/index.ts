/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducers';
import { DispatchFromMap, SelectFromMap } from '../mapped-types';

registerStore( STORE_KEY, {
	reducer,
	selectors,
	actions,
	__experimentalUseThunks: true,
} );

export const CHECKOUT_STORE_KEY = STORE_KEY;
declare module '@wordpress/data' {
	function dispatch(
		key: typeof CHECKOUT_STORE_KEY
	): DispatchFromMap< typeof actions >;
	function select(
		key: typeof CHECKOUT_STORE_KEY
	): SelectFromMap< typeof selectors > & {
		hasFinishedResolution: ( selector: string ) => boolean;
	};
}
