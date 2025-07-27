import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSuggesterComponent } from './movie-suggester.component';

describe('MovieSuggesterComponent', () => {
  let component: MovieSuggesterComponent;
  let fixture: ComponentFixture<MovieSuggesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSuggesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSuggesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
