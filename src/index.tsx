import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import * as mobx from 'mobx'

import App from './App'
import {disposeInjection} from './common/annotations/common'

require('./mappers/index')
require('./services/index')
require('./stores/index')
require('./fetchers/index')

mobx.useStrict(true)

disposeInjection()
  .then(() => ReactDOM.render(
    <App/>,
    document.getElementById('root')
  ))

registerServiceWorker()