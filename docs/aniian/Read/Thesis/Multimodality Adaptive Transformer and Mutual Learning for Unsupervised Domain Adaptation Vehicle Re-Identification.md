[[Multimodality_Adaptive_Transformer_and_Mutual_Learning_for_Unsupervised_Domain_Adaptation_Vehicle_Re-Identification.pdf]]


*   **英文标题:** Multimodality Adaptive Transformer and Mutual Learning for Unsupervised Domain Adaptation Vehicle Re-Identification
*   **中文标题:** 面向无监督域适应车辆重识别的多模态自适应Transformer与互学习
*   **作者:** Xin Zhang, Yunan Ling, Kaige Li, Weimin Shi, Zhong Zhou
*   **期刊:** IEEE Transactions on Intelligent Transportation Systems (IEEE TITS)
*   **中文关键字:** 域适应, 细粒度属性, 基于Transformer, 无监督车辆重识别, 互学习, 伪标签生成
*   **英文关键字:** Domain adaption, fine-grained attribute, transformer-based, unsupervised vehicle re-identification, mutual learning, pseudo-label generation
*   **论文发表时间:** 2024年12月 (Vol. 25, No. 12)

**摘要:**
无监督域适应车辆重识别（UDA vehicle re-ID）旨在使在源域数据集上训练的模型能够适应目标域数据并获得准确的重识别结果，因其在智能交通系统领域的实用性而受到广泛关注。当前大多数UDA车辆重识别研究忽略了属性信息的挖掘和利用。同时，基于卷积神经网络（CNN）的网络会丢失细粒度信息，降低了车辆特征的表达和泛化能力。为缓解这些问题，本文受Transformer的启发，利用其挖掘可区分属性信息并有效融合多模态特征的能力，提出了一种**多模态自适应Transformer网络（MATNet）**，以增强学习与属性相关的车辆细粒度特征的能力。此外，聚类算法分配的伪标签中包含的噪声会干扰UDA车辆重识别方法的性能。因此，本文还设计了**双重互动态更新伪标签生成策略（DMDU）**，以提高伪标签的准确性并减轻误差累积。该策略基于互学习，能有效利用两个模型的一致性和独特性知识来生成伪标签。在两个大型公共数据集（VeRi-776和VehicleID）上的大量实验表明，本文提出的方法优于当前最先进的方法。

**背景/目标/创新点:**

*   **背景:**
    *   UDA车辆重识别是解决跨域模型性能下降的关键技术。
    *   现有方法面临挑战：1）车辆外观特征受视角变化影响大，区分性弱（类间相似、类内差异大）；2）基于CNN的方法可能丢失细粒度信息；3）现有方法大多忽略了车辆属性（如颜色、型号、视角）的利用；4）基于聚类的伪标签生成策略易引入噪声和误差累积。
*   **目标:**
    *   提高UDA车辆重识别模型的域适应能力和特征区分性。
    *   有效利用车辆属性信息增强特征的鲁棒性和表达力。
    *   设计更可靠的伪标签生成策略以减少噪声干扰。
*   **创新点:**
    *   **MATNet:** 首次（据作者称）将Transformer与描述性语句（车辆属性信息）相结合用于UDA车辆重识别，利用Transformer的多模态融合能力提取更鲁棒的细粒度特征。
    *   **DMDU伪标签策略:** 提出一种新颖的伪标签生成方法，结合了双重一致性约束（利用两个独立模型的共识）和在线动态校正（为难样本生成更可靠的软标签），以提高伪标签质量并缓解噪声累积。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**

1.  **整体框架 (Overview of Framework - Fig. 2b):**
    *   基于互学习（Mutual Learning），包含两个结构相同但训练数据源（一个源域预训练Nets，一个目标域初始伪标签预训练Nett）不同的MATNet模型。
    *   采用迭代训练过程，两个模型相互指导，利用对方的知识改进自身对目标域的适应性。
    *   使用DMDU策略生成伪标签来指导模型训练。
2.  **MATNet (Multimodality Adaptive Transformer Network - Fig. 3):**
    *   **骨干网络:** 基于ViT（Vision Transformer）架构。
    *   **多模态输入:**
        *   **图像特征:** 将车辆图像分割成Patches，通过线性投影得到Patch Embeddings，并加入Position Embedding。
        *   **属性特征:** 生成描述车辆属性（型号、颜色、视角等）的短句子，使用预训练的SentenceTransformer模型将其转换为Semantic Embedding向量。
        *   **融合:** 将Semantic Embedding向量乘以一个可调超参数`µ`后，加到每个Patch Embedding和Position Embedding的和上（Eq. 1, 2）。
    *   **特征提取:**
        *   **全局分支:** 标准Transformer处理，输出全局特征`fg`（来自`[CLS]` token）。
        *   **局部分支:** 借鉴TransReID，通过Shift和Shuffle操作处理Patch Embeddings，学习局部特征`fl`。（注：论文最终似乎主要使用全局特征`fg`进行识别）。
3.  **DMDU (Dual Mutual Dynamic Update Pseudo-Label generation strategy - Fig. 4):**
    *   **目的:** 生成高质量伪标签，减少噪声。
    *   **步骤1: 双重互一致性 (Dual Mutual Consistency - 简单样本):**
        *   利用两个独立模型Nets和Nett分别计算目标域样本的k近邻。
        *   取两个模型得到的k-倒数近邻集的交集 (`Rco`)，得到高置信度的邻居关系 (Eq. 3)。
        *   基于此高置信度关系生成初始伪标签，用于训练简单样本。
    *   **步骤2: 动态更新 (Dynamic Update - 难样本):**
        *   对于未被一致性选中的样本（难样本或离群点），通过计算其特征与已确定类别的类中心距离，生成软伪标签。
        *   软标签的概率根据样本与类中心的距离（通过权重`ω`调节）和模型一致性（通过权重`ε`调节）进行动态加权更新 (Eq. 6, 7)。距离类中心远（可能是离群点）的样本被赋予较低的属于该类的概率。
    *   **结果:** 获得更准确、噪声更少的伪标签，尤其能为难样本提供有效的监督信号。
4.  **训练损失 (Training Loss):**
    *   **全局分支:** 使用对称交叉熵损失 (`Lsce` - 对噪声标签更鲁棒) 和 Triplet损失 (`Ltri`)。
    *   **局部分支:** 使用标准交叉熵 (`Lce`) 和 Triplet损失 (`Ltri`)。
    *   **互学习损失 (`Lml`):** 促使两个模型的预测分布相互靠近。
    *   总损失是以上各项的加权和 (Eq. 10)。

**核心数据/图表/异常值:**

*   **Fig. 1:** (a) 展示了视角变化导致的外观相似性问题；(b) 展示了聚类伪标签中的噪声问题。
*   **Fig. 2:** 整体框架图，展示了MATNet、DMDU和互学习迭代训练的流程。
*   **Fig. 3:** MATNet架构图，展示了图像Patch、位置编码、语义编码（来自句子）如何融合输入Transformer。
*   **Fig. 4:** DMDU策略图示，解释了样本邻居集和模型邻居集的双重互一致性。
*   **Fig. 5:** 不同伪标签生成策略的准确率对比曲线，显示DMDU生成的伪标签质量更高。
*   **Table III:** 不同属性引入方式的性能对比，证明使用句子描述（Sentence Description）引入属性效果最好。
*   **Table IV, V:** 不同伪标签生成策略的性能对比，证明DMDU策略效果最好。
*   **Table VI:** DMDU策略与其他UDA方法的结合效果，验证了其可移植性和有效性。
*   **Table VII, VIII:** 超参数（属性嵌入权重`µ`，损失权重`λtri`, `λml`）的消融实验。
*   **Table IX, X:** 主要结果，展示了在VehicleID-to-VeRi-776和VeRi-776-to-VehicleID两个UDA任务上，本文方法（MATNet+DMDU）显著优于其他SOTA方法。

**结论解释/局限性/未来方向:**

*   **结论解释:**
    *   MATNet通过融合图像和属性（来自文本描述）的多模态信息，有效提升了车辆特征的判别力和鲁棒性。
    *   DMDU伪标签生成策略通过双重一致性和动态更新机制，显著提高了伪标签的准确性，减轻了噪声对UDA训练的干扰。
    *   结合MATNet和DMDU的UDA车辆重识别方法在标准数据集上取得了SOTA性能。
*   **局限性:**
    *   方法依赖于生成描述性语句的固定模板和SentenceTransformer的性能。
    *   DMDU策略虽然有效，但比简单的聚类+阈值方法更复杂。
    *   实验主要在两个数据集上进行。
*   **未来方向:**
    *   深入研究属性标注与跨域性能的关系。
    *   使用更精确的语义信息（如语义分割）作为指导。
    *   利用Sentence Transformer生成更准确、详细的文本描述。
    *   增强属性分类或直接生成文本描述。

**参考文献追踪:**

*   **Transformer (Vaswani et al., 2017):** MATNet的基础架构。
*   **ViT (Dosovitskiy et al., 2020):** 视觉Transformer的开创性工作。
*   **TransReID (He et al., 2021):** 基于Transformer的ReID工作，MATNet借鉴了其部分思想（如局部分支）。
*   **CLIP (Radford et al., 2021):** 启发了使用自然语言监督学习视觉模型，MATNet借鉴了其图文结合的思想。
*   **SentenceTransformer (Reimers & Gurevych, 2019):** 用于将属性描述语句转换为嵌入向量。
*   **Deep Mutual Learning (Zhang et al., 2018):** 提供了互学习框架的思路。
*   **Mean Teacher (Tarvainen & Valpola, 2017):** 相关的半监督/UDA思想。
*   **ECN, UDAR, PAL, ML, PLM等:** UDA ReID领域的代表性基线方法。
*   **VeRi-776, VehicleID:** 实验使用的数据集。

**补充材料（代码/附录）:**

*   论文中未明确提及补充材料或代码链接。（第一页脚注中的DOI和IEEE Xplore信息指向最终发表版本）