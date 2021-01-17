import React from "react";

import Header from "./components/header-component";
import Canvas from "./components/canvas-component";
import AddTextDialog from "./components/add-text-dialog-component";
import AddImageDialog from "./components/add-image-dialog-component";

function App() {

  const [canvasFns, setCanvasFns] = React.useState({});
  const [showAddTextDialog, setShowAddTextDialog] = React.useState(false);
  const [showAddImageDialog, setShowAddImageDialog] = React.useState(false);
  const [clickPosition, setClickPosition] = React.useState({});

  function onAddTextOpenDialogListener(clickPosition) {
    setShowAddTextDialog(true);
    setClickPosition(clickPosition);
  }
  function onAddImageOpenDialogListener(clickPosition) {
    setShowAddImageDialog(true);
    setClickPosition(clickPosition);
  }


  return (
    <>
      <Header></Header>
      <Canvas
        onAddImageOpenDialogListener={onAddImageOpenDialogListener}
        onAddTextOpenDialogListener={onAddTextOpenDialogListener}
        onCanvasReadyListener={setCanvasFns}
        show={showAddTextDialog === true || showAddImageDialog === true}></Canvas>
      <AddTextDialog
        canvasFns={canvasFns}
        show={showAddTextDialog}
        onDialogCloseListener={() => setShowAddTextDialog(false)}
        clickPosition={clickPosition}
      ></AddTextDialog>
      <AddImageDialog
        canvasFns={canvasFns}
        show={showAddImageDialog}
        onDialogCloseListener={() => setShowAddImageDialog(false)}
        clickPosition={clickPosition}
      ></AddImageDialog>
    </>
  );
}

export default App;
