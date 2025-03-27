- Paper: [https://arxiv.org/abs/2503.00938](https://arxiv.org/abs/2503.00938)
- Code: [https://github.com/yuanc3/Pose2ID](https://github.com/yuanc3/Pose2ID)
- ../../docs/2503.00938v2.pdf})


**论文标题:** From Poses to Identity: Training-Free Person Re-Identification via Feature Centralization
**作者:** Chao Yuan, Guiwei Zhang, Changxiao Ma, Tianyi Zhang, Guanglin Niu
**单位:** Beihang University
**关键词:** 人员重新识别，特征集中化，生成模型，训练自由

**摘要:**
人员重新识别 (ReID) 旨在提取准确的身份表示特征。 然而，在特征提取过程中，单个样本不可避免地受到噪声（背景、遮挡和模型限制）的影响。 考虑到来自同一身份的特征在训练后遵循身份中心周围的正态分布，我们提出了一种训练自由的特征集中化 ReID 框架 (Pose2ID)，通过聚合相同的身份特征来减少个体噪声并增强身份表示的稳定性，从而保留特征的原始分布以用于后续策略（例如重新排序）。 具体来说，为了获得相同身份的样本，我们引入了两个组成部分：Identity-Guided Pedestrian Generation：通过利用身份特征来指导生成过程，我们获得具有不同姿势的高质量图像，即使在红外和遮挡等复杂场景中也能确保身份一致性。 ②邻域特征集中化：它探索每个样本邻域中的潜在正样本。 实验表明，我们的生成模型表现出强大的泛化能力并保持较高的身份一致性。 借助特征集中化框架，即使使用没有 ReID 训练的 ImageNet 预训练模型，我们也能获得令人印象深刻的性能，在 Market1501 上达到 52.81/78.92 的 mAP/Rank-1。 此外，我们的方法在标准、跨模态和遮挡 ReID 任务中设置了新的最先进结果，展示了强大的适应性。

**背景/目标/创新点:**
*   **背景:** 现有的 ReID 方法容易受到噪声干扰，影响身份识别的准确性。
*   **目标:** 提出一种训练自由的特征集中化框架，通过减少噪声并增强身份表示，提高 ReID 的性能。
*   **创新点:**
    1.  **特征集中化:** 利用同一身份的特征聚集在身份中心周围的特性，通过聚合特征减少噪声并增强身份表示。
    2.  **身份引导的行人生成 (IPG):** 利用 ReID 模型提取的身份特征作为引导，使用扩散模型生成具有多样姿态且保持身份一致性的高质量行人图像。
    3.  **邻域特征集中化 (NFC):** 通过样本的邻域关系发现潜在的正样本，进一步进行特征集中化。

**方法/实验设计/技术细节:**
1.  **整体框架:** 提出了一种训练自由的特征集中化框架 Pose2ID，包括 IPG 和 NFC 两个主要组成部分。
2.  **Identity-Guided Pedestrian Generation (IPG):**
    *   使用预训练的 Stable Diffusion 模型生成具有多样姿态的行人图像。
    *   利用 ReID 模型提取的身份特征作为引导，确保生成图像的身份一致性。
    *   设计 Identity Feature Redistribute (IFR) 模块，将高维身份特征转换为低维特征块，提高特征利用效率。
3.  **Neighbor Feature Centralization (NFC):**
    *   构建特征距离矩阵，找到每个样本的邻居。
    *   根据互近邻关系，确定互为邻居的样本。
    *   通过聚合邻居的特征，增强目标样本的特征表示。
4.  **数据清洗:** 提出了自动化的数据清洗方法，去除低质量图像和姿态估计失败的图像。
5.  **实验设置:**
    *   在 Market1501, SYSU-MM01, Occluded-ReID 等数据集上进行实验。
    *   使用 mAP 和 Rank-1 等指标评估性能。
6.  **公式细节:**
    *   (1): $f_i = f(x_i)$  定义了ReID模型f(·)将输入样本xi转换为特征向量fi。
    *   (2): $f_{i,k} \sim \mathcal{N}(\mu_k, \sigma_k^2)$ 定义了特征向量fi的每个维度k的特征值都服从正态分布。
    *   (3): $f_i \sim \mathcal{N}(\mu, \Sigma)$ 定义了身份j的整体特征向量fi服从多变量正态分布。
    *   (4): $z_{t-1} = \epsilon_{\theta}(z_t, t, E_{pose}, H), t \in [0, T]$  展示了Stable Diffusion去噪过程。
    *   (5): $H = IFR(f(x)) = LN(Linear(f))$  定义了Identity Feature Redistribute (IFR)模块，其中LN是层归一化，Linear是线性变换。
    *   (6): $\mathcal{L} = \mathbb{E}_{z,t,\epsilon} [||\epsilon - \epsilon_{\theta}(z_t, t, E_{pose}, H)||^2]$  展示了模型训练损失函数。
    *   (7): $\bar{f}_{mean} = \frac{1}{N}\sum_{i=1}^{N} f_i$  定义了身份特征向量集的均值。
    *   (8): $pose = \arg \min_{i \in [1..N]} d(\bar{f}_{mean}, f_i)$  展示了如何选择最具代表性的姿势。
    *   (9): $f = \frac{1}{||f + \eta \sum_{i=1}^{M} f_i||_2} (f + \eta \sum_{i=1}^{M} f_i)$ 定义了集中的特征，通过将原始特征与其生成的图像的特征聚合来增强特征表示。
7.  **算法1：** 描述了邻居特征中心化（NFC）算法的伪代码。
8. **图表细节：**
    * **图3：** 展示了整个特征中心化框架的概述，其中包括身份引导的行人生成（IPG）和邻居特征中心化（NFC）流程。
    * **图4：** 可视化了在 ImageNet 预训练权重上使用和不使用该方法的 10 个 ID 的特征分布的 t-SNE 可视化。
    * **图5：** 展示了具有和不具有 IFR 模块的效果，并使用五个不同的姿势进行可视化，这些姿势是为每个参考图片随机选择的。
9. **消融实验：** Table 2, 3, 4详细展示了消融实验的结果，证实了提出的各个模块的有效性。

**核心数据/图表/异常值:**
*   **Table 1:** 将该方法与不同的 SOTA 模型在 Market1501、SYSU-MM01 和 Occluded-ReID 数据集上进行比较。结果表明，该方法在所有三个基准测试中都取得了新的 SOTA。
*   **Table 5:** 报告了仅使用 ImageNet 预训练权重在 Market1501 上的 ReID 性能。
*   **Table 6:** 通过添加每个图像的生成图像数量来比较性能，包括图库IPG、查询IPG和图库IPG+查询IPG。
*   **Table 7:**  与k-reciprocal rerank相比。
*   **Table 8：** 使用TransReID及其官方权重在MSMT17上进行实验。
*   **Table 9：** 与Market1501和Occluded-ReID上的最新方法比较。
*   **Table 10：** 在没有重新排序的SYSU-MM01上与最新技术方法的比较。
*   **图4：** 通过t-SNE可视化方法展示了所提出方法在特征分布上的影响。
*   **图7：** ReID用在Market1501上生成的图像用相同姿势生成图像的结果。
*   **图8：** 质量系数η对TransReID在Market1501上的影响。
*   **图9：** 邻居特征中心化（NFC）与TransReID在Market1501上的k1/k2分析，不进行重新排序。


**结论解释/局限性/未来方向:**
*   **结论:** 论文提出了一种训练自由的 ReID 框架，通过特征集中化有效减少了噪声，增强了身份表示，并取得了优异的性能。
*   **局限性:** 该方法依赖于预训练的 ReID 模型和姿态估计模型，模型的性能受到这些模型的影响。
*   **未来方向:**  可以探索如何进一步提高生成图像的质量和多样性，以及如何将该方法应用于其他 ReID 任务中。

