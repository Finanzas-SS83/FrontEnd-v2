
export class FinalFeeSchedule {
  private NC: number;
  private CF: number;
  private TEM: number;
  private N: number;
  private pSegDesPer: number;
  private SFCFanterior: number;

  public SICF: number;
  public ICF: number;
  public ACF: number;
  public SFCF: number;
  public SegDesCF: number;


  constructor( NC: number,
  CF: number,
  TEM: number,
  N: number, pSegDesPer: number, SFCFanterior: number) {
      this.NC = NC;
      this.CF = CF;
      this.TEM = TEM;
      this.N = N;
      this.pSegDesPer = pSegDesPer;
      this.SFCFanterior = SFCFanterior;

      this.SICF = this.SaldoInicial();
      this.ICF = this.InteresCuota();
      this.ACF = this.AmortCuota();
      this.SegDesCF = this.Segurodesg();
      this.SFCF = this.SaldoFinal();

  }

  SaldoInicial(){
    let result: number;
    const { NC, CF,TEM,N,SFCFanterior } = this;

    if (NC === 1) {
      result = CF / Math.pow(1 + TEM, N + 1);
    } else {
      result = SFCFanterior;
    }
    return result;
  }

  InteresCuota(){
    const {SICF,TEM } = this;
    return -SICF* TEM;
  }

  AmortCuota(){
    let result: number;
    const { NC,SICF, ICF,N } = this;

    if (NC === N + 1) {
      result = -SICF + ICF;
    } else {
      result = 0;
    }

    return result;
  }

  Segurodesg(){
    const { SICF, pSegDesPer} = this;
    return -SICF *pSegDesPer;
  }

  SaldoFinal(){
    const { SICF, ICF,ACF } = this;
    return SICF-ICF+ACF
  }
}

