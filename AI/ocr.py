import cv2
import re
import numpy as np
import easyocr
import pytesseract


# IMPORTANT FOR WINDOWS
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

reader = easyocr.Reader(['en'], gpu=False)

PAN_REGEX = r'[A-Z]{5}[0-9]{4}[A-Z]'


# ==========================================
# IMAGE PREPROCESSING
# ==========================================

def preprocess(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.resize(gray, None, fx=2, fy=2)

    gray = cv2.bilateralFilter(gray, 11, 17, 17)

    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    return thresh


# ==========================================
# EASY OCR
# ==========================================

def easy_ocr(image):

    results = reader.readtext(image)

    text = ""
    conf = []

    for r in results:

        text += r[1] + "\n"
        conf.append(r[2])

    confidence = np.mean(conf) if conf else 0

    return text.upper(), confidence


# ==========================================
# TESSERACT OCR
# ==========================================

def tesseract_ocr(image):

    processed = preprocess(image)

    text = pytesseract.image_to_string(
        processed,
        config="--oem 3 --psm 6"
    )

    return text.upper(), 0.85


# ==========================================
# HYBRID OCR
# ==========================================

def run_ocr(image):

    text1, conf1 = easy_ocr(image)

    if len(text1) > 10:
        return text1, conf1

    text2, conf2 = tesseract_ocr(image)

    return text2, conf2


# ==========================================
# PAN EXTRACTION
# ==========================================

def extract_pan(text):

    cleaned = text.replace(" ", "")

    match = re.search(PAN_REGEX, cleaned)

    if match:
        return match.group()

    return None


# ==========================================
# NAME EXTRACTION
# ==========================================

def extract_name(text):

    lines = [l.strip() for l in text.split("\n") if l.strip()]

    pan_index = None

    for i, line in enumerate(lines):

        if re.search(PAN_REGEX, line):
            pan_index = i
            break

    if pan_index is None:
        return None

    for j in range(pan_index - 1, -1, -1):

        candidate = lines[j]

        candidate = re.sub(r'[^A-Z ]', '', candidate)

        candidate = candidate.strip()

        if len(candidate.split()) >= 2 and "INCOME TAX" not in candidate:
            return candidate

    return None


# ==========================================
# PAN VALIDATION
# ==========================================

def validate_pan(pan):

    if pan and re.match(PAN_REGEX, pan):
        return True

    return False


# ==========================================
# MAIN OCR PIPELINE
# ==========================================

def process_pan(file):

    image = cv2.imread(file)

    if image is None:
        return {
            "PAN Number": None,
            "Name": None,
            "PAN Valid": False,
            "OCR Confidence": 0
        }

    text, confidence = run_ocr(image)

    print("\n===== OCR TEXT =====\n")
    print(text)
    print("\n====================\n")

    pan = extract_pan(text)

    name = extract_name(text)

    result = {
        "PAN Number": pan,
        "Name": name,
        "PAN Valid": validate_pan(pan),
        "OCR Confidence": confidence
    }

    return result