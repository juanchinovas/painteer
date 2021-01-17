import React from "react";
import painteer from "painteer/js/core";

function closeDialog(event) {
    event.preventDefault();
    
    const parent = painteer.reduce(function(el) {
        return el.getAttribute("role") ==='dialog';
    }, event.target.parentNode);

    parent.classList.add("hide");
    parent.classList.remove("show");
    
    return false;
}

function AddImageDialog(props) {

    function sendForm(event) {
        event.preventDefault();

        const parent = painteer.reduce(function(el) {
            return el.tagName ==='FORM';
        }, event.target.parentNode);

        const form = painteer.formToObject(parent);
        form.img = document.querySelector("#img-selected");

        props.canvasFns.canvasFns.addImageToCanvas(form);

        closeDialog(event);

        props.onDialogCloseListener && props.onDialogCloseListener();

        return false;
    }

    function onImageChange(event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function() {
            document.querySelector("#img-selected").src = reader.result;
        };
    }

    return (
        <section id="image-add-dialog" className={(props.show && 'show') || 'hide'} role="dialog" aria-hidden={props.show?false:true}>
            <header>
                <h1>Add image</h1>
                <i aria-label="Close" role="button" id="btn-close" onClick={closeDialog}>&times;</i>
            </header>
            <div>
                <form id="dialog-form-add-image" method="POST">
                    <div className="input-container flex-column">
                        <label htmlFor="image-field">Image</label>
                        <input type="file" capture="user" accept="image/*" name="image-field" id="image-field" required
                        onChange={onImageChange}/>
                    </div>
                    <div className="input-container flex-column">
                        <img alt="Selected file" id="img-selected" width="100" height="100"/>
                    </div>
                    <div className="input-container flex-column">
                        <label aria-label="Image dimension">Dimension</label>
                        <div className="input-container flex-row">
                            <input placeholder="width" 
                                type="number" name="img-width" 
                                id="img-width" required pattern="\d+(\.\d)*"
                                defaultValue={200} />
                            <input placeholder="height" 
                                type="number" name="img-height" 
                                id="img-height" required pattern="\d+(\.\d)*"
                                defaultValue={200} />
                        </div>
                    </div>
                    <div className="input-container flex-column">
                        <label aria-label="Set the image coodinate">Coordinate</label>
                        <div className="input-container flex-row">
                            <input type="number" 
                                name="image-coordinate-x" 
                                id="image-coordinate-x" required pattern="\d+(\.\d)*" disabled
                                defaultValue={props.clickPosition && props.clickPosition.x}/>
                            <input type="number" 
                                name="image-coordinate-y" 
                                id="image-coordinate-y" required pattern="\d+(\.\d)*" disabled
                                defaultValue={props.clickPosition && props.clickPosition.y}/>
                        </div>
                    </div>
                    <footer className="flex-row">
                        <button type="button" onClick={closeDialog}>Cancel</button>
                        <button onClick={sendForm}>Ok</button>
                    </footer>
                </form>
            </div>
        </section>
    );
}

export default AddImageDialog;