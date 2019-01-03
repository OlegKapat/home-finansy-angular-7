import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { Category } from '../../shared/models/category.model';


@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilterCancel=new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilterApply=new EventEmitter<any>();
  @Input() categories:Category[]=[];
  selectedPeriod='d';
  selectedTypes=[];
  selectedCategories=[];
  timePeriods=[
    {type:'d', label:'День'},
    {type:'m', label:'Неделя'},
    {type:'W', label:'Месяц'}
  ];
  types=[
    {type:'income',label:'Доход'},
    {type:'outcome',label:'Расход'}
  ];
  constructor() {}
 private calculateInputParams(field:string,checked:boolean,value:string){
  if(checked){
    // tslint:disable-next-line:no-unused-expression
    this[field].indexOf(value)===-1 ? this[field].push(value) : null;
  }
  else{
    this[field]=this[field].filter(i=>i!==value);
  }
  }
  handleChangeType({checked,value}){
    this.calculateInputParams('selectedTypes',checked,value);
  }
  handleChangeCategory({checked,value}){
   this.calculateInputParams('selectedCategories',checked,value);
  }
  closeFilter(){
    this.selectedTypes=[];
    this.selectedCategories=[];
    this.selectedPeriod='d';
    this.onFilterCancel.emit();
  }
  applyFilter(){
    this.onFilterApply.emit({
      types:this.selectedTypes,
      categories:this.selectedCategories,
      period:this.selectedPeriod
    });
  }
  ngOnInit() {
  }

}
