
**0. Manage Conda**
```
# 删除环境
conda remove -n personvit --all -y
conda remove -n transreid --all -y

# 验证环境列表（应只剩base）
conda info --envs

pip install -r requirements.txt


conda deactivate 
```

**1. Create the Conda Environment**

```bash
conda create -n tranreid python=3.8 -y
```

**2. Activate the Environment**

```bash
conda activate personvit
```

**4. Install PyTorch and Torchvision (Compatible Versions)**

```
# PyTorch 1.12.1 组合
conda install pytorch=1.12.1 torchvision=0.13.1 torchaudio=0.12.1 cudatoolkit=11.3 -c pytorch -y

# PyTorch 1.11.0 组合
conda install pytorch=1.11.0 torchvision=0.12.0 torchaudio=0.11.0 cudatoolkit=11.3 -c pytorch -y

# PyTorch 1.10.1 组合
conda install pytorch=1.10.1 torchvision=0.11.2 torchaudio=0.10.1 cudatoolkit=11.3 -c pytorch -y

# 安装其他依赖项
pip install -r requirements.txt

conda install numpy=1.23 easydict

pip install numpy pillow matplotlib tqdm pyyaml tensorboard opencv-python scikit-learn timm einops easydict
```
**5. Install Other Dependencies**

```bash
pip install yacs
pip install cython 
pip install tensorboard
pip install gdown
pip install scikit-learn
pip install termcolor
pip install tabulate
pip install faiss-cpu
pip install six
conda install mkl=2024.0

# 个人项目需要
pip install efficientnet-pytorch
```

**6. Verify the Installation**

```python
import torch
import torchvision

print(f"PyTorch Version: {torch.__version__}")
print(f"Torchvision Version: {torchvision.__version__}")
print(f"CUDA Available: {torch.cuda.is_available()}")
print(f"CUDA Version: {torch.version.cuda}")

# Check the number of GPUs available (optional, but good to know)
print(f"Number of GPUs: {torch.cuda.device_count()}")
```

**7. (Optional) Export Environment**
```bash
conda env export > fastreid_cuda101_env.yml
```
You can later recreate the environment using:
```bash
conda env create -f fastreid_cuda101_env.yml
```

**8. Clone the warehouse**
```
git clone https://github.com/JDAI-CV/fast-reid.git
cd fast-reid
```

**9. report an error**：
- import torch 遇到错误 undefined symbol: iJIT_NotifyEvent
	错误原因： [mkl](https://so.csdn.net/so/search?q=mkl&spm=1001.2101.3001.7020)包版本不匹配，conda 和 pip使用[不同的](https://so.csdn.net/so/search?q=%E4%B8%8D%E5%90%8C%E7%9A%84&spm=1001.2101.3001.7020) MKL 版本。  
	解决方法：对mkl进行降级`conda install mkl=2024.0`

**10. Modify the process**
- **快速验证可行性**：在东北虎数据集上运行FastReID原版（无需修改），观察baseline性能。
- **逐步改进模型**：按上述步骤替换EfficientNet、fastr-cnn、调整损失函数。
- **构建绵羊数据集**：同步标注至少50只绵羊，用于最终微调。