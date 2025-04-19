let bgColorSelector;
let selectedBgColor = '#ffffff'; // default

let bgColors = {
'White': '#ffffff',
  'Persian blue': '#032461',
  'Royal blue': '#0b31b7',
  'Lapis lazuli': '#2066a0',
  'Fawn': '#f8b583',
  'Linen': '#f2e6db',
  'Black': '#000000',
  'Sphira white': '#eeeeee',
  'Sphira black': '#161616',
  'Cream': '#f2f2e2'
};


let logo;
let hauoraFont;
let rotX, rotY, rotZ;
let saveButton, toggleButton;
let rotXText, rotYText, rotZText; // Paragraphs for rotation degrees
let useTexture = false; // Toggle state
let gradients = [];
let currentGradientIndex = 0;




function hexToRGB(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
}

function preload() {
    for (let i = 52; i <= 63; i++) {
        gradients.push(loadImage(`Sphira-logo-${i}.png`));
    }
    logo = loadModel('Sphira-logo-12.obj', true);
    hauoraFont = loadFont('Hauora-Regular.ttf'); // Load the font
}



function setup() {
    createCanvas(600, 600, WEBGL);

 


    // Create sliders with default value set to 50 degrees (≈ 0.87 radians)
    rotX = createSlider(0, TWO_PI, radians(0), 0.01);
    rotX.position(10, height + 10);

    rotY = createSlider(0, TWO_PI, radians(260), 0.01);
    rotY.position(10, height + 40);

    rotZ = createSlider(0, TWO_PI, radians(210), 0.01);
    rotZ.position(10, height + 70);

    // Create text elements for rotation degrees
    rotXText = createP();
    rotXText.position(rotX.x + rotX.width + 10, rotX.y - 12);
    rotXText.style('font-family', 'Hauora'); // Apply font
    rotXText.style('font-size', '12px');
    
    rotYText = createP();
    rotYText.position(rotY.x + rotY.width + 10, rotY.y - 12);
    rotYText.style('font-family', 'Hauora');
    rotYText.style('font-size', '12px');
    
    rotZText = createP();
    rotZText.position(rotZ.x + rotZ.width + 10, rotZ.y - 12);
    rotZText.style('font-family', 'Hauora');
    rotZText.style('font-size', '12px');

 


    // Create toggle button
    toggleButton = createButton('Switch color');
    toggleButton.position(10, height + 130);
    toggleButton.mousePressed(toggleMaterial);

    // Create save button
    saveButton = createButton('Save Image');
    saveButton.position(10, height + 160);
    saveButton.mousePressed(() => saveCanvas('Sphira-logo', 'png'));

    bgColorSelector = createSelect();
    bgColorSelector.position(10, height + 190);
    
    for (let name in bgColors) {
      bgColorSelector.option(name);
    }
    
    bgColorSelector.changed(() => {
      let selectedName = bgColorSelector.value();
      selectedBgColor = bgColors[selectedName];
    });
}    

function draw() {
    background(selectedBgColor);


    // Rotation UI updates
    // Convert radians to integer degrees
let degX = int(degrees(rotX.value()));
let degY = int(degrees(rotY.value()));
let degZ = int(degrees(rotZ.value()));

// Update text elements
rotXText.html(`X: ${degX}°`);
rotYText.html(`Y: ${degY}°`);
rotZText.html(`Z: ${degZ}°`);


    scale(2);
    rotateX(rotX.value());
    rotateY(rotY.value());
    rotateZ(rotZ.value());

    noStroke();

    texture(gradients[currentGradientIndex]); // Use the selected gradient
    model(logo);
}




// Toggle function
function toggleMaterial() {
    currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
}



