import {Component, OnInit} from '@angular/core';
import {Cpu} from '../../machine/cpu';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss']
})
export class CpuComponent implements OnInit {

  constructor(private cpu: Cpu) {
  }

  ngOnInit() {
  }

  togglePower() {
    if (this.cpu.isPowered()) {
      this.cpu.powerOff();
    } else {
      this.cpu.powerOn();
    }
  }

  toggleSleep() {
    if (this.cpu.isSleeping()) {
      this.cpu.awake();
    } else {
      this.cpu.sleep();
    }
  }

  reset() {
    this.cpu.reset();
  }

  interrupt() {
    this.cpu.interrupt();
  }
}
