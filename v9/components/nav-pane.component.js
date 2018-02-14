import { Component } from '../framework.js';
import { appStore } from './app.store.js';

export class NavPane extends Component {
    render() {
        return this.parse`
        <ul>
            ${appStore.elements.map(element => `<li>${`name:`} ${element.name}</li>`)}
        </ul>
        `;
    }
}