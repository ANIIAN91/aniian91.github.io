- [[2012.12877] Training data-efficient image transformers & distillation through attention](https://arxiv.org/abs/2012.12877)
- [[../../docs/2012.12877v2.pdf]]


**1. 英文标题:** Training data-efficient image transformers & distillation through attention
**2. 中文标题:** 训练数据高效的图像 Transformer & 通过注意力进行知识蒸馏
**3. 作者:** Hugo Touvron, Matthieu Cord, Matthijs Douze, Francisco Massa, Alexandre Sablayrolles, Hervé Jégou
**4. 期刊:** arXiv preprint arXiv:2012.12877v2

**5. 摘要:**
最近，完全基于注意力的神经网络已被证明可以处理图像理解任务，例如图像分类。这些高性能视觉Transformer使用大量的基础架构，使用数百万张图像进行预训练，从而限制了它们的采用。在这项工作中，我们仅通过在 Imagenet 上进行训练来生成有竞争力的无卷积Transformer。我们在不到 3 天的时间内在单个计算机上训练它们。我们的参考视觉 Transformer（86M 参数）在 ImageNet 上实现了 83.1% 的 top-1 准确率（单 crop），没有外部数据。更重要的是，我们引入了一种特定于 Transformer 的教师-学生策略。它依赖于一个蒸馏 token，该 token 确保学生通过注意力从教师那里学习。我们展示了这种基于 token 的蒸馏的兴趣，尤其是在使用 convnet 作为教师时。这使我们能够报告与 Imagenet 上的 convnet 竞争的结果（我们获得高达 85.2% 的准确率）以及转移到其他任务时。我们分享我们的代码和模型。

**6. 背景/目标/创新点:**
* **背景:**
    * Transformer 架构在自然语言处理 (NLP) 领域取得了巨大成功。
    * 最近，Vision Transformer (ViT) 等模型开始应用于图像理解任务，并取得了令人瞩目的成果。
    * 然而，高性能的 ViT 模型依赖于使用数百万张图像的大规模预训练，这限制了它们的应用。
    * 缺乏数据高效的图像 Transformer 训练方法。

* **目标:**
    * 探索仅在 ImageNet 上训练有竞争力且无卷积的 Transformer 模型。
    * 降低图像 Transformer 的训练成本，使其能够在单个计算机上进行训练。
    * 提出一种特定于 Transformer 的教师-学生知识蒸馏策略，以提高 ViT 模型的性能。
    * 在 ImageNet 和其他下游任务上实现与卷积神经网络 (CNN) 相当或更好的性能。
    * 提出数据高效的图像 Transformer 训练方法。

* **创新点:**
    * **提出了一种数据高效的图像 Transformer 训练方法 (DeiT)。** 通过精心设计的训练策略，仅使用 ImageNet 数据集，即可训练出性能优异的 Transformer 模型。
    * **引入了一种特定于 Transformer 的知识蒸馏策略，即基于 token 的蒸馏。** 该方法使用一个蒸馏 token，使学生模型能够通过注意力机制学习教师模型的知识。
    * **实验表明，使用 CNN 作为教师模型比使用 Transformer 教师模型效果更好。**
    * **提出的 DeiT 模型在 ImageNet 和其他下游任务上实现了与 CNN 竞争或超越的性能。**

**7. 方法/实验设计/技术细节:**
* **模型架构:**
    * 基于 ViT 模型的架构，没有使用卷积层。
    * 包括一个 patch embedding 层，将图像划分为 patches。
    * 使用 Transformer Encoder 处理 patch embeddings 序列。
    * 引入 class token 用于分类。
    * 引入 distillation token 用于知识蒸馏。

* **训练策略:**
    * 仅使用 ImageNet 数据集进行训练。
    * 在单个计算机上训练，使用 4 个或 8 个 GPU。
    * 采用强数据增强策略。

* **知识蒸馏方法:**
    * **引入 Distillation Token:** 在 Patch Embedding 后额外加入一个 Distillation Token，该 Token 与 Class Token 和 Patch Tokens 一起输入 Transformer Encoder 进行训练。
    * **Hard-label Distillation:** 使用教师模型的 hard prediction 作为目标训练 Distillation Token。
    * **损失函数:** Hard-label Distillation Loss 与 Cross-Entropy Loss 的结合，用于训练 Class Token 和 Distillation Token。

* **实验设置:**
    * **数据集:** ImageNet
    * **基线模型:** ViT-B
    * **教师模型:** RegNetY-16GF (CNN)
    * **优化器:** AdamW
    * **训练 Epochs:** 300
    * **其他参数:** 详见论文
    * **评估指标:** Top-1 Accuracy, Image Throughput (images/sec)

**8. 核心数据/图表/异常值:**
* **核心数据:**
    * **表 1:** DeiT 模型变体的架构细节。包括 DeiT-Ti, DeiT-S 和 DeiT-B，以及层数、embedding 维度，参数量等。
    * **表 2:** 不同教师模型下，DeiT-B 的性能。结果表明，使用 RegNetY 作为教师模型的效果优于使用 DeiT-B 作为教师模型。
    * **表 3:** 不同的蒸馏方法在 Imagenet 上的实验结果。结果表明，hard distillation 优于 soft distillation，并且 class token 和 distillation token 的组合优于单独使用它们。
    * **表 5:** DeiT 模型和其他 SOTA 模型的对比结果。结果表明，DeiT 模型在 ImageNet 上实现了与 convnet 模型竞争的性能。

* **核心图表:**
    * **图 1:** DeiT 模型和 EfficientNet 在 ImageNet 上的吞吐量和准确率对比。
    * **图 2:** DeiT 蒸馏过程示意图。

* **异常值/讨论:**
    * 尽管 ViT 模型在具有大量数据集的预训练后能够实现出色的性能，但 DeiT 模型表明，仅使用 ImageNet 数据集也可以训练具有竞争力的图像 Transformer。
    * 论文提出的基于 token 的蒸馏方法能够有效利用 convnet 教师模型的知识，从而提高 ViT 模型的性能。
    * 实验结果表明，Hard Distillation 优于 Soft Distillation 方法。
    * 该论文表明，通过数据高效的训练策略和知识蒸馏方法，可以减少对大量训练数据的依赖。

**9. 结论解释/局限性/未来方向:**
* **结论解释:**
    * DeiT 模型证明了仅使用 ImageNet 数据集训练 Transformer 模型，也可以实现与 CNN 竞争的性能。
    * 提出的基于 token 的蒸馏方法是一种有效的知识传递方法，可以进一步提高 ViT 模型的性能。
    * 论文结果表明，图像 Transformer 具有很大的潜力，可以通过数据高效的训练方法实现出色的性能。

* **局限性:**
    * DeiT 模型在小数据集上的性能可能不如 CNN。
    * 该论文主要关注图像分类任务，对其他视觉任务的性能未进行充分评估。
    * 该论文采用的蒸馏方法可能对教师模型的选择比较敏感。

* **未来方向:**
    * 探索更有效的数据增强和正则化技术，以进一步提高 DeiT 模型的性能。
    * 将 DeiT 模型应用于其他视觉任务，例如目标检测和语义分割。
    * 研究更有效的知识蒸馏方法，从而更好地利用教师模型的知识。
    * 探索 DeiT 模型在小数据集上的性能。

**10. 参考文献追踪:**
* ViT (Dosovitskiy et al. [15]): 提出了 Vision Transformer 模型，是本研究的基础。
* Knowledge Distillation (Hinton et al. [24]): 知识蒸馏的经典工作，本研究基于此提出了 Transformer 特定的蒸馏方法。
* RegNet (Radosavovic et al. [40]): 一种高效的 CNN 模型，被用作教师模型。

**11. 补充材料（代码/附录）:**
* 代码已开源: https://github.com/facebookresearch/deit。

