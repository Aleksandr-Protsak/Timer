$(document).ready(function() {
    function pad(val) {
        return val < 10 ? '0' + val : val;
    };

    for (let i = 0; i < 60; i++) {
        if(i < 24){
            $('#selected_hour').append($(`<option>${pad(i)}</option>`));
        };
        $('#selected_minute').append($(`<option>${pad(i)}</option>`));;
        $('#selected_second').append($(`<option>${pad(i)}</option>`));;
    };

    let hh = 0, 
        mm = 0, 
        ss = 0;

    $('select').change(function(e) { 
        let selectId = e.target.id;
        let val = $(this).val(); 
        if(selectId === 'selected_hour'){
            hh = parseInt(val, 10);
        }else if(selectId === 'selected_minute'){
            mm = parseInt(val, 10) + 0;
        }else{
            ss = parseInt(val, 10) || 0;
        }
    }); 
 
    let Clock = {
        totalHour: 0,
        totalMinute: 5,
        totalSeconds: 0,

        showSelect(){
            this.stop();
            this.totalHour = hh;
            $('#hour').text(pad(hh));
            this.totalMinute = mm;
            $('#minute').text(pad(mm));
            this.totalSeconds = ss;
            $('#second').text(pad(ss));
        },

        decrementVal() {
            let secTime = (this.totalHour * 3600) + (this.totalMinute * 60) + this.totalSeconds;
            this.interval = setInterval( () => {
            if(secTime === 0){
                this.reset();
                return alert('The end')
            }
            secTime -= 1;
                $("#hour").text(pad(Math.floor(secTime / 3600))); 
                $("#minute").text(pad(Math.floor(secTime / 60 % 60)));
                $("#second").text(pad(parseInt(secTime % 60)));
            }, 1000);
        },

        start(){
           this.decrementVal();
        },

        stop(){
            clearInterval(this.interval);
        },

        reset() {
            this.stop();
            $("#hour").text("00");
            $("#minute").text("00");
            $("#second").text("00");
        },
        
        pause() {
            this.stop();
            delete this.interval;
        }
    };

    $('#selectBtn').click(function () { Clock.showSelect(); });
    $('#startBtn').click(function () { Clock.start(); });
    $('#pauseBtn').click(function () { Clock.pause(); });
    $('#resetBtn').click(function () { Clock.reset(); });
});


