import {Component, OnInit} from '@angular/core';
import {Stack} from '../../machine/stack';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {

  private sizeArray: Array<number>;

  constructor(private stack: Stack) {
    this.sizeArray = Array.from(Array(stack.getSize()).keys());
  }

  ngOnInit() {
  }
}
