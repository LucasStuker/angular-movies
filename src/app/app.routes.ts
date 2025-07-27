import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { MovieSuggesterComponent } from './pages/movie-suggester/movie-suggester.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'search/:query',
    component: SearchResultsComponent, //
  },
  {
    path: 'watch-list',
    component: WatchlistComponent,
  },
  {
    path: 'suggestions',
    component: MovieSuggesterComponent,
  },
];
