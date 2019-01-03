import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { combineLatest, Subscription} from 'rxjs';
import { Category } from '../shared/models/category.model';
import { APPEvent } from '../shared/models/event.model';
import * as moment from 'moment';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit,OnDestroy {
  categories:Category[]=[];
  events:APPEvent[]=[];
  filteredEvents:APPEvent[]=[];
  isLoaded=false;
  chartData=[];
  isFilterVisible=false;
  sub1:Subscription;


  constructor(private categoriesService:CategoriesService,
              private eventsService:EventsService) { }

  ngOnInit() {
   this.sub1= combineLatest( this.categoriesService.getCategories(),
                    this.eventsService.getEvents()).subscribe((data:[Category[],APPEvent[]])=>{
                    this.categories=data[0];
                    this.events=data[1];
                    this.setOriginalEvents();
                    this.calculateChartData();
                    this.isLoaded=true;
                    });
  }
  calculateChartData():void{
    this.chartData=[];
    this.categories.forEach((category)=>{
        const categoryEvents=this.filteredEvents.filter((e)=>e.category===category.id && e.type==='outcome');
        this.chartData.push({
          name:category.name,
          value:categoryEvents.reduce((total,event)=>{
            total+=event.amount;
            return total;
          },0)
        });
    });
  }
  private setOriginalEvents(){
    this.filteredEvents=this.events.slice();
  }
  private toggleFilterVisibility(dir:boolean){
    this.isFilterVisible=dir;
  }
  openFilter(){
    this.toggleFilterVisibility(true);

  }
  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod=moment().startOf(filterData.period).startOf('d');
    const endPeriod=moment().endOf(filterData.period).endOf('d');
    this.filteredEvents=this.filteredEvents.filter((e)=>{
      return filterData.types.indexOf(e.type) !==-1;
    })
    .filter((e)=>{
      return filterData.categories.indexOf(e.category.toString())!==-1;
    })
    .filter((e)=>{
      const momentDate=moment(e.date,'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod,endPeriod);
    });
    this.calculateChartData();
  }
  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.calculateChartData();
     this.setOriginalEvents();

  }
  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
  }
  }


