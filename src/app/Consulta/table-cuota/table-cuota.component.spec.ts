import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCuotaComponent } from './table-cuota.component';

describe('TableCuotaComponent', () => {
  let component: TableCuotaComponent;
  let fixture: ComponentFixture<TableCuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCuotaComponent]
    });
    fixture = TestBed.createComponent(TableCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
