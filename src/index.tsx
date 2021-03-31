import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


// import voodux
import voodux from 'voodux'

import { FoundationProvider } from './FoundationContext'


// import data schemas
import UserSchema from './schemas/User'
import ProductSchema from './schemas/Product'
import OrderSchema from './schemas/Order'
import CustomerSchema from './schemas/Customer'
import DrinkSchema from './schemas/Drink'

// foundation event handlers
import onApplicationStart from './events/onApplicationStart'
import onWorkerResponseClientId from './events/onWorkerResponseClientId'

(async () => {
  const foundation = new voodux.Foundation({
    name: 'My Ionic App',
    schemas: {
      User: UserSchema,
      Product: ProductSchema,
      Order: OrderSchema,
      Customer: CustomerSchema,
      Drink: DrinkSchema
    }
  })
  
  const appStartListener = foundation.on('foundation:start', onApplicationStart.bind(foundation))
  const workerSendClientIdListener = foundation.on('worker:responseClientId', onWorkerResponseClientId.bind(foundation))
  window.addEventListener('unload', (event) => {
    foundation.stopListenTo(appStartListener)
    foundation.stopListenTo(workerSendClientIdListener)
  })

  const start = await foundation.start()
  if (start.error) {
    throw new Error(`Error starting foundation stack: ${start.error}`)
  }

  // console.debug('start', start)
  ReactDOM.render(
    <FoundationProvider value={foundation}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </FoundationProvider>,
    document.getElementById('root')
  )


  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  serviceWorkerRegistration.register();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

  // Call the element loader after the platform has been bootstrapped
  defineCustomElements(window);
})()
