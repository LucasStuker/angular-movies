import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "cine-movie-flix", appId: "1:732397732005:web:2a03ef793f960889228d4c", storageBucket: "cine-movie-flix.firebasestorage.app", apiKey: "AIzaSyAVN9_C2E7GdCPV_gM6u9GbZKHSpjKbNNo", authDomain: "cine-movie-flix.firebaseapp.com", messagingSenderId: "732397732005" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
};
