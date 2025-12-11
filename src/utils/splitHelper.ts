import * as ImageManipulator from "expo-image-manipulator";
import { Image } from "react-native";

export default async function splitImageFromFile(uri: string): Promise<string[]> {
  return new Promise((resolve) => {
    Image.getSize(
      uri,
      async (width, height) => {
        const partWidth = width / 3;

        const p1 = await ImageManipulator.manipulateAsync(uri, [
          { crop: { originX: 0, originY: 0, width: partWidth, height } },
        ]);

        const p2 = await ImageManipulator.manipulateAsync(uri, [
          { crop: { originX: partWidth, originY: 0, width: partWidth, height } },
        ]);

        const p3 = await ImageManipulator.manipulateAsync(uri, [
          { crop: { originX: partWidth * 2, originY: 0, width: partWidth, height } },
        ]);

        resolve([p1.uri, p2.uri, p3.uri]);
      },
      () => resolve([])
    );
  });
}
