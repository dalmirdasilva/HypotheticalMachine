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

  public togglePower(): void {
    if (this.cpu.isPowered()) {
      this.cpu.powerOff();
    } else {
      this.cpu.powerOn();
    }
  }

  public toggleSleep(): void {
    if (this.cpu.isSleeping()) {
      this.cpu.awake();
    } else {
      this.cpu.sleep();
    }
  }

  public reset(): void {
    this.cpu.reset();
  }

  public interrupt(): void {
    this.cpu.interrupt();
  }
}
