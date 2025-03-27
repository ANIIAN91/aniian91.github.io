Paper: http://arxiv.org/abs/2503.10622 
Code and website: http://jiachenzhu.github.io/DyT/
2503.10622v1.pdf})


*   **英文标题：** Transformers without Normalization
*   **中文标题：** 无需归一化的Transformer
*   **作者：** Jiachen Zhu, Xinlei Chen, Kaiming He, Yann LeCun, Zhuang Liu
*   **期刊：** arXiv
*   **中文关键字：** Transformer, 归一化层, Dynamic Tanh, 深度学习, 架构设计
*   **英文关键字：** Transformer, Normalization Layers, Dynamic Tanh, Deep Learning, Architecture Design
*   **论文发表时间：** 2025年3月14日

**摘要:**
归一化层在现代神经网络中无处不在，长期以来一直被认为是必不可少的。这项工作表明，没有归一化的Transformer可以使用一个非常简单的技术达到相同或更好的性能。我们引入了Dynamic Tanh（DyT），一个元素级操作DyT(x) = tanh(ax)，作为Transformer中归一化层的直接替代品。DyT的灵感来自于观察到Transformer中的层归一化通常产生类似tanh的S形输入-输出映射。通过结合DyT，没有归一化的Transformer可以匹配或超过其归一化对应物的性能，大多数情况下无需超参数调整。我们验证了具有DyT的Transformer在各种设置下的有效性，从识别到生成，从监督到自监督学习，以及从计算机视觉到语言模型。这些发现挑战了归一化层在现代神经网络中不可或缺的传统理解，并为它们在深度网络中的作用提供了新的见解。

**背景/目标/创新点:**
*   **背景：**
    *   归一化层（如Layer Normalization）是现代神经网络（尤其是Transformer）中的关键组成部分。
    *   归一化层有助于加速和稳定训练，提高模型性能。
    *   尽管归一化层被广泛使用，但它们是否真的不可或缺，仍然是一个问题。

*   **目标：**
    *   挑战“归一化层对于Transformer不可或缺”的观点。
    *   提出一种简单有效的替代方法，以消除对归一化层的依赖。

*   **创新点：**
    *   **Dynamic Tanh (DyT):** 一种新的元素级操作，DyT(x) = tanh(ax), 其中 `a`是可学习参数. 可以替代归一化层。
    *   **无需归一化层的Transformer:** 通过使用DyT，可以在没有归一化层的情况下训练Transformer，并达到与使用归一化层的Transformer相当甚至更好的性能。

**方法/实验设计/技术细节：**
1.  **观察与动机:**
    *   观察到Transformer中的LN层经常产生类似tanh的S形输入-输出映射。
    *   LN层主要作用是缩放输入激活并抑制极端值。

2.  **Dynamic Tanh (DyT) 的提出:**
    *   DyT(x) = γ * tanh(αx) + β.
    *    α: 可学习的标量参数，控制缩放。
    *    γ 和 β: 可学习的逐通道向量参数，用于缩放和平移.

3.  **DyT 的应用:**
    *   直接替换Transformer中的LN层（或RMSNorm层）。
    *   无需更改原始架构的其他部分，也无需调整超参数。

4.  **实验设置:**
    *   **模型:** Vision Transformer (ViT), ConvNeXt, Diffusion Transformer (DiT), wav2vec 2.0, LLaMA.
    *   **数据集:** ImageNet-1K, LibriSpeech, The Pile, GenomicBenchmarks.
    *   **任务:** 图像分类, 语音识别, 文本生成，DNA序列建模, 自监督学习。
    *  **比较方法:** Layer Normalization (LN), RMSNorm, Fixup, SkipInit, Reparam.
5. **α的初始化**
   *  一般初始化为0.5.
   *  LLM中需要仔细调整。

**核心数据/图表/异常值:**
*   **图1：** Transformer块的原始结构和使用DyT的结构对比。
*   **图2：** ViT、wav2vec 2.0和DiT模型中LN层的输入和输出值的关系图，呈现S形曲线。
*   **图3:** 不同α值的tanh(αx)曲线。
*   **图4:** LN 层的输入和输出值的关系, 通过token和channel进行着色.
*   **图5, 6:** 训练损失曲线对比 (LN vs DyT).
*   **表1-6 & 10：** 不同模型和任务上，使用LN和DyT的性能对比。
*  **图9 & 表13,14：** 不同α0的值对于模型性能的影响.
*  **图10 & 表8,9：** DyT中tanh和α的消融实验.
*  **表11, 12：** LLM中α的初始化.

**结论解释/局限性/未来方向:**
*   **结论:**
    *   DyT可以有效地替代Transformer中的归一化层。
    *   使用DyT的Transformer可以达到与使用归一化层的Transformer相当或更好的性能。
    *   DyT简化了Transformer架构，并可能提高训练和推理速度。
    *   这些发现挑战了归一化层在深度学习中不可或缺的传统观点。

*   **局限性:**
    *   DyT在替换经典ConvNets（如ResNet）中的BN层时效果不佳。
    *   DyT 的有效性主要在 Transformer 架构中得到验证.

*  **未来方向：**
     *   进一步研究DyT在其他类型的神经网络中的应用。
     *   探索DyT的理论性质。

**参考文献追踪：**
*   Layer Normalization (Ba et al., 2016)
*   Fixup (Zhang et al., 2019)
*   SkipInit (De and Smith, 2020)

