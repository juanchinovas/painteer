import React from "react";
import painteer from "painteer/js/core";

function closeDialog(event) {
    event.preventDefault();
    
    const parent = painteer.reduce(function(el) {
        return el.getAttribute("role") ==='dialog';
    }, event.target.parentNode);

    parent.classList.add("hide");
    parent.classList.remove("show");
    
    return false;
}


function AddTextDialog(props) {

    function sendForm(event) {
        event.preventDefault();

        const parent = painteer.reduce(function(el) {
            return el.tagName ==='FORM';
        }, event.target.parentNode);

        const form = painteer.formToObject(parent);
        props.canvasFns.canvasFns.addTextToCanvas(form);

        closeDialog(event);

        props.onDialogCloseListener && props.onDialogCloseListener();

        return false;
    }
    //  className={(props.show && 'show') || 'hide'} aria-hidden={props.show?false:true}
    return (
        <section id="text-add-dialog" className={(props.show && 'show') || 'hide'} role="dialog" aria-hidden={props.show?false:true}>
            <header>
                <h1>Add text</h1>
                <i aria-label="Close" role="button" id="btn-close" onClick={closeDialog}>&times;</i>
            </header>
            <div>
                <form id="dialog-form-add-text" method="POST">
                    <div className="input-container flex-column">
                        <label htmlFor="text-field">Text</label>
                        <input type="text" name="text-field" id="text-field" required/>
                    </div>
                    <div className="input-container flex-column">
                        <label htmlFor="text-font">Fonts</label>
                        <select name="text-font" id="text-font" required>
                            <option value="Arial">Arial</option>
                            <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                            <option value="Arial Narrow">Arial Narrow</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Times">Times</option>
                            <option value="Arial Narrow Bold">Arial Narrow Bold</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Segoe UI">Segoe UI</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Geneva">Geneva</option>
                            <option value="Verdana">Verdana</option>
                            <option value="sans-serif">sans-serif</option>
                            <option value="serif">serif</option>
                            <option value="Impact">Impact</option>
                            <option value="Haettenschweiler">Haettenschweiler</option>
                            <option value="fantasy">fantasy</option>
                        </select>
                    </div>
                    <div className="input-container flex-column">
                        <label htmlFor="text-font-size">Font size</label>
                        <select name="text-font-size" id="text-font-size" required>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="12" selected={true}>12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="22">22</option>
                            <option value="24">24</option>
                            <option value="26">26</option>
                            <option value="28">28</option>
                            <option value="30">30</option>
                            <option value="32">32</option>
                            <option value="34">34</option>
                            <option value="36">36</option>
                            <option value="38">38</option>
                            <option value="40">40</option>
                            <option value="42">42</option>
                            <option value="44">44</option>
                            <option value="46">46</option>
                            <option value="48">48</option>
                            <option value="50">50</option>
                            <option value="52">52</option>
                            <option value="54">54</option>
                            <option value="56">56</option>
                            <option value="58">58</option>
                            <option value="60">60</option>
                            <option value="62">62</option>
                            <option value="64">64</option>
                            <option value="66">66</option>
                            <option value="68">68</option>
                            <option value="70">70</option>
                            <option value="72">72</option>
                        </select>
                    </div>
                    <div className="input-container flex-column">
                        <label htmlFor="text-style">Style</label>
                        <select name="text-style" id="text-style" required>
                            <option value="fill">Fill</option>
                            <option value="stroke">Stroke</option>
                        </select>
                    </div>
                    <div className="input-container flex-column">
                        <label htmlFor="text-color">Color</label>
                        <input type="color" name="text-color" id="text-color" required/>
                    </div>
                    <div className="input-container flex-column">
                        <label aria-label="Set the text coodinate">Coordinate</label>
                        <div className="input-container flex-row">
                            <input type="number" 
                                name="text-font-coordinate-x" 
                                id="text-font-coordinate-x" 
                                required pattern="\d+(\.\d)*" disabled
                                defaultValue={props.clickPosition && props.clickPosition.x}/>
                            <input type="number" 
                                name="text-font-coordinate-y" 
                                id="text-font-coordinate-y" 
                                required pattern="\d+(\.\d)*" disabled
                                defaultValue={props.clickPosition && props.clickPosition.y}/>
                        </div>
                    </div>
                    <footer className="flex-row">
                        <button type="button" onClick={closeDialog}>Cancel</button>
                        <button onClick={sendForm}>Ok</button>
                    </footer>
                </form>
            </div>
        </section>
    );
}

export default AddTextDialog;