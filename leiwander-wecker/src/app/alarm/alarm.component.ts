import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, group, query, state, style, transition, trigger} from "@angular/animations";
import { Alarm } from "./alarm"


@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css'],
  animations:[ trigger('show', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(800, style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(0, style({ opacity: 0 }))
    ])
  ]),
      trigger('blink', [
        state('blinking', style({
          opacity: 1
        })),
        transition('* => blinking', [
          animate(1000, style({
            opacity: 0
          }))
        ]),
        transition('blinking => *', [
          animate(1000, style({
            opacity: 1
          }))
        ])
      ])
  ]
})
export class AlarmComponent implements OnInit {

  hours = Array.from({length: 24}, (_, i) => `0${i}`.slice(-2));
  minutes = Array.from({length: 60}, (_, i) => `0${i}`.slice(-2));
  selectedHour = '00';
  selectedMinute = '00';
  alarm: Alarm = { hour: '', minute: '', snooze: false };
  snoozeTime = 5;
  snoozeMsg= false
  soundEnabled = true;
  activeAlarm = false;
  hideSettings = false;
  @ViewChild('alarmSound', {static: false}) alarmSound: ElementRef<HTMLAudioElement>;
  show: boolean;
  toggleCloseAlarm= false;

  constructor() {

    const storedAlarm = JSON.parse(localStorage.getItem('alarm'));
    if (storedAlarm) {
      this.alarm = storedAlarm;
      this.show = true
      this.hideSettings = true
      this.toggleCloseAlarm = false
    }

    setInterval(() => {
      const now = new Date()

        if (this.alarm && now.getHours().toString().padStart(2, '0') === this.alarm.hour
          && now.getMinutes().toString().padStart(2, '0') === this.alarm.minute
          && this.soundEnabled
        ) {
          this.alarmSound.nativeElement.play()
          this.toggleCloseAlarm = true
          this.activeAlarm = true
          this.hideSettings = true
         if(this.alarm.snooze) {
           this.snoozeMsg = true
        }
        }

    }, 1000)

  }

  ngOnInit(): void {
  }


  stopAlarm(){
    this.toggleCloseAlarm = false
    this.hideSettings = false
    this.show= false
    this.alarm.hour = ''
    this.alarm.minute = ''
    this.alarm.snooze = false
    this.snoozeMsg = false
    localStorage.removeItem('alarm');
    this.alarmSound.nativeElement.pause()
  }

  addAlarm() {

    this.alarm = {hour: this.selectedHour, minute: this.selectedMinute,snooze:false};
    localStorage.setItem('alarm', JSON.stringify(this.alarm));
    this.selectedHour = '00';
    this.selectedMinute = '00';
    this.hideSettings = true
    this.show=true
  }

  removeAlarm(alarmToRemove) {
    this.stopAlarm()
    if (this.alarm.hour === alarmToRemove.hour && this.alarm.minute === alarmToRemove.minute) {
      localStorage.removeItem('alarm');
      this.hideSettings = false;
      this.show= false
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled
    if(this.alarmSound.nativeElement.play()){
      this.alarmSound.nativeElement.pause()
      console.log('pause')
    }
  }

  snooze() {
    this.alarmSound.nativeElement.pause();
    if (this.alarm) {
      let nextSnoozeTime = new Date();
      nextSnoozeTime.setMinutes(nextSnoozeTime.getMinutes() + this.snoozeTime);
      this.alarm = {
        hour: nextSnoozeTime.getHours().toString().padStart(2, '0'),
        minute: nextSnoozeTime.getMinutes().toString().padStart(2, '0'),
        snooze: true
      };
      localStorage.setItem('alarm', JSON.stringify(this.alarm));
      this.activeAlarm = false;
      this.toggleCloseAlarm = false;
      this.snoozeMsg = false
    }
  }

}
