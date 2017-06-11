import Layer from './components/layer/layer.js';
require('./style/component.css');

const App = function() {
  let layer = new Layer();
  //设置title
  document.getElementsByTagName('title').innerHTML = layer.name;
  //设置html的内容
  let dom = document.getElementById('app');
  dom.innerHTML = layer.tpl;
}

App();