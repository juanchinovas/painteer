import React from "react";
import painteer from "painteer/js/core";


function Header() {

    const [state, setState] = React.useState(painteer.state());

    const refFg = React.useRef();

    const triggerFunc = painteer.debounce((event) => {
        painteer.onColorFgChange(event.target.value)
        setState({...state, ...painteer.state()});
        painteer.state(state);
    }, 250);

    return (<header className="page-header bg-grey">
            <h3 id="app-name">Painteer</h3>
            <input type="checkbox" id="menu_check" />
            <nav className="container-grid" id="princiapl_nav">
                <ul>
                    <li>
                        <div className="-flex -grap-1-2-rem -flex-align-items-center">
                            <div className={`square-container -dashed-border ${(state.isErasing && 'active') || ''}`} id="eraser-container" role="button" tabIndex="0"
                            onClick={()=> {
                                state.isErasing = !state.isErasing;
                                setState({...state});
                                painteer.state(state);
                            }}>
                                <span id="size__label">
                                    <i className="fa fa-eraser"></i>
                                </span>
                                <label htmlFor="eraser-container" aria-label="Eraser">Eraser</label>
                            </div>
                            <div className="square-container -over-hidden" id="bg-container" role="button" tabIndex="1"
                                style={{
                                    backgroundColor: state.bgColor,
                                    color: (painteer.isDarkColor(state.bgColor) ? "white" : "black")
                                }}>
                                <span id="size__label">
                                    <i className="fas fa-fill-drip"></i>
                                </span>
                                <label htmlFor="bg-container" aria-label="Background color">Bg color</label>
                                <input type="color" name="bg-color-picker" id="bg-color-picker" 
                                    onChange= {(event)=> {
                                        state.bgColor = event.target.value;
                                        setState({...state});
                                        painteer.state(state);
                                }}/>
                            </div>
                            <div className="square-container -dashed-border" id="size-container" role="button" tabIndex="2">
                                <span id="size__label">{state.lineSize}</span>
                                <label htmlFor="size-container" aria-label="Brush size">Size</label>
                                <div id="size__options-lst" className="options hide"
                                onClick={(event) => {
                                    event.preventDefault();
                                    state.lineSize = +event.target.textContent;
                                    setState({...state});
                                    painteer.state(state);
                                }}>
                                    <span data-value="1">1</span>
                                    <span data-value="2">2</span>
                                    <span data-value="4">4</span>
                                    <span data-value="6">6</span>
                                    <span data-value="8">8</span>
                                    <span data-value="10">10</span>
                                    <span data-value="12">12</span>
                                    <span data-value="14">14</span>
                                    <span data-value="16">16</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="-flex -grap-1-2-rem -flex-align-items-center">
                            <div ref={refFg} className="square-container -over-hidden" id="fg-container" role="button" tabIndex="3"
                                style={{
                                    backgroundColor: state.fgColor,
                                    color: (painteer.isDarkColor(state.fgColor) ? "white" : "black")
                                }}>
                                <span id="size__label">
                                    <i className="fas fa-paint-brush"></i>
                                </span>
                                <label htmlFor="fg-color-picker">Color</label>
                                <input type="color" name="fg-color-picker" id="fg-color-picker" 
                                onChange= {triggerFunc} />
                            </div>
                            <div className="color-picker-chosen">
                                <ul id="lst-color-chosen">
                                    {state.chosenColors.map((c, i)=> (
                                        <li key={i+1}>
                                            <span
                                                id={`chosen-${i}`}
                                                row="button"
                                                data-color={c}
                                                title={c}
                                                aria-label={`Color ${c}`}
                                                tabIndex={i + 4}
                                                style={{backgroundColor: `${c}`}}
                                                onClick={(event)=>{
                                                    state.fgColor = event.target.dataset.color;
                                                    setState({...state});
                                                    painteer.state(state);
                                                }}
                                            ></span>
                                        </li>)
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li id="last-li">
                        <div className="-flex -grap-1-2-rem ">
                            <div className="square-container active" id="image-container"
                            onClick={painteer.downloadDraw}>
                                <span>
                                    <i className="fa fa-download"></i>
                                </span>
                                <label htmlFor="image-container" aria-label="Eraser">Image</label>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            <label htmlFor="menu_check" className="nav-toggle-label" role="button">
                <span></span>
            </label>
        </header>);
}

export default Header;