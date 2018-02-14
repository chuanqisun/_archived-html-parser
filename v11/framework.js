export class Component {
    nest(...args) {
        this.childElements = this.parse(...args);
        return this;
    }

    element(/** @type{(e: HTMLElement) => {}} */callback) {
        this.onElementCallback = callback;
        return this;
    }

    parse(/** @type{string[]} */strings, /** @type{Component[]} */...args) {
        let result = strings[0];

        let addArgumentPlaceholderContext = {
            arg: null,
            result: strings[0],
            currentPlaceholderIndex: 0,
        };

        for (let i = 0; i < strings.length - 1; i++) {
            addArgumentPlaceholderContext.arg = args[i];
            this._addArgumentPlaceholdersRecursive(addArgumentPlaceholderContext);
            addArgumentPlaceholderContext.result += strings[i + 1];
            result = addArgumentPlaceholderContext.result;
        }
    

    
        let renderArgumentPlaceholderContext = {
            arg: null,
            tempRoot: document.createElement('div'),
            currentPlaceholderIndex: 0,
        };

        renderArgumentPlaceholderContext.tempRoot.innerHTML = result;

        for (let i = 0; i < args.length; i++) {
            renderArgumentPlaceholderContext.arg = args[i];
            this._renderArgumentPlaceholdersRecursive(renderArgumentPlaceholderContext);
        }
    
        let fragmentHanlde = document.createDocumentFragment();

        while (renderArgumentPlaceholderContext.tempRoot.childNodes.length > 0) {
            fragmentHanlde.appendChild(renderArgumentPlaceholderContext.tempRoot.childNodes[0]);
        }
    
        renderArgumentPlaceholderContext.tempRoot = null; // memory clean up
    
        return fragmentHanlde;
    }

    render() {
        // API Hook
        throw new Error('render API hook must be implemented');
    }

    _asElement() {
        const element = this.render();
        if (this.onElementCallback) {
            this.onElementCallback(element);
        }
        return /** @type{HTMLElement} */(element);
    }

    _addArgumentPlaceholdersRecursive(context) {
        if (context.arg instanceof Array) {
            for (let i = 0; i < context.arg.length; i++) {
                const cachedContextArg = context.arg;
                context.arg = context.arg[i];
                this._addArgumentPlaceholdersRecursive(context);
                context.arg = cachedContextArg;
            }
        } else if (context.arg instanceof Component) {
            context.result += `<div class="placeholder-${context.currentPlaceholderIndex++}"></div>`;
        } else if (context.arg instanceof Object) {
            throw new Error(`template literal argument must a an array of X or a single X, where X is either an array of X (recursive), a JavaScript primitive, or a Component. But your X is of type "${typeof context.arg}"`);
        } else {
            context.result += context.arg;
        }
    }

    _renderArgumentPlaceholdersRecursive(context) {
        if (context.arg instanceof Array) {
            for (let i = 0; i < context.arg.length; i++) {
                const cachedContextArg = context.arg;
                context.arg = context.arg[i];
                this._renderArgumentPlaceholdersRecursive(context);
                context.arg = cachedContextArg;
            }
        } else if (context.arg instanceof Component){
            const placeholderNode = context.tempRoot.getElementsByClassName(`placeholder-${context.currentPlaceholderIndex++}`)[0];
            placeholderNode.parentNode.replaceChild(context.arg._asElement(), placeholderNode);
        }
    }
}