import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Dialogue.scss';

// Constants
const dialogueRoot = document.getElementById('dialogue-root'); // in index.html.
const dialogue = document.createElement('div');
dialogue.setAttribute('hidden', '');
dialogue.setAttribute('class', 'Dialogue');
const show = () => {
  dialogue.hidden = false;
  dialogue.style.animation = 'fade-in 0.18s forwards'; // trigger animation
};
const hide = () => {
  dialogue.style.animation = 'fade-out 0.18s forwards'; // trigger animation
  dialogue.addEventListener('animationend', function reset() {
    dialogue.removeEventListener('animationend', reset);
    dialogue.hidden = true;
  });
};

// React.memo making sure update only caused by props(=strings) changing.
const Dialogue = React.memo(({ message, callback }) => {
  // Boilerplate of createPortal
  useEffect(() => {
    dialogueRoot.appendChild(dialogue);
    return () => dialogueRoot.removeChild(dialogue); // cleanup
  });

  // Effect (every)
  useEffect(() => {
    show();
  }, [message, callback]);

  // Effect (once at first), preventing first animation.
  useEffect(() => {
    dialogue.hidden = true;
  }, []);

  // Handlers
  const onCancle = () => {
    hide();
  };
  const onRemove = () => {
    callback();
    hide();
  };
  /* prettier-ignore */
  const dialogueBox = (
    <div className="Dialogue-box">
      <p className="Dialogue-message">
        <p className="Dialogue-title">{message.title}</p>
        <p className="Dialogue-body">{message.body}</p>
      </p>
      <button className="Dialogue-cancleBtn" onClick={onCancle} type="button">취소</button>
      <button className="Dialogue-removeBtn" onClick={onRemove} type="button">삭제</button>
    </div>
  );

  return ReactDOM.createPortal(dialogueBox, dialogue);
});

Dialogue.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Dialogue;
