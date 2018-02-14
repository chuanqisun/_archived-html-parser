import { App } from './components/app.component.js';

const appRoot = new App();

document.getElementById('app-root').appendChild(appRoot.render());