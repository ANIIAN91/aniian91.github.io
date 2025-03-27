**1. 数据来源与初始准备:**
*   **原始图像:** 假设你有一张图像，其尺寸为 `H x W x C_in`， 其中：
    *   `H` 是图像的高度（像素数）。
    *   `W` 是图像的宽度（像素数）。
    *   `C_in` 是输入图像的通道数 (例如，彩色图像的 `C_in=3`，分别代表红、绿、蓝通道)。

*   **Patch Embedding (ViT 中的常见步骤):** 在将图像输入 Transformer 之前，通常会进行 Patch Embedding，将图像分割成多个小的、不重叠的图像块 (patches)。
    *   **Patch Size:** 假设你选择的 patch size 为 `P x P`。
    *   **Number of Patches:** 那么，图像会被分割成 `(H/P) x (W/P)` 个 patches。
    *   **Flattening:** 每个 patch 的尺寸为 `P x P x C_in`。 为了方便处理，我们会将每个 patch "压平" (flatten) 成一个长度为 `P * P * C_in` 的向量。
    *   **Linear Projection:**  然后，使用一个线性层 (Linear Projection) 将每个压平的 patch 向量映射到一个固定维度 `D`。  这个 `D` 就成为了 Transformer 的 embedding dimension。

*   **数据定义:**
    *   `h` 和 `w`：通常，在多头注意力语境下， `h` 一般代表 **head** 的数量，而 `w` 不太常见，可能在特定场景下具有特定含义。  在这里，我们假设你想问的是 **序列长度** `N`。  在图像处理中，序列长度 `N` 通常是 patch 的数量，即 `N = (H/P) * (W/P)`。
    *   `C`： 这里指的`C`代表的是`D`，也就是embedding dimension。
    *   `M`：`M` 一般代表 batch size
!../docs/Pasted image 20250320104445.png})
**因此，在进入多头自注意力之前，我们得到了以下数据：**
*   `N = (H/P) * (W/P)`：序列长度 (patch 的数量)。
*   `D`：Embedding dimension (每个 patch 映射到的向量维度)。
*   `M`：Batch size (一次处理的图像数量)。

**于是，输入多头自注意力的数据维度为 `(M, N, D)`。**  这个张量可以看作是一个 batch 的序列数据，其中：
*   `M` 是 batch 中的样本数量。
*   `N` 是序列的长度 (即 patch 的数量)。
*   `D` 是每个序列元素的特征维度 (即 embedding dimension)。

**2. 多头自注意力内部的数据变化：**
1.  **线性变换 (Q、K、V):**
    *   输入 `X` 的维度为 `(M, N, D)`。
    *   **Query (Q):**  使用一个线性层将 `X` 投影到 Query 空间： `Q = X * W_q`。  `W_q` 的维度为 `(D, D_k)`，其中 `D_k` 是 Query 的维度 (通常 `D_k = D / num_heads`)。 `Q` 的维度为 `(M, N, D_k)`。
    *   **Key (K):**  使用一个线性层将 `X` 投影到 Key 空间： `K = X * W_k`。  `W_k` 的维度为 `(D, D_k)`。 `K` 的维度为 `(M, N, D_k)`。
    *   **Value (V):** 使用一个线性层将 `X` 投影到 Value 空间： `V = X * W_v`。  `W_v` 的维度为 `(D, D_v)`，其中 `D_v` 是 Value 的维度 (通常 `D_v = D / num_heads`)。 `V` 的维度为 `(M, N, D_v)`。

    **注意：`W_q`、`W_k`、`W_v` 是可学习的权重矩阵。** 它们是自注意力机制学习的关键参数。

2.  **Scaled Dot-Product Attention:**
    *   **计算 Attention Scores:** 将 Query 和 Key 进行点积，然后进行缩放： `Attention_Scores = (Q @ K.transpose(-2, -1)) / sqrt(D_k)`。
        *   `Q @ K.transpose(-2, -1)`  执行矩阵乘法。 `K.transpose(-2, -1)` 是将 `K` 的最后两个维度进行转置，其维度从 `(M, N, D_k)` 变为 `(M, D_k, N)`。  因此，`Attention_Scores` 的维度为 `(M, N, N)`。  这个矩阵表示了每个 patch 对其他所有 patch 的关注程度。
        *   `sqrt(D_k)` 是缩放因子，用于防止点积过大，导致梯度消失。
    *   **Softmax:**  对 Attention Scores 应用 Softmax 函数，使其变为概率分布： `Attention_Weights = softmax(Attention_Scores, dim=-1)`。  `Attention_Weights` 的维度为 `(M, N, N)`。  每一行代表一个 patch 对其他所有 patch 的注意力权重。
    *   **Weighted Sum:**  将 Attention Weights 与 Value 进行加权求和： `Attention_Output = Attention_Weights @ V`。  `Attention_Output` 的维度为 `(M, N, D_v)`。  这就是自注意力机制的输出，它融合了来自其他 patch 的信息。

3.  **多头 (Multi-Head):**

    *   **分割 Head:** 为了实现多头注意力，我们将 Q、K、V 分别分割成 `num_heads` 个头。
        *   例如，将 `Q` 从 `(M, N, D_k)` 变为 `(M, num_heads, N, D_k/num_heads)`。 同样，对 `K` 和 `V` 进行分割。
    *   **并行计算:**  对每个头并行执行Scaled Dot-Product Attention。  每个头的输出维度为 `(M, N, D_v / num_heads)`。
    *   **Concat:**  将所有头的输出拼接在一起： `MultiHead_Output = concat(head_1, head_2, ..., head_num_heads)`。  `MultiHead_Output` 的维度为 `(M, N, D_v)`。  如果 `D_v` 等于初始的 `D`，那么输出维度就是 `(M, N, D)`。
    *   **Linear Projection (Optional):**  可以使用一个线性层将 MultiHead_Output 投影回原始维度 D： `Output = MultiHead_Output @ W_o`。  `W_o` 的维度为 `(D_v, D)`，`Output` 的维度为 `(M, N, D)`。

**总结数据变化:**

| 数据名称         | 维度 (Shape)        | 来源                                 | 变化                                                                                                                                                                                                                                                           |
| -------------- | ------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input (X)      | (M, N, D)           | Patch Embedding的输出，来自图像         | 线性变换为 Q, K, V                                                                                                                                                                                                                                            |
| Q              | (M, N, D_k)         | X 经过线性变换                       | 与 K 进行点积计算 Attention Scores                                                                                                                                                                                                                              |
| K              | (M, N, D_k)         | X 经过线性变换                       | 转置后与 Q 进行点积计算 Attention Scores                                                                                                                                                                                                                            |
| V              | (M, N, D_v)         | X 经过线性变换                       | 与 Attention Weights 进行加权求和                                                                                                                                                                                                                                |
| Attention_Scores | (M, N, N)           | Q 和 K 点积计算得出                   | Softmax 归一化为 Attention Weights                                                                                                                                                                                                                              |
| Attention_Weights| (M, N, N)           | Attention Scores 经过 Softmax          | 与 V 进行加权求和                                                                                                                                                                                                                                              |
| Attention_Output | (M, N, D_v)         | Attention Weights 和 V 加权求和得出   | 在多头情况下，每个头都产生一个 Attention_Output。  最后Concat各个头的Attention_Output                                                                                                                                                                               |
| MultiHead_Output| (M, N, D_v) or (M,N,D)  | 所有头的 Attention_Output 拼接而成     | 可选的线性变换，将其投影回原始维度 D                                                                                                                                                                                                                             |
| Output         | (M, N, D)           | MultiHead_Output 经过线性变换 (可选) | 这是多头自注意力的最终输出                                                                                                                                                                                                                                            |

**3.  关键参数：**

*   `num_heads`：头的数量。
*   `D_k`：Query 和 Key 的维度 (通常 `D_k = D / num_heads`)。
*   `D_v`：Value 的维度 (通常 `D_v = D / num_heads`)。
*   `W_q`、`W_k`、`W_v`：线性变换的可学习权重矩阵。
*   `W_o`：(可选) 线性投影的可学习权重矩阵。

**总结：**
多头自注意力的核心思想是：
1.  将输入数据通过线性变换投影到不同的 Query、Key、Value 空间。
2.  利用 Query 和 Key 计算 Attention Scores (注意力得分)。
3.  使用 Attention Scores 对 Value 进行加权求和，从而得到自注意力输出。
4.  将这个过程重复多次 (多头)，让模型能够从不同的角度关注输入数据。

