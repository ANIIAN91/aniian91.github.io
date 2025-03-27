- [[2102.04378] TransReID: Transformer-based Object Re-Identification](https://arxiv.org/abs/2102.04378)
- [damo-cv/TransReID: [ICCV-2021] TransReID: Transformer-based Object Re-Identification](https://github.com/damo-cv/TransReID)
- [[../../docs/2102.04378v2.pdf]]

**1. 英文标题:** TransReID: Transformer-based Object Re-Identification
**2. 中文标题:** TransReID: 基于Transformer的对象重识别
**3. 作者:** Shuting He, Hao Luo, Pichao Wang, Fan Wang, Hao Li, Wei Jiang
**4. 期刊:** arXiv preprint arXiv:2102.04378v2

**5. 摘要:**
提取鲁棒的特征表示是对象重识别(ReID)的关键挑战之一。虽然基于卷积神经网络(CNN)的方法已经取得了巨大的成功，但它们一次只处理一个局部邻域，并且会受到卷积和下采样操作符(例如，池化和步长卷积)导致细节信息丢失的影响。为了克服这些限制，我们提出了一个纯粹的基于transformer的对象ReID框架，名为TransReID。具体来说，我们首先将图像编码为patch序列，并构建了一个基于transformer的强基线，并进行了一些关键改进，在多个ReID基准测试中取得了与基于cnn的方法具有竞争力的结果。为了进一步增强transformer上下文中鲁棒特征的学习，我们精心设计了两个新颖的模块。(i)提出Jigsaw Patch Module (JPM)模块，通过shift和patch shuffle操作重新排列patch嵌入，生成具有改进的判别能力和更多样化覆盖的鲁棒特征。(ii)引入side information embeddings (SIE)来减轻特征对相机/视图变化的偏差，通过插入可学习的嵌入来合并这些非视觉线索。据我们所知，这是第一个采用纯transformer进行ReID研究的工作。TransReID的实验结果非常出色，在person和vehicle ReID基准测试中都达到了最先进的性能。代码可在https://github.com/heshuting555/TransReID上获得。

**6. 背景/目标/创新点:**
* **背景:**
    * 对象重识别 (ReID) 旨在跨不同场景和相机视图关联特定对象，例如行人ReID和车辆ReID。
    * 提取鲁棒和可区分的特征是 ReID 的关键，长期以来 CNN-based 方法占据主导地位。
    * CNN-based 方法关注局部区域，缺乏全局结构信息利用，下采样操作导致细节信息丢失。
    * Attention 机制被引入，但仍嵌入在 CNN 深层，无法根本解决 CNN 的问题。
    * Vision Transformer (ViT) 和 DeiT 表明纯 Transformer 在图像识别特征提取方面与 CNN-based 方法同样有效。

* **目标:**
    * 提出一种新的对象 ReID 框架 TransReID，学习鲁棒的特征表示。
    * 构建基于纯 Transformer 的强基线 ReID 模型，并进行关键改进，达到与 CNN-based 方法相媲美的性能。
    * 设计 Jigsaw Patch Module (JPM)，增强模型对遮挡和错位的鲁棒性，学习更具判别力的局部特征，并利用全局上下文信息。
    * 引入 Side Information Embeddings (SIE)，利用相机ID、视角等辅助信息，减少场景偏见，学习更通用的特征表示。
    * 在 Person ReID 和 Vehicle ReID 基准数据集上验证 TransReID 的有效性，达到 SOTA 性能。

* **创新点:**
    * **首次将纯 Transformer 架构应用于对象 ReID 任务。** 探索了 Transformer 在 ReID 领域的潜力。
    * **提出了基于 Transformer 的强基线 ReID 模型，并进行了一系列关键改进，使其性能与 CNN-based 方法相当。** 包括 Overlapping Patches, Position Embeddings, Supervision Learning 等。
    * **设计了 Jigsaw Patch Module (JPM)。** 通过 shift 和 shuffle 操作重排图像 patch，并分组输入 Transformer，促使模型学习扰动不变性和更鲁棒的特征表示。
    * **提出了 Side Information Embeddings (SIE)。**  将相机ID、视角等辅助信息编码为可学习的 embeddings，并融入 Transformer 模型，有效缓解了场景偏差。
    * **TransReID 框架在 Person ReID 和 Vehicle ReID 多个基准数据集上均取得了 SOTA 性能。**  验证了框架的有效性和通用性。

**7. 方法/实验设计/技术细节:**
* **TransReID 框架总览:**
    * **输入:** 图像
    * **Patch Embedding Layer:**  将图像划分为 overlapping patches，线性投影得到 patch embeddings。
    * **Position Embedding:**  加入可学习的位置编码，保留图像的空间信息。
    * **Side Information Embedding (SIE):**  将相机ID、视角等辅助信息编码为 learnable embeddings，并与 patch embeddings 相加融合。
    * **Transformer Encoder:**  多层 Transformer blocks，学习全局上下文特征。
    * **Jigsaw Patch Module (JPM):**  在最后一层 Transformer 输出后，对 patch embeddings 进行 shift 和 shuffle 操作，重组为 k 组，分别输入共享 Transformer 层，学习局部特征。
    * **输出:** Global feature (来自 Global Branch), Local features (来自 Jigsaw Branch)
    * **损失函数:**  ID loss (Cross-Entropy Loss), Triplet loss (Soft-margin Triplet Loss)。全局和局部特征均计算损失。

* **Transformer-based 强基线:**
    * **Overlapping Patches:** 使用滑动窗口生成 overlapping patches，保留局部邻域结构信息。
    * **Position Embeddings:**  可学习的 position embeddings，使用 bilinear 2D 插值处理不同输入分辨率。
    * **Supervision Learning:**  ID loss 和 Triplet loss 联合训练。

* **Jigsaw Patch Module (JPM):**
    * **Shift Operation:** 将前 m 个 patches 移动到序列末尾。
    * **Patch Shuffle Operation:**  将 shifted patches 基于组数 k 进行 shuffle。
    * **Local Feature Learning:** 将 shuffled patches 分为 k 组，每组 concat [cls] token，输入共享 Transformer 层学习 k 个局部特征。
    * **Global Branch:**  并行的 standard Transformer branch，学习全局特征。
    * **联合训练:**  Global feature 和 k 个 local features 共同参与损失计算。
    * **推理:**  Concat global feature 和 local features 作为最终特征表示；或仅使用 global feature 作为高效变体。

* **Side Information Embeddings (SIE):**
    * **可学习的 1-D Embeddings:**  针对相机ID、视角等 side information 初始化可学习的 embeddings 表 S_C, S_V, S_(C,V)。
    * **信息融合:**  提出联合编码方式 S_(C,V)，避免不同 side information embeddings 之间的冲突或抵消。
    * **融入 Transformer Encoder:**  SIE 与 patch embeddings 和 position embeddings 相加后输入 Transformer Encoder。
    * **超参数 λ:** 平衡 SIE 的权重。

* **实验设置:**
    * **数据集:**  Person ReID (Market-1501, DukeMTMC-reID, MSMT17, Occluded-Duke), Vehicle ReID (VeRi-776, VehicleID)。
    * **图像尺寸:** Person (256x128), Vehicle (256x256)。
    * **数据增强:** Random horizontal flipping, padding, random cropping, Random Erasing。
    * **Batch size:** 64 (4 images/ID)。
    * **优化器:** SGD (momentum 0.9, weight decay 1e-4), learning rate 0.008 (cosine decay)。
    * **JPM 参数:** Person (m=5, k=4), Vehicle (m=8, k=4)。
    * **ViT 初始化权重:** ImageNet-21K 预训练，fine-tune ImageNet-1K。
    * **DeiT 初始化权重:** ImageNet-1K 训练。
    * **评估指标:** CMC, mAP。

**8. 核心数据/图表/异常值:**
* **核心数据:**
    * **表 2:**  Transformer-based Baseline 与 CNN-based Backbone 性能对比，ViT-B/16_s=12 在速度和精度上 trade-off 较好，作为后续实验的 Baseline。
    * **表 3 & 表 8:** JPM 消融实验，JPM 显著提升 ReID 性能，shift & shuffle 操作和 local features 拼接均有增益。
    * **表 4 & 表 9:** SIE 消融实验，SIE 有效提升 ReID 性能, 联合编码相机ID和视角信息 (S_(C,V)) 效果最佳。
    * **表 5:** JPM 和 SIE 联合使用进一步提升性能，TransReID 最终模型 MSMT17 mAP 达到 64.9%，VeRi-776 mAP 达到 80.6%。
    * **表 6:**  TransReID 与 SOTA 方法对比，在 Person ReID, Occluded ReID, Vehicle ReID 多个数据集上均取得 SOTA 结果 (MSMT17 mAP 69.4%, Occluded-Duke mAP 59.2%, VeRi-776 mAP 82.6%)。
    * **图 7:**  超参数 λ (SIE 权重) 对性能的影响，λ=2.0 (MSMT17), λ=2.5 (VeRi-776) 附近性能最佳。
    * **ViT-B/16_s=12 相比 ResNeSt200 在速度上更快，精度上略有优势，在 speed-accuracy trade-off 上更优。 TransReID*_DeiT-B/16 与 MGN 在速度上相当，精度更高。**

* **核心图表:**
    * **图 1 & 图 9:** Grad-CAM 可视化， Transformer-based 方法相比 CNN-based 方法能捕捉更全局的上下文信息和更具判别性的区域。 TransReID 进一步增强了 attention 效果。
    * **图 2:**  特征图可视化，Transformer-based 方法相比 CNN-based 方法能保留更多细节信息 (例如背包细节)。
    * **图 5 & 图 8:** JPM attention map 可视化,  JPM w/ rearrange 相比 JPM w/o rearrange 和 Baseline 能关注更全局和更多样化的区域。
    * **图 6:**  距离分布可视化， SIE 能有效减小 inter-camera/viewpoint 和 intra-camera/viewpoint 的特征距离分布差异，缓解场景偏差。

* **异常值/讨论:**
    * Transformer 对优化器选择敏感，SGD 优于 Adam 和 AdamW。
    * Position Embedding 对 Transformer 模型至关重要， 缺少 Position Embedding 性能大幅下降。
    * Label Smoothing 技巧在 TransReID 中负优化。
    * JPM 中 shift & shuffle 操作对性能提升有帮助。
    * SIE 中联合编码相机ID和视角信息优于独立编码。
    * DeiT-B/16 和 ViT-B/16 在短序列 patches 下性能相近，长序列 patches 下 ViT-B/16 借助 ImageNet-21K 预训练泛化性更好。

**9. 结论解释/局限性/未来方向:**
* **结论解释:**
    * 提出了基于纯 Transformer 的 ReID 框架 TransReID，并在 Person ReID 和 Vehicle ReID 任务上取得了 SOTA 性能。
    * JPM 和 SIE 是 TransReID 框架成功的关键模块，分别提升了模型对形变和场景变化的鲁棒性。
    * Transformer 架构在 ReID 任务上具有巨大潜力，可以替代 CNN 成为新的主流方法。

* **局限性:**
    * Transformer 模型计算复杂度较高，模型参数量较大，实际部署可能面临挑战。
    * 模型训练对超参数和优化器选择较为敏感，需要仔细调参。
    * 虽然性能 SOTA，但模型设计和模块堆叠仍有改进空间, 例如更高效的 Transformer 变体、更有效的 JPM 变体。

* **未来方向:**
    * 探索更高效的 Transformer 架构应用于 ReID 任务，例如 降低计算复杂度，减少参数量。
    * 研究更有效的 JPM 变体, 探索更优的 patch rearrange 策略和局部特征融合方式。
    * 将 TransReID 框架推广到更多 ReID 相关任务，例如 跨域 ReID, 视频 ReID 等。
    * 探索 Transformer 在 ReID 任务上更深层次的潜力，挖掘更有利于 ReID 特征学习的 Transformer 结构。
    * 基于 TransReID 框架，设计更轻量级、更高效的 ReID 模型，满足实际应用需求。

**10. 参考文献追踪:**
* **关键参考文献:**
    * ViT [8], DeiT [40]:  Vision Transformer 和 DeiT 模型，TransReID 的 backbone 模型。
    * CNN-based ReID methods [37, 44, 61, 54]:  CNN-based ReID 方法, 作为 TransReID 的对比基线。
    * JPM 灵感来源: ShuffleNet [53]。
    * SIE 灵感来源: Position Embedding [41]。

* **参考文献整体方向:**
    * **Vision Transformer:**  Transformer 在 CV 领域的应用，ViT, DeiT 等模型。
    * **Object ReID (Person ReID, Vehicle ReID):**  对象重识别领域的经典和 SOTA 方法，CNN-based 方法为主流。
    * **Fine-grained Feature Learning:**  细粒度特征学习，part-based 方法 (PCB, MGN, AlignedReID++)。
    * **Side Information Utilization:**  辅助信息利用，camera-based BN (CBN), viewpoint-aware learning。
    * **Attention Mechanism:**  Attention 机制在 ReID 中的应用 (RGA-SC, SAN, SCSN, ABDNet)。

**11. 补充材料（代码/附录）:**
* **附录 A:** 更多实验结果，Transformer-based Baseline 的训练设置消融实验 (优化器、Position Embedding、正则化方法、损失函数等), JPM 和 SIE 更详细的消融实验。
* **附录 B:**  JPM 模块 rearrange patches 的分析，通过 attention 可视化验证了 rearrange 操作的有效性。
* **附录 C:**  更多 Grad-CAM 可视化结果，验证了 Transformer-based 方法和 TransReID 的 attention 优势。
* **代码:**  GitHub 代码链接: https://github.com/heshuting555/TransReID (摘要已提供)。



---
*   **英文标题:** TransReID: Transformer-based Object Re-Identification
*   **中文标题:** TransReID：基于Transformer的目标重识别
*   **作者:** Shuting He, Hao Luo, Pichao Wang, Fan Wang, Hao Li, Wei Jiang
*   **期刊:** arXiv
*   **中文关键字:** 目标重识别 (ReID), 行人重识别, 车辆重识别, Transformer, ViT, DeiT, Jigsaw Patch Module (JPM), Side Information Embedding (SIE), 特征学习, 注意力机制
*   **英文关键字:** Object Re-identification (ReID), Person ReID, Vehicle ReID, Transformer, Vision Transformer (ViT), DeiT, Jigsaw Patch Module (JPM), Side Information Embedding (SIE), Feature Learning, Attention Mechanism
*   **论文发表时间:** 2021年3月26日 (v2版本)

**摘要:**
提取鲁棒的特征表示是目标重识别（ReID）的关键挑战之一。尽管基于卷积神经网络（CNN）的方法取得了巨大成功，但它们一次仅处理一个局部邻域，并且由于卷积和下采样操作（例如池化和步进卷积）而遭受细节信息丢失。为了克服这些限制，我们提出了一个名为TransReID的纯基于Transformer的目标ReID框架。具体来说，我们首先将图像编码为一系列补丁（patches），并构建了一个基于Transformer的强基线，通过一些关键改进，在几个ReID基准测试中与基于CNN的方法相比取得了有竞争力的结果。为了在Transformer的背景下进一步增强鲁棒特征学习，我们精心设计了两个新颖的模块。(i) 提出了**Jigsaw Patch Module (JPM)**，通过移位（shift）和补丁洗牌（patch shuffle）操作重新排列补丁嵌入，生成具有改进判别能力和更多样化覆盖范围的鲁棒特征。(ii) 引入了**Side Information Embeddings (SIE)**，通过插入可学习的嵌入来结合非视觉线索（如相机/视图信息），以减轻特征对相机/视图变化的偏见。据我们所知，这是首次在ReID研究中采用纯Transformer的工作。TransReID的实验结果非常有前景，在行人和车辆ReID基准测试中均达到了最先进的性能。代码已开源。

**背景/目标/创新点:**
*   **背景:**
    *   目标重识别（ReID）旨在跨不同场景和摄像机视图关联特定对象。
    *   基于CNN的ReID方法是主流，但存在固有局限性：
        *   感受野有限，难以捕捉全局结构信息。
        *   卷积和下采样操作导致细粒度特征和空间细节丢失，影响区分相似外观物体的能力 (Fig 1, 2)。
        *   虽然引入了注意力机制，但通常嵌入在深层，并未根本解决CNN的问题。
    *   Vision Transformer (ViT) 及其变种 (DeiT) 在图像识别中展示了潜力，其优势在于：
        *   自注意力机制能捕捉长距离依赖，关注全局和多样化的判别性区域 (Fig 1)。
        *   没有下采样操作，能保留更多细节信息 (Fig 2)。
    *   ReID任务面临特定挑战：遮挡、姿态/视角变化、光照变化等。CNN领域已提出局部特征、条纹特征、边信息（相机ID、视角ID）等方法来增强鲁棒性，但这些方法直接应用于Transformer可能效果不佳或无法充分利用Transformer的编码能力。
*   **目标:**
    *   提出第一个*纯*基于Transformer的ReID框架 (TransReID)。
    *   克服CNN方法的局限性，利用Transformer学习更鲁棒、更具判别力的特征。
    *   设计专门针对ReID挑战的Transformer模块，以处理遮挡、视角变化等问题。
*   **创新点:**
    *   **首次将纯Transformer架构应用于目标ReID任务**，并构建了一个强大的基线。
    *   **提出了Jigsaw Patch Module (JPM):** 通过对Transformer中间层的patch序列进行“移位+洗牌”重排，然后分组送入共享的Transformer层，强制模型学习对局部扰动（遮挡、错位）更鲁棒的、覆盖更全面的局部特征，同时保留全局上下文信息。
    *   **提出了Side Information Embedding (SIE):** 一种统一且简洁的方法，将相机ID、视角ID等非视觉信息编码为可学习的嵌入向量，并将其添加到Transformer的输入序列中，以学习与场景偏见无关的不变性特征。
    *   在多个行人及车辆ReID基准上达到SOTA性能。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**

1.  **Transformer Baseline (Fig 3):**
    *   **输入处理:** 将图像分割成**重叠 (Overlapping)** 的Patches（通过滑动窗口，步长S<Patch大小P），这与ViT/DeiT的非重叠分割不同，旨在保留Patch边界的局部结构。每个Patch线性投影成D维向量。
    *   **Embedding:** 在序列前加入一个可学习的 `[cls]` token。添加可学习的**位置嵌入 (Position Embedding)** P（采用2D双线性插值以适应不同输入分辨率）。
    *   **SIE (Side Information Embedding) (Fig 4, Eq 5):** 创建相机ID、视角ID（或两者联合）的可学习嵌入表 `S`。根据当前图像的相机/视角ID `(r, q)`，查找对应的嵌入向量 `S(c,v)[r*Nk+q]`。将此向量乘以超参数 `λ` 后，加到**原始输入序列嵌入 `Z_0`** （即Patch投影+位置嵌入之后）。
    *   **Encoder:** 经过 `l` 个标准的Transformer层。
    *   **输出与Loss:** 取最后一个Transformer层输出的 `[cls]` token作为全局特征 `f_g`。在其后加入BNNeck [27]。使用ID Loss (Cross-Entropy) 和 Triplet Loss (Soft Margin, Eq 3) 对 `f_g` 进行监督。
2.  **Jigsaw Patch Module (JPM) (Fig 4):**
    *   **位置:** 在最后一个Transformer层并行于全局分支。
    *   **输入:** 第 `l-1` 层的输出序列 `Z_{l-1}` (不含 `[cls]` token)。
    *   **重排 (Rearrangement):**
        *   **Step 1 (Shift):** 将序列的前 `m` 个patch移到序列末尾。
        *   **Step 2 (Shuffle):** 将移位后的序列随机分成 `k` 组。
    *   **处理:** 对于第 `j` 组，将其patch序列与 `Z_{l-1}` 中的 `[cls]` token 拼接，送入一个**共享的** Transformer层，得到第 `j` 个局部特征 `f_l^j` (取输出的 `[cls]` token)。
    *   **Loss (Eq 4):** 对每个局部特征 `f_l^j` 也施加ID Loss和Triplet Loss。总损失是全局损失和所有局部损失之和。
    *   **Inference:** 最终特征是**全局特征 `f_g` 和所有局部特征 `f_l^j` 的拼接 (concatenation)**： `[f_g, f_l^1, ..., f_l^k]`。提供了一个变种是仅使用 `f_g` 进行推理，以降低计算和存储成本。
3.  **整体架构 (Fig 4):**
    *   图像输入 -> Patch Embedding + Position Embedding -> + SIE -> Transformer Encoder (l-1层) -> 特征序列 `Z_{l-1}`。
    *   `Z_{l-1}` 分两路进入最后一层：
        *   全局分支：标准Transformer层 -> 全局特征 `f_g`。
        *   JPM分支：Shift -> Shuffle -> Grouping -> 共享Transformer层 -> 局部特征 `f_l^1...k`。
    *   联合训练，合并Loss。
4.  **实验设计:**
    *   **数据集:** Market-1501, DukeMTMC-reID, MSMT17, Occluded-Duke (行人), VeRi-776, VehicleID (车辆)。
    *   **实现细节:** 使用ViT/DeiT预训练权重，SGD优化器，Cosine学习率衰减，数据增强（随机翻转、填充、裁剪、擦除），FP16训练。
    *   **评估指标:** mAP, Rank-1 (CMC)。
    *   **Ablation Study:**
        *   基线性能与CNN/Transformer对比 (Table 2)。
        *   JPM模块效果：不同group数k，有无重排，仅用全局/局部 (Table 3, Fig 5, 8, Appendix Table 8)。
        *   SIE模块效果：不同边信息组合，距离分布可视化，超参数λ影响 (Table 4, Fig 6, 7, Appendix Table 9)。
        *   训练细节：优化器选择，位置嵌入作用，正则化，损失函数选择 (Appendix Table 7)。
        *   整体模块贡献 (Table 5)。
    *   **SOTA对比:** 在各数据集上与当前最优方法对比 (Table 6)。

**核心数据/图表/异常值:**

*   **Figure 1 & 2:** 可视化对比了CNN、CNN+Attention、Transformer在ReID任务中的注意力图和特征图细节保留情况，显示Transformer的优势。
*   **Figure 3 & 4:** 展示了基线和完整TransReID的架构图，清晰展示了JPM和SIE的集成方式。
*   **Table 2:** 不同骨干网络性能对比，显示ViT/DeiT作为基线优于ResNet系列。ViT-B/16s=12 效果最好。
*   **Table 3:** JPM消融实验，显示JPM（k=4，带重排）效果最好，重排操作有效。
*   **Table 4:** SIE消融实验，显示加入相机和视角信息（联合编码S(C,V)）能提升性能。
*   **Figure 6:** SIE效果可视化，显示SIE能减小不同相机/视角下的特征距离分布差异。
*   **Table 5:** 汇总消融，显示JPM和SIE均对性能有显著提升，两者结合效果最佳。
*   **Table 6:** SOTA对比，TransReID*（使用滑动窗口的ViT-B/16或DeiT-B/16）在MSMT17, DukeMTMC, Occluded-Duke, VeRi-776, VehicleID等多个数据集上取得SOTA。
*   **Appendix Tables 7, 8, 9 & Figure 8, 9:** 提供了更详细的训练设置、JPM、SIE的消融研究结果和注意力可视化。

**结论解释/局限性/未来方向:**

*   **结论解释:**
    *   纯Transformer架构适用于ReID任务，并可构建强基线。
    *   精心设计的JPM模块通过patch重排和分组学习，能有效提升模型对遮挡和错位的鲁棒性，学习到更具判别力的局部特征。
    *   简洁的SIE模块能有效利用相机/视角等边信息，学习场景不变性特征，缓解数据偏见。
    *   TransReID框架结合了强基线、JPM和SIE，在多个ReID基准上显著优于先前SOTA方法。
*   **局限性:**
    *   相比一些轻量级CNN，Transformer模型的计算量可能仍然较大（尽管论文提到TransReID*比MGN快）。
    *   性能可能依赖于大规模数据集（如ImageNet-21K）的预训练（对ViT而言）。
*   **未来方向:**
    *   基于Transformer设计更高效的ReID网络架构。
    *   探索将更多类型的边信息融入SIE。
    *   研究Transformer在ReID任务中的可解释性。

**参考文献追踪:**

*   **核心基础:** ViT [8], DeiT [40], Transformer [41]。
*   **ReID基线/对比:** ResNet [14], PCB [37], MGN [44], OSNet [58], ABDNet [4], ISP [59], CBN [61]。
*   **相关技术:** BNNeck [27], Triplet Loss [22], Circle Loss [36], Random Erasing [57], Stochastic Depth [15], AdamW [26]。

**补充材料（代码/附录）:**

*   **代码:** `https://github.com/heshuting555/TransReID`
*   **附录:** 包含对基线训练设置、JPM和SIE模块更详细的消融研究（Tables 7, 8, 9）和更多的注意力图可视化（Fig 8, 9）。