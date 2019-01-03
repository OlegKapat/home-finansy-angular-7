import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit,OnDestroy {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCategoryAdd = new EventEmitter<Category>();
  sub1:Subscription;
  constructor(private categoryService:CategoriesService) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
  // tslint:disable-next-line:prefer-const
  let {name,capacity}=form.value;
  if(capacity <0){
    capacity *=-1;
  }
    this.sub1=this.categoryService.addCategory(new Category(name,capacity)).subscribe((category:Category)=>{form.reset();
      form.form.patchValue({capacity:1});
      this.onCategoryAdd.emit(category);
    });
  }
  ngOnDestroy(){
    if(this.sub1){
    this.sub1.unsubscribe();
    }
  }
}
