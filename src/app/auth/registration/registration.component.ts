import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userservice:UserService, private router:Router, private title:Title, private meta: Meta) {
    title.setTitle('Регистрация');
    meta.addTags([
      {name:'keywords', content:'регистрация, вход, система'},
      {name:'description', content:'Страница  регистрации'}
    ]);
  }

   form:FormGroup;
  ngOnInit() {
    this.form=new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'name': new FormControl('',[Validators.required]),
      'agree': new FormControl(false,[Validators.requiredTrue])
    });
  }
  onSubmit(){
    const { email,password,name}=this.form.value;
    const user=new User(email, password,name);
   this.userservice.createNewUser(user).subscribe(()=>{
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLoggin:true
        }
      });
   });
  }
  forbiddenEmails(control:FormControl) : Promise<any>{
    return new Promise((resolve, reject)=>{
      this.userservice.getUserByEmail(control.value).subscribe((user:User)=>{
        if(user){
          resolve({forbiddenEmail:true});
        } else{
          resolve();
        }
      });
    });
  }
}
