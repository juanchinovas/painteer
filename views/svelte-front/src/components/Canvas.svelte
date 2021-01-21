<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import painteer from "painteer/js/core";

    let refCanvas;
    let refContextualMenu;
    let canvasFns;

    

    const addTextOpenDialogDispatcher = createEventDispatcher();
    const addImageOpenDialogDispatcher = createEventDispatcher();
    const onCanvasReadyDispatcher = createEventDispatcher();

    onMount(() => {
        if (refCanvas) {
            canvasFns = painteer.setCanvas(
                refCanvas,
                closeContextualMenu,
                refContextualMenu
            );

            document.addEventListener("mousedown", canvasFns.mouseDown, false);
            document.addEventListener("mouseup", canvasFns.mouseUp, false);
            document.addEventListener("mousemove", canvasFns.mouseMove, false);

            onCanvasReadyDispatcher("onCanvasReadyListener", {
                canvasFns,
                canvas: refCanvas,
            });
        }
    });

    onDestroy(() => {
        canvasFns.removeContextMenuListerner();
        document.removeEventListener("mousedown", canvasFns.mouseDown, false);
        document.removeEventListener("mouseup", canvasFns.mouseUp, false);
        document.removeEventListener("mousemove", canvasFns.mouseMove, false);
    });

    function closeContextualMenu() {
        refContextualMenu.classList.add("hide");
    }

    function onAddText(event) {
        const position = painteer.getMousePosition(refCanvas, event);
        addTextOpenDialogDispatcher('onAddTextOpenDialogListener', position);
        closeContextualMenu();
    }

    function onAddImg(event) {
        const position = painteer.getMousePosition(refCanvas, event);
        addImageOpenDialogDispatcher('onAddImageOpenDialogListener', position);
        closeContextualMenu();
    }
</script>

<main aria-label="Painting area">
    <canvas bind:this={refCanvas} id="canvas" />
    <!-- contextual menu -->
    <div
        bind:this={refContextualMenu}
        id="contextual-menu"
        class="hide"
        aria-hidden="true"
    >
        <ul>
            <li id="add-text" on:click={onAddText}>
                <i class="fa fa-font" />Text
            </li>
            <li id="add-img" on:click={onAddImg}>
                <i class="far fa-image" />Image
            </li>
        </ul>
    </div>
</main>
