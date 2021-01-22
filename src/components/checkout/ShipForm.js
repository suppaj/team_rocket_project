import React from 'react';
import { statesOptions } from './utilities';

const ShipForm = ({ shipInfo, setShipInfo, formStatus, setKey }) => {
  return (
    <>
      <p>Shipping Address</p>
      <div className='nes-field'>
        <label htmlFor='ckout-ship-add1'>Address 1</label>
        <input
          type='text'
          id='ckout-ship-add1'
          className='nes-input'
          placeholder='123 Main St'
          value={shipInfo.add1}
          required
          onChange={(e) => setShipInfo({ ...shipInfo, add1: e.target.value })}
        />
      </div>
      <div className='nes-field'>
        <label htmlFor='ckout-ship-add2'>Address 2</label>
        <input
          type='text'
          id='ckout-ship-add2'
          className='nes-input'
          placeholder='Unit A, Apt 23, etc...'
          value={shipInfo.add2}
          onChange={(e) => setShipInfo({ ...shipInfo, add2: e.target.value })}
        />
      </div>
      <div className='nes-field'>
        <label htmlFor='ckout-ship-city'>City</label>
        <input
          type='text'
          id='ckout-ship-city'
          className='nes-input'
          required
          placeholder='Kanto Region'
          value={shipInfo.city}
          onChange={(e) => setShipInfo({ ...shipInfo, city: e.target.value })}
        />
      </div>
      <div className='nes-field' >
        <label htmlFor='ckout-ship-state'>State</label>
        <div className='nes-select'>
          <select
            id='ckout-ship-state'
            value={shipInfo.state}
            onChange={(e) =>
              setShipInfo({ ...shipInfo, state: e.target.value })
            }
            placeholder='State...'
            autoComplete='address-level1'
          >
            <option value={''} disabled >
              State...
            </option>
            {statesOptions()}
          </select>
        </div>
      </div>
      <div className='nes-field' >
        <label htmlFor='ckout-ship-zip'>Zipcode</label>
        <input
          type='text'
          id='ckout-ship-zip'
          className='nes-input'
          value={shipInfo.zipcode}
          required
          onChange={(e) =>
            setShipInfo({ ...shipInfo, zipcode: e.target.value })
          }
          placeholder='12345 or 12345-0000'
          autoComplete='postal-code'
        />
      </div>
      <br />
      <button
        type='button'
        className='nes-btn is-primary'
        onClick={() => setKey('contact')}
      >
        Back
      </button>{' '}
      <button
        type='button'
        className={
          formStatus.shipping ? 'nes-btn is-disabled' : 'nes-btn is-success'
        }
        disabled={formStatus.shipping}
        onClick={() => setKey('billing')}
      >
        Next
      </button>
    </>
  );
};

export default ShipForm;
