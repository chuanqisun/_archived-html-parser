class Component {
    nest(...args) {
        this.nestedChildren = this.parse(args);
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
    render() {
        let element = document.createElement('button')
        element.addEventListener('click', this.handleClick);
        if (this.nestedChildren) {
            element.appendChild(this.nestedChildren);
        }
        return element;
    }

    handleClick(/** @type{MouseEvent} */e) {
        e.preventDefault();
        console.log('click');
    }
}

class Test extends Component {
    constructor() {
        super();
        let element = this.parse`<main>
            <form>
                <label>name <input type="text"></label>
                <label>address <input type="text"></label>
                ${new MySubmitButton().nest`hello wolrd`.render()}
            </form>
        </main>`;

        

        document.getElementById('app-root').appendChild(element);
    }
}


new Test();