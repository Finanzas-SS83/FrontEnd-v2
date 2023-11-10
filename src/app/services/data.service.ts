import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private savedData: any;

  saveData(data: any) {
    this.savedData = data;
  }

  getData() {
    return this.savedData;
  }
}
