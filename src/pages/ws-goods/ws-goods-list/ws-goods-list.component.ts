import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
interface goods{
    goods_no:string,
    goods_nm:string,
    sale_type:number,
    maker:string,
    wsCnt:number
=======
interface Goods{
    goods_no:string;
    goods_nm:string;
    sale_type:number;
    maker:string;
    wsCnt:number;
>>>>>>> 345aaf700e413dc65d523a051b2ec5f567b9c6f3
}
@Component({
  selector: 'app-ws-goods-list',
  templateUrl: './ws-goods-list.component.html',
  styleUrls: ['./ws-goods-list.component.scss']
})
export class WsGoodsListComponent implements OnInit {
<<<<<<< HEAD
  goodsList:Array<goods>;
  constructor() { 

=======
  goodsList:Array<Goods>;
  constructor() {
    this.loadGoodsList();
>>>>>>> 345aaf700e413dc65d523a051b2ec5f567b9c6f3
  }

  loadGoodsList(){
     this.goodsList = [{goods_no:"gn0001", goods_nm:"牙膏", sale_type:1, maker:"狮王", wsCnt: 40},
     {goods_no:"gn0002", goods_nm:"尿不湿", sale_type:1, maker:"花王", wsCnt: 12},
     {goods_no:"gn0003", goods_nm:"洗面奶", sale_type:1, maker:"资生堂", wsCnt: 9},
     {goods_no:"gn0004", goods_nm:"奶粉", sale_type:2, maker:"明治", wsCnt: 42},
     {goods_no:"gn0005", goods_nm:"厚木180D丝袜", sale_type:1, maker:"大丸", wsCnt: 30}];
  }
  ngOnInit() {
  }

  sortGoods(){}
}
