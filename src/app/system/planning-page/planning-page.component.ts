import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable, Subscription } from 'rxjs';
import { combineLatest} from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { APPEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit,OnDestroy {
  isLoaded=false;
  bill:Bill;
  categories:Category[];
  events:APPEvent[];
  sub1:Subscription;
  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.sub1=combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data:[Bill,Category[],APPEvent[]])=>{
      console.log(data);
      this.bill=data[0];
      this.categories=data[1];
      this.events=data[2];
      this.isLoaded=true;
    });
  }
  getCategoryCost(category:Category):number{
    const categoryEvents=this.events.filter(e=>e.category===category.id && e.type==='outcome');
    console.log(categoryEvents);
    return categoryEvents.reduce((total,data)=>{
      total+=data.amount;
      return total;
    },0);
  }
  private getPercent(category:Category):number{
     const percent=(100 * this.getCategoryCost(category))/category.capacity;
     return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category:Category):string{
      return this.getPercent(category) + '%';
  }
  getCategoryColorClass(category:Category):string{
      const percent=this.getPercent(category);
      return percent<60 ? 'success' : percent>=100 ? 'danger' :'warning';
  }
  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
  }
}
