import {Inject, Injectable, InjectionToken} from '@angular/core';

export const NATIVE_STORAGE_TOKEN = new InjectionToken<Storage>('Native storage.');

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(NATIVE_STORAGE_TOKEN) private storage: Storage) {
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
