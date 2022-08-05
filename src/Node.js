import React from 'react';
import './App.css';

export default function Node({ node, changeNodeState, changeFirstNode }) {
    function handleFirstChange(e) {
        changeFirstNode(node.id);
    }
    function handleChangeNodeState(e) {
        if (e.buttons === 1) {
            changeNodeState(node.id);
        }
    }

    return (
        <>
            <button className={`node ${node.active && 'active'}`} onMouseDown={handleFirstChange} onMouseOver={handleChangeNodeState}/>
        </>
    )
}