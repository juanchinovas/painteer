<template>
    <header class="page-header bg-grey">
        <h3 id="app-name">Painteer</h3>
        <input type="checkbox" id="menu_check" />
        <nav class="container-grid" id="princiapl_nav">
            <ul>
                <li>
                    <div class="-flex -grap-1-2-rem -flex-align-items-center">
                        <div :class="[state.isErasing? 'square-container -dashed-border active': 'square-container -dashed-border']"
                        id="eraser-container" role="button" tabIndex="0"
                        @click="setErase">
                            <span id="size__label">
                                <i class="fa fa-eraser"></i>
                            </span>
                            <label for="eraser-container" aria-label="Eraser">Eraser</label>
                        </div>
                        <div class="square-container -over-hidden" id="bg-container" role="button" tabIndex="1"
                            :style="colorBgOnChange">
                            <span id="size__label">
                                <i class="fas fa-fill-drip"></i>
                            </span>
                            <label for="bg-container" aria-label="Background color">Bg color</label>
                            <input type="color" name="bg-color-picker" id="bg-color-picker" 
                                @input="changeBgColor"
                                :value="state.bgColor"/>
                        </div>
                        <div class="square-container -dashed-border" id="size-container" role="button" tabIndex="2">
                            <span id="size__label">{{state.lineSize}}</span>
                            <label for="size-container" aria-label="Brush size">Size</label>
                            <div id="size__options-lst" class="options hide"
                            @click="changeSize">
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
                        <div class="square-container -over-hidden" id="fg-container" role="button" tabIndex="3"
                            :style="colorFgOnChange">
                            <span id="size__label">
                                <i class="fas fa-paint-brush"></i>
                            </span>
                            <label for="fg-color-picker">Color</label>
                            <input type="color" name="fg-color-picker" id="fg-color-picker" 
                            @input="debounceFgColor"
                            :value="state.fgColor" />
                        </div>
                        <div class="color-picker-chosen">
                            <ul id="lst-color-chosen">
                                <li v-for="(color, index) in state.chosenColors" :key="index + 1">
                                    <span
                                        :id="`chosen-${index}`"
                                        row="button"
                                        :data-color="color"
                                        :title="color"
                                        :aria-label="`Color ${color}`"
                                        :tabIndex="index + 4"
                                        :style="{backgroundColor: color}"
                                        @click="changeFgColor"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li id="last-li">
                    <div class="-flex -grap-1-2-rem ">
                        <div class="square-container active" id="image-container"
                        @click="downloadDraw">
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
</template>

<script>
import painteer from "painteer/js/core";

export default {
    props: ["onBgChange"],
  data() {
    return {
        state: painteer.state(),
        debounceFgColor: painteer.debounce((event) => {
            painteer.onColorFgChange(event.target.value);
        }, 250)
    };
  },
  methods: {
    changeFgColor(event) {
        this.state.fgColor = event.target.dataset.color;
        painteer.state(this.state);
    },
    changeSize(event) {
        event.preventDefault();
        this.state.lineSize = +event.target.textContent;
        painteer.state(this.state);
    },
    changeBgColor(event) {
        this.state.bgColor = event.target.value;
        painteer.state(this.state);
        this.onBgChange && this.onBgChange();
    },
    setErase() {
        this.state.isErasing = !this.state.isErasing; 
        painteer.state(this.state);
    },
    downloadDraw(event) {
        painteer.downloadDraw(event);
    }
  },
  computed: {
    colorFgOnChange() {
        return {
            backgroundColor: this.state.fgColor,
            color: painteer.isDarkColor(this.state.fgColor) ? 'white' : 'black'
        }
    },
    colorBgOnChange() {
        return {
            backgroundColor: this.state.bgColor,
            color: painteer.isDarkColor(this.state.bgColor) ? 'white' : 'black'
        }
    }
  }
};
</script>