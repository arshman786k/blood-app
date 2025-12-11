import { loadTensorflowModel } from "react-native-fast-tflite";
import type { TensorflowModel } from "react-native-fast-tflite";
import { Image } from "react-native";

let model: TensorflowModel | null = null;

// Load the model once
export async function loadModel() {
  if (!model) {
    const modelAsset = require("../../assets/model/agglutination_model.tflite");
    model = await loadTensorflowModel(modelAsset);
  }
}

// Convert image to tensor data
async function imageToTensor(imageUri: string): Promise<Float32Array> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageUri,
      (width, height) => {
        // For now, return a placeholder tensor
        // In production, you'd need to use a library like react-native-image-to-tensor
        // or process the image properly
        const inputSize = 224 * 224 * 3; // Common input size
        const tensor = new Float32Array(inputSize);
        resolve(tensor);
      },
      (error) => reject(error)
    );
  });
}

// Run prediction on a single image (cropped well)
export async function predict(imageUri: string): Promise<"agglutination" | "no-agglutination"> {
  if (!model) {
    await loadModel();
  }

  // Convert image to tensor
  const inputTensor = await imageToTensor(imageUri);
  
  // Run model
  const outputs = await model!.run([inputTensor]);

  // output: [0] = no-agglutination, [1] = agglutination
  // assuming model returns probabilities for 2 classes
  const outputData = outputs[0];
  const confidenceAgglutination = outputData[1] || 0;

  return confidenceAgglutination > 0.5 ? "agglutination" : "no-agglutination";
}
