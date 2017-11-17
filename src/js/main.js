
$(document).ready(function(){
    mainController();    
});

function mainController(){
    $('body').on('click','.js-start-speech',function (e) {
        startDictation(e);
    })
}