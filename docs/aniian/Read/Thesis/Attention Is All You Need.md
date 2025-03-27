- [[1706.03762] Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [[1706.03762v7.pdf]]

*   **英文标题:** Attention Is All You Need
*   **中文标题:** 注意力机制就是你所需要的一切
*   **作者:** Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin
*   **期刊:** NIPS 2017 (Conference on Neural Information Processing Systems)
*   **中文关键字:** 注意力机制, 自注意力, Transformer, 序列转换, 机器翻译, 编码器-解码器
*   **英文关键字:** Attention Mechanism, Self-Attention, Transformer, Sequence Transduction, Machine Translation, Encoder-Decoder
*   **论文发表时间:** 2017年

**摘要:**
主流的序列转换模型基于包含编码器和解码器的复杂循环或卷积神经网络。表现最好的模型还通过注意力机制连接编码器和解码器。我们提出了一个新的、简单的网络架构——Transformer，它完全基于注意力机制，完全摒弃了循环和卷积。在两个机器翻译任务上的实验表明，这些模型在质量上更优越，同时更易于并行化，并且训练时间显著减少。我们的模型在WMT 2014英德翻译任务上达到了28.4 BLEU得分，比现有的最佳结果（包括集成模型）提高了2个BLEU以上。在WMT 2014英法翻译任务上，我们的模型在8个GPU上训练3.5天后，达到了新的单模型最高水平BLEU得分41.8，这只是文献中最佳模型训练成本的一小部分。我们表明Transformer能很好地泛化到其他任务，通过成功地将其应用于具有大型和有限训练数据的英语成分句法分析。

**背景/目标/创新点:**
*   **背景:**
    *   主流序列转换模型（如机器翻译）依赖于RNN（如LSTM, GRU）或CNN，它们按顺序处理输入和输出序列。
    *   RNN的顺序性阻碍了训练过程中的并行化。
    *   注意力机制已被证明有效，但通常与RNN结合使用。
    *   需要减少顺序计算，利用并行化来缩短训练时间并处理长距离依赖。
*   **目标:**
    *   提出一种新的模型架构，完全摆脱循环（recurrence）和卷积（convolution）。
    *   仅依赖注意力机制来捕捉输入和输出之间的全局依赖关系。
    *   实现更高的并行度，减少训练时间，并提升模型性能。
*   **创新点:**
    *   **Transformer架构:** 一种完全基于注意力机制的编码器-解码器架构。
    *   **自注意力 (Self-Attention):** 允许模型在序列的不同位置之间关联信息，以计算序列的表示。
    *   **多头注意力 (Multi-Head Attention):** 允许模型在不同表示子空间中共同关注来自不同位置的信息。
    *   **Scaled Dot-Product Attention:** 一种特定的注意力计算方式，通过缩放点积来提高稳定性和效率。
    *   **位置编码 (Positional Encoding):** 由于模型不包含循环或卷积，需要引入位置信息来利用序列的顺序。

**方法/实验设计/技术细节 (重点关注，详细输出架构与数据的变化和传递):**
1.  **整体架构 (Figure 1):** 遵循编码器-解码器结构。
    *   **编码器 (Encoder):** 由N=6个相同的层堆叠而成。
        *   **输入:** 词嵌入 (Input Embedding) + 位置编码 (Positional Encoding)。
        *   **每层包含两个子层:**
            1.  **多头自注意力机制 (Multi-Head Self-Attention):** 输入来自上一层的输出。计算当前位置对输入序列所有位置的注意力权重，得到加权聚合的表示。数据流：上一层输出 -> Q, K, V -> Multi-Head Attention -> 输出。
            2.  **逐位置前馈网络 (Position-wise Feed-Forward Network):** 对每个位置的表示独立地应用一个包含两个线性变换和ReLU激活的全连接网络：`FFN(x) = max(0, xW₁ + b₁)W₂ + b₂`。数据流：自注意力输出 -> FFN -> 输出。
        *   **残差连接与层归一化:** 每个子层都使用了残差连接 (`x + Sublayer(x)`)，然后进行层归一化 (Layer Normalization)。
        *   **输出:** 编码器最终输出一系列连续表示 `z = (z₁, ..., zₙ)`。
    *   **解码器 (Decoder):** 由N=6个相同的层堆叠而成。
        *   **输入:** 已生成的输出词嵌入 (Output Embedding, 向右移一位) + 位置编码 (Positional Encoding)。
        *   **每层包含三个子层:**
            1.  **带掩码的多头自注意力机制 (Masked Multi-Head Self-Attention):** 与编码器自注意力类似，但增加了掩码，确保在预测位置 `i` 时只能关注到位置 `i` 之前的输出。这保持了自回归 (auto-regressive) 特性。数据流：上一层输出 -> Q, K, V -> Masked Multi-Head Attention -> 输出。
            2.  **多头编码器-解码器注意力机制 (Multi-Head Encoder-Decoder Attention):** Query (Q) 来自前一个解码器子层（Masked Self-Attention）的输出，Key (K) 和 Value (V) 来自编码器的最终输出 `z`。这允许解码器的每个位置都能关注输入序列的所有位置。数据流：(Masked Self-Attention 输出 -> Q) + (编码器输出 -> K, V) -> Multi-Head Attention -> 输出。
            3.  **逐位置前馈网络 (Position-wise Feed-Forward Network):** 结构与编码器中的相同，输入是Encoder-Decoder Attention的输出。数据流：Encoder-Decoder Attention 输出 -> FFN -> 输出。
        *   **残差连接与层归一化:** 每个子层同样使用了残差连接和层归一化。
        *   **输出:** 经过N层解码后，最后的输出通过一个线性层和Softmax函数，生成下一个预测词的概率分布。
2.  **注意力机制细节 (Section 3.2, Figure 2):**
    *   **Scaled Dot-Product Attention:** 计算Query和所有Key的点积，除以`√dk`（dk是Key的维度）进行缩放，然后应用Softmax得到权重，最后对Value进行加权求和。公式：`Attention(Q, K, V) = softmax(QKᵀ / √dk) V`。
    *   **Multi-Head Attention:** 将Q, K, V通过不同的线性投影（参数矩阵W^Q_i, W^K_i, W^V_i）映射`h`次（`h=8`），并行计算`h`个Scaled Dot-Product Attention。将`h`个输出拼接起来，再通过一个线性投影（W^O）得到最终输出。这允许模型关注不同位置的不同表示子空间。
3.  **位置编码 (Section 3.5):** 使用不同频率的正弦和余弦函数生成位置编码，加到输入嵌入上。公式：`PE(pos, 2i) = sin(pos / 10000^(2i/dmodel))`, `PE(pos, 2i+1) = cos(pos / 10000^(2i/dmodel))`。

**核心数据/图表/异常值:**
*   **Table 1:** 对比了自注意力、循环层、卷积层在每层计算复杂度、最小顺序操作数和最大路径长度上的差异，突显自注意力在长距离依赖和并行计算上的优势。
*   **Table 2:** 在WMT14英德和英法翻译任务上的BLEU得分，Transformer显著优于之前的SOTA模型（包括GNMT, ConvS2S等），且训练成本大幅降低。
    *   英德: 28.4 BLEU (提升 > 2.0)
    *   英法: 41.8 BLEU (新SOTA)
*   **Table 3:** 模型变体实验（Ablation Study），展示了改变注意力头数、维度、Dropout率、位置编码方式等对性能的影响。表明多头注意力（如h=8）优于单头，适当的Dropout是必要的。
*   **Table 4:** 在英语成分句法分析任务上的结果，表明Transformer具有良好的泛化能力。
*   **Figure 1:** Transformer模型整体架构图。
*   **Figure 2:** Scaled Dot-Product Attention 和 Multi-Head Attention 的结构图。
*   **Figure 3, 4, 5 (Appendix):** 注意力可视化，展示了模型学习到的句子内部的句法和语义关系，例如解决长距离依赖和指代消解。

**结论解释/局限性/未来方向:**
*   **结论解释:**
    *   Transformer是第一个完全基于注意力机制的序列转换模型，证明了在编码器-解码器架构中，循环和卷积层并非必需。
    *   通过自注意力和多头注意力，模型能有效捕捉长距离依赖。
    *   模型高度可并行化，显著减少了训练时间。
    *   在机器翻译任务上取得了SOTA结果，并能泛化到其他任务。
*   **局限性:**
    *   自注意力的计算复杂度是序列长度`n`的平方 (`O(n²·d)`)，对于非常长的序列可能计算量巨大（论文在第4节讨论了可以通过限制性自注意力缓解）。
    *   模型没有内在的位置信息，需要显式引入位置编码。
*   **未来方向:**
    *   将Transformer应用于文本以外的其他模态（图像、音频、视频）。
    *   研究局部、受限的注意力机制以高效处理长序列。
    *   探索使生成过程更加并行化（减少顺序性）的方法。

**参考文献追踪:**
*   [x] Layer normalization (Ba et al., 2016): Transformer中使用的关键技术。
*   [2] Neural machine translation by jointly learning to align and translate (Bahdanau et al., 2014): 引入了注意力机制到NMT。
*   [11] Deep residual learning for image recognition (He et al., 2016): 启发了Transformer中的残差连接。
*   [13] Long short-term memory (Hochreiter & Schmidhuber, 1997): 代表性的RNN模型，是Transformer试图替代的基线。
*   [38] Google's neural machine translation system (Wu et al., 2016): 当时的SOTA NMT模型 (GNMT)。
*   [9] Convolutional sequence to sequence learning (Gehring et al., 2017): 另一种试图替代RNN的序列模型 (ConvS2S)。

**补充材料（代码/附录）:**
*   **代码:** 论文中提供了TensorFlow实现的链接 `https://github.com/tensorflow/tensor2tensor`。
*   **附录:** 包含注意力机制的可视化图（Figure 3, 4, 5），用于解释模型行为。