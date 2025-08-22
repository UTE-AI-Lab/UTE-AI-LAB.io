# Chatbot operating

In this project, we use the [Llama3-8B:Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-8B) from the HuggingFace. 
<br>
First, we set the token of [HuggingFace](https://huggingface.co/docs/hub/security-tokens) by:
<br>
`Set HF_TOKEN=hf-...` 
<br>
After that, we run the qwen file by:
<br>
`Uvicorn qwen:app --port 8000 --reload`
