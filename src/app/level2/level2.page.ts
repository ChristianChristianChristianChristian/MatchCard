import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.page.html',
  styleUrls: ['./level2.page.scss'],
})
export class Level2Page implements OnInit {
  public gameState: any;
  public startGame: any;
  public countDown: any;
  public totalTime: any;
  public countTime: any;
  public shownTime: any;
  public interTime: any;
  public interCount: any;


  public cardsTotal = 16;
  public cardsArray:any[] = [];
  public userLife = 10;
  public imageDir = '../assets/img/face/Level2/';
  public images =['Brian Griffin', 'Chris Griffin', 'Glenn Quagmire', 'Joe Swanson', 'Lois Griffin', 'Meg Griffin', 'Peter Griffin', 'Stewie Griffin'];

  public selectCard1pos= -1;
  public selectCard1val = -1;
  public selectCard2pos= -1;
  public selectCard2val = -1;
  public selectOldPos = -1;

  public debugText = "Debug Text Goes Here";

  constructor() { }

  ngOnInit() {
    this.restartGame()
  }
  populateCards(){
    this.cardsArray = [];
    var x = 0;
    var y = 0;
    for (var i = 0; i < this.cardsTotal; i++){
      this.cardsArray.push({pos:i, val:y});
      if(x == 0) x = 1;
      else{x = 0, y++}
    }
  }

    selectCard(pos: number, val: number, i: any){
      var actOne = false;

      if (this.selectCard1pos > -1 && this.selectCard2pos == -1){
        this.selectCard2pos = pos;
        this.selectCard2val = val;
        actOne = true;
      }

      if (this.selectCard1pos == -1 && !actOne){
        this.selectCard1pos = pos;
        this.selectCard1val = val;
        this.selectOldPos =i;
    }

    if (actOne && this.selectCard1pos >-1 && this.selectCard2pos > -1 ){
      setTimeout(() => {
        if(this.selectCard1val == this.selectCard2val){
          this.debugText = "Cards Match!!";
          this.cardsArray.splice(this.selectOldPos, 1, {pos: this.selectOldPos, val: -1});
          this.cardsArray.splice(i, 1, {pos: i, val: -1});
            this.resetSelect();
            this.winCon();
        }
        else {
          this.debugText = "Cards don't Match :(";
          this.userLife -= 1;
            this.resetSelect();
            if(this.userLife <= 0) this.loseCon();
        }
      }, 1000);
    }

  }

  shuffle(a: any[]){
    var j, x, i;
    for (i = a.length; i; i--){
      j = Math.floor(Math.random() * i);
      x = a[i-1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  restartGame(){

    this.gameState = 'load';
    this.startGame = false;
    this.countDown = 3;
    this.totalTime = 60;
    this.countTime = 0;
    this.shownTime = 0;
    this.interCount = null;


    this.userLife = 10;
    this.populateCards();
    this.resetSelect();
    this.shuffle(this.cardsArray);
    this.shuffle(this.images);

    setTimeout(()=> {
      this.startGame = true;
      this.gameState = 'init';
    }, this.countDown*1000);

    this.interCount = setInterval(()=>{
      if(this.countDown < 0){
        clearInterval(this.interCount);
        this.interCount = null;
      }
      else this.countDown -= 1;
    }, 1000);

    setTimeout(() =>{
      this.interTime = setInterval(()=>{
        if (this.countTime>= this.totalTime)this.loseCon();
        if (this.gameState == 'init'){
          this.countTime += 1;
          var minutes = Math.floor((this.totalTime - this.countTime) / 60);
          var seconds = (this.totalTime - this.countTime) - minutes * 60;
          this.shownTime = minutes.toString() + ":" + seconds.toString();
        }
        else{
          clearInterval(this.interTime);
          this.interTime = null;
        }
      }, 1000)
    }, this.countDown*1000+200);
  }

  winCon(){
    var winCheck = false;
    for (var i = 0; i < this.cardsArray.length; i++)
    if (this.cardsArray[i].val != -1) winCheck = true;

    if (winCheck == false) this.gameState = 'win';
  }


  loseCon(){
    this.gameState = 'lose';
  }


  resetSelect(){
    this.selectCard1pos= -1;
    this.selectCard1val = -1;
    this.selectCard2pos= -1;
    this.selectCard2val = -1;

  }
}
