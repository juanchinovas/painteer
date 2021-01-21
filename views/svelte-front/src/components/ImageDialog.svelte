<script>
    import { createEventDispatcher } from "svelte";
    import painteer from "painteer/js/core";

    export let clickPosition, canvasFns, show;
    
    let imgSelected;
    const onDialogCloseDispatcher = createEventDispatcher();

    function closeDialog(event) {
        event.preventDefault();
        
        const parent = painteer.reduce(function(el) {
            return el.getAttribute("role") === 'dialog';
        }, event.target.parentNode);

        parent.classList.add("hide");
        parent.classList.remove("show");
        
        return false;
    };

    function sendForm(event) {
        event.preventDefault();

        const parent = painteer.reduce(function(el) {
            return el.tagName === 'FORM';
        }, event.target.parentNode);

        const form = painteer.formToObject(parent);
        canvasFns.canvasFns.addTextToCanvas(form);

        closeDialog(event);

        onDialogCloseDispatcher('onDialogCloseListener');

        return false;
    }

    function onImageChange(event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            imgSelected.src = reader.result;
        };
    }

</script>

<section id="image-add-dialog" class:hide={!show} role="dialog" aria-hidden={show?false:true}>
    <header>
        <h1>Add image</h1>
        <i aria-label="Close" role="button" id="btn-close" on:click={closeDialog}>&times;</i>
    </header>
    <div>
        <form id="dialog-form-add-image" method="POST">
            <div class="input-container flex-column">
                <label for="image-field">Image</label>
                <input type="file" capture="user" accept="image/*" name="image-field" id="image-field" required
                on:change={onImageChange}/>
            </div>
            <div class="input-container flex-column">
                <img bind:this={imgSelected} alt="Selected file" id="img-selected" width="100" height="100"/>
            </div>
            <div class="input-container flex-column">
                <label for="size-container" aria-label="Image dimension">Dimension</label>
                <div class="input-container flex-row" id="size-container">
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
                <label for="position-container" aria-label="Set the image coodinate">Coordinate</label>
                <div class="input-container flex-row" id="position-container">
                    <input type="number" 
                        name="image-coordinate-x" 
                        id="image-coordinate-x" required pattern="\d+(\.\d)*" disabled
                        value={clickPosition && clickPosition.x}/>
                    <input type="number" 
                        name="image-coordinate-y" 
                        id="image-coordinate-y" required pattern="\d+(\.\d)*" disabled
                        value={clickPosition && clickPosition.y}/>
                </div>
            </div>
            <footer class="flex-row">
                 <button type="button" on:click={closeDialog}>Cancel</button>
                <button on:click={sendForm}>Ok</button>
            </footer>
        </form>
    </div>
</section>