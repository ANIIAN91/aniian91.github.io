[arxiv.org/pdf/2111.12084](https://arxiv.org/pdf/2111.12084)
[[2111.12084v1.pdf]]

*   **英文标题：** Self-Supervised Pre-Training for Transformer-Based Person Re-Identification
*   **中文标题：** 基于Transformer的行人重识别的自监督预训练
*   **作者：** Hao Luo, Pichao Wang, Yi Xu, Feng Ding, Yanxin Zhou, Fan Wang, Hao Li, Rong Jin
*   **期刊：** arXiv
*   **中文关键字：** 行人重识别，Transformer，自监督学习，预训练
*   **英文关键字：** Person Re-Identification, Transformer, Self-Supervised Learning, Pre-training
*   **论文发表时间：** 2021年11月23日

**摘要：**
论文提出了一种针对基于 Transformer 的行人重识别（ReID）模型的自监督预训练方法。为了解决 ImageNet 和 ReID 数据集之间的领域差距问题，论文从数据和模型结构两个方面入手。首先，研究了在未标记的行人图像（LUPerson 数据集）上进行自监督学习（SSL）的方法，并发现其性能显著优于在 ImageNet 上进行监督预训练的模型。为了进一步缩小领域差距并加速预训练，提出了一种灾难性遗忘分数（Catastrophic Forgetting Score, CFS）来评估预训练和微调数据之间的差距。基于 CFS，通过对接近下游 ReID 数据的相关数据进行采样和过滤预训练数据集中不相关的数据来选择子集。对于模型结构，提出了一种名为基于 IBN 的卷积 stem（ICS）的 ReID 特定模块，以通过学习更多不变特征来弥合领域差距。最后，在有监督学习、无监督领域自适应（UDA）和无监督学习（USL）设置下对预训练模型进行了微调。结果表明该方法成功地将 LUPerson 数据集缩减到50％，而没有性能下降。最终，在 Market-1501 和 MSMT17 上实现了最先进的性能。

**背景/目标/创新点：**
*   **背景：** 基于 Transformer 的方法在行人重识别任务上取得了显著进展。但由于 ImageNet 和行人 ReID 数据集之间存在较大的领域差距，通常需要更大的预训练数据集（如 ImageNet-21K）来提高性能。
*   **目标：** 减轻预训练和 ReID 数据集之间的差距，从而提高基于 Transformer 的 ReID 模型的性能。
*   **创新点：**
    *   **使用自监督学习（SSL）预训练：** 在未标记的行人图像（LUPerson 数据集）上进行 SSL 预训练，显著优于 ImageNet 监督预训练。
    *   **灾难性遗忘分数（CFS）：** 提出 CFS 来评估预训练和微调数据之间的差距，并基于 CFS 选择相关的预训练数据子集。
    *   **IBN-based Convolution Stem (ICS):**  提出的ICS模块学习更多不变特征，用于弥合领域差距。

**方法/实验设计/技术细节：**
1.  **LUPerson数据收集：** 从网络视频收集无标注行人图像。
2.  **Catastrophic Forgetting Score (CFS) 计算：**
    *   训练一个source proxy model， 使用source dataset Ds进行训练。
    *   训练target proxy model， 使用Target dataset Dt， fine-tune source proxy model。
    *   对于每个source image，计算相似度得分，公式如下：
    ```
    c = (θs(x), θt(x)) / (||θs(x)|| ||θt(x)||)
    ```
    其中 θs 和 θt 分别是 source model 和 target model 的特征提取器。
3.  **Data Filtering and Subset Selection**
    *   根据计算的CFS值，选出排序后的图像子集。
4.  **IBN-based Convolution Stem (ICS):**

    *   使用 IBN-Net 中的 Instance Normalization (IN) 和 Batch Normalization (BN) 结合的方式，从而提高模型的泛化性能
    *   在网络的前几层卷积层之后同时使用BN和IN，后面深层的卷积层之后只使用BN。
5.  **试验设置：**
    *   数据集：LUPerson、Market-1501、MSMT17。
    *   评估指标：mean Average Precision (mAP) 和 Rank-1 accuracy。
    *   优化器：SGD。
    *   数据增强：随机裁剪、翻转等。

**核心数据/图表/异常值：**
*   表1：不同预训练方法对ReID任务的影响，包括在Market-1501和MSMT17上的mAP和Rank-1准确率。
*   图1：该预训练框架在有监督、UDA和USL ReID中超过基线（ImageNet上的监督预训练+普通ViT）很大幅度。
*   表4：不同数据选择策略的对比，在Market和MSMT17数据集上使用Swin-T架构。
*   表7：SOTA对比， 基于LUPerson和CFS，论文方法结果显著优于之前的SOTA。

**结论解释/局限性/未来方向：**
*   **结论：** 论文提出了一种有效的 SSL 预训练方法，可以通过选择更相关的预训练数据并修改模型结构来弥合领域差距。
*   **局限性：** 该模型主要针对行人 ReID，可能不适用于车辆 ReID、人体解析或图像分类等相关性较低的任务。
*   **未来方向：** 未来工作可以集中于开发一种更通用的 pre-training framework，或探索更为适合ReID task的自监督模型。



