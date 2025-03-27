[arxiv.org/pdf/1905.11946](https://arxiv.org/pdf/1905.11946)
1905.11946v5.pdf})

*   **英文标题:** EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks
*   **中文标题:** EfficientNet：重新思考卷积神经网络的模型缩放
*   **作者:** Mingxing Tan, Quoc V. Le
*   **期刊:** Proceedings of the 36th International Conference on Machine Learning (ICML), 2019
*   **中文关键字:** 模型缩放, 卷积神经网络, 复合缩放, 网络深度, 网络宽度, 分辨率, 效率, 准确率, 神经架构搜索
*   **英文关键字:** Model Scaling, Convolutional Neural Networks (ConvNets), Compound Scaling, Network Depth, Network Width, Resolution, Efficiency, Accuracy, Neural Architecture Search (NAS)
*   **论文发表时间:** 2019年

**摘要:**
卷积神经网络（ConvNets）通常在固定的资源预算下开发，并在资源允许时进行扩展以获得更好的精度。本文系统地研究了模型缩放，并发现仔细平衡网络的深度、宽度和分辨率可以带来更好的性能。基于这一观察，作者提出了一种新的缩放方法，该方法使用一个简单而高效的**复合系数（compound coefficient）** 来统一缩放深度/宽度/分辨率这三个维度。作者展示了该方法在扩展MobileNets和ResNet上的有效性。更进一步，作者使用神经架构搜索（NAS）设计了一个新的基线网络，并将其扩展以获得一系列模型，称为**EfficientNets**，这些模型比以前的ConvNets具有更好的准确性和效率。特别是，EfficientNet-B7在ImageNet上达到了当时最先进的84.3%的top-1准确率，同时比当时最好的ConvNet（GPipe）小8.4倍，推理速度快6.1倍。EfficientNets在迁移学习任务上也表现良好，在CIFAR-100（91.7%）、Flowers（98.8%）及其他3个数据集上达到了最先进的准确率，且参数量减少了一个数量级。

**背景/目标/创新点:**
*   **背景:**
    *   提升ConvNet性能的常用方法是模型缩放（增加深度、宽度或分辨率）。
    *   传统的模型缩放通常只关注单一维度（如ResNet主要增加深度，WideResNet主要增加宽度），或者进行任意组合的缩放，这需要繁琐的手动调整，并且往往效果次优。
    *   单一维度的缩放存在瓶颈（例如，极深的网络难以训练，极宽的网络难以捕捉高级特征，极高分辨率的精度增益递减）。
    *   缺乏对如何平衡网络深度、宽度和分辨率以实现最佳性能和效率的系统性理解和 principled 方法。
*   **目标:**
    *   研究并理解ConvNet模型缩放的过程。
    *   提出一种 principled 的模型缩放方法，能够有效地平衡网络深度、宽度和分辨率，以达到更好的准确性和效率。
    *   设计并验证一个既准确又高效的新ConvNet模型家族。
*   **创新点:**
    *   **首次系统研究并量化了网络深度、宽度和分辨率三个维度之间的关系对模型性能的影响。** 发现平衡这三个维度至关重要（Observation 1 & 2）。
    *   **提出了复合缩放（Compound Scaling）方法:** 使用一个统一的复合系数`φ`和一组固定的比例系数`α, β, γ`，同时缩放网络的深度 (`d = α^φ`)、宽度 (`w = β^φ`) 和分辨率 (`r = γ^φ`)，其中`α, β, γ`通过在基线模型上进行一次小范围网格搜索确定，满足`α * β^2 * γ^2 ≈ 2`，使得FLOPS大约按`2^φ`增长。
    *   **设计了高效的基线网络EfficientNet-B0:** 使用NAS（优化准确率和FLOPS）搜索得到，以MBConv+SE为主要构建块。
    *   **提出了EfficientNet模型家族 (B0-B7):** 通过对EfficientNet-B0应用复合缩放得到，在准确率和效率方面显著优于当时的SOTA模型。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **模型缩放问题定义:** 将ConvNet缩放形式化为一个优化问题：在给定的资源（FLOPS、内存）约束下，最大化模型准确率，优化变量是深度、宽度和分辨率的缩放系数 `d, w, r` (Eq. 2)。
2.  **复合缩放方法 (Compound Scaling Method):**
    *   **核心公式 (Eq. 3):**
        *   `depth: d = α^φ`
        *   `width: w = β^φ`
        *   `resolution: r = γ^φ`
    *   **约束:** `α · β^2 · γ^2 ≈ 2` (因为FLOPS大致与 `d · w^2 · r^2` 成正比)。
    *   **`α, β, γ` 的确定:**
        *   **步骤1:** 固定 `φ = 1`（即目标FLOPS翻倍）。
        *   在基线模型（EfficientNet-B0）上进行小范围网格搜索，找到满足约束条件且效果最好的 `α, β, γ`。实验得到 `α=1.2, β=1.1, γ=1.15`。
    *   **模型扩展:**
        *   **步骤2:** 固定找到的 `α, β, γ`。
        *   通过增大复合系数 `φ` 的值，应用公式 (3) 扩展基线网络，得到一系列模型 EfficientNet-B1 至 B7。
3.  **EfficientNet-B0架构:**
    *   使用多目标NAS搜索得到，优化目标为 `ACC(m) * [FLOPS(m)/T]^w` (w=-0.07)。
    *   搜索空间与MnasNet类似，主要构建块为 **MBConv**（MobileNetV2中的Inverted Residual Block），并加入了 **Squeeze-and-Excitation (SE)** 优化。
    *   具体架构见 Table 1。
4.  **实验设计:**
    *   **验证复合缩放:** 在MobileNetV1/V2和ResNet-50上对比复合缩放与单维度缩放的效果。
    *   **ImageNet性能:** 训练EfficientNet B0-B7，并与当时的SOTA模型（如ResNet, DenseNet, Inception, SENet, NASNet, GPipe等）在准确率、参数量、FLOPS和推理延迟方面进行比较。
    *   **迁移学习性能:** 将ImageNet预训练的EfficientNets在8个常用的迁移学习数据集（如CIFAR-10/100, Flowers, Cars等）上进行微调，并与SOTA方法比较。
    *   **分析:** 通过类激活图（CAM）可视化不同缩放方法对模型注意力区域的影响。

**核心数据/图表/异常值:**
*   **Figure 1 / Figure 5 / Table 2:** EfficientNet系列模型在ImageNet上的准确率 vs. 参数量/FLOPS。显示EfficientNet显著优于其他模型，达到更高的准确率且模型更小、计算量更低。EfficientNet-B7达到84.3% Top-1准确率，参数66M，FLOPS 37B。
*   **Figure 2:** 图示对比了传统的单维度缩放（(b)-(d)）与提出的复合缩放（(e)）。
*   **Figure 3:** 展示了对基线模型进行单维度（宽度、深度、分辨率）缩放时，准确率随着FLOPS增加而饱和的现象。
*   **Figure 4:** 显示了在不同基础模型（不同深度和分辨率）上进行宽度缩放时，更深、更高分辨率的基线模型能从宽度缩放中获益更多。
*   **Table 1:** EfficientNet-B0的详细网络结构。
*   **Table 3:** 在MobileNets和ResNet上应用不同缩放方法的对比结果，显示复合缩放效果最好。
*   **Table 4:** EfficientNet-B1和B7与ResNet-152和GPipe的CPU推理延迟对比，显示EfficientNet速度更快。
*   **Table 5 / Figure 6:** EfficientNet在多个迁移学习数据集上的SOTA性能，平均参数量减少9.6倍。
*   **Figure 7:** CAM可视化对比，显示复合缩放模型能更好地关注目标区域和细节。
*   **Figure 8:** 在EfficientNet-B0上应用不同缩放方法的性能对比，复合缩放效果最佳。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   仔细平衡网络的深度、宽度和分辨率对于提升ConvNet性能至关重要。
    *   提出的复合缩放方法是一种有效且 principled 的模型缩放策略，优于传统的单维度缩放。
    *   通过NAS找到的高效基线网络EfficientNet-B0结合复合缩放，产生的EfficientNet系列模型在准确性和效率方面达到了新的SOTA水平。
*   **局限性:**
    *   确定最优的 `α, β, γ` 系数需要一次网格搜索，虽然是在小模型上进行，但仍有计算成本。
    *   NAS过程本身计算量巨大（虽然本文只用于寻找B0基线）。
    *   模型性能可能依赖于特定的训练设置（如AutoAugment）。
*   **未来方向:**
    *   将复合缩放方法应用于其他类型的网络，如目标检测、语义分割等。
    *   研究更自动化的方法来确定最优的缩放系数 `α, β, γ`。

**参考文献追踪:**
*   **核心对比模型:** ResNet (He et al., 2016), MobileNets (Howard et al., 2017; Sandler et al., 2018), SENet (Hu et al., 2018), NASNet (Zoph et al., 2018), GPipe (Huang et al., 2018)。
*   **基础技术:** 卷积神经网络, 模型缩放, 神经架构搜索 (NAS - Zoph & Le, 2017; Tan et al., 2019), MBConv (Sandler et al., 2018), Squeeze-and-Excitation (Hu et al., 2018)。

**补充材料（代码/附录）:**
*   论文摘要中提供了源代码链接：`https://github.com/tensorflow/tpu/tree/master/models/official/efficientnet`
*   附录提供了ImageNet验证集和测试集的Top-1/Top-5准确率对比（Table 8），两者非常接近。