$(document).ready(function () {
    var vertical = [];
    vertical.push(1);
    var iframeElement = document.querySelector('iframe');
    var widget1 = SC.Widget(iframeElement);
    var count = -1;
    var userUuid = 'b7adc6c0-e524-11e4-b777-3db81841970c';
    var userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0cyI6MTQyOTMzOTgxMjc5MiwidXVpZCI6ImI3YWRjNmMwLWU1MjQtMTFlNC1iNzc3LTNkYjgxODQxOTcwYyIsInNjb3BlIjpbImFsbDphbGwiXSwiaWF0IjoxNDI5MzM5ODEyLCJleHAiOjE0Mjk5NDQ2MTJ9.EAX1-YTS0Cf0r4dh7O7OsiY50dgbv7LtxORNXON8VYM';
    var deviceUuid = '1fd73790-e575-11e4-b777-3db81841970c';
    var authStr = userUuid + ':' + userToken;

    //
    // Create connection
    //
    var socket = mqtt.connect('ws://' + authStr + '@hackoulu2015.thingsee.com:3003');

    var youtubePlay = [];

    //
    // Handle connection events
    //

    socket.subscribe('/' + deviceUuid + '/events');
    // To unsubscribe:
    // socket.unsubscribe('/' + deviceUuid + '/events');

    socket.on('error', function (error) {
      console.log('error', error);
    });

    socket.on('close', function () {
        console.log('close');
    });

    socket.on('offline', function () {
        console.log('offline');
    });

    socket.on('connect', function () {
        console.log('connected');
    });

    socket.on('message', function (topic, payload) {
      var obj = JSON.parse(payload.toString());
      var lux = obj.cause.senses[0].val;

    if (lux > 500) {
        widget1.pause();
        player.playVideo();
    }

    if(lux < 10) {
        widget1.play();
        widget1.pause();
        count++;
        console.log(count);
        
        $('body').css('background', '#000000');

        if(count == 2){
          widget1.next();
          count = 0;
        }
    }

    if(lux  > 10 && lux < 120) {
        widget1.play();
        var bg = [0, 2, 4, 5, 6, 7, 8, 9];
        var random = Math.floor(Math.random() * 8) + 1;
        $('body').css('background','url(img/' + bg[random-1] +'.gif)');
        $('body').css('background-repeat','no-repeat');
        $('body').css('background-size', 'cover');
    }

    if(lux > 120 && lux < 500){
        widget1.prev();
         $('body').css('background', 'yellow');
        count = 0;
    }

    console.log(obj.cause.senses[0].val);

    //console.log(
    //  'vertical '+ obj.cause.senses[0].val
    //  + ' long' + obj.cause.senses[1].val
    //  + ' lateral' + obj.cause.senses[2].val
    //);
    });

    $('#btnPlay').click(function(e){
        $('body').css('background','url(img/4.gif)');
        $('body').css('background-repeat','no-repeat');
        $('body').css('background-size', 'cover');
        widget1.play();
        widget1.getCurrentSound(function(event){
            console.log(event);
        });
    });

    $('#btnStop').click(function(e){
        $('body').css('background','#FFFFFF');
        widget1.pause();
    });
});