import React from 'react';
import Graph from 'react-graph-vis';

import './styles.scss';

export default function AF() {
  const nodes = [
    { id: 1, label: "q0", color: "#345C98" },
    { id: 2, label: "q1", color: "#345C98" },
    { id: 3, label: "q2", color: "#345C98" },
    { id: 4, label: "q3", color: "#345C98" }
  ];

  const edges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 3 },
    { from: 4, to: 4 }
  ];

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    nodes: {
      color: "#FFFFFF"
    },
    physics: {
      enabled: false
    }
  };

  const network = {
    counter: 5,
    graph: {
      nodes,
      edges
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        alert("Selected node: " + nodes);
      }
    }
  };

  const { graph, events } = network;

  return (
    <div className='af-container'>
      <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
    </div>
  );
}
