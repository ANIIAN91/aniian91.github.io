- [[2004.08249] Understanding the Difficulty of Training Transformers](https://arxiv.org/abs/2004.08249)
- [[2004.08249v3.pdf]]


*   **英文标题:** Understanding the Difficulty of Training Transformers
*   **中文标题:** 理解Transformer训练的困难性
*   **作者:** Liyuan Liu, Xiaodong Liu, Jianfeng Gao, Weizhu Chen, Jiawei Han
*   **期刊:** arXiv (预印本)
*   **中文关键字:** Transformer, 训练稳定性, 层归一化, Post-LN, Pre-LN, 梯度消失, 放大效应, 初始化, 自适应初始化 (Admin)
*   **英文关键字:** Transformer, Training Stability, Layer Normalization, Post-LN, Pre-LN, Gradient Vanishing, Amplification Effect, Initialization, Adaptive Initialization (Admin)
*   **论文发表时间:** 2023年10月1日 (v3 版本)

**摘要:**
Transformer在许多NLP任务中已被证明有效。然而，它们的训练在设计先进的优化器和仔细调整学习率计划方面需要非凡的努力（例如，传统的SGD无法有效训练Transformer）。本文的目标是从经验和理论角度理解是什么使Transformer训练复杂化。分析表明，不平衡的梯度并非训练不稳定的根本原因。相反，我们发现了一种放大效应，它显著影响训练——在多层Transformer模型中，每一层对其残差分支的重度依赖使得训练不稳定，因为它会放大微小的参数扰动（例如参数更新），并导致模型输出的显著干扰。然而，我们观察到轻度依赖会限制模型潜力并导致较差的训练结果。受此分析启发，我们提出了Admin（自适应模型初始化）来稳定早期训练阶段并释放其在后期阶段的全部潜力。大量实验表明，Admin更稳定，收敛更快，并带来更好的性能。

**背景/目标/创新点:**
*   **背景:**
    *   Transformer架构在多种任务上取得了巨大成功，但其训练过程相比传统RNN和CNN更为困难和不稳定，需要特定的优化器（如Adam）和学习率策略（如warmup）。
    *   原始的Transformer架构（Post-LN，即Layer Normalization在残差连接之后）被发现比其变体Pre-LN（Layer Normalization在残差连接之前）更难训练，尤其是在模型层数较深时。
    *   已有的研究指出了梯度消失问题，但未能完全解释训练不稳定的根源。

*   **目标:**
    *   深入探究Transformer（特别是Post-LN架构）训练困难和不稳定的根本原因。
    *   分析梯度消失、层归一化位置、参数更新等因素对训练动态的影响。
    *   提出一种新的初始化方法来稳定深度Transformer的训练。

*   **创新点:**
    *   **识别放大效应 (Amplification Effect):** 发现Post-LN架构中，层输出对其自身残差分支的强依赖性会放大参数扰动（如梯度更新）对模型输出的影响，导致训练不稳定，且该效应随层数加深而加剧（`O(N)` vs Pre-LN的 `O(log N)`）。
    *   **排除梯度消失作为主因:** 通过理论和实验（构建混合模型）证明，梯度消失并非导致Post-LN训练不稳定的直接原因。
    *   **提出Admin (Adaptive Model Initialization):** 一种新的自适应初始化方法，通过在训练初期控制Post-LN模型对残差分支的依赖性（模拟Pre-LN的初始状态），然后在训练过程中允许模型灵活调整依赖关系（释放Post-LN的潜力），从而稳定深度Transformer的训练并提升性能。

**方法/实验设计/技术细节（重点关注架构与数据的变化和传递）：**
1.  **架构对比 (Pre-LN vs Post-LN, Figure 2):**
    *   **Post-LN (原始Transformer):** `output = LayerNorm(x + Sublayer(x))`。层归一化作用于残差连接的**和**之后。数据流：输入 `x` -> Sublayer -> `Sublayer(x)` -> `x + Sublayer(x)` -> LayerNorm -> 输出。
    *   **Pre-LN:** `output = x + Sublayer(LayerNorm(x))`。层归一化作用于输入 `x` **进入**子层之前。数据流：输入 `x` -> LayerNorm -> `LayerNorm(x)` -> Sublayer -> `Sublayer(LayerNorm(x))` -> `x + Sublayer(LayerNorm(x))` -> 输出。
2.  **梯度分析 (Section 3):**
    *   **理论分析:** 推导表明Pre-LN在反向传播中梯度不会消失。Post-LN编码器梯度不消失，但Post-LN解码器在Encoder-Attention部分的梯度会消失 (Theorem 1, Appendix A)。
    *   **实证分析 (Figure 3):** 通过计算梯度范数验证了理论分析，只有Post-LN解码器的Encoder-Attention部分存在明显的梯度消失现象。
    *   **混合模型实验 (Table 1):** 构建Post-LN编码器 + Pre-LN解码器的混合模型。该模型无梯度消失问题，但训练仍然不稳定（18层时发散），说明梯度消失不是不稳定的主因。
3.  **放大效应分析 (Section 4):**
    *   **定义层依赖性 (βij, Figure 7):** 量化第 `i` 层输出对第 `j` 个残差分支输出的依赖程度。发现Post-LN的 `βii`（对自身残差分支的依赖）显著大于Pre-LN，尤其是在初始化时。
    *   **推导输出变化 (Theorem 2, Corollaries 1&2):** 证明了参数扰动 `δ` 导致的模型输出变化 `Var[F(x, W) - F(x, W+δ)]` 对于Post-LN是 `O(N)`，对于Pre-LN是 `O(log N)` (N为层数)。
    *   **实证输出变化 (Figure 4):** 通过施加随机扰动或梯度更新，测量模型输出的平方差，实验结果 (`R²=0.99`) 符合理论推导，证实了Post-LN的放大效应。
4.  **Admin初始化方法 (Section 4.3, Appendix C):**
    *   **动机:** 结合Pre-LN的初始稳定性和Post-LN的后期潜力。
    *   **修改架构:** 在Post-LN的残差连接前引入一个可学习的逐元素缩放向量 `w`：`bi = xi-1 · wi + fi(xi-1)`，然后 `xi = fLN(bi)`。
    *   **初始化过程:**
        *   **Profiling阶段:** 正常初始化参数（`wi=1`），用一个batch进行一次前向传播，记录每个残差分支 `fi` 的输出方差 `Var[fi(xi-1)]`。
        *   **Initialization阶段:** 根据记录的方差设置 `wi` 的初始值（ `wi = √Σj<i Var[fj(xj-1)]` ），使得初始的层依赖性近似 `βii ≈ 1/i`，模拟Pre-LN的初始状态以获得 `O(log N)` 的输出变化。
    *   **训练:** 正常训练，`w` 会随之更新。
    *   **再参数化:** 训练后可以将 `w` 合并到其他参数中，恢复标准Post-LN结构。

**核心数据/图表/异常值:**
*   **Figure 1 & 9:** PPL曲线显示，深层（18层）Post-LN发散，Pre-LN收敛但性能可能次优，Admin稳定收敛且性能更好。
*   **Figure 2:** Pre-LN和Post-LN的详细架构图和符号定义。
*   **Figure 3 & 5 & 11:** 梯度范数分析图，显示梯度消失位置和自适应优化器对不平衡梯度的缓解作用。
*   **Figure 4:** 关键图表，显示模型输出变化与层数N的关系，证实Post-LN的 `O(N)` 放大效应和Admin/Pre-LN的 `O(log N)` 效应。
*   **Figure 7 & 8:** 层依赖性 `βij` 可视化，显示Post-LN对自身残差依赖强，Pre-LN依赖分散，Admin则从类似Pre-LN的初始状态过渡到类似Post-LN的最终状态。
*   **Table 1:** 混合模型实验结果，证明修复梯度消失不足以稳定Post-LN。
*   **Table 2:** 主要BLEU结果，Admin在不同层数和数据集上均优于Pre-LN和Post-LN，并能在深层模型上稳定训练，取得SOTA（WMT'14 En-Fr 43.8 BLEU）。
*   **Figure 10:** 超参数网格搜索结果，显示Admin相比Post-LN对超参数更鲁棒。
*   **异常值/关键发现:** Post-LN训练不稳定的根本原因是放大效应，而非梯度消失。Admin通过自适应初始化有效解决了这个问题。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   Post-LN Transformer训练不稳定的主要原因是其结构导致的放大效应：对残差分支的强依赖性放大了参数扰动，导致深层模型输出剧烈变化。
    *   梯度消失虽然存在于Post-LN解码器中，但不是导致训练失败的根本原因。
    *   Admin初始化方法通过在训练初期控制层依赖性，成功稳定了深度Post-LN Transformer的训练，使其收敛更快、性能更好，并释放了深度模型的潜力。
*   **局限性:**
    *   Admin引入了一个额外的Profiling步骤来确定初始化参数。
    *   理论分析依赖于初始化阶段和一些简化假设。
    *   主要在Transformer上验证，对其他架构的适用性未知。
*   **未来方向:**
    *   将放大效应的分析推广到其他深度学习模型。
    *   设计新的算法自动适应不同训练配置下的深度网络。
    *   基于Admin的原理改进Transformer架构。
    *   将Admin应用于更大规模的模型训练。

**参考文献追踪:**
*   **Attention Is All You Need (Vaswani et al., 2017):** 本文分析的基础模型。
*   **Layer Normalization (Ba et al., 2016):** 关键组件。
*   **On Layer Normalization in the Transformer Architecture (Xiong et al., 2019):** 讨论了Pre-LN及其梯度特性。
*   **Transformers without Tears: Improving the Normalization of Self-Attention (Nguyen & Salazar, 2019):** 另一篇关于Pre-LN的工作。
*   **On the Variance of the Adaptive Learning Rate and Beyond (Liu et al., 2020a):** 作者前期关于Transformer训练和Adam优化器的工作，与warmup相关。
*   **ReZero/FixUp:** 其他尝试解决深度网络训练问题的初始化或架构修改方法，作为比较对象。

**补充材料（代码/附录）:**
*   **代码:** 在GitHub上发布: `https://github.com/LiyuanLucasLiu/Transforemr-Clinic`
*   **附录:** 包含梯度和放大效应的详细数学推导 (A, B)，Admin的实现细节 (C)，实验设置细节 (D)，与ReZero的比较 (E)，以及在WMT'14 En-Fr上的进一步实验 (F)。
