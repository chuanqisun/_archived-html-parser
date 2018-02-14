import { Component } from '../framework.js';
import { appStore } from './app.store.js';

export class SampleList extends Component {
    render() {
        return this.parse`
        <ul>
            ${appStore.elements.map(element => element.sample)}
        </ul>
        `;
    }
}