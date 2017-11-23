
$(document).ready(function(){
    mainController();    
});

function mainController(){
    $('body').on('click','.js-start-speech',function (e) {
        startDictation(e);
    });
    var final_transcript = '';
    var recognizing = false;
    
    if ('webkitSpeechRecognition' in window) {
    
      var recognition = new webkitSpeechRecognition();
    
      recognition.continuous = true;
      recognition.interimResults = true;
    
      recognition.onstart = function() {
        recognizing = true;
      };
    
      recognition.onerror = function(event) {
        console.log(event.error);
      };
    
      recognition.onend = function() {
        recognizing = false;
      };
    
      recognition.onresult = function(event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        
        $('.js-interim-input').val(interim_transcript);
        $('.js-final-input').html(final_transcript);
      };
    }
    
    function startDictation(event) {
      if (recognizing) {
        recognition.stop();
        $('.mic-image').attr('src','images/mic-icon.svg');
        $('.mic-image').removeClass('mic-recording');
        return;
      }
      $('.mic-image').attr('src','images/listening-icon.svg');
      $('.mic-image').addClass('mic-recording');
      final_transcript = '';
      recognition.lang = 'en-US';
      recognition.start();
    $('js-interim-input').html('');
    $('js-final-input').html('');
    }

    $('body').on('click','.js-confirm',function (e) {

        var previousVal = $('.code-area').text();
        var enteredCommand = $('.js-final-input').val();
    
        enteredCommand = enteredCommand.replace(/create a?/,'');
        enteredCommand = enteredCommand.replace('class ','.');
        enteredCommand = enteredCommand.replace('id ','#');
        enteredCommand = enteredCommand.replace(/ as/g ,':');
        enteredCommand = enteredCommand.replace(/ hyphen /g ,'-');
        enteredCommand = enteredCommand.replace(/with /g,'{\n\    ');
        enteredCommand = enteredCommand.replace(/ pixels/,'px');
        enteredCommand = enteredCommand.replace(/ and /g,';\n    ');
        enteredCommand = enteredCommand + ';\n }';
        var finalVal = previousVal+'\n'+enteredCommand;
        $('.code-area').text(finalVal);
    });
}

    $('body').on('click','#help-modal,.close-icon',function(e){
        if(e.target === $('#help-modal')[0] || e.target ===  $('.close-icon')[0] ){
        $('#help-modal').addClass('hidden');
        }
    });

    $('body').on('click','.help-icon',function(e){
        $('#help-modal').removeClass('hidden');
    });

    $('body').on('click','.js-copy-clipboard',function(e){
        copyToClipBoard($('.code-area'));
    });

    function copyToClipBoard(elem){
        var temp = $('<input>');
        $('body').append(temp);;
        temp.val(elem.html()).select();
        document.execCommand('copy');
        temp.remove();
    }