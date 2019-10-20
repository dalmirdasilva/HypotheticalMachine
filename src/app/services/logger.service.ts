import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {
  }

  public log(...content: any): void {
    console.log(content);
  }

  public error(...content: any): void {
    console.error(content);
  }
}
