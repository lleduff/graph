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

    const [ currentNodeState, setCurrent ] = useState(null);

    //called only on mouseDown
    function changeFirstNode(id) {
        const node = map.find(node => node.id === id);
        setCurrent(node.active);
        changeNodeState(node.id, node);
    }

    function changeNodeState(id, node=null) {
        const newMap = [...map];
        if (node === null) {
            node = newMap.find(node => node.id === id);
            if (node.active !== currentNodeState) {     //change only nodes which are in the same state that the first one clicked
                return;
            }
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
