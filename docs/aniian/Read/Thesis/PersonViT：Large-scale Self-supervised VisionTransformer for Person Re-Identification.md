[[../../docs/2408.05398v1.pdf]]
https://arxiv.org/html/2408.05398v1


*   **英文标题:** PersonViT: Large-scale Self-supervised Vision Transformer for Person Re-Identification
*   **中文标题:** PersonViT：用于行人重识别的大规模自监督视觉Transformer
*   **作者:** Bin Hu, Xinggang Wang, Wenyu Liu
*   **期刊:** arXiv
*   **中文关键字:** 行人重识别, 自监督学习, 视觉Transformer, 掩码图像建模, 对比学习, 细粒度特征, 大规模预训练
*   **英文关键字:** Person Re-Identification (ReID), Self-supervised Learning (SSL), Vision Transformer (ViT), Masked Image Modeling (MIM), Contrastive Learning, Fine-grained Features, Large-scale Pre-training
*   **论文发表时间:** 2024年8月10日 (v1 版本)

**摘要:**
行人重识别（ReID）旨在非重叠摄像头图像中检索相关个体，在公共安全领域有广泛应用。近年来，随着视觉Transformer（ViT）和自监督学习技术的发展，基于自监督预训练的行人ReID性能得到了极大提升。行人ReID需要提取人体高度判别的局部细粒度特征，而传统ViT擅长提取与上下文相关的全局特征，难以聚焦于局部人体特征。为此，本文将最近兴起的掩码图像建模（Masked Image Modeling, MIM）自监督学习方法引入行人ReID，通过结合MIM和判别性对比学习（DINO），进行大规模无监督预训练，有效提取高质量的全局和局部特征，然后在行人ReID任务上进行监督微调训练。这种基于ViT和MIM的行人特征提取方法（PersonViT）具有无监督、可扩展和强泛化能力的优点，克服了监督行人ReID中标注困难的问题，并在包括MSMT17、Market1501、DukeMTMC-reID和Occluded-Duke在内的公开基准数据集上取得了最先进的结果。PersonViT方法的代码和预训练模型已在GitHub上发布，以促进该领域的进一步研究。

**背景/目标/创新点:**
*   **背景:**
    *   ReID任务需要区分细微差异的细粒度局部特征。
    *   基于ViT和自监督学习（SSL）的ReID预训练展现出巨大潜力，优于ImageNet预训练。
    *   现有SSL方法（如DINO）主要基于对比学习，难以捕捉单类别（行人）内的细粒度差异。
    *   专门为ReID设计的PASS方法依赖于手动划分图像块，对对齐和遮挡敏感，且块粒度有限。
    *   掩码图像建模（MIM）（如BERT, BEiT, MAE）在视觉领域取得成功，通过重建被掩盖的图像块来学习局部特征，无需手动分区。
*   **目标:**
    *   设计一种适用于行人ReID的大规模自监督预训练方法，能有效提取全局和（特别是）局部细粒度特征。
    *   克服现有对比学习和基于块划分的SSL方法的局限性，提高对遮挡和不对齐的鲁棒性。
*   **创新点:**
    *   **首次将MIM引入行人ReID的无监督特征学习：** 利用MIM重建图像块的能力来强制模型学习局部细粒度特征，无需手动分区，提高了对遮挡和不对齐的鲁棒性。
    *   **结合MIM和对比学习（DINO）:** 提出PersonViT框架，在DINO（自蒸馏对比学习框架）的基础上，额外增加了一个MIM损失，同时学习全局判别特征和局部细节特征。
    *   **实现了SOTA性能:** 在多个主流ReID数据集（包括具有挑战性的遮挡数据集Occluded-Duke）上取得了当前最佳性能。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **整体框架 (Fig 2):** 分为两个阶段：自监督预训练和监督微调。
2.  **自监督预训练阶段 (Pre-training phase):**
    *   **数据集:** 大规模无标签行人数据集 LUPerson。
    *   **骨干网络:** ViT (ViT-S/16, ViT-B/16)。
    *   **核心思想:** 在DINO框架基础上增加MIM损失模块。
    *   **DINO模块:**
        *   **架构:** Teacher-Student结构，Teacher网络通过Student网络的指数移动平均（EMA）进行更新。
        *   **输入:** 对同一图像进行Multi-crop数据增强，生成多个全局视图和局部视图。
        *   **数据流:** 全局视图和局部视图都输入Student网络；只有全局视图输入Teacher网络。
        *   **损失 (`L_dino` - Eq. 4):** 计算Student和Teacher网络输出的`[CLS]` token特征（经过MLP1投影头）之间的对比损失（交叉熵）。使用centering和sharpening防止模型坍塌。
    *   **MIM模块:**
        *   **输入:** Student网络额外接收经过随机块掩码（random block-wise masking）处理的全局视图 (`X̃` - Eq. 5)。Teacher网络只接收原始全局视图。
        *   **数据流:** 掩码图像`X̃`通过Student ViT编码器得到特征`Z̃`。
        *   **预测头:** 对Student网络输出的*所有patch tokens* `z̃^[patchs]`（包括未被掩码和掩码位置对应的token）使用一个MLP2投影头，得到预测的patch特征`ỹ^[patchs]` (Eq. 6)。
        *   **重建目标:** 使用**Teacher**网络对**原始全局视图**编码后得到的对应patch特征`y^[patchs]`作为重建目标。
        *   **损失 (`L_mim` - Eq. 7):** 只计算**被掩码位置**的patch特征的重建损失。计算Student预测的patch特征`ỹ^[patchs][S]`与Teacher输出的目标patch特征`y^[patchs][T]`之间的交叉熵损失，并根据掩码`mi`加权（只对`mi=1`的位置计算损失）。
    *   **总预训练损失 (Eq. 8):** `L = λ1 * L_dino + λ2 * L_mim`，默认 λ1=λ2=1。
3.  **监督微调阶段 (Supervised Fine-tuning phase):**
    *   **初始化:** 使用预训练阶段得到的**Teacher**网络权重。
    *   **数据集:** MSMT17, Market1501, DukeMTMC-reID, Occluded-Duke。
    *   **框架:** 遵循标准的ReID微调流程（如TransReID-SSL中的BOT基线）。
    *   **网络:** 仅使用ViT骨干网络，不添加额外模块。
    *   **特征:** 直接使用`[CLS]` token的输出作为最终特征。
    *   **损失:** ID损失（交叉熵）+ Triplet损失。
    *   **模块:** 在损失计算前加入BNNeck。
    *   **训练细节:** 使用SGD优化器，特定的学习率和batch size（4\*16=64），前20周期warm-up。

**核心数据/图表/异常值:**
*   **Table 2:** SOTA比较结果。PersonViT（特别是ViT-B大batch预训练）在所有四个数据集上均取得最佳mAP和Rank-1，显著超越DINO+CFS, PASS, SOLIDER, PersonMAE等先前方法。
*   **Table 4:** **MIM损失消融实验**。对比加入MIM损失（PersonViT）和不加MIM损失（等同于DINO）的结果。加入MIM带来了显著的性能提升（例如MSMT17上mAP提升6.4%），验证了MIM学习局部特征的有效性。
*   **Fig 3:** 预训练中的过拟合现象。展示了在小规模数据（LUPerson的3%）上进行长时间预训练时，下游任务的性能在约200-240个epoch达到峰值后开始下降。
*   **Table 5:** 预训练数据量消融实验。结果显示：1) 性能随预训练数据量增加而提升；2) 在数据量较小时，ImageNet预训练初始化有帮助；3) CFS数据筛选策略优于随机选择，但不如使用全部数据。
*   **Fig 4:** Patch token聚类可视化。显示模型能自发地将对应于人脸、脚、膝盖、脖子、背包等语义部件的patch聚类在一起，证明了学习到的局部细粒度特征。
*   **Fig 5:** 自注意力图可视化。显示模型即使在遮挡、复杂背景下也能聚焦于人体轮廓。
*   **Fig 6:** 特征对应关系可视化。显示模型能捕捉同一行人在不同姿态（如转身、骑车）下的特征关联。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   PersonViT通过在对比学习（DINO）基础上引入掩码图像建模（MIM），成功地为行人ReID设计了一种高效的大规模自监督预训练方法。
    *   该方法能够自动提取丰富的、高判别度的局部细粒度人体特征，提高了对遮挡、不对齐的鲁棒性。
    *   实验证明PersonViT在多个主流ReID数据集上达到了新的SOTA水平，且模型性能随预训练数据规模的增大而提升。
*   **局限性:**
    *   与其他大规模自监督预训练方法类似，PersonViT面临预训练计算开销大的问题。
*   **未来方向:**
    *   使用更轻量级的ViT模型作为骨干网络。
    *   采用MAE类似的掩码策略（丢弃被掩码的token输入）来提高预训练效率。
    *   研究更高效的数据筛选方法以减少预训练数据量。
    *   研究增量预训练方法，以便在有新数据时快速更新模型。

**参考文献追踪:**
*   **核心方法:** ViT [3], DINO [8], MIM (BERT [10], BEiT [11], MAE [12], SimMIM [13])。
*   **对比方法:** PASS [5], TransReID-SSL [7], BOT [37], AAformer [38], SOLIDER [39], PersonMAE [40]。
*   **数据集:** LUPerson [6], MSMT17 [14], Market1501 [15], DukeMTMC-reID [16], Occluded-Duke [17]。

**补充材料（代码/附录）:**
*   **代码和模型:** 已在GitHub发布：`https://github.com/hustvl/PersonViT`