class Test {
    constructor() {
        let element = parse`<div>${document.createElement('span')}</div>`;
        let element2 = parse`<div><div>${document.createElement('span')}</div><div>${document.createElement('span')}</div></div>`;

        console.dir(element);
        console.dir(element2);

        document.getElementById('app-root').appendChild(element2);
    }
}

function parse(strings, ...args) {
    let result = strings[0];
    for (let i = 0; i < strings.length - 1; i++) {
        result += `<div id="placeholder-${(i)}"></div>`;
        result += strings[i + 1];
    }

    console.dir(result);
    let temp = document.createElement('div');
    temp.innerHTML = result;

    return temp.firstChild;
}

new Test();