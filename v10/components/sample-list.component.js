import { Component } from '../framework.js';
import { appStore } from './app.store.js';

export class SampleList extends Component {
    render() {
        return this.parse`
        <main>
            <ul>
                <li>
                    ${appStore.liveSamples.map(element => [`<h1>${element.name}</h1><br/>`, element.sample])}
                </li>
            </ul>
        </main>
        `;
    }
}