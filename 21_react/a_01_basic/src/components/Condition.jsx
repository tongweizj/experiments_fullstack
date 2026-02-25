import React from 'react';
import ReactDOM from 'react-dom';

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      { /* if unreadMessage.length >0 it will show h2 tag 
         In JavaScript, true && expression always evaluates to expression, 
         and false && expression always evaluates to false.
         Therefore, if the condition is true, the element right after && 
         will appear in the output.
         If it is false, React will ignore and skip it. 
      */ }

      {unreadMessages.length > 0 && (
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      )}
    </div>
  );
}
//
function Condition() {
  const messages = []; // ["React"]
  //
  return (
    <div>
      <Mailbox unreadMessages={messages} />
    </div>
  );

}

//
export default Condition;