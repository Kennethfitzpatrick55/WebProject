import { createCamera } from './Camera.js';
import { setupGUI } from './Gui-Controls.js';
import * as THREE from 'three';

export function createScene()
{
  
    //trying something 
    const gameWindow = document.getElementById('render-target');

    // Create a scene
    const scene = new THREE.Scene();

    //set background
    scene.background = new THREE.Color(0x777777)
    
    const camera = createCamera(gameWindow);
    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    //create gui 
    const gui = setupGUI(scene);

    let meshes = [];

    function initialize(city)
    {
        scene.clear();
        meshes = [];

        for (let x = 0; x < city.size; x++)
        {
            const column = [];

            for (let y = 0; y < city.size; y++)
            {
                const tile = city.data[x][y];
                

                //Grass
                const geometry = new THREE.BoxGeometry(1,1,1);
                const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(x,-0.5, y);
                scene.add(cube);
                column.push(cube);
               

                if (tile.building === 'building') {
                    console.log(`Creating building at (${x}, ${y})`); // Debug log
                    const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
                    const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red color for visibility
                    const buildingCube = new THREE.Mesh(buildingGeometry, buildingMaterial);
                    buildingCube.position.set(x, 0.5, y);
                    scene.add(buildingCube);
                    column.push(buildingCube);
                }

                
            }
            meshes.push(column);
        }
       
        setupLight();
    }
    

    // light 
    function setupLight()
    {
        const Lights = [
            new THREE.AmbientLight(0xffffff, 0.70),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3)
        ]

        Lights[1].position.set(0, 1, 0);
        Lights[2].position.set(1, 1, 0);
        Lights[3].position.set(0, 1, 1);

        scene.add(...Lights);
    }
    //render method 
    function draw()
    {
        renderer.render(scene, camera.camera);
    }

    function start()
    {
        renderer.setAnimationLoop(draw);
    }

    function stop()
    {
        renderer.setAnimationLoop(null);
    }

    //button 
    function onMouseDown(event)
    {
        camera.onMouseDown(event);
    }

    function onMouseUp(event)
    {
        console.log('mouseup');
  
        camera.onMouseUp(event);
    }

    function onMouseMove(event)
    {
        camera.onMouseMove(event);
    }

    return {
        gui,
        initialize,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }


}
  