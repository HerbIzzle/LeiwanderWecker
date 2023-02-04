
import { AlarmComponent } from './alarm.component';

describe('AlarmComponent', () => {
  let component: AlarmComponent;

  beforeEach(() => {
    component = new AlarmComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 24 hours and 60 minutes', () => {
    expect(component.hours.length).toBe(24);
    expect(component.minutes.length).toBe(60);
  });

  it('should add an alarm', () => {
    component.selectedHour = '02';
    component.selectedMinute = '30';
    component.addAlarm();
    expect(component.alarm).toEqual({ hour: '02', minute: '30', snooze: false });
  });

  it('should remove an alarm', () => {
    component.stopAlarm();
    expect(component.alarm).toEqual({ hour: '', minute: '', snooze: false });
  });

  it('should toggle the sound', () => {
    component.soundEnabled = false;
    component.toggleSound();
    expect(component.soundEnabled).toBeTrue();
  });

  it('should snooze', () => {
    component.snooze();
    expect(component.snoozeMsg).toBeTrue();
  });
});
