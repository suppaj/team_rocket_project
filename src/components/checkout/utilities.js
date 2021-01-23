import React from 'react';

export function statesOptions() {
  const stateArray = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];
  return stateArray.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ));
}

export function calculateOrderAmount(cart) {
  let orderTotal = 0;
  for (let item of cart) { 
      orderTotal += (item.price * item.cart_quantity);
    }
  return (orderTotal.toFixed(2));
}
