import { Component } from '../framework.js';

import { NavPane } from './nav-pane.component.js';
import { SampleList } from './sample-list.component.js';

// class MySubmitButton extends Component {
//     render() {
//         let element = document.createElement('button')
//         element.addEventListener('click', this.props.onClick);
//         if (this.childElements) {
//             element.appendChild(this.childElements);
//         }
//         return element;
//     }
// }

// class MyForm extends Component {
//     render() {
//         let element = document.createElement('form')
//         element.appendChild(this.childElements);
//         return element;
//     }
// }

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
        return this.parse`${new NavPane()}${new SampleList()}`;
    }

    // handleClick(/** @type{MouseEvent} */event) {
    //     event.preventDefault();
    //     console.dir(this.formElementRef);
    // }
}
