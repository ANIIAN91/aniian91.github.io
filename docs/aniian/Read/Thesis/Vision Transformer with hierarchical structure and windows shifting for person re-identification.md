- [Vision Transformer with hierarchical structure and windows shifting for person re-identification | PLOS One](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0287979)
- [[../../docs/journal.pone.0287979.pdf]]


**英文标题:** Vision Transformer with hierarchical structure and windows shifting for person re-identification
**中文标题:** 具有分层结构和窗口移位的视觉Transformer用于行人重识别
**作者:** Yinghua Zhang, Wei Hou
**期刊:** PLOS ONE
**中文关键字:** 行人重识别, 视觉Transformer, 分层结构, 窗口移位, 自注意力
**英文关键字:** Person re-identification, Vision Transformer, Hierarchical structure, Windows shifting, Self-attention

**摘要:**
本文提出了一种基于视觉Transformer的行人重识别(Re-ID)方法，该方法具有分层结构和窗口移位。通过引入CNN中常用的分层构建方法，构建分层Transformer模型来提取行人图像特征。考虑到行人图像的局部信息对于完整特征提取的重要性，通过在窗口区域内移位来执行自注意力计算。在三个标准数据集上的实验表明了该方法的有效性和优越性。

**背景/目标/创新点:**
*   **背景:** 传统的基于CNN的Re-ID方法在处理行人图像的局部区域时可能会忽略部分信息，导致特征提取不完整。
*   **目标:** 提出一种能够更有效地提取行人图像的判别性和鲁棒性特征的Re-ID方法。
*   **创新点:**
    1.  **分层Transformer结构:**  使用CNN中常用的分层构建方法来构建Transformer模型，以聚合多尺度行人图像信息。
    2.  **窗口移位机制:**  通过窗口移位来扩大模型的感知域，并在节省计算量的同时获得更全面的行人特征。

**方法/实验设计/技术细节:**
1.  **整体框架:** 该模型采用分层设计，包含四个阶段的分层和窗口移位Transformer编码。除了第一阶段的编码之外，每个阶段都通过逐层降采样来扩大感知域，以获得全局信息。
2.  **分层结构:**  将图像分成不同大小的patch (4x4, 8x8, 16x16, 32x32)，从而实现分层的特征提取。
3.  **窗口移位:** 在每个窗口内使用Transformer进行自注意力计算，并通过窗口移位来增加感受野。
4.  **损失函数:** 使用交叉熵损失函数进行训练。
5.  **数据集:**  在Market-1501、DukeMTMC-reID和MSMT17三个数据集上进行实验。
6.  **评估指标:** 使用Rank-k和mAP评估性能。
7.   **算法1：** 详细描述了包含分层结构和窗口移位的视觉 Transformer 的训练伪代码，包括数据预处理、按照patch大小分割图像、计算Transformer输出、使用等式优化输出、进行窗口移位等步骤。
8.  **公式细节：** 包括自注意力机制的公式，多头自注意力机制的公式，层归一化(LN)和多层感知机(MLP)的公式，WMSA和SWMSA的计算公式等。
    *   **公式2：** Attention(Q, K, V) = Softmax(QK^T / √dk)V  定义了自注意力机制的计算方法，其中Q、K、V分别代表查询、键和值，√dk是缩放因子。
    *   **公式5：** LN(x) = (x - μ) / δ * γ + β 定义了层归一化操作，用于稳定模型训练。
    *   **公式6：** MLP(X) = σ(XW1 + b1)W2 + b2 定义了多层感知机，用于特征转换和非线性映射。
    *   **公式7-10：** 描述了 WMSA（窗口多头自注意力）和 SWMSA（移位窗口多头自注意力）在两个连续层中的操作，用于在规则窗口和移位窗口内进行自注意力计算。
9.  **图表细节：** 包括自注意力机制示意图，多头自注意力机制示意图，整体模型架构图，窗口划分和反向过程图，移位窗口划分和反向过程图等。
    *   **图3：** 展示了整体模型架构，包括卷积层、层归一化（LN）、多层感知机（MLP）、下采样以及窗口划分和反向操作。
    *   **图4和图5：** 分别展示了规则窗口划分和移位窗口划分的过程，以及相应的反向操作。
10. **消融实验：**通过消融实验验证了层次结构和窗口移位的有效性。

**核心数据/图表/异常值:**
*   **表1:**  将本文提出的方法与基于CNN、GAN、CNN+Attention和Transformer的baseline方法在Market-1501、DukeMTMC-reID和MSMT17数据集上进行了比较。
*   **表2:**  展示了在Market-1501、DukeMTMC-reID和MSMT17数据集上进行消融实验的结果。结果表明，层次结构和窗口移位都有助于提高性能。
*   **表3:**  比较了不同方法的计算效率，包括FLOPs和运行时间。
*   **图6-8:** 展示了在Market-1501、DukeMTMC-reID和MSMT17数据集上的损失和top1错误曲线。
*   **图9-11:**  展示了在Market-1501、DukeMTMC-reID和MSMT17数据集上的ROC曲线。
*   **图12-14:** 展示了排序结果的例子。
*   **图15:**  展示了不同方法的特征可视化结果。

**结论解释/局限性/未来方向:**
*   **结论:** 本文提出的方法能够有效地聚合浅层细节信息和深层深度信息，从而实现更好的行人Re-ID性能。
*   **局限性:** 该方法对数据的依赖性较高，需要大量数据才能达到较好的性能。
*   **未来方向:** 未来的研究可以集中在如何减少Transformer模型对数据的依赖性，同时保持优异的性能。
