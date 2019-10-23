import {Component, OnInit} from '@angular/core';
import {Memory} from '../../machine/memory';
import {Base, ConfigService} from '../../services/config.service';
import {Cpu} from '../../machine/cpu';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  public readonly sqrtArray: Array<number>;

  constructor(private cpu: Cpu,
              private memory: Memory,
              private config: ConfigService) {
    this.sqrtArray = Array.from(Array(Math.sqrt(memory.getSize())).keys());

    config.getOnBaseChangeObservable().subscribe((newBase: Base) => {
    });


    let a = 0;
    memory.getBuffer()[a++] = 0x07;
    memory.getBuffer()[a++] = 0x09;
    memory.getBuffer()[a++] = 0x00;
    memory.getBuffer()[a++] = 0x00;
    memory.getBuffer()[a++] = 0x02;
    memory.getBuffer()[a++] = 0xf2;
    memory.getBuffer()[a++] = 0x01;
    memory.getBuffer()[a++] = 0xfc;
    memory.getBuffer()[a++] = 0x0e;
    memory.getBuffer()[a++] = 0x02;
    memory.getBuffer()[a++] = 0xfc;
    memory.getBuffer()[a++] = 0x03;
    memory.getBuffer()[a++] = 0xf0;
    memory.getBuffer()[a++] = 0x01;
    memory.getBuffer()[a++] = 0xfc;
    memory.getBuffer()[a++] = 0x09;
    memory.getBuffer()[a++] = 0x13;
    memory.getBuffer()[a++] = 0x07;
    memory.getBuffer()[a++] = 0x09;
    memory.getBuffer()[a++] = 0xff;
    memory.getBuffer()[0xf0] = 0x01;
  }

  ngOnInit() {
  }

  public addressAt(i: number, j: number): number {
    return i * this.sqrtArray.length + j;
  }
}
