import React, { useState } from 'react';
import { MessageBar } from '@fluentui/react';

function MessageBarComponent({messageType,message }) {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div>
      {showNotification && (
        <MessageBar
          messageBarType={messageType}
          isMultiline={false}
          onDismiss={() => setShowNotification(false)}
          dismissButtonAriaLabel="Close"
        >
          <h2>{message}</h2>
        </MessageBar>
      )}
    </div>
  );
}

export default MessageBarComponent;
