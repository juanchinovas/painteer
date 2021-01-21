<script>
	import Header from "./components/Header.svelte";
	import Canvas from "./components/Canvas.svelte";
	import TextDialog from "./components/TextDialog.svelte";
	import ImageDialog from "./components/ImageDialog.svelte";

	let showAddTextDialog, showAddImageDialog, clickPosition, canvasFns;

	$:showADialog = showAddTextDialog === true || showAddImageDialog === true;

	function onBgChange() {
		canvasFns.canvasFns.setCanvasBgColors();
	}

	function onAddTextOpenDialogListener({detail}) {
		showAddTextDialog = true;
		clickPosition = detail;
        console.log(clickPosition);
	}

	function onAddImageOpenDialogListener({detail}) {
		showAddImageDialog = true;
		clickPosition = detail;
	}

	function setCanvasFns({detail}) {
		canvasFns = detail;
	}
</script>

<Header 
	on:onBgChange={onBgChange} 
/>
<Canvas 
	on:onAddImageOpenDialogListener={onAddImageOpenDialogListener}
	on:onAddTextOpenDialogListener={onAddTextOpenDialogListener}
	on:onCanvasReadyListener={setCanvasFns}
/>
<TextDialog 
	canvasFns={canvasFns}
	show={showAddTextDialog}
	clickPosition={clickPosition}
	on:onDialogCloseListener={() => showAddTextDialog = false}
/>
<ImageDialog 
	canvasFns={canvasFns}
	show={showAddImageDialog}
	clickPosition={clickPosition}
	on:onDialogCloseListener={() => showAddImageDialog = false}
/>

<footer>
	<a id="download" download aria-hidden="true">d</a>
</footer>
