from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ocr import process_pan

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/pan-ocr", methods=["POST"])
def pan_ocr_api():

    if "file" not in request.files:
        return jsonify({
            "success": False,
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "error": "Empty filename"
        }), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    file.save(file_path)

    result = process_pan(file_path)

    print("OCR Result:", result)

    return jsonify({
        "success": True,
        "pan_number": result["PAN Number"],
        "pan_valid": result["PAN Valid"],
        "name": result["Name"],
        "confidence": result["OCR Confidence"]
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)  