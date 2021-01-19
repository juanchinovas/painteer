<template>
    <Fragment>
        <Header 
            :onBgChange="onBgChange"
        />
        <Canvas 
            :onAddImageOpenDialogListener="onAddImageOpenDialogListener"
            :onAddTextOpenDialogListener="onAddTextOpenDialogListener"
            :onCanvasReadyListener="setCanvasFns"
            :show="showAddTextDialog === true || showAddImageDialog === true"
            :class="{painting: !innerState.isErasing, erasing: innerState.isErasing}"
        />
        <TextDialog
            :canvasFns="canvasFns"
            :show="showAddTextDialog"
            :onDialogCloseListener="() => this.showAddTextDialog = false"
            :clickPosition="clickPosition"
        />
        <ImageDialog
            :canvasFns="canvasFns"
            :show="showAddImageDialog"
            :onDialogCloseListener="() => this.showAddImageDialog = false"
            :clickPosition="clickPosition"
        />
    </Fragment>
</template>

<script>

import painteer from "painteer/js/core";
import Header from "./components/Header.vue";
import Canvas from "./components/Canvas.vue";
import TextDialog from "./components/TextDialog.vue";
import ImageDialog from "./components/ImageDialog.vue";
import { Fragment } from 'vue-fragment';

export default {
    components: {
        Fragment,
        Header,
        Canvas,
        ImageDialog,
        TextDialog
    },
    data() {
        return {
            showAddTextDialog: false,
            showAddImageDialog: false,
            clickPosition: null,
            canvasFns: null,
            innerState: painteer.state()
        }
    },
    methods: {
        onAddTextOpenDialogListener(clickPosition) {
            this.showAddTextDialog = true;
            this.clickPosition = clickPosition;
        },
        onAddImageOpenDialogListener(clickPosition) {
            this.showAddImageDialog = true;
            this.clickPosition = clickPosition;
        },
        setCanvasFns(canvasOptions) {
            this.canvasFns = canvasOptions;
        },
        onBgChange() {
            this.canvasFns.canvasFns.setCanvasBgColors();
        }
    }
};
</script>