import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  message: Message;
  constructor(private userservice: UserService,
    private authservice:AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private title: Title,
    private meta:Meta
    ) { title.setTitle('Вход в систему'); meta.addTags([
      {name:'keywords', content:'логин, вход, система'},
      {name:'description', content:'Страница входа в систему'}
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['nowCanLoggin']){
        this.showMessage({text:'Можете авторизироваться',type:'success'});
      }
      else if(params['accessDenied']) {
        this.showMessage({text:'Для работы вам нужно авторезироваться',type:'warning'});
      }
    });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6)])
    });
  }
  private showMessage (message:Message) {
    this.message=message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 10000);
  }
  onSubmit() {
    const formData = this.form.value;
    this.userservice.getUserByEmail(formData.email).subscribe((user: User) => {
     if (user) {
      if (user.password === formData.password) {
        this.message.text= '';
        window.localStorage.setItem('user',JSON.stringify(user));
        this.authservice.login();
        this.router.navigate(['/system/bill']);
      }
      else{
        this. showMessage({type:'danger',text:'Неверный пароль'});
      }
     } else {
      this.showMessage({ type:'danger',text:'Пользователя нет'});
     }
    });
  }

}
