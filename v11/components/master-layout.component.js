import { Component } from '../framework.js';


export class MasterLayout extends Component {
    constructor(props) {
        super();

        this.leftSlotComponent = /** @type{Component} */(props.leftSlotComponent);
        this.rightSlotComponent=  /** @type{Component} */(props.rightSlotComponent);
    }

    render() {
        return this.parse`
                ${this.leftSlotComponent.element(e => console.dir(e))}
                ${this.rightSlotComponent.element(e => console.dir(e))}
            `;
    }
}
