/**
 * Internal dependencies
 */
import { STATUS } from './constants';
import type { emitterCallback } from '../../base/context/event-emit';

export enum ACTION {
	SET_IDLE = 'SET_IDLE',
	SET_PRISTINE = 'SET_PRISTINE',
	SET_REDIRECT_URL = 'SET_REDIRECT_URL',
	SET_COMPLETE = 'SET_CHECKOUT_COMPLETE',
	SET_BEFORE_PROCESSING = 'SET_BEFORE_PROCESSING',
	SET_AFTER_PROCESSING = 'SET_AFTER_PROCESSING',
	SET_PROCESSING_RESPONSE = 'SET_PROCESSING_RESPONSE',
	SET_PROCESSING = 'SET_CHECKOUT_IS_PROCESSING',
	SET_HAS_ERROR = 'SET_CHECKOUT_HAS_ERROR',
	SET_NO_ERROR = 'SET_CHECKOUT_NO_ERROR',
	SET_CUSTOMER_ID = 'SET_CHECKOUT_CUSTOMER_ID',
	SET_ORDER_ID = 'SET_CHECKOUT_ORDER_ID',
	SET_ORDER_NOTES = 'SET_CHECKOUT_ORDER_NOTES',
	INCREMENT_CALCULATING = 'INCREMENT_CALCULATING',
	DECREMENT_CALCULATING = 'DECREMENT_CALCULATING',
	SET_SHIPPING_ADDRESS_AS_BILLING_ADDRESS = 'SET_SHIPPING_ADDRESS_AS_BILLING_ADDRESS',
	SET_SHOULD_CREATE_ACCOUNT = 'SET_SHOULD_CREATE_ACCOUNT',
	SET_EXTENSION_DATA = 'SET_EXTENSION_DATA',
}

export interface CheckoutResponseError {
	code: string;
	message: string;
	data: {
		status: number;
	};
}

export interface ActionType extends Partial< CheckoutStateContextState > {
	type: ACTION;
	data?:
		| Record< string, unknown >
		| Record< string, never >
		| PaymentResultDataType;
}

export interface CheckoutResponseSuccess {
	// eslint-disable-next-line camelcase
	payment_result: {
		// eslint-disable-next-line camelcase
		payment_status: 'success' | 'failure' | 'pending' | 'error';
		// eslint-disable-next-line camelcase
		payment_details: Record< string, string > | Record< string, never >;
		// eslint-disable-next-line camelcase
		redirect_url: string;
	};
}

export type CheckoutResponse = CheckoutResponseSuccess | CheckoutResponseError;

export interface PaymentResultDataType {
	message: string;
	paymentStatus: string;
	paymentDetails: Record< string, string > | Record< string, never >;
	redirectUrl: string;
}

type extensionDataNamespace = string;
type extensionDataItem = Record< string, unknown >;
export type extensionData = Record< extensionDataNamespace, extensionDataItem >;

export interface CheckoutStateContextState {
	redirectUrl: string;
	status: STATUS;
	hasError: boolean;
	calculatingCount: number;
	orderId: number;
	orderNotes: string;
	customerId: number;
	useShippingAsBilling: boolean;
	shouldCreateAccount: boolean;
	processingResponse: PaymentResultDataType | null;
	extensionData: extensionData;
}

export type CheckoutStateDispatchActions = {
	resetCheckout: () => void;
	setRedirectUrl: ( url: string ) => void;
	setHasError: ( hasError: boolean ) => void;
	setAfterProcessing: ( response: CheckoutResponse ) => void;
	incrementCalculating: () => void;
	decrementCalculating: () => void;
	setCustomerId: ( id: number ) => void;
	setOrderId: ( id: number ) => void;
	setOrderNotes: ( orderNotes: string ) => void;
	setExtensionData: ( extensionData: extensionData ) => void;
};

export type CheckoutState = {
	// Status of the checkout
	status: STATUS;
	// Submits the checkout and begins processing.
	onSubmit: () => void;
	// True when something in the checkout is resulting in totals being calculated.
	isCalculating: boolean;
	// Used to register a callback that will fire after checkout has been processed and there are no errors.
	onCheckoutAfterProcessingWithSuccess: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the checkout has been processed and has an error.
	onCheckoutAfterProcessingWithError: ReturnType< typeof emitterCallback >;
	// Deprecated in favour of onCheckoutValidationBeforeProcessing.
	onCheckoutBeforeProcessing: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the checkout has been submitted before being sent off to the server.
	onCheckoutValidationBeforeProcessing: ReturnType< typeof emitterCallback >;
	// Toggle using shipping address as billing address.
	setUseShippingAsBilling: ( useShippingAsBilling: boolean ) => void;
	// Set if user account should be created.
	setShouldCreateAccount: ( shouldCreateAccount: boolean ) => void;
	// True when the checkout has a draft order from the API.
	hasOrder: boolean;
	// When true, means the provider is providing data for the cart.
	isCart: boolean;
	calculatingCount: number;
	processingResponse: PaymentResultDataType | null;
	// True when the checkout is in an error state. Whatever caused the error (validation/payment method) will likely have triggered a notice.
	hasError: CheckoutStateContextState[ 'hasError' ];
	// This is the url that checkout will redirect to when it's ready.
	redirectUrl: CheckoutStateContextState[ 'redirectUrl' ];
	// This is the ID for the draft order if one exists.
	orderId: CheckoutStateContextState[ 'orderId' ];
	// Order notes introduced by the user in the checkout form.
	orderNotes: CheckoutStateContextState[ 'orderNotes' ];
	// This is the ID of the customer the draft order belongs to.
	customerId: CheckoutStateContextState[ 'customerId' ];
	// Should the billing form be hidden and inherit the shipping address?
	useShippingAsBilling: CheckoutStateContextState[ 'useShippingAsBilling' ];
	// Should a user account be created?
	shouldCreateAccount: CheckoutStateContextState[ 'shouldCreateAccount' ];
	// Custom checkout data passed to the store API on processing.
	extensionData: CheckoutStateContextState[ 'extensionData' ];
};
