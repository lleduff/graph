import React, {useMemo, useState} from 'react';
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




function App() {
    const [ map, setMap ] = useState(initiateMap(WIDTH * HEIGHT));
    const [ lastFirstSelectedState, setLastFirstSelectedState ] = useState(true);
    const [ nodes, setNodes ] = useState(updateDictionary());
    useMemo(
        () => {
            const newNodes = updateDictionary();
            setNodes(newNodes);
        }, [map]
    );

    function adjacentNodes(node) {
        const i = map.indexOf(node);
        let res = [];
        if (i - WIDTH >= 0) {
            if (map[i - WIDTH].active) res = [...res, map[i - WIDTH].id];           //south
        }
        if (i + WIDTH < map.length) {
            if (map[i + WIDTH].active) res = [...res, map[i + WIDTH].id];           //north
        }
        if (i % WIDTH !== 0) {
            if (map[i - 1].active) res = [...res, map[i - 1].id];                   //west
        }
        if (i % WIDTH !== WIDTH - 1) {
            if (map[i + 1].active) res = [...res, map[i + 1].id];                   //east
        }
        return res;
    }

    function updateDictionary() {
        let dict = {};
        map.filter(node => node.active)
            .forEach(node => dict[node.id] = adjacentNodes(node));
        return dict;
    }

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
            <div>{Object.keys(nodes).length}</div>
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
