import React from 'react';
import './App.css';
import { useState } from 'react';

export default function Node({ node, changeNodeState, changeFirstNode, updateNodesState }) {
    const [ tempActiveFlag, setTempActiveFlag ] = useState(false);

    function handleFirstChange(e) {
        changeFirstNode(node.id);
        setTempActiveFlag(!node.active);
    }
    function handleChangeNodeState(e) {
        if (e.buttons === 1) {
            changeNodeState(node.id);
            setTempActiveFlag(!node.active);
        }
    }
    function handleUpdate(e) {
        updateNodesState(node.id);
        setTempActiveFlag(false);
    }

    return (
        <>
            <button className={`node ${(tempActiveFlag ^ node.active) && 'active'}`} onMouseDown={handleFirstChange} onMouseOver={handleChangeNodeState} onMouseUp={handleUpdate}/>
        </>
    )
}