import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild('snav') sidenav!: MatSidenav;

  sidenavMode: 'side' | 'over' = 'side';
  
  constructor() { }

  ngOnInit(): void {
    this.updateSidenavMode();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSidenavMode();
  }

  updateSidenavMode() {
    if (window.innerWidth <= 768) {
      this.sidenavMode = 'over';
      if (this.sidenav) {
        this.sidenav.close();
      }
    } else {
      this.sidenavMode = 'side';
      if (this.sidenav) {
        this.sidenav.close();
      }
    }
  }
  isHamburguer = true;
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isHamburguer = !this.isHamburguer;
  }

  onSidenavOpened() {
    this.isHamburguer = false;
  }

  onSidenavClosed() {
    this.isHamburguer = true;
  }
}
