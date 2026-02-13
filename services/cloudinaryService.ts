/**
 * Cloudinary Service
 * Handles image uploads to Cloudinary
 * 
 * ⚠️ IMPORTANT: Replace these values with your Cloudinary credentials
 * Get them from: Cloudinary Dashboard > Settings > Upload
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

// Cloudinary config - Updated with actual credentials
const CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: 'duqgxtzwa',
  uploadPreset: 'BloodApp',
};

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  created_at: string;
}

/**
 * Upload image to Cloudinary
 * @param imageUri - Local image URI from device
 * @param folder - Optional folder name in Cloudinary
 * @returns Cloudinary URL of uploaded image
 */
export const uploadImageToCloudinary = async (
  imageUri: string,
  folder: string = 'blood-tests'
): Promise<string> => {
  try {
    // Create form data
    const formData = new FormData();
    
    // Extract filename from URI
    const filename = imageUri.split('/').pop() || 'image.jpg';
    
    // Append image file
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: filename,
    } as any);
    
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', folder);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data: CloudinaryUploadResponse = await response.json();
    return data.secure_url;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param imageUris - Array of local image URIs
 * @param folder - Optional folder name
 * @returns Array of Cloudinary URLs
 */
export const uploadMultipleImages = async (
  imageUris: string[],
  folder: string = 'blood-tests'
): Promise<string[]> => {
  try {
    const uploadPromises = imageUris.map((uri) => uploadImageToCloudinary(uri, folder));
    return await Promise.all(uploadPromises);
  } catch (error: any) {
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
};

/**
 * Get Cloudinary config (for debugging)
 */
export const getCloudinaryConfig = (): CloudinaryConfig => {
  return CLOUDINARY_CONFIG;
};
