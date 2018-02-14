import { Component } from '../framework.js';
import { appStore } from './app.store.js';

export class NavPane extends Component {
    render() {
        return this.parse`
        <nav>
            <ul>
                ${appStore.liveSamples.map(element => `<li>${`name:`} ${element.name}</li>`)}
            </ul>
        <nav>
        `;
    }
}