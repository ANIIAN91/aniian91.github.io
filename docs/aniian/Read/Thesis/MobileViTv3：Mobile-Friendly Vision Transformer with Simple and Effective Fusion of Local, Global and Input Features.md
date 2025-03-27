[MobileViT、MobileViTv2、MobileViTv3学习笔记（自用）-CSDN博客](https://blog.csdn.net/weixin_44911037/article/details/127515858)
[[2209.15159] MobileViTv3: Mobile-Friendly Vision Transformer with Simple and Effective Fusion of Local, Global and Input Features](https://arxiv.org/abs/2209.15159)
[[2209.15159v2.pdf]]


*   **英文标题:** MOBILEVITV3: MOBILE-FRIENDLY VISION TRANSFORMER with SIMPLE AND EFFECTIVE FUSION OF LOCAL, GLOBAL AND INPUT FEATURES
*   **中文标题:** MOBILEVITV3：具有简单有效的局部、全局和输入特征融合的移动友好视觉Transformer
*   **作者:** Shakti N. Wadekar, Abhishek Chaurasia
*   **期刊:** arXiv
*   **中文关键字:** MobileViT, 视觉Transformer, 卷积神经网络, 混合模型, 轻量级模型, 移动视觉, 特征融合, 模型缩放, 图像分类, 目标检测, 语义分割
*   **英文关键字:** MobileViT, Vision Transformer (ViT), Convolutional Neural Networks (CNN), Hybrid Model, Lightweight Model, Mobile Vision, Feature Fusion, Model Scaling, Image Classification, Object Detection, Semantic Segmentation
*   **论文发表时间:** 2022年10月6日 (v2 版本)

**摘要:**
MobileViT (MobileViTv1) 结合了卷积神经网络（CNN）和视觉Transformer（ViT）来为移动视觉任务创建轻量级模型。尽管主要的MobileViTv1块有助于实现具有竞争力的最新结果，但其内部的融合块（fusion block）会带来扩展性挑战并且学习任务复杂。本文提出对融合块进行简单而有效的修改，创建了MobileViTv3块，解决了扩展性问题并简化了学习任务。使用MobileViTv3块创建的MobileViTv3-XXS、XS和S模型在ImageNet-1k、ADE20K、COCO和PascalVOC2012数据集上均优于MobileViTv1。在ImageNet-1K上，MobileViTv3-XXS和MobileViTv3-XS分别比MobileViTv1-XXS和MobileViTv1-XS高出2%和1.9%。最近发布的MobileViTv2架构移除了融合块，并使用线性复杂度的Transformer，性能优于MobileViTv1。本文将提出的融合块添加到MobileViTv2架构中，创建了MobileViTv3-0.5、0.75和1.0模型。这些新模型在ImageNet-1k、ADE20K、COCO和PascalVOC2012数据集上相比MobileViTv2获得了更好的准确率。MobileViTv3-0.5和MobileViTv3-0.75在ImageNet-1K数据集上分别比MobileViTv2-0.5和MobileViTv2-0.75高出2.1%和1.0%。对于分割任务，MobileViTv3-1.0在ADE20K和PascalVOC2012数据集上相比MobileViTv2-1.0分别实现了2.07%和1.1%的mIOU提升。代码和训练好的模型已在GitHub上提供。

**背景/目标/创新点:**
*   **背景:**
    *   轻量级CNN（如MobileNets）在移动设备上效率高但精度有限。
    *   ViT性能好但计算量大。
    *   混合模型（CNN+ViT）试图结合两者的优点，MobileViTv1是其中一个针对移动端设计的代表。
    *   MobileViTv1中的融合块（Fusion Block）虽然有效，但其使用3x3卷积导致模型难以缩放（参数量/FLOPs随通道数二次方增长），且融合逻辑复杂。
    *   MobileViTv2为了解决v1的问题，完全移除了融合块，但可能损失了特征融合带来的好处。
*   **目标:**
    *   改进MobileViTv1的融合机制，使其更简单、有效，并解决其扩展性（scaling）问题。
    *   提升轻量级混合模型在移动视觉任务上的性能（准确率）。
    *   将改进的融合机制应用于MobileViTv2架构，验证其通用性。
*   **创新点:**
    *   **提出了MobileViTv3块，对MobileViTv1/v2块进行了四项简单而有效的修改：**
        1.  **Fusion块卷积替换:** 将融合块中的3x3卷积替换为1x1卷积，简化融合任务并解决扩展性瓶颈。
        2.  **Fusion块融合内容改变:** 融合（concatenate）*局部表示* 和 *全局表示* 的特征，而非v1中的*输入*和*全局表示*。
        3.  **Fusion块增加残差连接:** 在融合块的1x1卷积输出后，*加入输入特征*（Add input features），引入残差连接以帮助优化。
        4.  **Local块卷积替换:** 将局部表示块中的标准3x3卷积替换为*深度可分离（depthwise）3x3卷积*，以减少参数量和FLOPs。
    *   **验证了新融合块的有效性:** 基于MobileViTv1和MobileViTv2架构构建了MobileViTv3模型家族（XXS, XS, S 及 0.5, 0.75, 1.0），并在多个基准上超越了v1和v2。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **MobileViTv3 Block 设计 (对比 MobileViTv1/v2，见 Fig 2):**
    *   **输入:** 特征图 `Cin x H x W`。
    *   **局部表示块 (Local Representation Block):** 输入通过卷积层（MobileViTv3使用DWConv-3x3 + Conv-1x1，MobileViTv1使用Conv-3x3 + Conv-1x1）提取局部特征。
    *   **全局表示块 (Global Representation Block):** 局部特征经过 Unfold -> Transformer (xN) -> Fold 处理，得到具有全局信息的特征。MobileViTv3此处继承v1/v2的Transformer。
    *   **融合块 (Fusion Block):**
        *   **MobileViTv1:** 拼接(Concat) `输入特征` 和 `全局特征` -> `Conv-3x3` -> `Conv-1x1`。
        *   **MobileViTv2:** 无融合块，直接使用全局块的输出（经过线性变换）。
        *   **MobileViTv3:** 拼接(Concat) `局部特征` 和 `全局特征` -> `Conv-1x1` -> **Add** `输入特征` -> `Conv-1x1`。
    *   **输出:** `Cout x H x W`。
2.  **模型架构与扩展:**
    *   **MobileViTv3-XXS/XS/S:** 将MobileViTv1架构中的MobileViTv1块替换为MobileViTv3块，并通过调整网络宽度（通道数）进行缩放（见 Table 1）。保持层深度不变。
    *   **MobileViTv3-0.5/0.75/1.0:** 将MobileViTv2架构（使用线性复杂度的Transformer且无融合块）的最后加入一个*修改后的MobileViTv3融合块*（仅含1x1卷积和残差连接，不含局部/全局表示部分）。
3.  **实验设置:**
    *   **任务:** 图像分类 (ImageNet-1K), 语义分割 (ADE20K, PASCAL VOC 2012 using DeepLabv3), 目标检测 (COCO using SSD-Lite)。
    *   **训练:**
        *   分类：从头训练，使用AdamW，cosine学习率，不同模型系列采用不同batch size和数据增强策略（v3-S/XS/XXS用基础增强，v3-0.5/0.75/1.0用高级增强）。
        *   分割/检测：使用预训练模型进行微调。
    *   **评估指标:** Top-1 Accuracy (分类), mIOU (分割), mAP (检测), FLOPs, 参数量, Latency, Throughput。

**核心数据/图表/异常值:**
*   **Figure 1:** 展示了MobileViTv3模型在ImageNet准确率 vs 参数量图中的位置，显示其在<8M参数范围内具有竞争力，优于其他MobileViT变体和部分混合模型。
*   **Figure 2:** 清晰对比了MobileViTv1, v2, v3 块的结构差异，红色突出显示了v3的修改。
*   **Table 1:** MobileViTv3-S/XS/XXS架构细节及与v1的对比，显示了相似参数/FLOPs下的性能提升（+0.9% ~ +2.0%）。
*   **Table 2:** MobileViTv3各版本与MobileViTv1/v2在ImageNet上的详细性能对比，验证了v3在相似参数/FLOPs下均优于v1和v2。例如，v3-XXS比v1-XXS高2%，v3-0.5比v2-0.5高2.1%。
*   **Table 3:** 分割任务结果，显示MobileViTv3在PASCAL VOC和ADE20K上优于v1/v2。例如，v3-1.0在ADE20K上比v2-1.0高2.07% mIOU。
*   **Table 4:** 检测任务结果，显示MobileViTv3-XS比v1-XS高0.8% mAP，比MNASNet高2.6% mAP。
*   **Table 5:** 通过减少MobileViT块数量（layer4从4减到2）来优化延迟和吞吐量，展示了速度和精度的权衡。
*   **Table 6:** **Ablation Study**。逐步验证了对MobileViTv1-S进行的四项修改的贡献：3x3->1x1 (+1.1%), Local-Concat (vs Input-Concat, +1.0%), Input-Add (+0.6%), DWConv (vs Conv, -0.3%但减参数)。最终模型(v3-S unscaled)比v1-S基线高1.3%。
*   **Table 7:** 300 epochs训练结果，验证了缩放后的MobileViTv3-S比v1-S有显著提升(+0.9%)。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   通过对MobileViT融合块进行简单的修改（1x1卷积替代3x3，融合局部+全局特征，添加输入残差连接）可以有效解决其扩展性问题，简化学习任务，并显著提升模型在分类、分割、检测任务上的性能。
    *   将这种改进的融合块应用于MobileViTv2也能带来性能提升。
    *   在局部表示块中使用深度可分离卷积可以在几乎不损失精度的情况下减少参数。
*   **局限性:**
    *   MobileViTv3的FLOPs相比纯CNN的轻量级模型仍然偏高，这继承自ViT的自注意力机制。
    *   模型性能提升可能部分依赖于训练设置（如batch size）。
*   **未来方向:**
    *   进一步优化自注意力模块以降低FLOPs和延迟。
    *   将所提出的融合思想探索应用于其他混合模型架构。

**参考文献追踪:**
*   **核心基础:** MobileViTv1 (Mehta & Rastegari, 2021), MobileViTv2 (Mehta & Rastegari, 2022)。
*   **对比模型:** MobileNets (v1/v2/v3), ShuffleNets (v1/v2), EfficientNet, ResNet, DenseNet, SwinT, DeiT, PVT, MViT, CMT, CvT, ResT, MobileFormer, CoAtNet, PiT, LVT, ViTAE, CeiT, XCiT, CrossViT, etc.
*   **数据集:** ImageNet, COCO, ADE20K, PASCAL VOC 2012。
*   **相关技术:** Vision Transformer (ViT), CNN, Hybrid Models, DeepLabv3, SSD-Lite, Depthwise Convolution, Model Scaling。

**补充材料（代码/附录）:**
*   **代码/模型:** `https://github.com/micronDLA/MobileViTv3`
*   **附录:** 包含目标检测和语义分割结果的可视化图（Figure 4, 5, 6, 7）。