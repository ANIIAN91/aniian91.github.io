NLP -> CV(2020年底)

CVPR   ICCV
超越CNN

视觉任务（Vision Tasks）是指通过计算机视觉技术处理图像或视频的任务，主要包括以下几类：
- **图像分类（Image Classification）**：识别图像中包含的主要目标是什么（例如，识别一张图片是猫还是狗）。
- **目标检测（Object Detection）**：识别图像中目标的位置及其类别（例如，识别图片中有几只狗和猫并标出它们的位置）。
- **语义分割（Semantic Segmentation）**：对图像中的每个像素进行分类，标注每个像素属于哪个类别（例如，将图像中的天空、草地、建筑等区域标记出来）。
- **实例分割（Instance Segmentation）**：在语义分割的基础上，区分同一类别的不同实例（例如，分割出图像中多只狗并区分它们）。
- **目标跟踪（Object Tracking）**：在视频中跟踪某个目标的位置（例如，跟踪一个人在不同帧中的位置）。
- **图像生成（Image Generation）**：生成符合某种条件的图像（例如，生成一张风景画）。
- **超分辨率（Super-Resolution）**：将低分辨率图像提高为高分辨率图像。
- **图像描述（Image Captioning）**：生成对图像内容的文字描述（例如，“一只猫坐在沙发上”）。


**SOTA（State-of-the-Art）**：指的是当前在某个任务或领域中表现最好的技术或方法。SOTA性能通常通过某些评价指标（如准确率、召回率、F1分数等）来评估



### **优势**
相对传统CNN有着全局上下文捕捉的优势，包含多头注意力和FFN模块
需要的注意事项，例如处理细粒度特征、局部信息的重要性
通过结构设计（JPM模块或局部分支）来优化模型
训练策略，如学习率调整、损失函数的选择，以及如何结合全局和局部特征

相对于传统CNN的调整数据预处理或训练流程，输入尺寸可能需要调整以适应分块策略，以及预训练权重的问题（ViT通常在大规模数据集上预训练，可能需要微调）


添加**交叉注意力机制**：让不同摄像头视角的特征交互
使用**Pre-LN**结构：更利于训练稳定性


**架构**
```
输入图像 → 分块嵌入 → 位置编码 → Transformer编码器 → 特征增强 → 分类头
       │                                     │
       └────────── 局部特征分支 ──────────────┘

```

### **Class1**

```
conda create -n vit python=3.6
conda activate vit
pip install paddlepaddle
pip install paddlepaddle-gpu
pip install numpy gitpython
```

**遇到的问题**
1. 代码打错
2. UserWarning: DataLoader with multi-process mode is not supported on MacOs and Windows currently. Please use signle-process mode with num_workers = 0

```
conda create -n cuda116py39 python=3.9 -y

conda activate cuda116py39

conda install pytorch==1.12.1 torchvision==0.13.1 torchaudio==0.12.1 cudatoolkit=11.6 -c pytorch -c conda-forge

conda install pytorch==1.12.1 torchvision==0.13.1 torchaudio==0.12.1 cudatoolkit=11.6 -c https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/ -c conda-forge

pip install torch==1.12.1+cu116 torchvision==0.13.1+cu116 torchaudio==0.12.1 -i https://mirrors.aliyun.com/pypi/simple/
```

### **Class2**

reshape改变形状，但不改变大小 （降维）
expand 升维
w learnable   mlp

"归一化" 通常指的是将数值数据缩放到一个标准的范围。 这就像把不同单位的测量值（比如米和厘米）都转换成同一种单位，方便比较和计算。
	**输入数据归一化 (Input Data Normalization):** 指的是在将数据输入模型 _之前_，对数据的特征进行缩放。
	- **目的：**
	    - **改善优化过程:** 如果特征的数值范围差异很大，例如一个特征范围是 0-1，另一个特征范围是 0-1000，那么在梯度下降等优化算法中，范围大的特征可能会在损失函数中占据主导地位，导致模型更注重学习这些大范围的特征，而忽略小范围的特征。归一化将所有特征都缩放到相似的范围，让模型可以更均衡地学习所有特征。
	    - **加快收敛速度:** 归一化后的特征能让梯度下降算法更快地找到最优解，从而缩短训练时间。
	    - **防止数值不稳定:** 在深层神经网络中，特别是使用某些激活函数时，如果输入值过大，可能会导致数值计算不稳定，例如梯度爆炸或梯度消失。归一化可以帮助将数值保持在一个更稳定的范围内。
	-
Tensor的创建： to tensor,ones,full,randn,zeros like 
基础操作：·dtype,shape Reshape,squeeze/unsqueeze.split/chunk,transpose

```
    img = np.array(Image.open("image.png"))
    t = paddle.to_tensor(img,dtype="float32")
    print(type(t))
    print(t.dtype)
    print(t.shape)
    print(t.transpose([0,1,2]))
```
每个数字代表原始维度的位置在转置后应该放在哪里。需要确保：
- 列表长度等于张量的维度数（这里是3）
- 所有索引在有效范围内（0到维度数-1）
- 每个索引只出现一次
- **转置操作要求轴列表的长度必须等于张量的维度数**
```
t = paddle.randint(0,10,[5,15])
qkv = t.chunk(3,-1)  #切几块，从哪儿切，三块，最后一位切
print(type(qkv))
print(qkv[0].shape)
q,k,v = qkv
```


### Class3  
在单个序列中使用不同位置的注意力用于实现该序列的表征方法（注意力机制是个方法，学习是表征。）

dropout在linear后加

transformer整体结构以及流程
encoder整体结构以及流程
RNN结构到Seq2Seq
Seq2Seq Encoder-Decoder原理
Seq2Seq到Attention
Attention in Transformer: Self Attention
Self Attention：对单个Token如何计算？
Self Attention：对整个序列计算注意力
Self Attention：注意力计算的矩阵表示
Multi-Head Self Attention
ViT模型->Encoder->Multi-Head Self Attentio