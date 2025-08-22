# Chatbot operating

In this project, we use the [Qwen2.5-VL-7B](https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5) from the HuggingFace. In order to initalize the model
First, we set the token of [HuggingFace](https://huggingface.co/docs/hub/security-tokens) by:
`Set HF_TOKEN=hf-...`
After that, we run the qwen file by:
`Uvicorn qwen:app --port 8000 --reload`
