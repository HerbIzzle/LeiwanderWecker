import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  hours = Array.from({length: 24}, (_, i) => `0${i}`.slice(-2));
  minutes = Array.from({length: 60}, (_, i) => `0${i}`.slice(-2));
  selectedHour = '00';
  selectedMinute = '00';
  alarms = [];
  soundEnabled = true;
  snoozeTime = 5;
  @ViewChild('alarmSound', {static: false}) alarmSound: ElementRef<HTMLAudioElement>;

  constructor() {

    const storedAlarms = JSON.parse(localStorage.getItem('alarms'))
    if (storedAlarms) {
      this.alarms = storedAlarms
      console.log(this.alarms)
    }

    setInterval(() => {
      const now = new Date()
      console.log(this.alarms)
      console.log(now.getHours().toString() + ' : ' + now.getMinutes().toString())


      this.alarms.forEach(alarm => {
        if (now.getHours().toString().padStart(2, '0') === alarm.hour
          && now.getMinutes().toString().padStart(2, '0') === alarm.minute
          && this.soundEnabled
        ) {
          this.alarmSound.nativeElement.play()
          console.log(now.getHours().toString() + ' : ' + now.getMinutes().toString())
          console.log(this.selectedHour + ' : ' + this.selectedMinute)
        }
      })
    }, 1000)

  }

  ngOnInit(): void {
  }


  addAlarm() {

    this.alarms.push({hour: this.selectedHour, minute: this.selectedMinute});
    localStorage.setItem('alarms', JSON.stringify(this.alarms));
    this.selectedHour = '00';
    this.selectedMinute = '00';
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled
    if(this.alarmSound.nativeElement.play()){
      this.alarmSound.nativeElement.pause()
      console.log('pause')
    }
    console.log(this.soundEnabled)
  }

  snooze() {
    this.alarmSound.nativeElement.pause();
    this.soundEnabled = false;
    let nextSnoozeTime = new Date();
    nextSnoozeTime.setMinutes(nextSnoozeTime.getMinutes() + this.snoozeTime);
    this.alarms.push({
      hour: nextSnoozeTime.getHours().toString().padStart(2, '0'),
      minute: nextSnoozeTime.getMinutes().toString().padStart(2, '0')
    });
  }
}
