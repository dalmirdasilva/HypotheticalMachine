import {Component, Input, OnInit} from '@angular/core';
import {Oscillator} from '../../machine/oscillator';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  constructor(private oscillator: Oscillator) { }

  ngOnInit() {
  }

  onFrequencyChange(newFrequency: number) {
    this.oscillator.setFrequency(newFrequency);
  }
}
