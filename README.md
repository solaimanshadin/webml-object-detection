# Object Detection in the Browser

## Overview

This project demonstrates **real-time object detection** directly in a web browser using **Machine Learning (ML)**. It leverages the power of the [`transformers.js`](https://xenova.github.io/transformers.js/) library to run inference efficiently without requiring a backend server, ensuring privacy and performance.

## Key Features

- **On-device Object Detection**: Utilizes a pre-trained **DETR (DEtection TRansformer)** model from **Hugging Face** for identifying objects in uploaded images.
- **Threshold-based Filtering**: Allows filtering of detection results based on confidence scores.
- **Dynamic Visualization**: Displays detected objects with bounding boxes and labels overlaid on the image.

## ML Pipeline

The ML functionality is encapsulated using the `transformers.js` library:
- **Model Used**: `Xenova/detr-resnet-50`
- **Task**: `object-detection`
- **Pipeline**: `pipeline(task, model)`

The pipeline runs in a web worker for seamless integration and to maintain UI responsiveness.

### How It Works
1. The **image** is uploaded via a drag-and-drop interface.
2. The worker processes the image using the DETR model, returning detected objects along with their bounding boxes and confidence scores.
3. Objects with confidence scores above the specified threshold are visualized.

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```


2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server::
   ```bash
   npm run dev
   ```


## Technologies Used
<ul> 
<li>Next.js
</li>
<li>transformers.js: Library for running transformer-based models in JavaScript.</li>
<li> Dropzone: Drag-and-drop file upload component.</li>

</ul>

## Usage
<ol>
<li>Drag and drop an image into the browser.</li>
<li>Adjust the detection threshold from code if necessary (default: 0.85).</li>
<li>View the detected objects on the image.</li>

</ol>



