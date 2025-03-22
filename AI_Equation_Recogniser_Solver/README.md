
# 🧮 OCR-Based Mathematical Equation Solver API

This API extracts rough handwritten mathematical equations from images and provides step-by-step solutions using Groq's Llama 70B model and LangChain function calling.

---

## 📦 Installation

### 1️⃣ Install required libraries:

```bash
pip install fastapi uvicorn nest-asyncio pyngrok torch bitsandbytes
pip install git+https://github.com/huggingface/accelerate
pip install qwen-vl-utils[decord]==0.0.8
pip install langchain_groq jsbeautifier python-multipart flask_restful flask-cors
```

---

### 2️⃣ Set Environment Variable:

Replace `YOUR_GROQ_API_KEY` with your actual Groq API Key:

```python
import os
os.environ["GROQ_API_KEY"] = "YOUR_GROQ_API_KEY"
```

---

## 🚀 How it Works

### 1️⃣ Image Upload:
Upload a rough handwritten image of a mathematical equation via `/extract_solve/` POST endpoint.

---

### 2️⃣ Equation Extraction:
Uses **Qwen2.5-VL-7B-Instruct** to extract the handwritten equation from the image.

---

### 3️⃣ Equation Solving:
Sends the extracted equation to **Groq's Llama 70B model** using **LangChain function calling**.

It provides step-by-step solution and explanation in the API response.

---

## 📡 API Usage

### **Endpoint:**
```bash
POST /extract_solve/
```

---

### **Form-Data Parameter:**

| Key   | Type | Description                                  |
|------|------|----------------------------------------------|
| file | File | Handwritten equation image file (.jpg/.png)   |

---

### **Example CURL:**

```bash
curl -X POST http://localhost:8003/extract_solve/ -F "file=@your_equation_image.jpg"
```

---

### **Sample JSON Response:**

```json
{
  "status": "success",
  "extracted_equation": "x^2 + 2x - 8 = 0",
  "solution_status": "solved",
  "solution": "x = 2, x = -4",
  "explanation": "The quadratic equation is solved using the quadratic formula..."
}
```

---

## 🌐 Public Access using Cloudflare Tunnel

To expose the API publicly:

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
./cloudflared tunnel --url http://localhost:8003
```

Cloudflare will provide a public URL, making it easy to test from anywhere or integrate with frontends.

---

## ✅ Future Enhancements:

- Add **Graph plotting of equations as base64 images**.
- Integrate with frontend dashboard.
