import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: "",
      password: "",
    });
  }

  ValidateEmail = (email : any) => {
    const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validRegex.test(email);
  }

  submit(): void {
    let user = this.form.getRawValue();

    if(user.email == "" || user.password == ""){
      Swal.fire('Error','Please enter all the fields','error');
    }else if (!this.ValidateEmail(user.email)){
      Swal.fire("Error","Please enter a valid email","error");
    }else{
      this.http.post('http://localhost:5000/api/login',user,{
        withCredentials:true,
      })
      .subscribe((res) => this.router.navigate(['/']),(err) => {
        Swal.fire("Error",err.error.message,"error");
      })
    }
  }
}
