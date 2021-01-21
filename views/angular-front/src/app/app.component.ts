import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  showAddTextDialog;
  showAddImageDialog;
  clickPosition;
  canvasFns;

	onBgChange() {
		this.canvasFns.canvasFns.setCanvasBgColors();
	}

	onAddTextOpenDialogListener(clickPosition) {
    console.log(clickPosition);
		this.showAddTextDialog = true;
		this.clickPosition = clickPosition;
	}

	onAddImageOpenDialogListener(clickPosition) {
		this.showAddImageDialog = true;
		this.clickPosition = clickPosition;
	}

	setCanvasFns(canvaFns) {
		setTimeout(()=>this.canvasFns = canvaFns, 0);
	}

}
