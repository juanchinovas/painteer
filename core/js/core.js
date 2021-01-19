

const core = (function () {
    let innerState = {
        fgColor: "#000000",
        bgColor: "#FFFFFF",
        chosenColors: ["#000000", "#ff0000", "#ff00ea", "#1e00ff", "#0091ff", "#00ffee", "#44ff00"],
        lineSize: 1,
        isErasing: false
    };

    const hexToRgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }
    
    function isDarkColor(hexColor) {
    
        const { r, g, b } = hexToRgb(hexColor)
    
        let colorArray = [r / 255, g / 255, b / 255].map(v => {
            if (v <= 0.03928) {
                return v / 12.92
            }
    
            return Math.pow((v + 0.055) / 1.055, 2.4)
        })
    
        const luminance = 0.2126 * colorArray[0] + 0.7152 * colorArray[1] + 0.0722 * colorArray[2]
    
        return luminance <= 0.179
    }
    
    function debounce(func, wait) {
        let timerId = null;
    
        return function debounced() {
            let context = this, args = arguments;
            let later = function() {
                // timerId = null;
                func.apply(context, args);
                clearTimeout(timerId);
            };
            clearTimeout(timerId);
            timerId = setTimeout(later, wait);
        }
    }

    function onColorFgChange(color) {
        markColorAsChosen(color);
        innerState.fgColor = color;
    }

    function onColorBgChange(color) {
        innerState.bgColor = color;
    }

    function markColorAsChosen(color) {
        const colorIndex = innerState.chosenColors.findIndex(c => c === color);
        if (colorIndex < 0 && innerState.chosenColors.length < 21) {
            innerState.chosenColors.push(color);
        }
    }

    function getMousePosition(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    function reduce(fn, element) {
        let found = false;
        if (fn && !found) {
            found = fn(element);
        }

        return found && element || reduce(fn, element.parentNode);
    }

    function formToObject(form) {
        const len = form.elements.length;
        const objForm = {};
        const name = (name) => name.split(/-|_/).map((n,i) => i ===0? n: n[0].toUpperCase()+n.substr(1)).join("");
        const value = (value) => (value==="" || isNaN(+value))? value: +value;
        for (let i = 0; i < len; i++) {
            const element = form.elements[i];
            // if (element.tagName === "BUTTON") continue;
            objForm[name(element.name || element.id)] = value(element.value);
        }

        return objForm;
    }

    function downloadDraw(event) {
        event.preventDefault();

        var aLink = document.querySelector('a#download');
        aLink.download = 'draw.png';
        aLink.href = canvas.toDataURL();
        aLink.click();

        return false;
    }

    function setCanvas(canvas, hideContextualMenu, contextMenu) {
        const ctx = canvas.getContext("2d");
        let onAction = false;

        onResizeCanvas();


        function mouseDown(event) {
            if (event.target !== canvas) return;

            hideContextualMenu();
            const mousePosition = getMousePosition(canvas, event);
            
            ctx.strokeStyle = (innerState.isErasing && innerState.bgColor) || innerState.fgColor;
            ctx.lineWidth = innerState.lineSize;

            ctx.beginPath();
            ctx.moveTo(mousePosition.x, mousePosition.y);

            onAction = true;
        };

        function mouseUp(event) {
            const mousePosition = getMousePosition(canvas, event);

            ctx.moveTo(mousePosition.x, mousePosition.y);
            ctx.closePath();

            onAction = false;
        };

        function mouseMove(event) {
            if (onAction) {
                const mousePosition = getMousePosition(canvas, event);
                ctx.lineTo(mousePosition.x, mousePosition.y);
                ctx.stroke();
            }
        };

        function setContentMenu(event) {
            event.preventDefault();

            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.classList.remove("hide");

        }

        function setCanvasBgColors() {
            const { offsetHeight, offsetWidth } = canvas;
            ctx.fillStyle = innerState.bgColor;
            ctx.fillRect(0, 0, offsetWidth, offsetHeight);
    
        }
    
        function addTextToCanvas(opcion) {
            ctx.font = `${opcion.textFontSize}px ${opcion.textFont}`;
            
            if (opcion.textStyle === "fill") {
                ctx.fillStyle = opcion.textColor;
                ctx.fillText(opcion.textField, opcion.textFontCoordinateX, opcion.textFontCoordinateY);
            } else {
                ctx.strokeStyle = opcion.textColor;
                ctx.strokeText(opcion.textField, opcion.textFontCoordinateX, opcion.textFontCoordinateY);
            }
        }
    
        function addImageToCanvas(opcion) {
            ctx.drawImage(opcion.img, opcion.imageCoordinateX, opcion.imageCoordinateY, +opcion.imgWidth, +opcion.imgHeight);
        }

        function onResizeCanvas() {
            const { width: parentWidth, height: parentHeight } = getComputedStyle(canvas.parentNode);
    
            canvas.width = parseFloat(parentWidth);
            canvas.height = parseFloat(parentHeight);

            console.log(parentWidth, parentHeight);
        }

        canvas.addEventListener("contextmenu", setContentMenu, false);

        return {
            mouseDown,
            mouseUp,
            mouseMove,
            setCanvasBgColors,
            addTextToCanvas,
            addImageToCanvas,
            onResizeCanvas,
            removeContextMenuListerner: () => canvas.removeEventListener("contextmenu", setContentMenu)/*,
            removeResizeListerner: () => document.removeEventListener("resize", onResize)*/
        }

    }

    return {
        onColorFgChange,
        onColorBgChange,
        getMousePosition,
        formToObject,
        debounce,
        isDarkColor,
        state: (state) => (!state && innerState) || (innerState = {...innerState, ...state}),
        reduce,
        downloadDraw,
        setCanvas
    }
})();


if (typeof module !== 'undefined' && module.exports) {
    module.exports = core;
} else {
    window.painteer = core;
}
