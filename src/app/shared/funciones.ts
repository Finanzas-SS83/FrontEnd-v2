export function calcularFlujo(Cuota: number, SegRie: number, GPS: number, Portes: number, GasAdm: number, PG: string, SegDes: number, NC: number, N: number, ACF: number): number {
    let resultado = Cuota + SegRie + GPS + Portes + GasAdm;

    if (PG === 'T' || PG === 'P') {
        resultado += SegDes;
    }

    if (NC === N + 1) {
        resultado += ACF;
    }
    return resultado;
}
export function calcularSaldo(Prestamo: number, CF: number, TEM: number, pSegDes:number, N: number): number {
    const resultado = Prestamo - CF / Math.pow(1+TEM + pSegDes,N+1);
    return resultado;
}

export function calcularSaldoFinal(NC: number, N: number,PG: string, SI: number, I: number, A: number): number {
    if (PG == "T") {
        return SI - I;
    } else {
        return SI + A > 0 ? SI + A : 0 ;
        //      if(NC <=N){
        //         return SI + A > 0 ? SI + A : 0 ;
        //     }else{
        //         return 0;
        //     }
    }
}

export function calcularSeguroRiesgo(NC: number, N: number, SegRiePer: number): number {
    if (NC <= N + 1) {
        return -SegRiePer;
    } else {
        return 0;
    }
}


export function calcularAmort(
    NC: number,
    N: number,
    PG: string,
    Cuota: number,
    I: number,
    SegDes: number,
    CF : number
): number {
    if (NC <= N) {
        if (PG === 'T' || PG === 'P') {
            return 0;
        } else {
            return Cuota - I - SegDes;
        }
    } else{
        if(NC <= N+1){
            return CF;
        } else {
            return 0;
        }
    }
}


export function calcularCuota(
    NC: number,
    N: number,
    PG: string,
    I: number,
    TEM: number,
    pSegDesPer: number,
    SI: number
): number {

    if (NC <= N) {
        if (PG === "T") {
            return 0;
        } else {
            if (PG === "P") {
                return I;
            } else {
                return PMT((TEM + pSegDesPer), (N - NC + 1), SI, 0, 0);
            }
        }
    } else {
        return 0;
    }
}
export function PMT(ir: number, np: number, pv: number, fv: number, type: number) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}


export function calcularSaldoInicial(NC: number, N: number, Saldo: number, saldoFinalAnterior: number): number {
    if (NC == 1) {
        return Saldo;
    }else{
        if (NC <= N) {
            return saldoFinalAnterior;
        } else {
            return 0;
        }
    }
}



export function calcularTasa(monto: number): number {
    if (monto >= 15000 && monto <= 33000) {
        return Math.random() * (17.15 - 11.65) + 11.65;
    } else if (monto > 33000 && monto <= 44000) {
        return Math.random() * (17.15 - 10.65) + 10.65;
    } else if (monto > 44000 && monto <= 56000) {
        return Math.random() * (16.15 - 9.65) + 9.65;
    } else if (monto > 56000 && monto <= 75000) {
        return Math.random() * (15.15 - 8.65) + 8.65;
    } else if (monto > 75000 && monto <= 120000) {
        return Math.random() * (13.15 - 8.65) + 8.65;
    } else {
        return 0; // Monto fuera de los rangos definidos
    }
}

export function calcularTEA(tpTasa: string, Tasa: number, NDxA: number, PC: string): number {
    if (tpTasa === "TNA") {
        const factor = (PC === "Diaria") ? 1 : 30;
        const base = 1 + Tasa / (NDxA / factor);
        return Math.pow(base, NDxA / factor) - 1;
    } else {
        return Tasa;
    }
}
export function calcularTEM(TEA: number, frec: number, NDxA: number): number {
    return Math.pow(1 + TEA, frec / NDxA) - 1;
}

export function roundToTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
export function formatoMosneda( precio: number, tipoMoneda: string ): string{
  let idioma;
  let codigoMoneda;

  precio = precio <= 0 ? -1*precio : precio;

  if(tipoMoneda=="PEN"){
    idioma = 'es-PE';
    codigoMoneda = 'PEN'  ;
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

export function IRR(values: number[], guess?: number): number | string {
    const irrResult = (values: number[], dates: number[], rate: number): number => {
        let r = rate + 1;
        let result = values[0];
        for (let i = 1; i < values.length; i++) {
            result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
        }
        return result;
    }

    const irrResultDeriv = (values: number[], dates: number[], rate: number): number => {
        let r = rate + 1;
        let result = 0;
        for (let i = 1; i < values.length; i++) {
            const frac = (dates[i] - dates[0]) / 365;
            result -= frac * values[i] / Math.pow(r, frac + 1);
        }
        return result;
    }

    const dates: number[] = [];
    let positive = false;
    let negative = false;
    for (let i = 0; i < values.length; i++) {
        dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
        if (values[i] > 0) positive = true;
        if (values[i] < 0) negative = true;
    }

    if (!positive || !negative) return '#NUM!';

    const guessValue = (typeof guess === 'undefined') ? 0.1 : guess;
    let resultRate = guessValue;

    const epsMax = 1e-10;
    const iterMax = 50;

    let newRate, epsRate, resultValue;
    let iteration = 0;
    let contLoop = true;
    do {
        resultValue = irrResult(values, dates, resultRate);
        newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
        epsRate = Math.abs(newRate - resultRate);
        resultRate = newRate;
        contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
        iteration++;
    } while(contLoop && iteration < iterMax);

    if(contLoop) return '#NUM!';

    return resultRate;
}
