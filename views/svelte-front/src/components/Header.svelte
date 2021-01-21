<script>
	import { createEventDispatcher } from 'svelte';
    import painteer from "painteer/js/core";

    let state = painteer.state();
	const dispatch = createEventDispatcher();

    const debounceFgColor = painteer.debounce((event) => {
        painteer.onColorFgChange(event.target.value);
    }, 250);

    function changeFgColor(event) {
        state.fgColor = event.target.dataset.color;
        painteer.state(state);
    };
    function changeSize(event) {
        event.preventDefault();
        state.lineSize = +event.target.textContent;
        painteer.state(state);
    };
    function changeBgColor(event) {
        state.bgColor = event.target.value;
        painteer.state(state);
        dispatch('onBgChange')
        // this.onBgChange && this.onBgChange();
    };
    function setErase() {
        state.isErasing = !state.isErasing; 
        painteer.state(state);
    };
    function downloadDraw(event) {
        painteer.downloadDraw(event);
    }

</script>

<header class="page-header bg-grey">
    <h3 id="app-name">Painteer</h3>
    <input type="checkbox" id="menu_check" />
    <nav class="container-grid" id="princiapl_nav">
        <ul>
            <li>
                <div class="-flex -grap-1-2-rem -flex-align-items-center">
                    <div 
                        class:square-container="{!state.isErasing || state.isErasing}"
                        class:-dashed-border="{!state.isErasing}"
                        class:active="{state.isErasing}"
                    id="eraser-container" role="button" tabindex={0}
                    on:click={setErase}>
                        <span id="size__label">
                            <i class="fa fa-eraser"></i>
                        </span>
                        <label for="eraser-container" aria-label="Eraser">Eraser</label>
                    </div>
                    <div class="square-container -over-hidden" id="bg-container" role="button" tabindex={1}
                        style="background-color: {state.bgColor}; color: {painteer.isDarkColor(state.bgColor) ? 'white' : 'black'}">
                        <span id="size__label">
                            <i class="fas fa-fill-drip"></i>
                        </span>
                        <label for="bg-container" aria-label="Background color">Bg color</label>
                        <input type="color" name="bg-color-picker" id="bg-color-picker" 
                            on:input={changeBgColor}
                            :value="state.bgColor"/>
                    </div>
                    <div class="square-container -dashed-border" id="size-container" role="button" tabindex={2}>
                        <span id="size__label">{state.lineSize}</span>
                        <label for="size-container" aria-label="Brush size">Size</label>
                        <div id="size__options-lst" class="options hide"
                        on:click={changeSize}>
                            <span data-value="1">1</span>
                            <span data-value="2">2</span>
                            <span data-value="4">4</span>
                            <span data-value="6">6</span>
                            <span data-value="8">8</span>
                            <span data-value="10">10</span>
                            <span data-value="12">12</span>
                            <span data-value="14">14</span>
                            <span data-value="16">16</span>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="-flex -grap-1-2-rem -flex-align-items-center">
                    <div class="square-container -over-hidden" id="fg-container" role="button" tabindex={3}
                        style="background-color: {state.fgColor}; color: {painteer.isDarkColor(state.fgColor) ? 'white' : 'black'}">
                        <span id="size__label">
                            <i class="fas fa-paint-brush"></i>
                        </span>
                        <label for="fg-color-picker">Color</label>
                        <input type="color" name="fg-color-picker" id="fg-color-picker" 
                        on:input={debounceFgColor}
                        value={state.fgColor} />
                    </div>
                    <div class="color-picker-chosen">
                        <ul id="lst-color-chosen">
                            {#each state.chosenColors as color, index }
                                <li>
                                    <span
                                        id="chosen-{index}"
                                        row="button"
                                        data-color={color}
                                        title={color}
                                        aria-label="Color {color}"
                                        tabIndex="{index + 4}"
                                        style="background-color: {color}"
                                        on:click={changeFgColor}></span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </li>
            <li id="last-li">
                <div class="-flex -grap-1-2-rem ">
                    <div class="square-container active" id="image-container"
                    on:click={downloadDraw}>
                        <span>
                            <i class="fa fa-download"></i>
                        </span>
                        <label for="image-container" aria-label="Eraser">Image</label>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
    <label for="menu_check" class="nav-toggle-label" role="button">
        <span></span>
    </label>
</header>