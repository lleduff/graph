import React, { useState,  } from 'react';
import Map from "./Map";
import { v4 as uuidv4 } from 'uuid';


function initiateMap(length) {
    const newMap = Array(length);
    for (let i = 0; i < newMap.length; i++) {
        newMap[i] = {id:uuidv4(), active: true}
    }
    return newMap;
}

function App() {
    const [ map, setMap ] = useState(initiateMap(504))

    const [ lastClickedState, setLastClicked ] = useState(null);

    //called only on mouseDown
    function changeFirstNode(id) {
        const newMap = [...map];
        const node = newMap.find(node => node.id === id);
        setLastClicked(node.active);
        node.active = !node.active;
        setMap(newMap);
    }

    function changeNodeState(id) {
        const newMap = [...map];
        const node = newMap.find(node => node.id === id);
        if (node.active !== lastClickedState) {     //change only nodes which are in the same state that the first one clicked
            return;
        }
        node.active = !node.active;
        setMap(newMap);
    }

    function handleClear(e) {
        const newMap = [...map];
        newMap.map(node => node.active = true);
        setMap(newMap);
    }

    return (
        <>
            <div>
                <button onClick={handleClear}>clear</button>
            </div>
            <Map map={map} changeNodeState={changeNodeState} changeFirstNode={changeFirstNode}/>
        </>
    );
}

export default App;
