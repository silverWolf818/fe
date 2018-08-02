const a = require('./a')
const b = require('./b')

a(3,4);
b(4,5);

function component() {
    var element = document.createElement('div');
    element.innerHTML = 'hello world';
    return element;
}

document.body.appendChild(component());