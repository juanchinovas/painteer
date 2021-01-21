import { Component, EventEmitter, Input, Output } from "@angular/core";

import painteer from "painteer/js/core";

@Component({
    selector: "app-text-dialog",
    templateUrl: "./text-dialog.component.html"
})
export class TextDialogComponent {

    

    @Input() clickPosition;
    @Input() canvasFns;
    @Input() show: boolean;

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
        console.log(this.canvasFns)
        this.canvasFns.canvasFns.addTextToCanvas(form);

        this.closeDialog(event);

        this.onDialogCloseDispatcher.emit();

        return false;
    }
}