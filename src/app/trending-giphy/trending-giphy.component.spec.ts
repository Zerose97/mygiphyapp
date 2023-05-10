import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingGiphyComponent } from './trending-giphy.component';

describe('TrendingGiphyComponent', () => {
  let component: TrendingGiphyComponent;
  let fixture: ComponentFixture<TrendingGiphyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingGiphyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingGiphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
