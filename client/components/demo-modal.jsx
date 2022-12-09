import React from 'react';

export default function DemoModal(props) {
  return (
    <>
      <div className="overlay" onClick={props.hide} />
      <div className="modal-container">
        <div className="modal-wrapper">
          <div className="modal-text">
            <p>You&apos;re navigating the demo of this app as user <em>JaneDoe</em>.</p>
            <p className='text-center'>
              <small>To view Nekkoh&apos;s source code, visit its <a
            href='https://github.com/arcan9/nekkoh'
            target='_blank' rel="noreferrer">
                repo on Github.</a></small></p>
            <div className="row text-center w-75">
              <div className="col-md-12">
                <button type="button"
                className="demo-btn"
                onClick={props.hide}>OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
