# Tictactoe
## Angular tictactoe
### Board Service
```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  winner: boolean;
  headline: string;
  playerTurn: string;
  player1: string;
  player2: string;

  constructor() {
    this.winner = false;
    this.playerTurn = 'X';
    this.headline = 'Player\'s turn: ' + this.playerTurn;
    this.player1 = '';
    this.player2 = '';
  }

  /**
   * Determine if a player won the game.
   */
  wonGame(board: string[]): boolean {
    let winnerFound = false;
    const winCombos = [ [0, 1, 2], [0, 3, 6], [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8], [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]];

    // loop through all the winning combinations
    winCombos.forEach(combo => {
      let win = true;
      // check if player made a move in each board location of the winning combination
      combo.forEach(pos =>  win = win && (board[pos] === this.playerTurn));
      if (win) {
        winnerFound = true;
      }
    });

    return winnerFound;
  }

  /**
   *  Alternate player turns.
   */
  nextPlayerTurn(): string {
    return (this.playerTurn === "X" ? "0" : "X");
  }

  /**
   * Make move on board at a given position.
   */
  makeMove(board: string[], pos: number): void {
    board[pos] = this.playerTurn;
    if (this.wonGame(board)) {
      this.winner = true;
      this.headline = "Player " + (this.playerTurn === "X" ? "X " + this.player1 : "O " + this.player2) + " won the game";
    } else {
      this.playerTurn = this.nextPlayerTurn();
      this.headline = 'Player\'s turn: ' + (this.playerTurn === "X" ? "X " + this.player1 : "O " + this.player2);
    }
  }

  /**
   * Register tictactoe board players.
   */
  registerPlayers(pName1: string, pName2: string): string {
    this.player1 = "(" + pName1 + ")";
    this.player2 = "(" + pName2 + ")";
    this.headline = 'Player\'s turn: ' + (this.playerTurn === "X" ? "X " + this.player1 : "O " + this.player2);
    return "Registered " + pName1 +  " and " + pName2;
  }
}
```
### Borad Component
```js
import {Component, Input, OnInit} from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardStatus: string[];

  get headline(): string {
    return this.bServ.headline;
  }
  
  constructor(private bServ: BoardService) {
   this.boardStatus = ["", "", "",
                       "", "", "",
                       "", "", ""];
    
  }

  ngOnInit(): void {
  }

  /**
   * Handle the user selecting a square to put an X or an O.
   * @param id  The square id
   */
  handleBtnClick(id: number): void {
    // select this square if available
    if (this.boardStatus[id] === '') {
      this.bServ.makeMove(this.boardStatus, id);
    }
    
  }
}
```
### Register Component
```js
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BoardService} from "../board/board.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  headline: string;

  constructor(private regServ:BoardService, private router:Router) {
    this.regForm = new FormGroup({
      uname1: new FormControl(''),
      uname2: new FormControl('')
    })
    this.headline = "";

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.regServ.player1 = this.regForm.value.uname1;
    this.regServ.player2 = this.regForm.value.uname2;
    this.regServ.registerPlayers(this.regServ.player1, this.regServ.player2);
    this.router.navigate(['/board']);

  }
}
```
