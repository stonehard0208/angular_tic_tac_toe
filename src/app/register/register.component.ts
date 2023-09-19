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