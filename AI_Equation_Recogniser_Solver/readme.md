🧮 OCR-Based Handwritten Mathematical Equation Solver API
This project provides an end-to-end solution to extract handwritten mathematical equations from images and solve them using state-of-the-art AI models. It combines Qwen2.5 Vision-Language Model for OCR-based extraction and Groq's deepseek-r1-distill-llama-70b model for solving equations. The API is built using Flask-RESTful and exposed publicly via Cloudflare Tunnel.

🚀 Features
OCR Extraction: Extracts mathematical equations from rough handwritten images using Qwen2.5-VL.

Equation Solving: Solves extracted equations using Groq deepseek-r1-distill-llama-70b via LangChain function calling.

Step-by-step Explanation: Provides detailed, simplified solutions.

CORS Enabled: Ready for frontend integration.

Public API Exposure: Uses Cloudflare Tunnel for public endpoint access (no need for hosting).

🛠️ Tech Stack
Python

FastAPI + Flask-RESTful

Qwen2.5-VL Vision-Language Model

Groq Llama-70B (via LangChain)

Cloudflare Tunnel (for public access)

Torch, Bitsandbytes, LangChain, Huggingface Accelerate

📂 Installation
1️⃣ Install required libraries:
bash
Copy
Edit
pip install fastapi uvicorn nest-asyncio pyngrok
pip install torch bitsandbytes
pip install git+https://github.com/huggingface/accelerate
pip install qwen-vl-utils[decord]==0.0.8
pip install langchain_groq jsbeautifier
pip install python-multipart flask_restful
pip install flask-cors
🔑 Set Environment Variable
Replace YOUR_GROQ_API_KEY with your actual Groq API Key:

python
Copy
Edit
os.environ["GROQ_API_KEY"] = "YOUR_GROQ_API_KEY"
🏗️ How it Works:
1️⃣ Image Upload:
Upload a rough handwritten image of a mathematical equation via /extract_solve/ POST endpoint.

2️⃣ Equation Extraction:
Uses Qwen2.5-VL-7B-Instruct to extract the handwritten equation.

3️⃣ Equation Solving:
Sends the extracted equation to Groq's Llama 70B model using LangChain function calling.

Provides step-by-step solution and explanation.

📡 API Usage
Endpoint:
bash
Copy
Edit
POST /extract_solve/
Form-Data Parameter:
Key	Type	Description
file	File (.jpg/.png)	Handwritten equation image file
Example CURL:
bash
Copy
Edit
curl -X POST http://localhost:8003/extract_solve/ -F "file=@your_equation_image.jpg"
Response:
json
Copy
Edit
{
  "status": "success",
  "extracted_equation": "x^2 + 2x - 8 = 0",
  "solution_status": "solved",
  "solution": "x = 2, x = -4",
  "explanation": "The quadratic equation is solved using the quadratic formula..."
}
🌐 Cloudflare Tunnel
To expose the API publicly:

bash
Copy
Edit
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
./cloudflared tunnel --url http://localhost:8003
Cloudflare will provide a public URL, making it easy to test from anywhere or integrate with frontends.

✅ Future Enhancements
Add Graph plotting of equations as base64 images.

Integrate with frontend dashboard.

Support batch image solving.

Deploy on permanent cloud infrastructure.

🤝 Acknowledgments
Groq API

Qwen2.5 Vision-Language Model

LangChain

Cloudflare Tunnel

📬 Contact
For any queries, feel free to reach out!
