import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

import painteer from "painteer/js/core";

@Component({
    selector: "app-image-dialog",
    templateUrl: "./image-dialog.component.html"
})
export class ImageDialogComponent {

        
    @Input() clickPosition;
    @Input() canvasFns;
    @Input() show: boolean;
    @ViewChild('imgSelected') imgSelected: ElementRef;

    @Output("onDialogCloseListener") onDialogCloseDispatcher = new EventEmitter();

    closeDialog(event) {
        event.preventDefault();
        
        const parent = painteer.reduce(function(el) {
            return el.getAttribute("role") === 'dialog';
        }, event.target.parentNode);

        parent.classList.add("hide");
        parent.classList.remove("show");
        
        return false;
    };

    sendForm(event) {
        event.preventDefault();

        const parent = painteer.reduce(function(el) {
            return el.tagName === 'FORM';
        }, event.target.parentNode);

        const form = painteer.formToObject(parent);
        this.canvasFns.canvasFns.addTextToCanvas(form);

        this.closeDialog(event);

        this.onDialogCloseDispatcher.emit();

        return false;
    }

    onImageChange(event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            this.imgSelected.nativeElement.src = reader.result;
        };
    }
}