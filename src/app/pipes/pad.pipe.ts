import {Pipe, PipeTransform} from '@angular/core';
import {Base, ConfigService} from '../services/config.service';

@Pipe({
  name: 'pad',
  pure: false
})
export class PadPipe implements PipeTransform {

  public constructor(private config: ConfigService) {
  }

  transform(value: string, padLength: number = this.config.getBaseLog()): string {
    return ('0'.repeat(padLength) + value).slice(-padLength);
  }
}
