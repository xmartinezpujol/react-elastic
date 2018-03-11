import React from 'react';
import ReactDOM from 'react-dom';

import { addLocaleData, IntlProvider } from 'react-intl';

import EsClient from './components/EsClient';

ReactDOM.render(
  <IntlProvider locale={'en'} key={'en'} messages={{}} >
    <EsClient />
  </IntlProvider>,
  document.getElementById('app'),
);
