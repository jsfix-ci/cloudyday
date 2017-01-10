import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ApplicationRoot from './application-root';

ReactDOM.render(
	<ApplicationRoot></ApplicationRoot>,
	document.querySelector('#application-root')
);
