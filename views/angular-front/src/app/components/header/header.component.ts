import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import painteer from "painteer/js/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  state = null;
  debounceFgColor: Function;

  @Output() onBgChange = new EventEmitter<void>();

  ngOnInit() {
    this.state = painteer.state();

    this.debounceFgColor = painteer.debounce((event) => {
        painteer.onColorFgChange(event.target.value);
        this.state.fgColor = event.target.value;
        painteer.state(this.state);
    }, 250);
  }


  changeFgColor(event) {
    this.state.fgColor = event.target.dataset.color;
    painteer.state(this.state);
  }

  changeSize(event) {
    event.preventDefault();
    this.state.lineSize = +event.target.textContent;
    painteer.state(this.state);
  }

  changeBgColor(event) {
    this.state.bgColor = event.target.value;
    painteer.state(this.state);
    this.onBgChange.emit();
  }

  setErase() {
    this.state.isErasing = !this.state.isErasing;
    painteer.state(this.state);
  }

  downloadDraw(event) {
    painteer.downloadDraw(event);
  }

  isDarkColor(color) {
    return painteer.isDarkColor(color) ? 'white' : 'black'
  }

}
