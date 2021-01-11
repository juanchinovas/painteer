
const hexToRgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null
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

const core = (function () {
    const innerState = {
        fgColor: "#000000",
        bgColor: "#FFFFFF",
        chosenColors: ["#000000"],
        lineSize: 1
    };

    function onColorFgChange(color) {
        markColorAsChosen(color);
        innerState.fgColor = color;
    }

    function onColorBgChange(color) {
        innerState.bgColor = color;
    }

    function markColorAsChosen(color) {
        const colorIndex = innerState.chosenColors.findIndex(c => c === color);
        if (colorIndex < 0/* && innerState.chosenColors.length < 20*/) {
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

    function formToObject(form) {
        const len = form.elements.length;
        const objForm = {};
        const name = (name) => name.split(/-|_/).map((n,i) => i ===0? n: n[0].toUpperCase()+n.substr(1)).join("");
        const value = (value) => (value==="" || isNaN(+value))? value: +value;
        for (let i = 0; i < len; i++) {
            const element = form.elements[i];
            if (element.tagName === "BUTTON") continue;
            objForm[name(element.name || element.id)] = value(element.value);
        }

        return objForm;
    }

    return {
        onColorFgChange,
        onColorBgChange,
        getMousePosition,
        formToObject,
        debounce,
        isDarkColor,
        state: () => innerState
    }
})();


if (typeof module !== 'undefined' && module.exports) {
    module.exports = core;
} else {
    window.painteer = core;
}
