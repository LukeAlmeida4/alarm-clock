 var currentDate = new Date(),
     day = currentDate.getDate(),
     month = currentDate.getMonth() + 1,
     year = currentDate.getFullYear();

 //displaying the current date
 document.getElementById("date").innerHTML = (day + "/" + month + "/" + year);


 // create a weekday array. Array starts at 0 and so does the first day of the week, for some reason.
 var day = new Array(7);
 day[0] = "Sunday!";
 day[1] = "Monday!";
 day[2] = "Tuesday!";
 day[3] = "Wednesday!";
 day[4] = "Thursday!";
 day[5] = "Friday!";
 day[6] = "Saturday!";

 // d.getDay() gets the day that is today. Smash it into the array that we just created.
 var weekday = day[currentDate.getDay() + 1];

if (weekday == null){
    weekday = "Sunday";
}


 document.getElementById("message").innerHTML = "We hope you have an amazing " + weekday;


 var jsalarm = {
     padfield: function (f) {
         return (f < 10) ? "0" + f : f
     },
     showcurrenttime: function () {
         var dateobj = new Date()
         var ct = this.padfield(dateobj.getHours()) + ":" + this.padfield(dateobj.getMinutes()) + ":" + this.padfield(dateobj.getSeconds())
         this.ctref.innerHTML = ct
         this.ctref.setAttribute("title", ct)
         if (typeof this.hourwake != "undefined") { //if alarm is set
             if (this.ctref.title == (this.hourwake + ":" + this.minutewake + ":" + this.secondwake)) {
                 clearInterval(jsalarm.timer)
                 window.location = document.getElementById("musicloc").value
             }
         }
     },
     init: function () {
         var dateobj = new Date()
         this.ctref = document.getElementById("jsalarm_ct")
         this.submitref = document.getElementById("submitbutton")
         this.submitref.onclick = function () {
             jsalarm.setalarm()
             this.value = "Alarm Set"
             this.disabled = true
             return false
         }
         this.resetref = document.getElementById("resetbutton")
         this.resetref.onclick = function () {
             jsalarm.submitref.disabled = false
             jsalarm.hourwake = undefined
             jsalarm.hourselect.disabled = false
             jsalarm.minuteselect.disabled = false
             jsalarm.secondselect.disabled = false
             document.getElementById("message").style.display = "none"
             document.getElementById("background").classList.remove("night")
             document.getElementById("sun").className = document.getElementById("sun").className.replace(/(?:^|\s)moon(?!\S)/g, 'sun')
             document.getElementById("cloud").style.display = "block"
             document.getElementById("cloud-two").style.display = "block"

             return false
         }
         var selections = document.getElementsByTagName("select")
         this.hourselect = selections[0]
         this.minuteselect = selections[1]
         this.secondselect = selections[2]
         for (var i = 0; i < 60; i++) {
             if (i < 24) //If still within range of hours field: 0-23
                 this.hourselect[i] = new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours() == i)
             this.minuteselect[i] = new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes() == i)
             this.secondselect[i] = new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds() == i)

         }
         jsalarm.showcurrenttime()
         jsalarm.timer = setInterval(function () {
             jsalarm.showcurrenttime()
         }, 1000)
     },
     setalarm: function () {
         this.hourwake = this.hourselect.options[this.hourselect.selectedIndex].value
         this.minutewake = this.minuteselect.options[this.minuteselect.selectedIndex].value
         this.secondwake = this.secondselect.options[this.secondselect.selectedIndex].value
         this.hourselect.disabled = true
         this.minuteselect.disabled = true
         this.secondselect.disabled = true
         document.getElementById("message").style.display = "block"
         document.getElementById("background").className = "night"
         document.getElementById("sun").className = document.getElementById("sun").className.replace(/(?:^|\s)sun(?!\S)/g, 'moon')
         document.getElementById("cloud").style.display = "none"
         document.getElementById("cloud-two").style.display = "none"


     },
 }
