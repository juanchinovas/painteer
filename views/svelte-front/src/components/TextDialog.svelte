<script>
    import { createEventDispatcher } from "svelte";
    import painteer from "painteer/js/core";

    export let clickPosition, canvasFns, show;

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

</script>


<section id="text-add-dialog" class:hide={!show} role="dialog" aria-hidden={show?false:true}>
    <header>
        <h1>Add text</h1>
        <i aria-label="Close" role="button" id="btn-close" on:click={closeDialog}>&times;</i>
    </header>
    <div>
        <form id="dialog-form-add-text" method="POST">
            <div class="input-container flex-column">
                <label for="text-field">Text</label>
                <input type="text" name="text-field" id="text-field" required/>
            </div>
            <div class="input-container flex-column">
                <label for="text-font">Fonts</label>
                <select name="text-font" id="text-font" required>
                    <option value="Arial">Arial</option>
                    <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                    <option value="Arial Narrow">Arial Narrow</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Times">Times</option>
                    <option value="Arial Narrow Bold">Arial Narrow Bold</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                    <option value="sans-serif">sans-serif</option>
                    <option value="serif">serif</option>
                    <option value="Impact">Impact</option>
                    <option value="Haettenschweiler">Haettenschweiler</option>
                    <option value="fantasy">fantasy</option>
                </select>
            </div>
            <div class="input-container flex-column">
                <label for="text-font-size">Font size</label>
                <select name="text-font-size" id="text-font-size" required>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12" selected>12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">24</option>
                    <option value="26">26</option>
                    <option value="28">28</option>
                    <option value="30">30</option>
                    <option value="32">32</option>
                    <option value="34">34</option>
                    <option value="36">36</option>
                    <option value="38">38</option>
                    <option value="40">40</option>
                    <option value="42">42</option>
                    <option value="44">44</option>
                    <option value="46">46</option>
                    <option value="48">48</option>
                    <option value="50">50</option>
                    <option value="52">52</option>
                    <option value="54">54</option>
                    <option value="56">56</option>
                    <option value="58">58</option>
                    <option value="60">60</option>
                    <option value="62">62</option>
                    <option value="64">64</option>
                    <option value="66">66</option>
                    <option value="68">68</option>
                    <option value="70">70</option>
                    <option value="72">72</option>
                </select>
            </div>
            <div class="input-container flex-column">
                <label for="text-style">Style</label>
                <select name="text-style" id="text-style" required>
                    <option value="fill">Fill</option>
                    <option value="stroke">Stroke</option>
                </select>
            </div>
            <div class="input-container flex-column">
                <label for="text-color">Color</label>
                <input type="color" name="text-color" id="text-color" required/>
            </div>
            <div class="input-container flex-column">
                <label for="postion-container" aria-label="Set the text coodinate">Coordinate</label>
                <div class="input-container flex-row" id="postion-container">
                    <input type="number" 
                        name="text-font-coordinate-x" 
                        id="text-font-coordinate-x" 
                        required
                        pattern="\d+(\.\d)*" disabled
                        value={clickPosition && clickPosition.x}/>
                    <input type="number" 
                        name="text-font-coordinate-y" 
                        id="text-font-coordinate-y" 
                        required
                        pattern="\d+(\.\d)*" disabled
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