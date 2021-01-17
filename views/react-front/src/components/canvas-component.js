import React from "react";
import painteer from "painteer/js/core";

function Canvas({onCanvasReadyListener, ...props}) {
    const refCanvas = React.useRef();
    const refContextualMenu = React.useRef();

    React.useEffect(() => {
        let canvasFns = null;

        if (refCanvas.current) {
            canvasFns = painteer.setCanvas(refCanvas.current, closeContextualMenu, refContextualMenu.current);

            document.addEventListener("mousedown", canvasFns.mouseDown, false);
            document.addEventListener("mouseup", canvasFns.mouseUp, false);
            document.addEventListener("mousemove", canvasFns.mouseMove, false);

            onCanvasReadyListener({
                canvasFns, canvas: refCanvas.current
            });
            
        }

        return () => {
            canvasFns.removeContextMenuListerner();
            document.removeEventListener("mousedown", canvasFns.mouseDown, false);
            document.removeEventListener("mouseup", canvasFns.mouseUp, false);
            document.removeEventListener("mousemove", canvasFns.mouseMove, false);

            canvasFns = null;
        }

    }, [refCanvas, refContextualMenu, onCanvasReadyListener]);

    function closeContextualMenu() {
        refContextualMenu.current.classList.add("hide");
    }

    return (
        <>
            <main aria-label="Painting area">
                <canvas ref={refCanvas} id="canvas"></canvas>
            </main>
            {/* <!-- contextual menu --> */}
            <div ref={refContextualMenu} id="contextual-menu" className='hide' aria-hidden={true}>
                <ul>
                    <li id="add-text" onClick={(event)=> {
                        const position = painteer.getMousePosition(refCanvas.current, event);
                        props.onAddTextOpenDialogListener(position);
                        closeContextualMenu();
                    }}>
                        <i className="fa fa-font"></i>Text
                    </li>
                    <li id="add-img"
                     onClick={(event)=> {
                        const position = painteer.getMousePosition(refCanvas.current, event);
                        props.onAddImageOpenDialogListener(position);
                        closeContextualMenu();
                    }}>
                        <i className="far fa-image"></i>Image
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Canvas;