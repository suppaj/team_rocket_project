import React from 'react';
import { statesOptions } from './utilities';

const BillForm = ( { billInfo, setBillInfo, formStatus, setKey, isChecked, shipInfo, handleCheckbox } ) => {

    return (
        <>
        <p>Billing Address</p>
          <label>
            <input
              type='checkbox'
              id='same-as-shipping'
              className='nes-checkbox is-small'
              onChange={handleCheckbox}
            />
            <span id='same-shipping-text'>Same as shipping</span>
          </label>
          <div className='nes-field'>
            <label htmlFor='ckout-bill-add1'>Address 1</label>
            <input
              type='text'
              id='ckout-bill-add1'
              className='nes-input'
              placeholder='123 Edgeof'
              disabled={isChecked}
              value={isChecked ? shipInfo.add1 : billInfo.add1}
              required
              onChange={(e) =>
                setBillInfo({ ...billInfo, add1: e.target.value })
              }
            />
          </div>
          <div className='nes-field'>
            <label htmlFor='ckout-bill-add2'>Address 2</label>
            <input
              type='text'
              id='ckout-bill-add2'
              className='nes-input'
              placeholder='Unit A, Apt 23, etc...'
              disabled={isChecked}
              value={isChecked ? shipInfo.add2 : billInfo.add2}
              onChange={(e) =>
                setBillInfo({ ...billInfo, add2: e.target.value })
              }
            />
          </div>
          <div className='nes-field'>
            <label htmlFor='ckout-bill-city'>City</label>
            <input
              type='text'
              id='ckout-bill-city'
              className='nes-input'
              disabled={isChecked}
              value={isChecked ? shipInfo.city : billInfo.city}
              required
              placeholder='Pallet Town'
              onChange={(e) =>
                setBillInfo({ ...billInfo, city: e.target.value })
              }
            />
          </div>
          <div className='nes-field'>
            <label htmlFor='ckout-bill-state'>State</label>
            <div className='nes-select'>
              <select
                required
                id='ckout-bill-state'
                disabled={isChecked}
                value={isChecked ? shipInfo.state : billInfo.state}
                onChange={(e) =>
                  setBillInfo({ ...billInfo, state: e.target.value })
                }
              >
                <option value='' disabled hidden>
                  State...
                </option>
                {statesOptions()}
              </select>
            </div>
          </div>
          <div className='nes-field'>
            <label htmlFor='ckout-bill-zip'>Zipcode</label>
            <input
              type='text'
              id='ckout-bill-zip'
              className='nes-input'
              disabled={isChecked}
              value={isChecked ? shipInfo.zipcode : billInfo.zipcode}
              required
              onChange={(e) =>
                setBillInfo({ ...billInfo, zipcode: e.target.value })
              }
              placeholder='12345 or 12345-0000'
            />
          </div>
          <br />
          <button
            type='button'
            className='nes-btn is-primary'
            onClick={() => setKey('shipping')}
          >
            Back
          </button>{' '}
          <button
            type='button'
            className={
              formStatus.billing ? 'nes-btn is-disabled' : 'nes-btn is-success'
            }
            disabled={formStatus.billing}
            onClick={() => setKey('CC')}
          >
            Next
          </button>
        </>
    )
}

export default BillForm;