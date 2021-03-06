import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.fb.group({
      userFormControl: [ '', {validators : [Validators.required]}  ],
      pwdFormControl: [ '', {validators : [Validators.required]}  ],
    })
  }

  login(){
    if(this.loginForm.status == "VALID"){
      this.router.navigate(['/validateForm'])
    }
  }

}
