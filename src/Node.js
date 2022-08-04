import React from 'react';
import './App.css';

export default function Node({ node, changeNodeState }) {
    function handleChangeNodeState() {
        console.log("ee")
        changeNodeState(node.id);
    }

    return (
        <>
            <div className={`node ${node.active && 'active'}`} onClick={handleChangeNodeState}/>
        </>
    )
}