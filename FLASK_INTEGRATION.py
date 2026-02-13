"""
Flask Backend for Blood Group Detection App
Enhanced with Cloudinary and Firebase integration

This example shows how to integrate Cloudinary image storage
and Firebase Firestore with your existing Flask ML backend.

⚠️ IMPORTANT: This is an enhancement to your existing Flask backend.
Only add the new features, keep your ML detection logic intact.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from firebase_admin import credentials, firestore, initialize_app
import os
from datetime import datetime

# Initialize Flask
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from mobile app

# ====================================
# CLOUDINARY CONFIGURATION
# ====================================
cloudinary.config(
    cloud_name="YOUR_CLOUD_NAME",
    api_key="YOUR_API_KEY",
    api_secret="YOUR_API_SECRET"
)

# ====================================
# FIREBASE CONFIGURATION
# ====================================
# Download your Firebase service account JSON from Firebase Console
# Place it in your project directory
cred = credentials.Certificate("path/to/serviceAccountKey.json")
initialize_app(cred)
db = firestore.client()

# ====================================
# HELPER FUNCTIONS
# ====================================

def upload_to_cloudinary(file, folder="blood-tests"):
    """Upload image to Cloudinary and return URL"""
    try:
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
            resource_type="image"
        )
        return result['secure_url']
    except Exception as e:
        print(f"Cloudinary upload error: {str(e)}")
        return None

def save_to_firestore(test_data):
    """Save blood test result to Firestore"""
    try:
        doc_ref = db.collection('blood_tests').document()
        doc_ref.set(test_data)
        return doc_ref.id
    except Exception as e:
        print(f"Firestore save error: {str(e)}")
        return None

# ====================================
# YOUR EXISTING ML PREDICTION ENDPOINT
# ====================================
@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Enhanced prediction endpoint with Cloudinary & Firebase integration
    
    ⚠️ KEEP YOUR EXISTING ML LOGIC HERE
    This example shows how to add image upload and database saving
    """
    
    try:
        # Get uploaded images
        anti_a_file = request.files.get('antiA')
        anti_b_file = request.files.get('antiB')
        anti_d_file = request.files.get('antiD')
        
        if not all([anti_a_file, anti_b_file, anti_d_file]):
            return jsonify({"error": "All three images required"}), 400
        
        # ======================================
        # YOUR EXISTING ML PREDICTION CODE HERE
        # ======================================
        # Example (replace with your actual model prediction):
        """
        # Load images
        img_a = process_image(anti_a_file)
        img_b = process_image(anti_b_file)
        img_d = process_image(anti_d_file)
        
        # Run ML model
        score_a = model_predict(img_a)
        score_b = model_predict(img_b)
        score_d = model_predict(img_d)
        
        # Determine blood group
        blood_group = determine_blood_group(score_a, score_b, score_d)
        """
        
        # For demonstration, using dummy values:
        score_a = 0.98
        score_b = 0.04
        score_d = 0.34
        blood_group = "B+"
        
        # ======================================
        # NEW: Upload images to Cloudinary (OPTIONAL)
        # ======================================
        # Note: You can skip this if mobile app uploads directly
        # This is useful if you want backend to handle uploads
        """
        cloudinary_urls = {
            'antiA': upload_to_cloudinary(anti_a_file),
            'antiB': upload_to_cloudinary(anti_b_file),
            'antiD': upload_to_cloudinary(anti_d_file)
        }
        """
        
        # ======================================
        # NEW: Save to Firestore (OPTIONAL)
        # ======================================
        # Note: Mobile app also saves to Firestore
        # This is redundant but can serve as backup
        """
        test_data = {
            'userId': request.form.get('userId', 'unknown'),
            'bloodGroup': blood_group,
            'scores': {
                'antiA': score_a,
                'antiB': score_b,
                'antiD': score_d
            },
            'images': cloudinary_urls,
            'createdAt': firestore.SERVER_TIMESTAMP
        }
        
        test_id = save_to_firestore(test_data)
        """
        
        # Return prediction result
        response = {
            "blood_group": blood_group,
            "scores": {
                "antiA": score_a,
                "antiB": score_b,
                "antiD": score_d
            }
            # Optionally include:
            # "test_id": test_id,
            # "cloudinary_urls": cloudinary_urls
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ====================================
# HEALTH CHECK ENDPOINT
# ====================================
@app.route('/api/health', methods=['GET'])
def health_check():
    """Check if server is running"""
    return jsonify({
        "status": "running",
        "message": "Blood Group Detection API is active"
    }), 200

# ====================================
# RUN SERVER
# ====================================
if __name__ == '__main__':
    # Get your local IP address and update in mobile app
    # Run: ipconfig (Windows) or ifconfig (Mac/Linux)
    app.run(
        host='0.0.0.0',  # Allow external connections
        port=5000,
        debug=True
    )
    
    print("\n" + "="*50)
    print("🩸 Blood Group Detection API Running")
    print("="*50)
    print("Update mobile app with your IP:")
    print("const API_URL = 'http://192.168.136.224:5000/api/predict';")
    print("="*50 + "\n")

"""
INSTALLATION REQUIREMENTS:
--------------------------
pip install flask
pip install flask-cors
pip install cloudinary
pip install firebase-admin

SETUP STEPS:
-----------
1. Get Firebase Service Account Key:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save as serviceAccountKey.json in your project

2. Get Cloudinary Credentials:
   - Go to Cloudinary Dashboard
   - Copy Cloud Name, API Key, API Secret

3. Update configurations above

4. Run the server:
   python app.py

5. Update mobile app with your server IP:
   - Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
   - Update API_URL in app/(tabs)/index.tsx

NOTES:
------
- Mobile app handles Cloudinary uploads (recommended)
- Mobile app handles Firestore saves (recommended)
- This backend primarily does ML prediction
- Backend upload/save is optional (for backup/logging)
- Keep your existing ML model code intact
"""
