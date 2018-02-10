class Component {
    nest(...args) {
        this.nestedChildren = this.parse(...args);
        return this;
    }

    parse(strings, ...args) {
        let result = strings[0];
        for (let i = 0; i < strings.length - 1; i++) {
            result += `<div class="placeholder-${i}"></div>`;
            result += strings[i + 1];
        }
    
        let temp = document.createElement('div');
        temp.innerHTML = result;
    
    
    
        for (let i = 0; i < args.length; i++) {
            const placeholderNote = temp.getElementsByClassName(`placeholder-${i}`)[0];
            placeholderNote.parentNode.replaceChild(args[i], placeholderNote);
        }
    
        let fragmentHanlde = document.createDocumentFragment();
        console.dir(temp.firstChild);
        fragmentHanlde.appendChild(temp.firstChild);
        temp = null; // memory clean up
    
        return fragmentHanlde;
    }
}

class MySubmitButton extends Component {
    constructor(onClick) {
        super();

        this.onClick = onClick
    }

    render() {
        let element = document.createElement('button')
        element.addEventListener('click', this.onClick);
        if (this.nestedChildren) {
            element.appendChild(this.nestedChildren);
        }
        return element;
    }
}

class MyForm extends Component {
    render(callback) {
        let element = document.createElement('form')
        element.appendChild(this.nestedChildren);
        callback(element);
        return element;
    }
}

class App extends Component {
    constructor() {
        super();
        let element = this.parse`<main>
            ${new MyForm().nest`<div>
                <label>name <input type="text"></label>
                <label>address <input type="text"></label>
                ${new MySubmitButton(e => this.handleClick(e)).nest`hello world`.render()}
            </div>`.render(element => this.formElementRef = element)}
        </main>`;

        document.getElementById('app-root').appendChild(element);
    }

    handleClick(/** @type{MouseEvent} */event) {
        event.preventDefault();
        console.dir(this.formElementRef);
    }
}


new App();