import {Inject, Injectable, InjectionToken} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

export const OSCILLATOR_FREQUENCY_TOKEN = new InjectionToken<number>('Oscillator frequency.');

@Injectable({
  providedIn: 'root'
})
export class Oscillator {

  private static SECOND = 1000;

  private readonly startSubject: Subject<void>;
  private readonly stopSubject: Subject<void>;
  private readonly tickSubject: Subject<number>;

  constructor(@Inject(OSCILLATOR_FREQUENCY_TOKEN) private frequency: number) {
    this.startSubject = new Subject<void>();
    this.stopSubject = new Subject<void>();
    this.tickSubject = new Subject<number>();

    this.startSubject.pipe(
      switchMap<void, Observable<number>>(() => interval(this.getInterval()).pipe(
        takeUntil(this.stopSubject)
      ))
    ).subscribe((n: number) => {
      this.tickSubject.next(n);
    });

    this.start();
  }

  public setFrequency(frequency: number, restart: boolean = false) {
    this.frequency = frequency;
    if (restart) {
      this.start();
    }
  }

  public getFrequency(): number {
    if (this.frequency <= 0) {
      return 1;
    }
    return this.frequency;
  }

  public getInterval(): number {
    return Oscillator.SECOND / this.getFrequency();
  }

  public pulse(): void {
    this.tickSubject.next(0);
  }

  public start(): void {
    this.startSubject.next();
  }

  public stop(): void {
    this.stopSubject.next();
  }

  public asObservable(): Observable<number> {
    return this.tickSubject.asObservable();
  }
}
