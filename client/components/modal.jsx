import React from 'react';

export default function Modal(props) {
  return (
    <>
      <div className="overlay" onClick={props.hide} />
      <div className="modal-container">
        <div className="modal-wrapper">
          <div className="modal-text">
            <p>Are you sure you want to delete this entry?</p>
            <div className="row text-center w-75">
              <div className="col-md-6">
                <button type="button" className="cancel-btn" onClick={props.hide}>CANCEL</button>
              </div>
              <div className="col-md-6">
                <button type="button" className="confirm-btn" onClick={props.delete}>CONFIRM</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
