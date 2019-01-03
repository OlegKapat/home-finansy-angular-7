import { Component, OnInit,Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { APPEvent } from '../../shared/models/event.model';


@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories:Category[]=[];
  @Input() events:APPEvent[]=[];
  searchValue='';
  searchPlaceholder='Сумма';
  searchField='amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((event)=>{
      event.categoryName =this.categories.find(c=>c.id===event.category).name;
    });
  }
  getEventClass(event:APPEvent){
    return{
      // 'label':true,
      'label-danger':event.type==='outcome',
      'label-success':event.type==='income'

    };
  }
  changeCriteria(field:string){
      const namesMap={
        amount:'Сумма',
        date:'Дата',
        category:'Категория',
        type:'Тип'
      };
      this.searchPlaceholder=namesMap[field];
       this.searchField=field;
  }
}
