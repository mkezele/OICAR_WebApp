import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User | undefined;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.userService.getUser(id).subscribe(result => { this.user = result.body ?? undefined; });
    }

  ngOnInit(): void {

  }

}
