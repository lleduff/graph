import React, { useState } from 'react';
import Map from "./Map";
import { v4 as uuidv4 } from 'uuid';

const WIDTH = 30;
const HEIGHT = 17;

function initiateMap(length) {
    const newMap = Array(length);
    for (let i = 0; i < newMap.length; i++) {
        newMap[i] = {id:uuidv4(), active: true}
    }
    return newMap;
}

function initiateAdjacent(map) {
    const adjacent = map.map(node => node.active && node.id);
    console.log(adjacent)
    return adjacent;
 }

function App() {
    const [ map, setMap ] = useState(initiateMap(WIDTH * HEIGHT));
    const [ lastFirstSelectedState, setLastFirstSelectedState ] = useState(true);
    const [ adjacent, setAdjacent ] = useState([]);
    const


    //called only on mouseDown
    function changeFirstNode(id) {
        const newMap = [...map];
        const node = map.find(node => node.id === id);
        setLastFirstSelectedState(node.active);
        node.active = !node.active;
        setMap(newMap);
    }

    function changeNodeState(id) {
        const newMap = [...map];
        const node = newMap.find(node => node.id === id);
        if (node.active !== lastFirstSelectedState) {     //change only nodes which are in the same state that the first one clicked
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
            <div style={{display:"flex", justifyContent: "center"}}>
                <Map map={map} changeNodeState={changeNodeState} changeFirstNode={changeFirstNode}/>
            </div>
        </>
    );
}

export default App;
