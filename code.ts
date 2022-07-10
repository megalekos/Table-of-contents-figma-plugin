// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);


let sections = figma.root.findAll(node => node.type == "SECTION").reverse();

let nodes: SceneNode[] = [];
sections.map(section => nodes.push(section as SectionNode))

const sectionNames: string[] = nodes.map(section => section.name)
//console.log("section names: ", sectionNames)

//send names of sections to UI
figma.ui.postMessage(sectionNames)

//resize after dynamic elements
figma.ui.resize(300, 500)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = pluginMessage => {

console.log(pluginMessage)  
nodes.forEach(node => {
  if (pluginMessage === node.name) {
      console.log(node)
      nodes = []
      nodes.push(node)
  }
})

   figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
 
  figma.closePlugin();
};
