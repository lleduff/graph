import React, { useState,  } from 'react';
import Map from "./Map";
import { v4 as uuidv4 } from 'uuid';


function initiateMap(width, height) {
    const newMap = Array(height * height);
    for (let i = 0; i < newMap.length; i++) {
        newMap[i] = {id:uuidv4(), active: true}
    }
    return newMap;
}

function App() {
    const [ map, setMap ] = useState(initiateMap(20, 10))

    function changeNodeState(id) {
        const newMap = [...map];
        const node = newMap.find(node => node.id === id);
        node.active = !node.active;
        setMap(newMap);
    }

    return (
        <Map map={map} changeNodeState={changeNodeState}/>
    );
}

export default App;
