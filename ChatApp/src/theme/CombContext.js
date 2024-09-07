import React from 'react';
import { Context1, Context2, ContextCombined1And2 } from './Contexts';
import themeContext from './themeContext';
import { combinedContext } from './themeContext';
import { CometChatContext } from '../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/CometChatContext';

// This is a reusable piece that could be used by any component that requires both contexts.
const ProvideCombinedContext = (props) => {
  return (
    <CometChatContext.Consumer>
      {(context1) => (
        <themeContext.Consumer>
          {(context2) => (
            <combinedContext.Provider value={{ context1, context2 }}>
              {props.children}
            </combinedContext.Provider>
          )}
        </themeContext.Consumer>
      )}
    </CometChatContext.Consumer>
  );
};
export default ProvideCombinedContext;
