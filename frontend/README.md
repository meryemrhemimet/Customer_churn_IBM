# Frontend Integration Example

## How to Use

1. Import and use the `predictChurn` function in your React components.
2. Pass customer data as an object.
3. Display the returned prediction and probability.

## Example
```js
import { predictChurn } from './predictChurn';

const customerData = {
  tenure: 12,
  MonthlyCharges: 80,
  Contract: "Month-to-month"
};

predictChurn(customerData).then(result => {
  // result.churn_prediction, result.churn_probability
  console.log(result);
});
```
