<template>
  <main aria-label="Painting area">
    <canvas ref="refCanvas" id="canvas"></canvas>
    <!-- contextual menu --> 
    <div ref="refContextualMenu" id="contextual-menu" class='hide' aria-hidden="true">
        <ul>
            <li id="add-text" @click="onAddText">
                <i class="fa fa-font"></i>Text
            </li>
            <li id="add-img"
                @click="onAddImg">
                <i class="far fa-image"></i>Image
            </li>
        </ul>
    </div>
  </main>
</template>
<script>

import painteer from "painteer/js/core";

export default {
    props: {
        onAddTextOpenDialogListener: Function,
        onAddImageOpenDialogListener: Function,
        onCanvasReadyListener: Function
    },
    data() {
        return {
            canvasFns: null
        };
    },
    mounted() {
        if (this.$refs.refCanvas) {
            this.canvasFns = painteer.setCanvas(this.$refs.refCanvas, this.closeContextualMenu, this.$refs.refContextualMenu);

            document.addEventListener("mousedown",  this.canvasFns.mouseDown,   false);
            document.addEventListener("mouseup",    this.canvasFns.mouseUp,     false);
            document.addEventListener("mousemove",  this.canvasFns.mouseMove,   false);

            this.onCanvasReadyListener({
                canvasFns: this.canvasFns,
                canvas: this.refCanvas
            });
            
        }
    },
    beforeDestroy() {
        this.canvasFns.removeContextMenuListerner();
        document.removeEventListener("mousedown",   this.canvasFns.mouseDown,   false);
        document.removeEventListener("mouseup",     this.canvasFns.mouseUp,     false);
        document.removeEventListener("mousemove",   this.canvasFns.mouseMove,   false);
    },
    methods: {
        closeContextualMenu() {
            this.$refs.refContextualMenu.classList.add("hide")
        },
        onAddText(event) {
            const position = painteer.getMousePosition(this.$refs.refCanvas, event);
            this.onAddTextOpenDialogListener(position);
            this.closeContextualMenu();
        },
        onAddImg(event) {
            const position = painteer.getMousePosition(this.$refs.refCanvas, event);
            this.onAddImageOpenDialogListener(position);
            this.closeContextualMenu();
        }
    }
}
</script>