// gui-controls.js
export function setupGUI(scene) {
    const gui = new dat.GUI();

    const params = {
        backgroundColor: '#777777',
    };

    gui.addColor(params, 'backgroundColor').onChange((value) => {
        scene.background.set(value);
    });

    // Add more controls here as needed

    return gui;
}