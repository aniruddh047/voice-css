
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
        
        // final_span.innerHTML = linebreak(final_transcript);
        // interim_span.innerHTML = linebreak(interim_transcript);
        $('.js-interim-input').val(interim_transcript);
        $('.js-final-input').html(final_transcript);
      };
    }
    
    // var two_line = /\n\n/g;
    // var one_line = /\n/g;
    // function linebreak(s) {
    //   return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    // }
    
    function startDictation(event) {
      if (recognizing) {
        recognition.stop();
        return;
      }
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
        // enteredCommand = enteredCommand.replace(/ percent/,'%');
        // enteredCommand = enteredCommand.replace(/ zero/,'0');
        // enteredCommand = enteredCommand.replace(/ one/,'1');
        // enteredCommand = enteredCommand.replace(/ two/,'2');
        // enteredCommand = enteredCommand.replace(/ three/,'3');
        // enteredCommand = enteredCommand.replace(/ four/,'4');
        // enteredCommand = enteredCommand.replace(/ five/,'5');
        // enteredCommand = enteredCommand.replace(/ six/,'6');
        // enteredCommand = enteredCommand.replace(/ seven/,'7');
        // enteredCommand = enteredCommand.replace(/ eight/,'8');
        // enteredCommand = enteredCommand.replace(/ nine/,'9');
        enteredCommand = enteredCommand.replace(/ and /g,';\n    ');
        enteredCommand = enteredCommand + ';\n }'
        // var startIndex = enteredCommand.search('create ');
        // var lastIndex = enteredCommand.search('tag') - 1;
        // var result = enteredCommand.slice(startIndex,lastIndex);
        // var finalVal = previousVal +'<'+result+'>'+'</'+result+'>';
        $('.code-area').text(enteredCommand);
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
