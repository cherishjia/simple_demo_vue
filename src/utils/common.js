import $ from 'jquery';
/*进度条*/
export default function progressBar(dom,percent){
    let domBar = $(dom).find(".progressColorBar");
    let progreBarW=$(dom).width() * 0.58;
    let progreColorW=progreBarW*(percent/100);

    domBar.animate({width:progreColorW},'slow');
}