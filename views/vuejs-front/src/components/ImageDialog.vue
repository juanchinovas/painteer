<template>
    <section id="image-add-dialog" :class="[show? 'show' : 'hide']" role="dialog" :aria-hidden="show?false:true">
        <header>
            <h1>Add image</h1>
            <i aria-label="Close" role="button" id="btn-close" @click="closeDialog">&times;</i>
        </header>
        <div>
            <form id="dialog-form-add-image" method="POST">
                <div class="input-container flex-column">
                    <label for="image-field">Image</label>
                    <input type="file" capture="user" accept="image/*" name="image-field" id="image-field" required
                    @change="onImageChange"/>
                </div>
                <div class="input-container flex-column">
                    <img ref="imgSelected" alt="Selected file" id="img-selected" width="100" height="100"/>
                </div>
                <div class="input-container flex-column">
                    <label aria-label="Image dimension">Dimension</label>
                    <div class="input-container flex-row">
                        <input placeholder="width" 
                            type="number" name="img-width" 
                            id="img-width" required pattern="\d+(\.\d)*"
                            :value="200" />
                        <input placeholder="height" 
                            type="number" name="img-height" 
                            id="img-height" required pattern="\d+(\.\d)*"
                            :value="200" />
                    </div>
                </div>
                <div class="input-container flex-column">
                    <label aria-label="Set the image coodinate">Coordinate</label>
                    <div class="input-container flex-row">
                        <input type="number" 
                            name="image-coordinate-x" 
                            id="image-coordinate-x" required pattern="\d+(\.\d)*" disabled
                            :value="clickPosition && clickPosition.x"/>
                        <input type="number" 
                            name="image-coordinate-y" 
                            id="image-coordinate-y" required pattern="\d+(\.\d)*" disabled
                            :value="clickPosition && clickPosition.y"/>
                    </div>
                </div>
                <footer class="flex-row">
                     <button type="button" @click="closeDialog">Cancel</button>
                    <button @click="sendForm">Ok</button>
                </footer>
            </form>
        </div>
    </section>
</template>

<script>
import painteer from "painteer/js/core";

export default {
    props: {
        clickPosition: Object,
        canvasFns: Object,
        onDialogCloseListener: Function,
        show: Boolean
    },
    methods: {
        closeDialog(event) {
            event.preventDefault();
            
            const parent = painteer.reduce(function(el) {
                return el.getAttribute("role") === 'dialog';
            }, event.target.parentNode);

            parent.classList.add("hide");
            parent.classList.remove("show");
            
            return false;
        },
        sendForm(event) {
            event.preventDefault();

            const parent = painteer.reduce(function(el) {
                return el.tagName === 'FORM';
            }, event.target.parentNode);

            const form = painteer.formToObject(parent);
            this.canvasFns.canvasFns.addTextToCanvas(form);

            this.closeDialog(event);

            this.onDialogCloseListener && this.onDialogCloseListener();

            return false;
        },
        onImageChange(event) {
            let file = event.target.files[0];

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function() {
                this.imgSelected.src = reader.result;
                // document.querySelector("#img-selected").src = reader.result;
            };
        }
    }
};
</script>

<style>

</style>