import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/AppUser';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {

    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/'])
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.userService.get(user.uid).valueChanges()
          }
          return of(null);
        })
      )
  }

  demoLogin() {
    this.afAuth.auth.signInWithEmailAndPassword("demouser@demo.com", "demo123")
      .then(r => {
        
        this.userService.save(r.user);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl)
      })
      .catch(e => {
        console.log(e)
      });
  }


}

