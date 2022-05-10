import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CoreActions} from "../../actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'sai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    issuer: new FormControl(''),
  })

  constructor(
    // private store: Store,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // this.store.dispatch(CoreActions.loginRequested({idP: this.loginForm.get('issuer')!.value}));
  }
}
