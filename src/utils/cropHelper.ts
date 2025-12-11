import * as ImageManipulator from "expo-image-manipulator";

interface CropParams {
  photoPath: string;
  frameX: number;
  frameY: number;
  frameWidth: number;
  frameHeight: number;
}

export default async function cropImageFromFile(p: any): Promise<string> {
  const { photoPath, frameX, frameY, frameWidth, frameHeight } = p as CropParams;

  const result = await ImageManipulator.manipulateAsync(
    "file://" + photoPath,
    [
      {
        crop: {
          originX: frameX,
          originY: frameY,
          width: frameWidth,
          height: frameHeight,
        },
      },
    ],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  );

  return result.uri;
}
