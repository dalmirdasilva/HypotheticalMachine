import {Inject, Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export const DEFAULT_BASE_TOKEN = new InjectionToken<number>('Default display base.');

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly baseLog: Map<Base, number>;
  private readonly baseNames: Map<Base, string>;
  private readonly onBaseChange: BehaviorSubject<Base>;

  constructor(@Inject(DEFAULT_BASE_TOKEN) private base: Base) {
    this.baseLog = new Map<Base, number>([[Base.BIN, 8], [Base.DEC, 3], [Base.HEX, 2]]);
    this.baseNames = new Map<Base, string>([[Base.BIN, 'BIN'], [Base.DEC, 'DEC'], [Base.HEX, 'HEX']]);
    this.onBaseChange = new BehaviorSubject<Base>(base);
  }

  public setBase(base: number): void {
    this.base = base;
    this.onBaseChange.next(base);
  }

  public getBase(): Base {
    return this.base;
  }

  public getBaseLog(): number {
    return this.baseLog.get(this.base);
  }

  public getBaseNames(): Map<Base, string> {
    return this.baseNames;
  }

  public getOnBaseChangeObservable(): Observable<Base> {
    return this.onBaseChange.asObservable();
  }
}

export enum Base {
  BIN = 2,
  DEC = 10,
  HEX = 16
}
