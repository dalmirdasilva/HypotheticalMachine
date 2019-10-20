import {Pipe, PipeTransform} from '@angular/core';
import {ConfigService} from '../services/config.service';

@Pipe({
  name: 'base'
})
export class BasePipe implements PipeTransform {

  public constructor(private config: ConfigService) {
  }

  transform(value: number, base = this.config.getBase()): string {
    return (value & 0xff).toString(base);
  }
}
