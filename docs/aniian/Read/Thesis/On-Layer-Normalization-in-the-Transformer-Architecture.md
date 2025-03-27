../../docs/2002.04745v2.pdf})
[[2002.04745] On Layer Normalization in the Transformer Architecture](https://arxiv.org/abs/2002.04745)

**1. 英文标题(如果有):** On Layer Normalization in the Transformer Architecture
**2. 中文标题:** 关于 Transformer 架构中的层归一化
**3. 作者:** Ruibin Xiong, Yunchang Yang, Di He, Kai Zheng, Shuxin Zheng, Chen Xing, Huishuai Zhang, Yanyan Lan, Liwei Wang, Tie-Yan Liu
**4. 期刊:** Proceedings of the 37th International Conference on Machine Learning (ICML), 2020

**5. 摘要:**
Transformer 广泛应用于自然语言处理任务。然而，训练 Transformer 通常需要精心设计的学习率预热阶段，这对于最终性能至关重要，但会减慢优化速度并带来更多的超参数调整。在本文中，我们首先从理论上研究了学习率预热阶段必不可少的原因，并表明层归一化的位置很重要。具体来说，我们用平均场理论证明，对于最初设计的 Post-LN Transformer（将层归一化置于残差块之间），输出层附近参数的预期梯度很大。因此，在这些梯度上使用大的学习率会使训练不稳定。预热阶段实际上有助于避免这个问题。另一方面，我们的理论还表明，如果**将层归一化置于残差块内部（最近提出的 Pre-LN Transformer），则初始化时的梯度表现良好**。这促使我们移除 Pre-LN Transformer 训练的预热阶段。我们的实验表明，Pre-LN Transformer 在不使用预热阶段的情况下可以达到与基线相当的结果，同时在各种应用中需要显著减少训练时间和超参数调整。

**6. 背景/目标/创新点:**
* **背景:**
    * Transformer 模型在自然语言处理 (NLP) 任务中取得了显著的成功。
    * 训练 Transformer 模型时，通常需要使用学习率预热 (warm-up) 策略。
    * 学习率预热策略虽然可以提高最终性能，但会减慢优化过程并增加超参数调整的难度。
    * Post-LN Transformer (原始 Transformer) 容易出现训练不稳定的问题。
    * Pre-LN Transformer (将 Layer Normalization 移到残差连接之前) 被提出以缓解训练问题，但仍需 warm-up 策略。

* **目标:**
    * 理论分析学习率预热阶段对于 Transformer 模型训练的必要性。
    * 研究层归一化 (Layer Normalization, LN) 位置对 Transformer 模型训练的影响。
    * 探索移除 Transformer 模型训练中学习率预热阶段的可能性。
    * 提出一种可以无需学习率预热策略即可稳定训练的 Transformer 模型。
    * 降低 Transformer 模型训练的计算成本和超参数调整难度。

* **创新点:**
    * **首次从理论上分析了学习率预热阶段对于 Post-LN Transformer 模型训练的必要性。** 使用平均场理论证明，Post-LN Transformer 模型在初始化阶段，输出层附近参数的梯度值很大，使用较大的学习率容易导致训练不稳定。
    * **证明了层归一化的位置对 Transformer 模型训练的稳定性有重要影响。** 证明了将 Layer Normalization 放在残差连接之前 (Pre-LN Transformer) 可以使梯度值在初始化阶段更加稳定，从而可以移除学习率预热阶段。
    * **提出了无需学习率预热策略即可稳定训练的 Pre-LN Transformer 模型。** 实验结果表明，Pre-LN Transformer 在移除学习率预热策略的情况下，仍然可以达到与 Post-LN Transformer 模型相当的性能，并且能够加速训练过程并降低超参数调整难度。

**7. 方法/实验设计/技术细节:**
* **理论分析:**
    * 使用平均场理论 (Mean Field Theory) 分析 Post-LN Transformer 和 Pre-LN Transformer 在初始化阶段的梯度行为。
    * 证明了 Post-LN Transformer 模型在初始化阶段，输出层附近参数的梯度值很大。
    * 证明了 Pre-LN Transformer 模型在初始化阶段，梯度值相对稳定，没有梯度爆炸或梯度消失的问题。

* **模型架构:**
    * **Post-LN Transformer:** 原始 Transformer 模型，将 Layer Normalization 放在残差连接之后。
    * **Pre-LN Transformer: 将 Layer Normalization 放在残差连接之前，并在最终预测之前添加一个额外的 Layer Normalization 层。**

* **实验设置:**
    * **数据集:**
        * IWSLT14 German-to-English (De-En) machine translation task
        * WMT14 English-to-German (En-De) machine translation task
        * English Wikipedia corpus and BookCorpus for BERT pre-training
    * **基线模型:** Post-LN Transformer 模型
    * **优化器:** Adam, SGD
    * **评估指标:**
        * Validation loss
        * BLEU score

**8. 核心数据/图表/异常值:**
* **核心数据:**
    * 理论分析结果表明，Post-LN Transformer 模型在初始化阶段，输出层附近参数的梯度值很大，而 Pre-LN Transformer 模型的梯度值相对稳定。
    * 实验结果表明，Pre-LN Transformer 模型在移除学习率预热策略的情况下，仍然可以达到与 Post-LN Transformer 模型相当的性能，并且能够加速训练过程并降低超参数调整难度。
    * 图 2(a)和图 2(b) 展示了 Adam 和 SGD 优化器在 IWSLT14 De-En 任务上的损失和 BLEU 分数。 结果表明，学习率预热阶段是必不可少的。
    * 图 3(a)和图 3(b) 展示了 FFN 子层中不同层级的梯度规范。
    * 图 3(c)和图 3(d) 展示了不同大小的 Transformer 中 W2,L 的梯度规范。
    * 图 4(a)和图 4(d) 展示了 WMT14 和 IWSLT14 上的 Pre-LN 和 Post-LN 模型在没有或没有预热阶段的情况下的性能。结果表明， Pre-LN Transformer 不需要预热阶段。
    * 图 5(a),5(b),5(c) 展示了 BERT 在大型规模数据集和下游任务的性能， 以及 Pre-LN 可以在没有预热阶段的情况下实现相同的结果。

* **核心图表:**
    * 图 1 展示了 Post-LN Transformer 和 Pre-LN Transformer 的结构差异。
    * 图 3 展示了 6-6 Transformer 中不同层 gradients 的 norm。
    * 图 4 展示了在 WMT 和 IWSLT14 任务上，以及具有和不具有 warm-up 的 Pre-LN 和 Post-LN 模型， 以及验证集的损失函数和BLEU score.
    * 图 5 展示了BERT在无监督预训练和下游任务中的loss以及准确率。

* **异常值/讨论:**
    * 该论文的主要发现是，Post-LN Transformer 模型在训练过程中需要学习率预热阶段，而 Pre-LN Transformer 模型则不需要。这一发现为 Transformer 模型的优化提供了一种新的思路。

**9. 结论解释/局限性/未来方向:**
* **结论解释:**
    * 层归一化的位置对 Transformer 模型训练的稳定性有重要影响。Pre-LN Transformer 可以在无需学习率预热策略的情况下进行训练，并能取得与 Post-LN Transformer 相当的性能。
    * 学习率预热阶段对于 Post-LN Transformer 模型是必不可少的，但对于 Pre-LN Transformer 模型则不是。
    * Pre-LN Transformer 模型可以加速训练过程并降低超参数调整难度。

* **局限性:**
    * 该论文的理论分析基于一些简化的假设，可能无法完全反映实际情况。
    * 该论文主要关注机器翻译任务，对其他 NLP 任务的适用性需要进一步验证。
    * 实验结果主要基于较小规模的数据集和模型，在大规模数据集和模型上的性能需要进一步验证。

* **未来方向:**
    * 进一步研究层归一化的位置对 Transformer 模型训练的影响，并探索其他的归一化方法。
    * 探索更有效的 Transformer 模型优化方法，降低训练成本和超参数调整难度。
    * 将 Pre-LN Transformer 模型应用于更多 NLP 任务和更大的数据集上。

**10. 参考文献追踪:**
* **关键参考文献:**
    * Vaswani et al. (2017): Attention is all you need (Transformer 模型原始论文)
    * Lei Ba et al. (2016): Layer normalization (层归一化)
    * Devlin et al. (2018): BERT: Pre-training of deep bidirectional transformers for language understanding (BERT 模型)

