class Test {
    constructor() {
        let element = parse`<main><form>
        <label>name <input type="text"></label>
        <label>address <input type="text"></label>
        ${
            (() => {
                let element = document.createElement('button')
                element.innerText = 'submit';
                element.addEventListener('click', this.handleClick);
                return element;
            })()
        }</form></main>`;

        document.getElementById('app-root').appendChild(element);
    }

    handleClick(/** @type{MouseEvent} */e) {
        e.preventDefault();
        console.log('click');
    }
}

function parse(strings, ...args) {
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

new Test();