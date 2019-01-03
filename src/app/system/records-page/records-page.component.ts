import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoryServise:CategoriesService) { }
   categories:Category[]=[];
   isLoaded=false;
  ngOnInit() {
    this.categoryServise.getCategories().subscribe((categories:Category[])=>{
      this.categories=categories;
      this.isLoaded=true;
    });
  }
  newCategoryAdded(category:Category){
    this.categories.push(category);
  }
  categoryWasEdided(category:Category){
    const index=this.categories.findIndex(c=>c.id===category.id);
    this.categories[index]=category;
  }

}
