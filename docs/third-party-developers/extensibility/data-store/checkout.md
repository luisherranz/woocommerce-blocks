# wc/store/checkout

## Table of Contents

-   [Selectors](#selectors)
    -   [getCustomerId](#getcustomerid)
    -   [getCheckoutState](#getcheckoutstate)
    -   [getOrderNotes](#getordernotes)
    -   [hasError](#haserror)
    -   [hasOrder](#hasorder)
    -   [isAfterProcessing](#isafterprocessing)
    -   [isBeforeProcessing](#isbeforeprocessing)
    -   [isCalculating](#iscalculating)
    -   [isComplete](#iscomplete)
    -   [isIdle](#isidle)
    -   [isProcessing](#isprocessing)

## Selectors

### getCustomerId

Returns the ID of the customer.

#### _Returns_

-   `number`: ID of the customer.

### getOrderNotes

Returns the order notes.

#### _Returns_

-   `string`: Order notes.

### hasError

Returns true if an error occurred, and false otherwise.

#### _Returns_

-   `boolean`: Whether an error occurred.

### hasOrder

Returns true if an order exists, and false otherwise.

#### _Returns_

-   `boolean`: Whether an order occurred.

### isAfterProcessing

Returns true if an order had just been processed, and false otherwise.

#### _Returns_

-   `boolean`: Whether an order had just been processed.

### isBeforeProcessing

Returns true if an order is about to be processed, and false otherwise.

#### _Returns_

-   `boolean`: Whether an order is about to be processed.

### isCalculating

Returns true if there is an in-flight request to update any values, and false otherwise.

#### _Returns_

-   `boolean`: Whether there is an in-flight request to update any values.

### isComplete

Returns true if an order is complete, and false otherwise.

#### _Returns_

-   `boolean`: Whether an order is complete.

### isIdle

Returns true if the checkout has had some activity, but is currently waiting for user input, and false otherwise.

#### _Returns_

-   `boolean`: Whether the checkout has had some activity, but is currently waiting for user input.

### isProcessing

Returns true if the checkout is processing, and false otherwise.

#### _Returns_

-   `boolean`: Whether the checkout is processing.

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/checkout-payment-methods/checkout-flow-and-events.md)

<!-- /FEEDBACK -->
