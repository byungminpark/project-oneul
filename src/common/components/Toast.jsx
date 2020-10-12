import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Toast.css';

// Constants
const toastRoot = document.getElementById('toast-root'); // in index.html.
const toast = document.createElement('div');
toast.setAttribute('hidden', '');
toast.setAttribute('class', 'Toast'); // <- animation: Toast-fadeUpDown 2000ms forwards;
toast.addEventListener('animationend', () => {
  toast.hidden = true;
});

// React.memo making sure the update only caused by props(=strings) changing.
const Toast = React.memo(({ message }) => {
  // Boilerplate of createPortal.
  useEffect(() => {
    toastRoot.appendChild(toast);
    return () => toastRoot.removeChild(toast);
  });

  // Effect (every)
  useEffect(() => {
    toast.hidden = false;
  }, [message]);

  // Effect (once at first), preventing first animation.
  useEffect(() => {
    toast.hidden = true;
    console.log('rget');
  }, []);

  // Jsx to append to toast.
  const toastContents = (
    <>
      <span className="Toast-title">{message.title}</span>
      <span className="Toast-body">{message.body}</span>
    </>
  );

  return ReactDOM.createPortal(toastContents, toast);
});

export default Toast;

Toast.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
};
