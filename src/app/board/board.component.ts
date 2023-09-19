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