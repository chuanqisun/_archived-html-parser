import { Component } from '../../framework.js';

export class ButtonSample extends Component {
    render() {
        return this.parse`
            <button>click me</button>
        `;
    }
}