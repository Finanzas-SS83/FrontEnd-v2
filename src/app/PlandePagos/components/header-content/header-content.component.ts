import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css']
})
export class HeaderContentComponent implements OnInit {
  shouldRun = true;


  constructor(
    public router: Router,

    private activatedRoute: ActivatedRoute // Inyecta ActivatedRoute
  ) { }

  ngOnInit(): void {}
}
