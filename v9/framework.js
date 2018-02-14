export class Component {
    constructor(props) {
        this.props = props;
    }

    nest(...args) {
        this.childElements = this.parse(...args);
        return this;
    }

    element(callback) {
        this.onElementCallback = callback;
        return this;
    }

    parse(/** @type{string[]} */strings, /** @type{Component[]} */...args) {
        let result = strings[0];
        let currentPlaceholderIndex = 0;
        for (let i = 0; i < strings.length - 1; i++) {
            if (args[i] instanceof Array) {
                for (let j = 0; j < args[i].length; j++) {
                    if (args[i][j] instanceof Component) {
                        result += `<div class="placeholder-${currentPlaceholderIndex}"></div>`;
                        currentPlaceholderIndex++;
                    } else {
                        result += args[i][j];
                    }
                }
            } else if (args[i] instanceof Component) {
                result += `<div class="placeholder-${currentPlaceholderIndex}"></div>`;
                currentPlaceholderIndex++;
            } else {
                result += args[i];
            }

            result += strings[i + 1];
        }
    
        let temp = document.createElement('div');
        temp.innerHTML = result;
    
        currentPlaceholderIndex = 0;
        for (let i = 0; i < args.length; i++) {
            if (args[i] instanceof Array) {
                for (let j = 0; j < args[i].length; j++) {
                    if (args[i][j] instanceof Component) {
                        const placeholderNote = temp.getElementsByClassName(`placeholder-${currentPlaceholderIndex}`)[0];
                        placeholderNote.parentNode.replaceChild(args[i][j]._asElement(), placeholderNote);
                        currentPlaceholderIndex++;
                    }
                }
            } else if (args[i] instanceof Component) {
                const placeholderNote = temp.getElementsByClassName(`placeholder-${currentPlaceholderIndex}`)[0];
                placeholderNote.parentNode.replaceChild(args[i]._asElement(), placeholderNote);
                currentPlaceholderIndex++;
            }
        }
    
        let fragmentHanlde = document.createDocumentFragment();

        while (temp.childNodes.length > 0) {
            fragmentHanlde.appendChild(temp.childNodes[0]);
        }
    
        temp = null; // memory clean up
    
        return fragmentHanlde;
    }

    render() {
        // API Hook
        throw new Error('getElement API hook must be implemented');
    }

    _asElement() {
        const element = this.render();
        if (this.onElementCallback) {
            this.onElementCallback(element);
        }
        return /** @type{HTMLElement} */(element);
    }
}