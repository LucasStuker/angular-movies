import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: Observable<User | null>;

  private activeProfileSource = new BehaviorSubject<'lucas' | 'aline'>('lucas');
  public activeProfile$ = this.activeProfileSource.asObservable();

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }
  setActiveProfile(profile: 'lucas' | 'aline'): void {
    this.activeProfileSource.next(profile);
  }
  getActiveProfile(): 'lucas' | 'aline' {
    return this.activeProfileSource.getValue();
  }
  loginComGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {});
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
