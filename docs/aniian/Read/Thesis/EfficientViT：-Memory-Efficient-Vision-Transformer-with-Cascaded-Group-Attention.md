- 论文链接：[https://arxiv.org/abs/2305.07027](https://arxiv.org/abs/2305.07027)
- 论文项目：[https://github.com/microsoft/Cream/tree/main/EfficientViT](https://github.com/microsoft/Cream/tree/main/EfficientViT)
- [CVPR 2023 | EfficientViT: Memory Efficient Vision Transformer with Cascaded Group Attention-CSDN博客](https://blog.csdn.net/P_LarT/article/details/130687567)
- 2305.07027v1.pdf})

*   **英文标题:** EfficientViT: Memory Efficient Vision Transformer with Cascaded Group Attention
*   **中文标题:** EfficientViT：具有级联分组注意力的内存高效视觉Transformer
*   **作者:** Xinyu Liu, Houwen Peng, Ningxin Zheng, Yuqing Yang, Han Hu, Yixuan Yuan
*   **期刊:** arXiv (Cornell University)
*   **中文关键字:** 视觉Transformer, 高效模型, 推理速度, 内存效率, 多头自注意力, 注意力冗余, 级联分组注意力, 三明治布局, 参数重分配
*   **英文关键字:** Vision Transformer (ViT), Efficient Models, Inference Speed, Memory Efficiency, Multi-Head Self-Attention (MHSA), Attention Redundancy, Cascaded Group Attention (CGA), Sandwich Layout, Parameter Reallocation
*   **论文发表时间:** 2023年5月11日 (v1 版本)

**摘要:**
视觉Transformer（ViT）因其高模型能力而取得了巨大成功。然而，其卓越性能伴随着沉重的计算成本，使其不适用于实时应用。本文提出了一个名为EfficientViT的高速视觉Transformer家族。作者发现现有Transformer模型的速度通常受限于内存效率低的操作，特别是多头自注意力（MHSA）中的张量重塑（tensor reshaping）和逐元素函数（element-wise functions）。因此，作者设计了一种新的具有“三明治布局”（sandwich layout）的构建块，即在高效的前馈网络（FFN）层之间使用单个内存密集型MHSA层，这在增强通道通信的同时提高了内存效率。此外，作者发现注意力图在不同头之间共享高度相似性，导致计算冗余。为解决此问题，作者提出了一种**级联分组注意力（Cascaded Group Attention, CGA）** 模块，该模块为不同的注意力头提供完整特征的不同分片（split），这不仅节省了计算成本，还提高了注意力多样性。全面的实验表明，EfficientViT在速度和准确性之间取得了良好的权衡，优于现有的高效模型。例如，EfficientViT-M5在准确率上超过MobileNetV3-Large 1.9%，同时在Nvidia V100 GPU和Intel Xeon CPU上的吞吐量分别提高了40.4%和45.2%。与最近的高效模型MobileViT-XXS相比，EfficientViT-M2在准确率上高出1.8%，同时在GPU/CPU上的运行速度快5.8倍/3.7倍，转换为ONNX格式后快7.4倍。代码和模型已发布。

**背景/目标/创新点:**

*   **背景:**
    *   标准ViT模型性能强大，但计算量和内存访问开销大，推理速度慢，不适合实时应用。
    *   现有高效ViT研究多关注减少FLOPs或参数量，但这与实际推理速度（吞吐量）并非直接相关。
    *   ViT的实际速度瓶颈主要在于**内存效率低**的操作（如MHSA中的张量重塑、逐元素操作），而非纯粹的计算量。
    *   MHSA中的多个注意力头之间存在计算冗余（学习相似的投影）。
    *   现有轻量级模型对参数分配（如Q, K, V, FFN维度）的考虑不足。
*   **目标:**
    *   设计一个真正具有高推理速度（高吞吐量）的ViT模型家族。
    *   系统性地分析并解决影响ViT推理速度的瓶颈：内存访问、计算冗余和参数使用。
*   **创新点:**
    *   **识别并强调内存效率是ViT速度的关键瓶颈:** 通过分析发现MHSA中的张量重塑和逐元素操作是主要的内存密集型操作，限制了推理速度。
    *   **提出"三明治布局"（Sandwich Layout）构建块:** 将内存密集但重要的MHSA层夹在多个内存高效的FFN层之间（`FFN -> MHSA -> FFN`），减少MHSA使用频率，降低内存访问开销，同时利用FFN进行通道通信。
    *   **提出级联分组注意力（Cascaded Group Attention, CGA）:** 模仿分组卷积，将输入特征沿通道维度分割成组，每个注意力头处理一个组（split）；同时，将前一个头的输出添加到后一个头的输入中（级联），以此减少计算冗余、提高注意力多样性并增加网络有效深度。
    *   **参数重分配策略:** 基于对模型剪枝的分析（V比QK更重要），重新分配网络参数，为V投影分配相对较大的通道维度，缩减QK投影和FFN扩展比，提高参数效率。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **效率瓶颈分析 (Sec 2):**
    *   **内存效率:** 通过运行时分析（Fig 2），确认MHSA中的张量重塑、层归一化、逐元素加法等操作是内存密集型（Memory-Bound）的。实验表明（Fig 3），降低模型中MHSA层的比例（如降至20%-40%）有助于在保持（甚至提升）精度的同时提高内存效率。
    *   **计算效率:** 通过计算不同注意力头之间的最大余弦相似度（Fig 4），发现尤其是后期层中的注意力头存在高度相似性，表明计算冗余。提出解决方案：给不同头喂不同的特征分割（Group Attention）。
    *   **参数效率:** 通过对Swin-T和DeiT-T进行泰勒结构化剪枝（Taylor structured pruning）分析（Fig 5），发现Q、K投影和FFN层比V投影具有更高的冗余度。这表明V投影需要相对更大的通道维度来保留信息。
2.  **EfficientViT构建块 (Fig 6b):**
    *   **三明治布局 (Sandwich Layout):** 核心结构为 `FFN -> MHSA (CGA) -> FFN`。在FFN之前可选地加入一个Token Interaction层（使用Depthwise Convolution实现）来引入局部归纳偏置。
    *   **级联分组注意力 (CGA) (Fig 6c, Eq 2, 3):**
        *   输入特征 `X_i` 沿通道维度分成 `h` 组 `X_i1, ..., X_ih`。
        *   第 `j` 个头计算注意力 `Attn(X'_ij W_Q, X_ij W_K, X_ij W_V)`，其中 `X'_ij = X_ij + X̃_i(j-1)` 是当前组特征与上一个头 (`j-1`) 输出 `X̃_i(j-1)` 的和（级联机制）。
        *   所有头的输出 `X̃_i1, ..., X̃_ih` 被拼接 (`Concat`) 并通过一个线性投影层 `W_P` 得到最终输出 `X_i+1`。
    *   **参数重分配:** QK投影的维度设得较小；V投影的维度允许与输入嵌入维度相同；FFN的扩展比从传统的4减少到2。
3.  **EfficientViT网络架构 (Fig 6a, Table 1):**
    *   **整体结构:** 采用分层（Hierarchical）设计，包含3个阶段。
    *   **输入:** 使用重叠的Patch Embedding（16x16）。
    *   **下采样:** 在每个阶段之间使用一个包含Inverted Residual Block（替代自注意力层）的特殊三明治块进行2倍下采样。
    *   **标准化与激活:** 整个网络使用BatchNorm (BN) 代替LayerNorm (LN) 以便推理时融合，使用ReLU代替GELU/HardSwish以提高速度和兼容性。
    *   **模型家族:** 通过调整宽度（C_i）、深度（L_i）和头的数量（H_i）构建了从M0到M5的六个模型变体。
4.  **实验设置:**
    *   **ImageNet分类:** 从头训练300 epochs，使用AdamW优化器、Cosine学习率调度、Mixup、AutoAugment、Random Erasing等数据增强。
    *   **速度测试:** 在Nvidia V100 GPU (FP16)、Intel Xeon CPU (FP32)、ONNX Runtime环境下测试吞吐量。
    *   **下游任务:** 在CIFAR-10/100、Flowers、Cars、Pets上进行分类微调；在COCO上使用RetinaNet进行目标检测。
    *   **消融实验:** 针对三明治布局、FFN层数N、CGA机制（vs MHSA, vs 无级联）、参数重分配策略、DWConv、BN vs LN、ReLU vs HardSwish等关键设计进行了消融研究 (Table 6)。

**核心数据/图表/异常值:**
*   **Figure 1:** 展示了EfficientViT系列模型在GPU吞吐量-ImageNet准确率坐标系中的帕累托前沿地位，显著优于其他高效CNN（MobileNetV3, ShuffleNetV2, GhostNet, EfficientNet）和ViT（MobileViT, EdgeViT, PVT, Mobile-Former）。
*   **Table 2:** 详细对比了EfficientViT各型号与SOTA高效模型的FLOPs、参数量、GPU/CPU/ONNX吞吐量和ImageNet准确率。例如，EfficientViT-M5（77.1% Acc, 12.4M Params, 0.5G Flops）比MobileNetV3-Large（75.2% Acc, 5.4M Params, 0.2G Flops）准确率高1.9%，GPU/CPU速度快40.4%/45.2%。EfficientViT-M2（70.8% Acc, 4.2M Params）比MobileViT-XXS（69.0% Acc, 1.3M Params）准确率高1.8%，GPU/CPU/ONNX速度快5.8x/3.7x/7.4x。
*   **Figure 3:** 显示了降低MHSA层比例（约20-40%）能在保证（甚至提高）模型精度的前提下，获得更高吞吐量的子网络。
*   **Figure 4:** 显示了标准MHSA中注意力头之间存在高相似性，而使用特征分割（CGA的基础）可以降低这种相似性。
*   **Figure 5:** 参数剪枝重要性分析，显示V投影的通道比QK投影和FFN更重要，支持参数重分配策略。
*   **Table 6:** 消融研究验证了各项设计的有效性：三明治布局（对比Swin block）提升3.0% Acc；N=1 FFN最佳；CGA比MHSA提升1.1% Acc；参数重分配提升1.4%/1.5% Acc；DWConv提升1.4% Acc；BN比LN提升0.9% Acc；ReLU比HardSwish在ONNX上快20%。
*   **Table 7:** 1000 epoch训练和知识蒸馏结果，显示EfficientViT-M4性能优于LeViT-128S。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   ViT的推理速度瓶颈主要在于MHSA中的内存密集型操作，而非纯粹的FLOPs。
    *   通过采用“三明治布局”减少MHSA使用频率，使用“级联分组注意力”降低计算冗余和提升多样性，以及进行“参数重分配”提高参数效率，可以显著提升ViT的实际推理速度。
    *   EfficientViT模型家族在速度和精度上达到了SOTA水平，证明了所提方法的有效性。
*   **局限性:**
    *   尽管推理速度快，但由于额外的FFN层，EfficientViT的模型参数量可能比某些极致压缩的CNN（如MobileNetV3）稍大。
    *   模型设计是基于分析得出的指导原则手动进行的，而非自动化搜索。
*   **未来方向:**
    *   进一步减少模型大小。
    *   结合神经架构搜索（NAS）技术来自动优化模型结构，以进一步提升效率。

**参考文献追踪:**
*   **核心ViT:** ViT [18], Swin Transformer [44], DeiT [69], LeViT [20], PVT [75, 76]。
*   **高效CNN:** MobileNetV1/V2/V3 [27, 63, 26], ShuffleNetV2 [48], GhostNet [23], EfficientNet [67], Xception [10]。
*   **高效ViT:** MobileViT [50], Mobile-Former [9], EdgeViT [56], AutoFormer [7], GLiT [5], LVT [81], MobileViTV2 [51], PoolFormer [83], EffFormer [40], TinyViT [78], MiniViT [86]。
*   **基础技术:** MHSA [71], BN [30], ReLU [54], AdamW [46], Mixup [85], AutoAugment [13], Random Erasing [88], Taylor Pruning [53], Group Convolution [10, 87], ONNX [3], CoreML [1]。

**补充材料（代码/附录）:**
*   代码和模型链接： `here` （未在OCR文本中明确给出URL，但摘要中提到了）
*   论文提及补充材料中包含更多关于DeiT剪枝分析和移动端芯片速度评估的内容。