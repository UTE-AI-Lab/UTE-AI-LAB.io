# Chatbot operating

In this project, we use the [Qwen2.5-VL-7B](https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5) from the HuggingFace. 
<br>
First, we set the token of [HuggingFace](https://huggingface.co/docs/hub/security-tokens) by:
<br>
<div align=center> `Set HF_TOKEN=hf-...` </div>
<br>
After that, we run the qwen file by:
<br>
<div align=center> `Uvicorn qwen:app --port 8000 --reload` </div>
