import {Component, OnInit} from '@angular/core';
import {Oscillator} from '../../machine/oscillator';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  private state: PowerState;

  PowerState = PowerState;

  constructor(private oscillator: Oscillator) {
    this.state = PowerState.ON;
  }

  ngOnInit() {
  }

  onFrequencyChange(newFrequency: number): void {
    this.oscillator.setFrequency(newFrequency, this.isOn());
  }

  onPowerChange(e: MatButtonToggleChange): void {
    this.state = e.value;
    if (this.isOn()) {
      this.oscillator.start();
    } else {
      this.oscillator.stop();
    }
  }

  onPulseClick(_: MouseEvent): void {
    if (!this.isOn()) {
      this.oscillator.pulse();
    }
  }

  isOn(): boolean {
    return this.state === PowerState.ON;
  }
}

enum PowerState {
  OFF = 0,
  ON = 1
}
