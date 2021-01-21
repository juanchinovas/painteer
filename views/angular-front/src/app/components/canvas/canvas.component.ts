import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from "@angular/core";
import painteer from "painteer/js/core";

@Component({
    selector: "app-canvas",
    templateUrl: "./canvas.component.html"
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
    
    canvasFns;
    @ViewChild('refContextualMenu') refContextualMenu: ElementRef;
    @ViewChild('refCanvas') refCanvas: ElementRef;

    @Output("onCanvasReadyListener") onCanvasReadyDispatcher = new EventEmitter();
    @Output("onAddTextOpenDialogListener") addTextOpenDialogDispatcher = new EventEmitter();
    @Output("onAddImageOpenDialogListener") addImageOpenDialogDispatcher = new EventEmitter();


    ngAfterViewInit(): void {
        if (this.refCanvas) {
            this.canvasFns = painteer.setCanvas(
                this.refCanvas.nativeElement,
                this.closeContextualMenu.bind(this),
                this.refContextualMenu.nativeElement
            );

            document.addEventListener("mousedown", this.canvasFns.mouseDown, false);
            document.addEventListener("mouseup", this.canvasFns.mouseUp, false);
            document.addEventListener("mousemove", this.canvasFns.mouseMove, false);

            this.onCanvasReadyDispatcher.emit({
                canvasFns: this.canvasFns,
                canvas: this.refCanvas.nativeElement,
            });
        }
    }

    ngOnDestroy(): void {
        this.canvasFns.removeContextMenuListerner();
        document.removeEventListener("mousedown", this.canvasFns.mouseDown, false);
        document.removeEventListener("mouseup", this.canvasFns.mouseUp, false);
        document.removeEventListener("mousemove", this.canvasFns.mouseMove, false);
    }
    

    closeContextualMenu() {
        this.refContextualMenu.nativeElement.classList.add("hide");
    }

    onAddText(event) {
        const position = painteer.getMousePosition(this.refCanvas.nativeElement, event);
        this.addTextOpenDialogDispatcher.emit(position);
        this.closeContextualMenu();
    }

    onAddImg(event) {
        const position = painteer.getMousePosition(this.refCanvas.nativeElement, event);
        this.addImageOpenDialogDispatcher.emit(position);
        this.closeContextualMenu();
    }


}