import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  formatoMoneda( precio: number, tipoMoneda: string ): string{
    let idioma;
    let codigoMoneda;

    if(tipoMoneda=="PEN"){
      idioma = 'es-PE';
      codigoMoneda = 'PEN';
    }else if(tipoMoneda=="USD"){
      idioma = 'en-US';
      codigoMoneda = 'USD';
    }
    return precio.toLocaleString(idioma,
        {
          style: 'currency',
          currency: codigoMoneda,
          currencyDisplay: 'symbol',
          minimumFractionDigits: 2,
        })
  }
  constructor() { }
}
