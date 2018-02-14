import { Component } from '../../framework.js';

export class InputSample extends Component {
    render() {
        return this.parse`
            <label>Username <input type="text"></label>
        `;
    }
}