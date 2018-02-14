import { Component } from '../framework.js';

import { NavPane } from './nav-pane.component.js';
import { SampleList } from './sample-list.component.js';


export class App extends Component {
    // constructor() {
    //     super();

        // let formItems = [
        //     {label: 'name', type: 'text'},
        //     {label: 'address', type: 'text'},
        //     {label: 'email', type: 'email'},
        // ];
        // let element = this.parse`
        // <main>
        // ${new MyForm().nest`
        //     ${formItems.map(item => `<label>${item.label} <input type="${item.type}"></label>`).join('')}
        //     ${new MySubmitButton({onClick: e => this.handleClick(event)}).nest`hello world`}
        // `.element(element => this.formElementRef = element)}
        // </main>`;
    // }

    render() {
        return this.parse`
            <div>
                ${new NavPane()}
                ${new SampleList()}
            </div>`;
    }

    // handleClick(/** @type{MouseEvent} */event) {
    //     event.preventDefault();
    //     console.dir(this.formElementRef);
    // }
}
