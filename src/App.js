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
    const [ adjacentDictionary, setAdjacentDictionary ] = useState(
        map.filter(node => node.active).reduce((acc, node) => {
            return {...acc, [node.id] : []};
        }, {})
    );
    // useMemo(
    //     () => {
    //         const newAdjacent = {...adjacentDictionary};
    //         map.forEach((node, i) => {
    //             //south
    //             if (Math.floor(i / WIDTH) !== 0 && map[i - WIDTH].active)
    //                 newAdjacent[node.id] = [...newAdjacent[node.id], map[i - WIDTH].id]
    //             //north
    //             if (Math.floor(i / WIDTH) !== HEIGHT - 1 && map[i + WIDTH].active)
    //                 newAdjacent[node.id] = [...newAdjacent[node.id], map[i + WIDTH].id]
    //             //west
    //             if (i % WIDTH !== 0 && map[i - 1].active)
    //                 newAdjacent[node.id] = [...newAdjacent[node.id], map[i - 1].id]
    //             //east
    //             if (i % WIDTH !== WIDTH - 1 && map[i + 1].active)
    //                 newAdjacent[node.id] = [...newAdjacent[node.id], map[i + 1].id]
    //         })
    //         setAdjacentDictionary(newAdjacent);
    //     }, [map]
    // );

    let currentlyUpdatingNodes = [];

    //called only on mouseDown
    function changeFirstNode(id) {
        const node = map.find(node => node.id === id);
        setLastFirstSelectedState(node.active);
        currentlyUpdatingNodes = [node.id];
    }

    function changeNodeState(id) {
        const node = map.find(node => node.id === id);
        if (node.active !== lastFirstSelectedState) {     //change only nodes which are in the same state that the first one clicked
            return;
        }
        currentlyUpdatingNodes = [...currentlyUpdatingNodes, node.id];

        // const newAdjacent = {...adjacentDictionary};
        // node.active ? newAdjacent[id] = {} : delete newAdjacent[id];
        // setAdjacentDictionary(newAdjacent);
    }

    function updateNodesState() {
        const newMap = [...map];
        for (let id of currentlyUpdatingNodes) {
            const node = newMap.find(node => node.id === id);
            node.active = !node.active;
        }
        setMap(newMap);
    }

    function handleClear(e) {
        const newMap = [...map];
        newMap.map(node => node.active = true);
        setMap(newMap);
    }


    return (
        <>
            <div>{Object.values(adjacentDictionary)[0].length}</div>
            {/*<div>{JSON.stringify(adjacentDictionary)}</div>*/}

            <div>
                <button onClick={handleClear}>clear</button>
            </div>
            <div style={{display:"flex", justifyContent: "center"}}>
                <Map map={map} changeNodeState={changeNodeState} changeFirstNode={changeFirstNode} updateNodesState={updateNodesState}/>
            </div>
        </>
    );
}

export default App;
