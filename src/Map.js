import React from 'react';
import Node from './Node';
import './App.css';

export default function Map({ map, changeNodeState, changeFirstNode }) {
    return (
        <>
            <div className={`map`}>
                {map.map(node => {
                    return <Node key={node.id} node={node} changeNodeState={changeNodeState} changeFirstNode={changeFirstNode}/>
                })}
            </div>
        </>
    );
}