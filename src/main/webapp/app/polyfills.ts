/* tslint:disable */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/shim';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following to support `@angular/animation`. */
import 'web-animations-js';  // Run `npm install --save web-animations-js`.

import 'reflect-metadata/Reflect';
import 'zone.js/dist/zone';
// https://stackoverflow.com/questions/41322566/angular-2-could-not-find-hammerjs
import 'hammerjs/hammer';

require('../manifest.webapp');

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
import 'intl';  // Run `npm install --save intl`.
