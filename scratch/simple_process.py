import os
from PIL import Image

def remove_white_bg(img):
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        # Check if R, G, B are all > 200 (light grey / white CAD background)
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img

def process_engine():
    engine_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\5121135a-250a-467d-84cd-3e0668ecbc01\.user_uploaded\media_1790578303263.png"
    out_path = r"c:\Users\HP\ChineduPortfolio\public\engine.png"
    if not os.path.exists(engine_path):
        print("Engine path not found:", engine_path)
        return
    img = Image.open(engine_path)
    img = remove_white_bg(img)
    img.save(out_path, "PNG")
    print("Engine saved.")

def process_6_models():
    models_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\5121135a-250a-467d-84cd-3e0668ecbc01\.user_uploaded\media_1790578303200.png"
    if not os.path.exists(models_path):
        print("Models path not found:", models_path)
        return
    img = Image.open(models_path)
    width, height = img.size
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
        cropped = img.crop(box)
        cropped = remove_white_bg(cropped)
        out_path = fr"c:\Users\HP\ChineduPortfolio\public\part_{i+1}.png"
        cropped.save(out_path, "PNG")
        print(f"Part {i+1} saved.")

if __name__ == "__main__":
    process_engine()
    process_6_models()
