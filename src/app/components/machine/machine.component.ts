import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Position} from '../../interfaces/position.interface';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  constructor(private storage: StorageService) {
    const positions = new Map<string, Position>([
      ['drag-position-cpu', {x: 13, y: 145}],
      ['drag-position-memory', {x: 480, y: 21}],
      ['drag-position-oscillator', {x: 200, y: 22}],
      ['drag-position-settings', {x: 6, y: 20}],
      ['drag-position-stack', {x: 368, y: 151}]
    ]);
    positions.forEach((value: Position, key: string) => {
      if (!storage.getItem(key)) {
        storage.setItem(key, value);
      }
    });
  }

  ngOnInit() {
  }
}
