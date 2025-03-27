[[../../docs/2502.10120v1.pdf]]
https://arxiv.org/html/2502.10120v1

**1. 英文标题:** Compress image to patches for Vision Transformer
**2. 中文标题:** 压缩图像到 Patches 以用于 Vision Transformer
**3. 作者:** Xinfeng Zhao, Yaoru Sun
**4. 期刊:** arXiv preprint arXiv:2502.10120v1

**5. 摘要:**
Vision Transformer (ViT) 在计算机视觉领域取得了显著进展。然而，随着模型深度和输入图像分辨率的增加，与训练和运行 ViT 模型相关的计算成本急剧增加。本文提出了一种基于 CNN 和 Vision Transformer 的混合模型，名为 CI2P-ViT。该模型结合了一个名为 CI2P 的模块，该模块利用 CompressAI 编码器来压缩图像，并随后通过一系列卷积生成 patches 序列。CI2P 可以取代 ViT 模型中的 Patch Embedding 组件，实现与现有 ViT 模型的无缝集成。与 ViT-B/16 相比，CI2P-ViT 输入到自注意力层的 patches 数量减少到原来的四分之一。这种设计不仅显著降低了 ViT 模型的计算成本，而且通过引入 CNN 的归纳偏置特性，有效地提高了模型的准确性。ViT 模型的精度显著提高。当在 Animals-10 数据集上从头开始训练时，CI2P-ViT 的准确率达到了 92.37%，比 ViT-B/16 基线提高了 3.3%。此外，该模型的计算操作（以每秒浮点运算次数 (FLOPs) 衡量）减少了 63.35%，并且在相同的硬件配置下，训练速度提高了 2 倍。

**6. 背景/目标/创新点:**
* **背景:**
    * 卷积神经网络 (CNNs) 在计算机视觉领域捕捉局部特征方面表现出色，但在捕捉全局信息和长距离依赖方面存在局限性。
    * Vision Transformer (ViT) 通过自注意力机制擅长捕捉全局依赖，但在数据需求和计算成本上高于 CNNs。
    * ViT 缺乏 CNNs 的归纳偏置 (如局部相关性和平移不变性)，训练需要更多数据和计算资源。
    * 现有 ViT 变体和 CNN-Transformer 混合模型旨在结合两者优势，提升性能和效率，但可能存在信息损失或结构复杂化问题。
    * 已有 CNN-Transformer 混合模型利用 CNN backbone 提取特征图再输入 ViT，但 CNN 下采样可能损失图像细节，且 CNN backbone 的预训练和微调增加了复杂性。

* **目标:**
    * 降低 ViT 模型的计算成本，尤其是自注意力层的 FLOPs。
    * 提升 ViT 模型的精度，尤其是在数据有限的情况下。
    * 设计一种混合模型，兼具 CNN 的局部特征提取能力和 ViT 的全局信息捕捉能力。
    * 提出一种更简洁高效的 ViT 改进方案，保持 ViT 的原始架构，易于扩展和应用于多模态研究。
    * 利用 CNN 的归纳偏置提升 ViT 性能，同时尽可能保留图像的原始视觉信息。

* **创新点:**
    * **提出了 CI2P 模块 (Compress Image to Patches)。** 这是一个基于 CNN 的模块，可作为 ViT 的 Patch Embedding 层的即插即用组件，保留 ViT 结构的同时融入 CNN 归纳偏置。
    * **创新性地将 CNN-based 图像压缩技术 CompressAI 与 ViT 框架结合。** 利用 CompressAI 的编码器压缩图像，降低输入 ViT 的数据维度，显著减少 FLOPs。
    * **提出的 CI2P 模块，在降低数据维度的同时，力求最大程度保留图像的视觉信息。** 与传统 CNN 下采样方法不同，CI2P  Encoder 通过预训练，力求在压缩的同时保持图像质量。
    * **提出的 CI2P-ViT 混合模型及其双尺度注意力变体 CI2P-ViTds。**  实验验证了模型在图像分类任务上的有效性，在精度和计算效率上均有提升。
    * **CI2P 模块的参数在 ViT 训练期间被冻结。** 这减少了训练计算量，并确保性能提升主要归功于 ViT 本身的优化，便于消融研究和结构探索。

**7. 方法/实验设计/技术细节:**
* **CI2P 模块:**
    * **CI2P-Encoder:**  图像压缩单元，基于 CompressAI 库中的 `bmshj2018_factorized(quality=5)` 模型的 encoder 部分。该模型基于 CNN 的端到端图像压缩算法，通过 encoder 将图像压缩为低维 latent 表示 `y[c*d*d, hd, wd]`， decoder 负责从 latent 表示重建图像，loss function 包含 MSE loss 和码率 loss。
    * **CI2P-PatchReshape:** 维度调整组件，将压缩后的图像 `y[c*d*d, hd, wd]` 调整为 ViT 模型所需的输入维度。通过卷积操作 (Inverted Residual Network Units from MobileNet)，将空间维度减半，通道维度增加四倍，最终输出形状 `[768, 8x8]`，再 flatten 成 `[N, D]` 输入 ViT。

* **CI2P-ViT 模型:**
    * **架构:**  将 ViT 的 Patch Embedding 层替换为 CI2P 模块，其余结构与 ViT-B/16 保持一致。
    * **输入:** 图像
    * **Patch Embedding:** CI2P 模块
    * **Transformer Encoder:**  与 ViT-B/16 相同的 Transformer Encoder 结构 (D=768, 12 attention heads, MLP hidden dim=3072)。
    * **输出:** Global Average Pooling (GAP) 后的特征，线性分类器输出预测结果。
    * **训练:** CI2P-Encoder 参数冻结，只训练 ViT 部分。

* **CI2P-ViTds 模型 (双尺度注意力机制):**
    * **架构:** 在 CI2P-ViT 基础上引入双尺度注意力机制。
    * **Scale 1 (Large Scale):**  CI2P 模块输出 `[192, 16x16]`，前 6 层 ViT attention layer 使用维度 D=192 进行计算。
    * **Dimension Reshape:** inverted residual network units 调整维度为 `[768, 8x8]` (CnnReshape 模块)。
    * **Scale 2 (Small Scale):** 后 6 层 ViT attention layer 使用维度 D=768 进行计算。
    * **输出:** 融合双尺度特征。
    * **PatchReshape 和 CnnReshape 模块:**  均使用 MobileNet 的 inverted residual network units。

* **实验设置:**
    * **数据集:** Animals-10 (从头开始训练), ImageNet (从头开始训练)。
    * **基线模型:** ViT-B/16, CNN-ViT (控制模型)。
    * **训练框架:** mmlab。
    * **优化器:** Adam (β1=0.9, β2=0.999)。
    * **学习率:** 1e-04 (初始学习率)。
    * **数据增强:** 随机水平翻转 (概率 0.5)。
    * **训练 epoch:** 300。

* **评估指标:**  Animals-10 validation accuracy, ImageNet Top-1 validation accuracy, FLOPs, 模型参数量, 训练时间。

**8. 核心数据/图表/异常值:**
* **核心数据:**
    * **Animals-10 数据集:** CI2P-ViT 准确率 92.37%， ViT-B/16 准确率 89% (提升 3.3%)，CNN-ViT 准确率 88.5% (低于 CI2P-ViT 3.86%)。 CI2P-ViT 训练时间约 9 小时, ViT-B/16 约 20 小时 (训练速度提升 2 倍)。FLOPs 降低 63.35%。
    * **ImageNet 数据集:** CI2P-ViT Top-1 准确率 72.9%， CI2P-ViTds Top-1 准确率 77%。
    * **表 1:** ImageNet Top-1 准确率对比，CI2P-ViTds 达到 77%, 与 ViT-B/16 的 77.91% 接近，但 FLOPs 和参数量更低。
    * **表 2:** FLOPs 对比，CI2P-ViT 和 CI2P-ViTds 相比 ViT 在不同图像尺寸下 FLOPs 显著降低 (63% - 75% 降低)。
    * **模型参数量:** ViT-B/16 (86M), CI2P-ViT (88.96M), CI2P-ViTds (49.7M)。 CI2P-ViT 参数量略增， CI2P-ViTds 参数量大幅降低。

* **核心图表:**
    * **图 1:** CI2P 模块概述图，展示 CI2P 替换 Patch Embedding 模块，并降低 FLOPs。
    * **图 2:** CI2P 模块结构图，展示 CI2P-Encoder 和 CI2P-PatchReshape 组成。
    * **图 3:** CI2P-ViTds 双尺度注意力机制结构图。
    * **图 4:** PatchReshape 和 CnnReshape 模块细节 (inverted residual network units)。
    * **图 5:** Animals-10 validation accuracy 曲线图，展示 CI2P-ViT 训练过程准确率高于 ViT-B/16。

* **异常值/讨论:**
    * CNN-ViT 控制实验表明，单纯使用 CNN 特征图作为 ViT 输入无法有效提升精度，CI2P 的图像信息保留和 CNN 归纳偏置的结合才是关键。
    * CI2P-ViT 在 ImageNet 上的精度略低于 SOTA ViT 变体，但考虑到训练设置和 CI2P-Encoder 仍有提升空间，未来性能有望提升。
    * CI2P-ViT 模型参数量略有增加，但 FLOPs 显著降低，CI2P-ViTds 模型参数量和 FLOPs 均大幅降低，具有轻量化优势。

**9. 结论解释/局限性/未来方向:**
* **结论解释:**
    * CI2P 模块成功地替换了 ViT 的 Patch Embedding 层，并且有效降低了 ViT 模型的计算复杂度。
    * CI2P 模块在降低图像数据维度的同时，较好地保留了图像的视觉信息。
    * CI2P 模块通过 CNN 的归纳偏置，提升了 ViT 模型的精度，并在 Animals-10 数据集上取得了 3.3% 的精度提升。
    * CI2P-ViT 模型在计算效率和精度之间取得了更好的平衡。
    * CI2P 技术在大尺寸图像和复杂 ViT 模型中潜力巨大，能为视觉任务提供更高效、更精确的解决方案。

* **局限性:**
    * CI2P-ViT 在 ImageNet 数据集上的精度仍有提升空间，尚未达到 SOTA ViT 变体的水平。
    * CI2P 模块的性能依赖于 CompressAI 中图像压缩模型的性能，未来可尝试更先进的图像压缩技术。
    * CI2P-ViTds 的双尺度注意力机制虽然降低了参数量和 FLOPs，但在 ImageNet 上的精度提升有限，可能需要进一步优化双尺度融合策略。
    *  论文主要在图像分类任务上验证了 CI2P-ViT 的有效性，在其他视觉任务 (目标检测、语义分割等) 上的性能需要进一步评估。

* **未来方向:**
    * 探索更先进的 CNN-based 图像压缩技术 (CompressAI 库或其他)，提升 CI2P 模块的压缩效率和图像信息保留能力。
    * 进一步优化 CI2P-ViTds 的双尺度注意力机制，探索更有效的多尺度特征融合方法。
    * 将 CI2P-ViT 应用于更多视觉任务 (目标检测、语义分割、视频处理等), 验证其通用性和性能优势。
    * 研究 CI2P 模块在不同 ViT 变体 (Swin Transformer, DeiT 等) 中的应用潜力。
    * 探索 CI2P 模块在多模态应用中的潜力。

**10. 参考文献追踪:**
* **关键参考文献:**
    * ViT [7]: Vision Transformer 模型，本文的基线模型。
    * CompressAI [13]:  图像压缩库，CI2P-Encoder 的基础。
    * DeiT [10]:  Data-efficient Image Transformer，ViT 的改进模型，本文对比模型。
    * Swin Transformer [8]:  Swin Transformer，ViT 的高效变体，本文对比模型。
    * CNN 相关文献 [1, 2, 3, 4]:  CNN 的相关工作，背景介绍和对比。
    * MobileNet [17]:  MobileNet， CI2P-PatchReshape 和 CnnReshape 模块中 inverted residual network units 的来源。

* **参考文献整体方向:**
    * **Vision Transformer (ViT) 及其变体 (DeiT, Swin Transformer, CVT, CeiT, T2T-ViT, TNT-B, CPVT-B):**  ViT 及其改进模型，是本文研究的核心对象和对比基线。
    * **CNN (特别是轻量级 CNN, MobileNet):**  CNN 在计算机视觉领域的地位，本文借鉴 CNN 的归纳偏置和压缩技术。
    * **图像压缩 (CompressAI,  Ball ́e 等图像压缩模型):**  图像压缩技术，CI2P 模块的核心技术。
    * **混合模型 (CNN-Transformer Hybrid Model, CvT, CeiT):**  CNN-Transformer 混合模型，本文的类别和对比对象之一。

