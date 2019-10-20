import {Inject, Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

export const OSCILLATOR_FREQUENCY_TOKEN = new InjectionToken<number>('Oscillator frequency.');

@Injectable({
  providedIn: 'root'
})
export class Oscillator {

  private readonly observable: Observable<number>;
  private readonly startSubject: BehaviorSubject<number>;
  private readonly stopSubject: Subject<void>;

  constructor(@Inject(OSCILLATOR_FREQUENCY_TOKEN) private frequency: number) {
    this.startSubject = new BehaviorSubject<number>(0);
    this.stopSubject = new Subject<void>();
    this.observable = this.startSubject.pipe(
      switchMap<number, Observable<number>>(() => interval(this.getInterval()).pipe(
        takeUntil(this.stopSubject)
      ))
    );
    this.start();
  }

  public setFrequency(frequency: number) {
    this.frequency = frequency;
    this.start();
  }

  public getFrequency(): number {
    if (this.frequency <= 0) {
      return 1;
    }
    return this.frequency;
  }

  public getInterval(): number {
    return 1000 / this.getFrequency();
  }

  public start(): void {
    this.startSubject.next(0);
  }

  public stop(): void {
    this.stopSubject.next();
  }

  public asObservable(): Observable<number> {
    return this.observable;
  }
}
