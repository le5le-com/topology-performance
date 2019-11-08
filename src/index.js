var canvas = new Le5leTopology.Topology('topo-canvas', {});

function copyData() {
  let offsetX = (Math.random() * 300) | 0;
  let offsetY = (Math.random() * 200) | 0;
  let tmp = {
    nodes: [],
    lines: []
  };
  for (const item of data.nodes) {
    let node = new Le5leTopology.Node(item);
    node.rect.x += offsetX;
    node.rect.y += offsetY;
    node.rect.ex = node.rect.x + node.rect.width;
    node.rect.ey = node.rect.y + node.rect.height;

    let fs = JSON.stringify(node.animateFrames);
    node.animateFrames = JSON.parse(fs);
    for (const frame of node.animateFrames) {
      frame.initState.rect.x += offsetX;
      frame.initState.rect.y += offsetY;
      frame.initState.rect.ex += offsetX;
      frame.initState.rect.ey += offsetY;

      frame.state.rect.x += offsetX;
      frame.state.rect.y += offsetY;
      frame.state.rect.ex += offsetX;
      frame.state.rect.ey += offsetY;
    }

    node.id += offsetX;
    tmp.nodes.push(node);
  }

  for (const item of data.lines) {
    let line = new Le5leTopology.Line(item);
    line.from.x += offsetX;
    line.from.y += offsetY;
    if (line.from.id) {
      line.from.id += offsetX;
    }
    line.to.x += offsetX;
    line.to.y += offsetY;
    if (line.to.id) {
      line.to.id += offsetX;
    }

    for (const pt of line.controlPoints) {
      pt.x += offsetX;
      pt.y += offsetY;
    }

    tmp.lines.push(line);
  }

  return tmp;
}

var newData = {
  nodes: [
    {
      rect: {
        x: 100,
        y: 100,
        width: 70,
        height: 100
      },
      name: 'people'
    }
  ],
  lines: [],
  lineName: 'curve',
  fromArrowType: '',
  toArrowType: 'triangleSolid',
  scale: 1,
  locked: 0
};
for (var i = 0; i < 100; ++i) {
  let tmp = copyData();
  newData.nodes.push.apply(newData.nodes, tmp.nodes);
  newData.lines.push.apply(newData.lines, tmp.lines);
}

console.log(newData.nodes.length);

canvas.open(newData);
for (var i = 0; i < 4; ++i) {
  canvas.data.nodes[i].animateStart = Date.now();
}
canvas.animate();
