
const selectMenu = document.querySelectorAll('select');
const showCurrentTime = document.getElementById('currentTime');
const setAlarmBtn = document.querySelector('button');
const alermSetContainer = document.querySelector('.alarm-set-content');

let userAlarmTime;
let isAlarmSet = false;
let alarmSound = new Audio('./Music/AlarmSound.mp3')


for(let i = 12; i > 0; i--){
     i = i < 10 ? "0" + i : i
     let option = `<option value="${i}">${i}</option>`
     selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option)
}

for(let i = 59; i > 0; i--){
     i = i < 10 ? "0" + i : i
     let option = `<option value="${i}">${i}</option>`
     selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option)
}

for(let i = 2; i > 0; i--){
     let ampm = i == 1 ? "AM" : "PM"
     let option = `<option value="${ampm}">${ampm}</option>`
     selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option)
}

setInterval(() => {
     let date = new Date(),
     h = date.getHours()
     m = date.getMinutes()
     s = date.getSeconds()
     let ampm = h < 12 ? "AM" : "PM"

     if(h > 12){
          h = h - 12;
     }

     h = h < 10 ? "0" + h : h;
     m = m < 10 ? "0" + m : m;
     s = s < 10 ? "0" + s : s;

     if(userAlarmTime == `${h}:${m} ${ampm}`){
          alarmSound.play()
          alarmSound.loop = true;
     }


     showCurrentTime.innerHTML = `${h}:${m}:${s} ${ampm}`
},1000)


function setAlarm() {

     if(isAlarmSet){
          userAlarmTime = ""
          alermSetContainer.classList.remove('disabled');
          setAlarmBtn.innerText = 'Set Alarm'
          alarmSound.pause()
          alarmSound.currentTime = 0;
          selectMenu[0][0].selected = true;
          selectMenu[1][0].selected = true;
          selectMenu[2][0].selected = true;
          return isAlarmSet = false;
     }

     if(selectMenu[0].value == 'Hours' ||  selectMenu[1].value == 'Minutes' || selectMenu[2].value == 'AM/PM'){
          alert('Please select a valid time to set Alarm?')
          return
     }

     isAlarmSet = true;
     alert('Alarm Set!')
     userAlarmTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`  
     alermSetContainer.classList.add('disabled');
     setAlarmBtn.innerText = 'Clear Alarm'
}




setAlarmBtn.addEventListener('click',setAlarm)