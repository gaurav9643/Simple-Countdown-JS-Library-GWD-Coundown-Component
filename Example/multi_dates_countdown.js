(function(){
    var countdownJS = function(opts){
        this.options = Object.assign(countdownJS.defaults, opts);
        build(this);
    }
    countdownJS.prototype.createCountdown = function(_date){
        var _cs = '';
        var countDownDate = new Date(_date).getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            console.log(days,hours,minutes,seconds)
            if(format.indexOf('D') != -1 && days != 0){
                _cs += days;
                if(string[0] != '0' && string[0] != undefined){_cs += string[0]+' ';}else{_cs += ' ';}
            }
            if(format.indexOf('H') != -1 && (hours != 0 || days != 0)){
                _cs += hours;
                if(string[1] != '0' && string[1] != undefined){_cs += string[1]+' ';}else{_cs += ' ';}
            }
            if(format.indexOf('M') != -1  && (days != 0 || hours != 0 || minutes != 0)){
                _cs +=  minutes;
                if(string[2] != '0' && string[2] != undefined){_cs += string[2]+' ';}else{_cs += ' ';}
            }
            if(format.indexOf('S') != -1){
                _cs += seconds;
                if(string[3] != '0' && string[3] != undefined){_cs += string[3]+' ';}else{_cs += ' ';}
            }
            console.log(this.options.target_date_time);
            if (distance < 0) {
                clearInterval(x);
                _div.innerHTML  = "EXPIRED";
                
            }
            
        }, 1000);
        return _cs;
    }
    function build(_c){

    }
    countdownJS.defaults = {
        countdown_selector : '',
        next_date_selector : '',
        target_date_time : null,
        countdown_type : '',
    }
    window.countdownJS = countdownJS;
})