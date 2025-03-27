- [arxiv.org/pdf/2103.14030](https://arxiv.org/pdf/2103.14030)
- ["Swin Transformer: Hierarchical Vision Transformer using Shifted Windows".](https://github.com/microsoft/Swin-Transformer)
- [[../../docs/2103.14030v2.pdf]]


*   **英文标题:** Swin Transformer: Hierarchical Vision Transformer using Shifted Windows
*   **中文标题:** Swin Transformer：基于移动窗口的分层视觉Transformer
*   **作者:** Ze Liu, Yutong Lin, Yue Cao, Han Hu, Yixuan Wei, Zheng Zhang, Stephen Lin, Baining Guo (Microsoft Research Asia)
*   **期刊:** arXiv (后发表于 ICCV 2021)
*   **中文关键字:** 视觉Transformer, 分层表示, 移动窗口, 自注意力, 计算机视觉, 通用骨干网络
*   **英文关键字:** Vision Transformer, Hierarchical Representation, Shifted Windows, Self-Attention, Computer Vision, General-Purpose Backbone
*   **论文发表时间:** 2021年8月17日 (v2 版本)

**摘要:**
本文提出了一种新的视觉Transformer，称为Swin Transformer，它可以有效地作为计算机视觉的通用骨干网络。将Transformer从语言领域应用于视觉领域面临诸多挑战，这些挑战源于两个领域之间的差异，例如视觉实体尺度的巨大变化，以及与文本中的单词相比，图像中像素的高分辨率。为了解决这些差异，我们提出了一种分层Transformer，其表示是通过移动窗口（Shifted Windows）计算的。移动窗口方案通过将自注意力计算限制在不重叠的局部窗口内来提高效率，同时也允许跨窗口连接。这种分层架构具有在不同尺度上建模的灵活性，并且计算复杂度相对于图像大小呈线性关系。Swin Transformer的这些特性使其能够兼容广泛的视觉任务，包括图像分类（在ImageNet-1K上达到87.3% top-1准确率）和密集的预测任务，如目标检测（在COCO test-dev上达到58.7 box AP和51.1 mask AP）和语义分割（在ADE20K val上达到53.5 mIoU）。其性能大幅超越了之前的SOTA，COCO上提升了+2.7 box AP和+2.6 mask AP，ADE20K上提升了+3.2 mIoU，展示了基于Transformer的模型作为视觉骨干网络的潜力。分层设计和移动窗口方法也被证明对全MLP架构有益。代码和模型已公开。

**背景/目标/创新点:**
*   **背景:**
    *   计算机视觉长期由CNN主导。NLP领域则由Transformer主导。
    *   将Transformer应用于视觉存在挑战：1）视觉目标的尺度变化大；2）图像分辨率高，导致标准Transformer（如ViT）的全局自注意力计算复杂度（与图像大小成二次方关系）过高，难以处理高分辨率图像或用于需要密集预测的任务。
    *   ViT产生的特征图分辨率单一且较低，不适合作为通用视觉任务的骨干网络。
*   **目标:**
    *   开发一种Transformer架构，使其能像CNN一样，作为多种视觉任务的通用骨干网络。
    *   解决标准ViT在处理视觉信号时的尺度变化和计算复杂度问题。
*   **创新点:**
    *   **分层特征图 (Hierarchical Feature Maps):** 模仿CNN，通过在网络深层逐步合并图像块（Patch Merging），构建不同分辨率的特征图。这使得模型可以灵活地应用于需要多尺度信息的密集预测任务（如检测、分割）。
    *   **基于窗口的自注意力 (Window based Self-Attention, W-MSA):** 在不重叠的局部窗口内计算自注意力，将计算复杂度从与图像大小的二次方关系降低到线性关系。
    *   **移动窗口自注意力 (Shifted Window Self-Attention, SW-MSA):** 在连续的Transformer块之间交替使用常规窗口划分和移动后的窗口划分。移动窗口机制使得相邻但不重叠的窗口之间能够进行信息交互，增强了模型的建模能力，同时保持了计算的高效性。
    *   **相对位置偏置 (Relative Position Bias):** 在自注意力计算中引入相对位置编码，有效提升了模型性能。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **整体架构 (Overall Architecture - Figure 3a):**
    *   **输入:** RGB图像 (H x W x 3)。
    *   **阶段1 (Stage 1):**
        *   **Patch Partition:** 将图像分割成`4x4`大小的不重叠块 (Patch)。每个块被视为一个"token"。特征维度变为 `(H/4) x (W/4) x 48`。
        *   **Linear Embedding:** 将每个块的原始像素值（48维）线性映射到维度`C`（例如Swin-T为96）。特征维度变为 `(H/4) x (W/4) x C`。
        *   **Swin Transformer Blocks:** 应用一系列（例如Swin-T为2个）Swin Transformer块进行特征学习。特征图大小和维度(`(H/4) x (W/4) x C`)保持不变。
    *   **阶段2 (Stage 2):**
        *   **Patch Merging:** 将`2x2`相邻块的特征在通道维度上连接（Concatenate），特征维度变为 `(H/8) x (W/8) x 4C`。然后应用一个线性层将维度降为`2C`。特征图分辨率减半，通道数加倍。数据流：`(H/4, W/4, C)` -> `(H/8, W/8, 2C)`。
        *   **Swin Transformer Blocks:** 应用一系列Swin Transformer块。特征图大小和维度(`(H/8) x (W/8) x 2C`)保持不变。
    *   **阶段3 & 4:** 重复**Patch Merging**和**Swin Transformer Blocks**的过程。每次分辨率减半，通道数加倍。最终产生具有`H/4`, `H/8`, `H/16`, `H/32`四种不同分辨率的特征图，通道数分别为`C`, `2C`, `4C`, `8C`。
2.  **Swin Transformer块 (Swin Transformer Block - Figure 3b):**
    *   这是核心计算单元，替代了标准Transformer块。包含两个主要修改后的组件，并保持了残差结构。
    *   **输入:** `z^(l-1)`。
    *   **第一个子模块:**
        *   `LN(z^(l-1))`: 先进行层归一化 (LayerNorm)。
        *   `W-MSA(...)` 或 `SW-MSA(...)`: 应用窗口多头自注意力或移动窗口多头自注意力。
        *   `ẑ^l = W-MSA/SW-MSA(LN(z^(l-1))) + z^(l-1)`: 残差连接。
    *   **第二个子模块:**
        *   `LN(ẑ^l)`: 再次进行层归一化。
        *   `MLP(...)`: 应用一个标准的2层MLP（包含GELU激活）。
        *   `z^l = MLP(LN(ẑ^l)) + ẑ^l`: 残差连接。
    *   **关键:** 连续的两个Swin Transformer块分别使用**W-MSA**和**SW-MSA**，以实现窗口间的信息交互 (Eq. 3)。
3.  **移动窗口自注意力 (Shifted Window Self-Attention - Section 3.2, Figure 2):**
    *   **W-MSA:** 将特征图划分为`M x M`（例如`7x7`）的不重叠窗口，在每个窗口内独立计算多头自注意力。这限制了计算量，使其与图像大小成线性关系。数据在窗口内部传递。
    *   **SW-MSA:** 在下一个块中，将窗口划分网格相对于上一层移动`([M/2], [M/2])`个像素。这样，新的窗口会跨越上一层窗口的边界，从而允许信息在不同窗口之间流动。
    *   **高效计算 (Efficient Batch Computation - Figure 4):** 为了避免在SW-MSA中因窗口大小不一而进行填充(padding)导致的低效，采用**循环移位 (Cyclic Shift)**。将特征图向左上角循环移动`(M/2, M/2)`像素，然后执行常规的W-MSA。计算注意力时使用掩码(masking)来确保只在逻辑上属于同一个移动前窗口的块之间计算注意力。计算完毕后，再将特征图循环移位回去。这样可以在不增加窗口数量的情况下实现移动窗口的效果。
4.  **相对位置偏置 (Relative Position Bias - Eq. 4):**
    *   在计算注意力分数时，为每个查询(Query)和键(Key)对增加一个可学习的相对位置偏置`B`：`Attention = SoftMax(QKᵀ / √d + B)V`。
    *   偏置`B`根据查询和键在窗口内的相对坐标进行参数化（使用一个小的可学习矩阵`B̂`索引得到），为模型提供了平移不变性的有效归纳偏置。

**核心数据/图表/异常值:**
*   **Figure 1:** 直观对比Swin Transformer（分层，局部窗口注意力）和ViT（单分辨率，全局注意力）的结构差异和计算复杂度。
*   **Figure 2:** 核心机制图示，展示了常规窗口划分和移动窗口划分。
*   **Figure 3:** (a) Swin-T模型的整体分层架构；(b) 两个连续Swin Transformer块的结构，展示W-MSA和SW-MSA的交替使用。
*   **Figure 4:** SW-MSA的高效计算方法——循环移位图示。
*   **Table 1:** 不同大小Swin模型（T/S/B/L）在ImageNet分类任务上的性能、参数量、FLOPs和吞吐量对比，展示了其优越性（优于DeiT和CNNs）。
*   **Table 2:** 在COCO目标检测和实例分割任务上的性能对比，Swin Transformer显著优于ResNe(X)t和DeiT，并刷新SOTA记录。
*   **Table 3:** 在ADE20K语义分割任务上的性能对比，同样大幅超越之前方法，刷新SOTA记录。
*   **Table 4:** 消融实验，验证了**移动窗口 (shifted windows)** 和**相对位置偏置 (relative position bias)** 对模型性能的关键贡献。
*   **Table 5 & 6:** 对比了不同自注意力计算方法（滑动窗口、Performer、Swin）的实际推理速度和准确率，证明Swin的移动窗口方法在效率和效果上均有优势。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   Swin Transformer 是一种有效的视觉骨干网络，可用于多种视觉任务。
    *   其分层结构和移动窗口自注意力机制成功解决了标准ViT在处理视觉任务时的尺度问题和计算复杂度问题。
    *   移动窗口机制在保持线性计算复杂度的同时，实现了跨窗口的信息交互，是模型成功的关键。
    *   相对位置偏置是提升性能的重要因素。
    *   在图像分类、目标检测、语义分割等任务上取得了SOTA性能。
*   **局限性:**
    *   虽然计算复杂度是线性的，但移动窗口的实现（特别是循环移位和掩码）相比标准卷积或全局注意力增加了一些实现上的复杂性。
    *   像其他基于Transformer的模型一样，可能需要大规模数据集预训练才能达到最佳性能（尽管本文也展示了在ImageNet-1K上训练的效果）。
*   **未来方向:**
    *   将Swin Transformer应用于更多的视觉任务和模态（如视频）。
    *   探索其在视觉-语言联合建模中的应用。
    *   进一步优化窗口注意力机制或探索其他高效注意力模式。

**参考文献追踪:**
*   **Attention Is All You Need (Vaswani et al., 2017):** 原始Transformer。
*   **An Image is Worth 16x16 Words (Dosovitskiy et al., 2020):** ViT，直接启发了视觉Transformer。
*   **Training data-efficient image transformers... (Touvron et al., 2020):** DeiT，ViT的重要改进和基线。
*   **ResNet, ResNeXt, EfficientNet, RegNet等:** CNN的代表性骨干网络，用于性能比较。
*   **FPN, U-Net:** 利用了分层特征的经典密集预测网络。
*   **Local relation networks (Hu et al., 2019), Stand-alone self-attention (Ramachandran et al., 2019):** 早期在视觉中使用局部自注意力的工作。
*   **Papers on relative position bias (e.g., Shaw et al. 2018, Raffel et al. 2020):** 提供了相对位置编码的思路。

**补充材料（代码/附录）:**
*   **代码/模型:** 在GitHub公开: `https://github.com/microsoft/Swin-Transformer`
*   **附录:** 包含详细的架构规格 (Table 7)，不同输入尺寸下的性能 (Table 8)，不同优化器的比较 (Table 9)，以及Swin MLP-Mixer的实验 (Table 10) 等。

