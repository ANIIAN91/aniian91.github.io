- [[2203.03931] PASS: Part-Aware Self-Supervised Pre-Training for Person Re-Identification](https://ar5iv.labs.arxiv.org/html/2203.03931#:~:text=In%20this%20paper%2C%20we%20propose%20a%20ReID-specific%20pre-training,to%20offer%20fine-grained%20information%20and%20is%20more%20s)
- [CASIA-IVA-Lab/PASS-reID: [ECCV2022] PASS: Part-Aware Self-Supervised Pre-Training for Person Re-Identification](https://github.com/CASIA-IVA-Lab/PASS-reID?tab=readme-ov-file)
- 2203.03931v3.pdf})



*   **英文标题:** PASS: Part-Aware Self-Supervised Pre-Training for Person Re-Identification
*   **中文标题:** PASS：面向行人重识别的部件感知自监督预训练
*   **作者:** Kuan Zhu, Haiyun Guo, Tianyi Yan, Yousong Zhu, Jinqiao Wang, Ming Tang
*   **期刊:** arXiv
*   **中文关键字:** 行人重识别, 自监督预训练, 局部表示, 部件感知, Transformer
*   **英文关键字:** person re-identification, self-supervised pre-training, local representations, part-aware, Vision Transformer (ViT)
*   **论文发表时间:** 2022年7月20日 (v3 版本)

**摘要:**
在行人重识别（ReID）领域，最近的研究已证实使用无标签行人图像进行预训练比使用ImageNet效果更好。然而，这些研究直接将为图像分类设计的现有自监督学习（SSL）方法应用于ReID，未在框架上做任何调整。这些SSL方法（如DINO）同时匹配局部视图（例如红色T恤、蓝色短裤）和全局视图的输出，丢失了大量细节。本文提出了一种ReID特定的预训练方法，即部件感知自监督预训练（Part-Aware Self-Supervised pre-training, PASS），它可以生成部件级特征以提供细粒度信息，更适合ReID。PASS将图像划分为几个局部区域，从每个区域随机裁剪的局部视图被分配一个特定的可学习的`[PART]`标记。同时，所有局部区域的`[PART]`标记也附加到全局视图上。PASS学习匹配局部视图和全局视图在**相同**`[PART]`标记上的输出。也就是说，从某个局部区域学习到的局部视图的`[PART]`标记只与从全局视图中学习到的对应`[PART]`标记进行匹配。结果，每个`[PART]`标记可以专注于图像的特定局部区域并提取该区域的细粒度信息。实验表明，PASS在Market1501和MSMT17的各种ReID任务上取得了新的SOTA性能，例如，由PASS预训练的原始ViT-S/16在Market1501上的监督/UDA/USL ReID任务中分别达到了92.2%/90.2%/88.5%的mAP。代码已开源。

**背景/目标/创新点:**
*   **背景:**
    *   行人重识别（ReID）任务需要细粒度的视觉特征来区分不同个体。
    *   传统的ImageNet预训练存在领域鸿沟，无法为ReID提供最优的特征。
    *   在大型无标签行人数据集（如LUPerson）上进行自监督预训练（SSL）被证明更有效。
    *   然而，直接应用通用SSL方法（如DINO）到ReID上存在问题：这些方法通常将不同局部视图（如上半身、下半身）的特征与全局视图的特征进行匹配，倾向于学习共享特征，丢失了对ReID至关重要的局部细节。
*   **目标:**
    *   设计一个专门针对行人ReID任务的自监督预训练框架。
    *   使模型能够在预训练阶段自动学习到区分性强的部件级（part-level）特征，以捕获细粒度信息。
*   **创新点:**
    *   **提出PASS框架:** 基于知识蒸馏（Teacher-Student）范式（如DINO），但修改了其匹配目标，使其更适合ReID。
    *   **引入部件标记 ([PART] Tokens):** 引入多个可学习的`[PART]`标记，每个标记旨在关注图像的不同局部区域。
    *   **部件感知匹配 (Part-Aware Matching):** 将图像划分为L个局部区域。从第i个区域裁剪出的局部视图只附加特定的第i个`[PART]`标记。全局视图则附加所有L个`[PART]`标记。训练目标是让学生网络中局部视图的第i个`[PART]`标记输出，与教师网络中全局视图的第i个`[PART]`标记输出保持一致。不同`[PART]`标记之间的输出不进行匹配。
    *   **自动学习部件特征:** 通过这种部件感知的匹配机制，不同的`[PART]`标记被强制关注图像的不同区域（如上身、腰部、腿部），从而在预训练阶段自动学习到部件级特征，无需额外的部件检测模块。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **基础框架:** 采用基于ViT的Teacher-Student知识蒸馏框架，类似于DINO。使用动量更新（EMA）教师网络，并使用centering和sharpening来避免模型坍塌。
2.  **图像划分与视图生成:**
    *   将输入图像划分为L个固定的、有重叠的局部区域。
    *   使用Multi-crop策略：生成M个全局视图（较高分辨率）和 L x J 个局部视图（较低分辨率，从L个区域中每个区域采样J个）。
3.  **标记处理与数据流:**
    *   **全局视图:** 输入ViT前，在其patch embedding序列前附加1个`[CLS]`标记和L个`[PART]`标记 (`[PART]_1`...`[PART]_L`)。全局视图会被送入Teacher和Student网络。
    *   **局部视图:** 对于从第i个局部区域裁剪出的局部视图，只附加`[CLS]`标记和第i个`[PART]`标记 (`[PART]_i`)。局部视图只送入Student网络。
    *   **数据流:** Student网络处理所有视图，Teacher网络只处理全局视图。
4.  **损失函数 (核心):**
    *   **部件损失 (Part Loss):** 对于第i个部件(`[PART]_i`)，计算两部分损失：
        *   **Local-Global:** 学生网络中处理第i区域局部视图得到的`[PART]_i`输出，与教师网络中处理全局视图得到的`[PART]_i`输出之间的交叉熵损失。
        *   **Global-Global:** 学生网络中处理一个全局视图得到的`[PART]_i`输出，与教师网络中处理另一个全局视图得到的`[PART]_i`输出之间的交叉熵损失。
        *   关键在于**只匹配对应的`[PART]`标记**，`[PART]_i`的输出不与`[PART]_j` (i≠j) 的输出进行比较。
    *   **全局损失 (CLS Loss):** 类似DINO，匹配学生网络（处理所有视图）和教师网络（处理全局视图）的`[CLS]`标记输出之间的交叉熵损失。
5.  **预训练:** 在LUPerson数据集上使用PASS框架进行预训练。
6.  **下游任务微调 (Fine-tuning):**
    *   **输入:** 将`[CLS]`和所有L个`[PART]`标记附加到输入图像的patch embedding序列。
    *   **特征提取:** 使用预训练好的模型进行前向传播。将`[CLS]`标记的输出和所有`[PART]`标记输出的**平均值** (`[Part]`) 进行**拼接** (`[CLS] ⊕ [Part]`) 作为最终的行人表示。
    *   **监督ReID:** 在拼接后的特征上添加ReID头，使用标准的分类损失（ID Loss）和度量学习损失（Triplet Loss）。
    *   **UDA/USL ReID:** 遵循C-Contrast等方法，使用预训练模型提取特征，进行聚类生成伪标签，然后进行对比学习。

**核心数据/图表/异常值:**
*   **Figure 1:** 对比了PASS与DINO在处理局部视图上的差异，直观展示了PASS的部件感知匹配思想。
*   **Figure 2:** PASS框架的整体示意图，详细说明了全局/局部视图的处理、标记的附加、Teacher/Student网络以及损失函数的计算流程。
*   **Table 1:** 监督ReID结果，PASS预训练的ViT模型在Market1501和MSMT17上显著优于ImageNet预训练和其他LUPerson自监督预训练方法（包括基线DINO），达到SOTA。
*   **Table 2 & 3:** UDA和USL ReID结果，PASS同样展现出比基线DINO和其他方法更好的性能。
*   **Table 4:** 关于局部区域数量L的消融实验，显示L=3（每个区域占图像50%）效果最佳。
*   **Table 5 & 6:** 关于微调阶段特征融合方式（拼接所有、均值、拼接`[CLS]`和`[Part]`）的消融实验，拼接`[CLS]`和`[Part]`在监督任务上通常最优。
*   **Figure 3:** `[CLS]`和`[PART]`标记在ViT最后一个自注意力层的注意力图可视化。显示`[CLS]`关注全局，不同的`[PART]`标记自动关注了人体的不同语义部位（上身、腰部、腿部），且对遮挡具有鲁棒性。
*   **Figure 4:** 对比PASS和DINO预训练模型的检索排序列表，显示PASS在区分细微差异上更优越。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   PASS是一种有效的、专为行人ReID设计的自监督预训练方法。
    *   通过引入`[PART]`标记和部件感知的匹配策略，PASS能够引导模型在预训练阶段自动学习到细粒度的、部件级别的特征表示。
    *   这种部件感知特性使得预训练模型更适合ReID任务，在监督、无监督域适应（UDA）和无监督学习（USL）ReID任务上均取得了显著优于通用SSL方法（如DINO）和ImageNet预训练的性能。
*   **局限性:**
    *   预训练需要大规模的无标签行人数据集（LUPerson）。
    *   需要预先设定局部区域的数量L和划分方式。
    *   相比DINO，引入了额外的`[PART]`标记，增加了少量计算开销。
*   **未来方向:**
    *   将PASS方法应用于其他细粒度视觉识别任务。
    *   探索更灵活或动态的部件区域划分和标记分配策略。
    *   研究不同ViT变体或CNN与PASS结合的可能性。

**参考文献追踪:**
*   **DINO (Caron et al., 2021):** PASS所基于的核心SSL框架。
*   **ViT (Dosovitskiy et al., 2020):** PASS使用的骨干网络。
*   **LUPerson (Fu et al., 2021):** 用于PASS预训练的大规模无标签行人数据集。
*   **TransReID (He et al., 2021):** 一个重要的基于Transformer的监督ReID方法，PASS在微调阶段借鉴了其部分设置。
*   **AAformer (Zhu et al., 2021):** 作者之前的研究，也涉及Transformer和部件对齐。
*   **PCB, MGN, SPReID:** 经典的基于部件的监督ReID方法。
*   **C-Contrast (Dai et al., 2021):** 用于UDA/USL ReID任务对比的基线方法。

**补充材料（代码/附录）:**
*   **代码:** 在GitHub上提供: `https://github.com/CASIA-IVA-Lab/PASS-reID`
