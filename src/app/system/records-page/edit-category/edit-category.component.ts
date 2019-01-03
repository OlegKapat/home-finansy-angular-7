import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories:Category[]=[];
  sub1:Subscription;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCategoryEdit=new EventEmitter<Category>();
  currentCategoryId=1;
  currentCategory:Category;
  message:Message;
  constructor(private categoriesService:CategoriesService) { }

  ngOnInit() {
    this.message=new Message('success','');
    this.onCategoryChange();
  }
  onSubmit(form:NgForm){
      // tslint:disable-next-line:prefer-const
      let {capacity, name}=form.value;
      if(capacity<0){
        capacity *=-1;
      }
      const category=new Category(name,capacity,+this.currentCategoryId);
      // tslint:disable-next-line:no-shadowed-variable
      this.categoriesService.updateCategory(category).subscribe((category:Category)=>{
        this.onCategoryEdit.emit(category);
        this.message.text='Категория успешно изменена';
        window.setTimeout(()=>{this.message.text='';},5000);
      });
  }
  onCategoryChange(){
    this.currentCategory=this.categories.find(c=>c.id===+this.currentCategoryId);
  }
  ngOnDestroy(){
    if(this.sub1){
    this.sub1.unsubscribe();
    }
  }
}
