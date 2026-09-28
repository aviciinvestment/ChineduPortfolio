import os
from PIL import Image
from rembg import remove

def process_engine():
    engine_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\5121135a-250a-467d-84cd-3e0668ecbc01\.user_uploaded\media_1790578303263.png"
    out_path = r"c:\Users\HP\ChineduPortfolio\public\engine.png"
    if not os.path.exists(engine_path):
        print(f"File not found: {engine_path}")
        return
        
    print("Processing engine...")
    with open(engine_path, "rb") as f:
        img_data = f.read()
    
    result = remove(img_data)
    with open(out_path, "wb") as f:
        f.write(result)
    print("Engine saved.")

def process_6_models():
    models_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\5121135a-250a-467d-84cd-3e0668ecbc01\.user_uploaded\media_1790578303200.png"
    if not os.path.exists(models_path):
        print(f"File not found: {models_path}")
        return
        
    print("Processing 6 models...")
    img = Image.open(models_path)
    width, height = img.size
    
    # It's a 3x2 grid. Let's crop into 6 pieces.
    w = width // 2
    h = height // 3
    
    crops = [
        (0, 0, w, h),
        (w, 0, width, h),
        (0, h, w, h*2),
        (w, h, width, h*2),
        (0, h*2, w, height),
        (w, h*2, width, height)
    ]
    
    for i, box in enumerate(crops):
        print(f"Processing part {i+1}...")
        cropped = img.crop(box)
        
        # We need to pass bytes to rembg
        import io
        byte_arr = io.BytesIO()
        cropped.save(byte_arr, format='PNG')
        result_data = remove(byte_arr.getvalue())
        
        out_path = fr"c:\Users\HP\ChineduPortfolio\public\part_{i+1}.png"
        with open(out_path, "wb") as f:
            f.write(result_data)
        print(f"Part {i+1} saved.")

if __name__ == "__main__":
    process_engine()
    process_6_models()
