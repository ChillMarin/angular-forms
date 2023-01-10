import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //obtenemos el user pero ojo solo recibimos la data pero no es necesario un unsubscribe me parece
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    });
  }
}
