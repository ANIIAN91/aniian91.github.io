2010.11929v2})
[[2010.11929] An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)


**1. 英文标题:** AN IMAGE IS WORTH 16X16 WORDS: TRANSFORMERS FOR IMAGE RECOGNITION AT SCALE

**2. 中文标题:** 一张图像值 16x16 个词：大规模图像识别的 Transformer

**3. 作者:**
Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner, Mostafa Dehghani, Matthias Minderer, Georg Heigold, Sylvain Gelly, Jakob Uszkoreit, Neil Houlsby

**4. 期刊:**
Published as a conference paper at ICLR 2021 (国际表征学习会议)

**5. 摘要:**
虽然 Transformer 架构已成为自然语言处理任务的事实标准，但其在计算机视觉中的应用仍然有限。在视觉领域，注意力要么与卷积网络结合应用，要么用于替换卷积网络的某些组件，同时保持其整体结构不变。我们表明，对 CNN 的这种依赖不是必需的，直接应用于图像 patches 序列的纯 Transformer 可以在图像分类任务上表现良好。当在大量数据上进行预训练并迁移到多个中小型图像识别基准（ImageNet、CIFAR-100、VTAB 等）时，Vision Transformer (ViT) 获得了与最先进的卷积网络相比优异的结果，同时训练所需的计算资源明显更少。

**6. 背景/目标/创新点:**
* **背景:**
    * Transformer 架构在自然语言处理 (NLP) 任务中取得巨大成功，成为主流模型。
    * 计算机视觉领域，卷积神经网络 (CNNs) 仍占主导地位。
    * 以往视觉 Transformer 研究，多将 Transformer 与 CNN 结合或作为 CNN 的补充，未能充分发挥 Transformer 的潜力。
    * 现有视觉 Transformer 方法，要么效率不高，要么依赖于 CNN 的特征提取，限制了 Transformer 独立应用于视觉任务的能力。
    * 大规模图像识别领域，ResNet 等 CNN 架构仍是最先进水平。

* **目标:**
    * 探索直接将标准 Transformer 架构应用于图像识别任务的可行性。
    * 验证纯 Transformer 架构 (ViT) 在大规模图像分类任务上的性能。
    * 证明 ViT 在大规模预训练后，可以超越或匹敌最先进的 CNN 模型，同时降低计算成本。
    * 揭示大规模预训练对 ViT 性能提升的关键作用，以及 ViT 在不同数据集规模下的表现。
    * 分析 ViT 模型的内部表示和注意力机制，理解其图像处理方式。

* **创新点:**
    * **首次成功地将纯 Transformer 架构 (ViT) 应用于图像分类任务，并取得了与 SOTA CNNs 竞争甚至超越的性能。** 证明了 Transformer 可以独立应用于视觉任务，无需依赖 CNN。
    * **提出了 Vision Transformer (ViT) 模型。** 直接将图像分割成 patches，并将 patch embeddings 序列输入标准 Transformer Encoder 进行图像分类。模型结构简洁，易于扩展和应用。
    * **证明了大规模预训练 (Large Scale Training) 对 ViT 性能至关重要。**  ViT 在大规模数据集 (ImageNet-21k, JFT-300M) 上预训练后，性能显著提升，超越了相同计算成本下的 CNN 模型。
    * **实验表明 ViT 在计算成本上优于 CNN。**  在达到相近或更高性能的情况下，ViT 模型预训练所需的计算资源 (TPU-core-days) 大幅减少。
    * **分析和可视化 ViT 模型的内部表示和注意力机制。**  揭示了 ViT 如何学习位置编码，以及如何利用自注意力机制整合全局信息进行图像识别。
    * **研究了 ViT 模型在不同数据集规模下的性能变化。** 表明 CNN 的归纳偏置在小数据集上更有效，而 ViT 在大数据集上表现更优，学习能力更强。

**7. 方法/实验设计/技术细节:**
* **Vision Transformer (ViT) 模型架构:**
    * **Patch Embedding:**
        * 将输入图像 x ∈ R^(H×W×C) 分割成 N 个固定大小的 patches x_p ∈ R^(N×(P^2*C))，其中 (P,P) 是 patch 大小，N = HW/P^2 是 patch 数量，即 Transformer 的输入序列长度。
        * 对每个 patch 进行线性投影 E，将维度映射到 D 维的 patch embeddings。
    * **Position Embedding:**
        * 添加可学习的 1D 位置编码 E_pos 到 patch embeddings，保留位置信息。
    * **Transformer Encoder:**
        * 标准 Transformer Encoder 结构，包含 L 层 Transformer blocks。
        * 每个 Transformer block 包括 Multi-Head Self-Attention (MSA) 和 MLP (多层感知机) 模块。
        * LayerNorm (LN) 在每个 block 之前，残差连接在每个 block 之后。
        * MLP 包含两层，中间层使用 GELU 非线性激活。
    * **Classification Head:**
        * 类似于 BERT 的 [class] token，在 patch embeddings 序列前prepend 一个可学习的 embedding x_class。
        * Transformer Encoder 输出的 [class] token embedding z_0^L 作为图像表示 y。
        * 预训练阶段: Classification Head 是一个带单隐藏层的 MLP。
        * 微调阶段: Classification Head 是一个单层线性层。

* **混合架构 (Hybrid Architecture):**
    * 使用 CNN 的特征图 (feature maps) 作为 ViT 的输入序列。
    * Patch embedding 投影 E 应用于 CNN 特征图提取的 patches。
    * patches 可以设为 1x1 空间大小，此时输入序列相当于 CNN 特征图空间维度 flatten 后的向量。
    * Classification input embedding 和 position embeddings 的添加方式与标准 ViT 相同。

* **Fine-tuning 和高分辨率:**
    * 移除预训练模型的预测头 (prediction head)，替换为零初始化的 D×K feedforward 层 (K 为下游任务类别数)。
    * 微调时常使用比预训练更高的分辨率，保持 patch size 不变，增加输入序列长度 N。
    * 使用 2D 插值方法对预训练的位置编码进行插值，适应新的分辨率。

* **实验设置:**
    * **数据集:**
        * 预训练数据集: ImageNet (1.3M images), ImageNet-21k (14M images), JFT-300M (303M images)。均去除了下游任务测试集中的重复图像。
        * 下游基准数据集: ImageNet (1k classes, original/ReaL labels), CIFAR-10/100, Oxford-IIIT Pets, Oxford Flowers-102, VTAB (19 tasks)。
    * **模型变体:** ViT-Base, ViT-Large, ViT-Huge (参数量和结构配置见表 1)，以及 CNN 基线模型 ResNet (BiT) 和 Hybrid 模型 (ResNet + ViT)。
    * **训练细节:**
        * 优化器: Adam (β1=0.9, β2=0.999)。
        * Batch size: 4096。
        * Weight decay: 0.1 (高 weight decay)。
        * Learning rate schedule: Linear warmup 和 decay。
        * Fine-tuning 优化器: SGD (momentum 0.9), batch size 512， learning rate cosine decay，no weight decay。
    * **评估指标:** Fine-tuning accuracy, Few-shot accuracy (linear regression)。

**8. 核心数据/图表/异常值:**
* **核心数据:**
    * **表 2:** ViT 与 SOTA CNN 方法在 ImageNet, ImageNet ReaL, CIFAR-10/100, Oxford-IIIT Pets, Oxford Flowers-102, VTAB 上的性能对比。ViT-H/14 在多个数据集上超越 SOTA (ImageNet 88.55%, ImageNet ReaL 90.72%, VTAB 77.63%)，且预训练计算成本更低。
    * **图 3 & 表 5:** 不同预训练数据集规模 (ImageNet, ImageNet-21k, JFT-300M) 下 ViT 模型的 ImageNet 性能。大规模预训练对 ViT 性能提升至关重要，ViT 在大数据集 JFT-300M 上展现出更大模型优势。
    * **图 4:**  预训练数据集样本数量 vs. ImageNet few-shot 线性精度。 ViT 在大数据集下性能优于 ResNet，小数据集下 ResNet 凭借归纳偏置优势表现更好。
    * **图 5 & 表 6:**  不同架构 (ViT, ResNet, Hybrid) 在 JFT-300M 预训练后的性能 vs. 预训练计算量。ViT 在性能/计算 Trade-off 上优于 ResNet，Hybrid 模型在小计算量下略优于 ViT，但差距随模型增大而消失。
    * **表 9:**  VTAB-1k 各 tasks 的详细性能 breakdown。ViT-H/14 在 Natural 和 Structured tasks 上超越 BiT-R152x4。
    * **ViT-B/16 自监督预训练 ImageNet 精度 79.9%，比从头训练提升 2%，但仍比监督预训练低 4%。**

* **核心图表:**
    * **图 1:** ViT 模型架构概览图。
    * **图 2:** VTAB 性能 breakdown，ViT-H/14 在 Natural 和 Structured task groups 上超越 SOTA。
    * **图 6 & 图 14:** ViT 注意力图可视化，展示 ViT 如何关注图像相关区域进行分类。
    * **图 7:** ViT 模型内部表示分析，包括 RGB embedding filters, Position embedding similarity, Mean attention distance。揭示 ViT 如何学习 patch embeddings, 位置编码, 和利用注意力机制整合信息。
    * **图 8:** ViT 模型不同维度 (Depth, Width, Patch size) 的 Scaling Study，深度 (Depth) Scaling 收益最大。
    * **图 9:** Class-token vs. Global Average Pooling (GAP) 分类器性能对比，两者性能相近，但需调整学习率。
    * **图 10:** 不同超参数训练 ViT 学习到的 Position embeddings Similarity 热力图，展示超参数对位置编码学习的影响。
    * **图 11:**  ViT 和 Hybrid 模型 Attention distance vs. 网络深度，Hybrid 模型 localized attention 更明显。
    * **图 12:** ViT 模型 Real-world 硬件加速性能 (TPUv3)，包括 Inference Speed 和 Largest Batch-size。ViT 模型具有速度优势和内存效率。
    * **图 13:** Axial-ViT 模型性能 vs. 计算量对比， Axial-ViT 性能略优于 ViT-B，但计算成本更高。

* **异常值/讨论:**
    * ViT 在大数据集上性能大幅超越 CNN，但在小数据集上性能略逊于 CNN，体现了 CNN 归纳偏置在小数据集上的优势。
    * 大规模预训练是 ViT 成功的关键，数据集规模越大，ViT 模型越大，性能越好。
    * ViT 模型在计算效率和内存效率上具有优势，更适合大规模数据和高分辨率图像处理。
    * ViT 的自监督预训练探索初步成功，但与大规模监督预训练仍有差距，自监督方法有待进一步研究。

**9. 结论解释/局限性/未来方向:**
* **结论解释:**
    * 纯 Transformer 架构 (ViT) 可以直接应用于图像识别，并在大规模预训练下取得 SOTA 级别的性能，与 CNN 相比具有计算优势。
    * ViT 在大数据驱动下，能够学习到有效的图像表示，无需依赖 CNN 固有的归纳偏置。
    * 大规模预训练是 ViT 成功的关键因素，数据集规模越大，ViT 性能提升空间越大。
    * ViT 为计算机视觉领域提供了一种新的、可扩展的模型架构选择。

* **局限性:**
    * ViT 在小数据集上性能不如 CNN，可能需要更强的正则化或数据增强策略。
    * ViT 模型计算复杂度较高 (虽然相比 CNN 有优势)，模型参数量较大，大规模部署仍面临挑战。
    * 自监督预训练在 ViT 上仍有较大提升空间，目前的 masked patch prediction 方法效果有限。
    *  ViT 在目标检测、语义分割等其他视觉任务上的应用仍需进一步探索。

* **未来方向:**
    * 将 ViT 应用于更多计算机视觉任务，例如 目标检测, 语义分割等。
    * 探索更有效的 ViT 自监督预训练方法，缩小与大规模监督预训练的差距。
    * 研究 ViT 模型进一步 Scaling Up 的潜力，探索更大规模 ViT 模型的性能极限。
    * 优化 ViT 模型架构，降低计算复杂度，提高效率，使其更易于部署和应用。
    * 结合 ViT 和 CNN 的优点，探索更优的混合模型架构。
    * 研究 ViT 在 few-shot learning 和 low-data transfer 场景下的性能和应用。

**10. 参考文献追踪:**
* **关键参考文献:**
    * Transformer [5] (Vaswani et al., 2017):  Transformer 架构的原始论文，ViT 的基础。
    * BERT [6] (Devlin et al., 2019): BERT 模型， ViT 借鉴了 BERT 的 [class] token 和大规模预训练方法。
    * ResNet [9] (He et al., 2016): ResNet 模型，CNN 基线模型，BiT 模型的基础, Hybrid 模型 backbone.
    * Big Transfer (BiT) [15] (Kolesnikov et al., 2020):  Big Transfer 论文，CNN SOTA 方法，ViT 的主要对比对象。
    * Noisy Student [16] (Xie et al., 2020): Noisy Student 论文， CNN SOTA 方法，ImageNet 上的 SOTA。
    * ImageNet, ImageNet-21k, JFT [10, 17, 21]:  预训练数据集，影响 ViT 性能的关键因素。
    * VTAB [21]:  VTAB 基准数据集，评估 ViT 的迁移学习能力。

* **参考文献整体方向:**
    * **Transformer 和 Self-Attention:**  Transformer 架构及其在 NLP 和 CV 领域的应用进展。
    * **Vision Transformer (ViT) 及其相关工作:**  探索将 Transformer 应用于视觉任务的各种方法。
    * **大规模预训练 (Large Scale Pre-training):**  大规模预训练在 CV 和 NLP 领域的重要性。
    * **图像识别和分类 (Image Recognition and Classification):**  图像分类领域的经典模型和 SOTA 方法，ViT 的性能对比对象。
    * **迁移学习 (Transfer Learning) 和 Few-shot Learning:**  迁移学习和少量样本学习，VTAB 评估 ViT 的迁移能力。
    * **CNN (Convolutional Neural Networks):**  CNN 在计算机视觉领域的地位，ViT 与 CNN 的性能对比。
    * **自监督学习 (Self-Supervised Learning):**  自监督学习在 ViT 预训练中的探索。

**11. 补充材料（代码/附录）:**
* **附录 A:** Multi-Head Self-Attention (MSA) 细节。
* **附录 B:** 实验细节 (Training, Fine-tuning, Self-supervision)。
* **附录 C:** 补充实验结果，对应论文中的 Figures (Tables 5, 6)。
* **附录 D:** 更多分析 (SGD vs. Adam for ResNets, Transformer Shape Scaling, Head Type and Class Token, Positional Embedding Ablation, Empirical Computational Costs, Axial Attention, Attention Distance, Attention Maps, ObjectNet Results, VTAB Breakdown)。
* **代码:**  GitHub 代码链接: https://github.com/google-research/vision_transformer (摘要已提供)。