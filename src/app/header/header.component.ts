import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeScrollClass = false;
  activeColorChangePatisserie = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if(document.documentElement.scrollTop > 80) {
      this.activeScrollClass = true;
    }
    if(document.documentElement.scrollTop === 0) {
      this.activeScrollClass = false;
    }

    const isHebergementSectionPatisserie = document.getElementById("sectionPatisserie");
    if(isHebergementSectionPatisserie && (document.documentElement.scrollTop + 80 > 1000)) {
      this.activeColorChangePatisserie = true;
    }
    if(isHebergementSectionPatisserie && (document.documentElement.scrollTop + 80 < 1000 )) {
      this.activeColorChangePatisserie = false;
    }

  }

}
