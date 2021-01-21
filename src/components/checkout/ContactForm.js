import React from 'react';

const ContactForm = ({ contactInfo, setContactInfo, formStatus, setKey, firstOrder }) => {
  return (
    <>
      <div className='nes-field'>
        <label htmlFor='ckout-first-name'>First Name</label>
        <input
          type='text'
          id='ckout-first-name'
          className='nes-input'
          placeholder='Giovanni'
          value={contactInfo.firstName}
          required
          onChange={(e) =>
            setContactInfo({ ...contactInfo, firstName: e.target.value }) 
          }
          readOnly={firstOrder}
        />
      </div>
      <div className='nes-field'>
        <label htmlFor='ckout-last-name'>Last Name</label>
        <input
          type='text'
          id='ckout-last-name'
          className='nes-input'
          placeholder='Unknown'
          value={contactInfo.lastName}
          required
          onChange={(e) =>
            setContactInfo({ ...contactInfo, lastName: e.target.value })
          }
          readOnly={firstOrder}
        />
      </div>
      <div className='nes-field'>
        <label htmlFor='ckout-email'>Email address</label>
        <input
          type='email'
          id='ckout-email'
          className='nes-input'
          placeholder='Enter email'
          value={contactInfo.email}
          required
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
          readOnly={firstOrder}
        />
        <small className='form-text'>
          Order confiramtion and shipping updates will be sent to this email
        </small>
      </div>
      <br />
      <button
        type='button'
        className={
          formStatus.contact ? 'nes-btn is-disabled' : 'nes-btn is-success'
        }
        disabled={formStatus.contact}
        onClick={() => setKey('shipping')}
      >
        Next
      </button>
    </>
  );
};

export default ContactForm;
