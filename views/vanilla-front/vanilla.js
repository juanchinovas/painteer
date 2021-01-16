
window.onload = function () {
    const painteer = window.painteer;

    const canvas = document.querySelector(`#canvas`);
    const canvasFns = painteer.setCanvas(canvas, hideContextualMenu, document.querySelector("#contextual-menu"));

    document.addEventListener("mousedown", canvasFns.mouseDown, false);
    document.addEventListener("mouseup", canvasFns.mouseUp, false);
    document.addEventListener("mousemove", canvasFns.mouseMove, false);
    
    document.addEventListener("touchstart", canvasFns.mouseDown, false);
    document.addEventListener("touchend", canvasFns.mouseUp, false);
    document.addEventListener("touchmove", canvasFns.mouseMove, false);
    

    // window.addEventListener("resize", canvasFns.onResizeCanvas, false);

    const fgColorPicker = document.querySelector("#fg-color-picker");
    fgColorPicker.value = painteer.state().fgColor;
    changeColor({ target: fgColorPicker }, fgColorPicker.parentNode, painteer.onColorFgChange);

    const triggerFunc = painteer.debounce((event) => {
        changeColor(event, fgColorPicker.parentNode, painteer.onColorFgChange);
        setChosenColors(painteer.state().chosenColors);
    }, 250);
    fgColorPicker.addEventListener("input", triggerFunc, false);

    const bgColorPicker = document.querySelector("#bg-color-picker");
    bgColorPicker.value = painteer.state().bgColor;
    changeColor({ target: bgColorPicker }, bgColorPicker.parentNode, painteer.onColorBgChange);
    bgColorPicker.addEventListener("input", (event) => {
        changeColor(event, bgColorPicker.parentNode, painteer.onColorBgChange);
    }, false);


    setChosenColors(painteer.state().chosenColors);

    document.querySelector("form#dialog-form-add-text").onsubmit = function (event) {
        event.preventDefault();

        const form = painteer.formToObject(event.target);
        canvasFns.addTextToCanvas(form);

        const parent = painteer.reduce(function(el) {
            return el.getAttribute("role") ==='dialog';
        }, this.parentElement);

        parent.classList.add("hide");

        return false;
    };

    document.querySelector("form#dialog-form-add-image").onsubmit = function (event) {
        event.preventDefault();

        const form = painteer.formToObject(event.target);
        form.img = this.querySelector("img#img-selected");
        form.img.width = +form.imgWidth;
        form.img.height = +form.imgHeight;

        canvasFns.addImageToCanvas(form);

        const parent = painteer.reduce(function(el) {
            return el.getAttribute("role") ==='dialog';
        }, this.parentElement);

        parent.classList.add("hide");

        return false;
    };

    document.querySelector("#contextual-menu ul li#add-text").
        addEventListener("click", (event) => {
            event.preventDefault();

            const dialog = document.querySelector("#text-add-dialog");
            const mousePosition = painteer.getMousePosition(canvas, event);

            dialog.querySelector("#text-font-coordinate-x").value = mousePosition.x;
            dialog.querySelector("#text-font-coordinate-y").value = mousePosition.y;

            dialog.classList.remove("hide");
            hideContextualMenu();

            return false;
        }, false);

    document.querySelector("#contextual-menu ul li#add-img").
        addEventListener("click", (event) => {
            event.preventDefault();

            const dialog = document.querySelector("#image-add-dialog");
            const mousePosition = painteer.getMousePosition(canvas, event);

            dialog.querySelector("#image-coordinate-x").value = mousePosition.x;
            dialog.querySelector("#image-coordinate-y").value = mousePosition.y;

            dialog.querySelector("#img-width").value = 100;
            dialog.querySelector("#img-height").value = 100;

            dialog.querySelector("#image-field")
            .addEventListener('change', function(event) {
                let file = event.target.files[0];

                let reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function() {
                    dialog.querySelector("#img-selected").src = reader.result;
                };
            }, false);

            dialog.classList.remove("hide");
            hideContextualMenu();

            return false;
        }, false);

    document.querySelectorAll("#text-add-dialog #btn-close, #image-add-dialog #btn-close").
    forEach(el => el.addEventListener("click", closeDialog , false));

    const sizes = document.querySelector("#size-container #size__options-lst");
    sizes.addEventListener("click", function (event) {
        event.preventDefault();

        painteer.state().lineSize = +event.target.textContent;
        this.parentNode.querySelector("#size__label").textContent = painteer.state().lineSize;

        return false;
    }, false);

    const eraser = document.querySelector("#eraser-container");
    eraser.addEventListener("click", function (event) {
        event.preventDefault();

        if (this.classList.contains("active")) {
            this.classList.remove("active");
            painteer.state().isErasing = false;

            return;
        }

        this.classList.add("active");
        painteer.state().isErasing = true;
        return false;
    }, false);

    const download = document.querySelector("#image-container");
    download.addEventListener("click", painteer.downloadDraw, false);

    function changeColor(event, parentPicker, fn) {
        parentPicker.style.backgroundColor = event.target.value;
        parentPicker.style.color = painteer.isDarkColor(event.target.value) ? "white" : "black";
        fn && fn(event.target.value);

        if (fn === painteer.onColorBgChange) {
            canvasFns.setCanvasBgColors(event.target.value);
        }
    }

    function setChosenColors(chosenColors) {
        const chosenColor = document.querySelector(`.color-picker-chosen #lst-color-chosen`);
        for (let i = 0, len = chosenColors.length; i < len; i++) {
            const span = chosenColor.querySelector(`#chosen-${i}`) || document.createElement("span");
            span.id = `chosen-${i}`;
            span.role = `button`;
            span.setAttribute("data-color", chosenColors[i]);
            span.setAttribute("title", chosenColors[i]);
            span.setAttribute("aria-lable", `Color ${chosenColors[i]}`);
            span.setAttribute("tabindex", i);
            span.style.backgroundColor = chosenColors[i];

            if (!chosenColor.querySelector(`#chosen-${i}`)) {
                span.addEventListener("click", (event) => {
                    painteer.onColorFgChange(event.target.dataset.color);
                    changeColor({ 
                        target: { 
                            value: event.target.dataset.color
                        } 
                    }, fgColorPicker.parentNode, painteer.onColorFgChange);
                }, false);

                const li = document.createElement("li");
                li.id = `li-chosen-${i}`;
                li.appendChild(span);
                chosenColor.appendChild(li);

            }
        }
    }

    function closeDialog(event) {
        event.preventDefault();
        
        const parent = painteer.reduce(function(el) {
            return el.getAttribute("role") ==='dialog';
        }, event.target.parentNode);

        parent.classList.add("hide");
        
        return false;
    }

    function hideContextualMenu() {
        document.querySelector("#contextual-menu").classList.add("hide");
    }

}
