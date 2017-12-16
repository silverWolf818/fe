import './css/common.css';
import './css/test.scss';
import Layer from './components/layer/layer.js';

const App = function() {
    var dom = document.getElementById('app');
    var layer = new Layer();
    dom.innerHTML = layer.tpl({
        name:'zzh',
        arr:['apple','xiaomi','oppo']
    });
}
new App();
