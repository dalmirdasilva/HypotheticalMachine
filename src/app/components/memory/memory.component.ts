import {Component, OnInit} from '@angular/core';
import {Memory} from '../../machine/memory';
import {Base, ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  public readonly squareArray: Array<number>;
  index: number;
  constructor(private memory: Memory,
              private config: ConfigService) {
    this.squareArray = Array.from(Array(Math.sqrt(memory.getSize())).keys());
    config.getOnBaseChangeObservable().subscribe((newBase: Base) => {
    });
    this.index = 1;
  }

  ngOnInit() {
  }

  onHandlerMouseDown() {
    this.index++;
  }
}
