- [[2105.01938] Towards Self-Supervision for Video Identification of Individual Holstein-Friesian Cattle: The Cows2021 Dataset](https://arxiv.org/abs/2105.01938)
- [Cows2021 Dataset - Datasets - data.bris](https://data.bris.ac.uk/data/dataset/4vnrca7qw1642qlwxjadp87h7)
- 2105.01938v1.pdf})

**论文总结**
*   **英文标题：** Towards Self-Supervision for Video Identification of Individual Holstein-Friesian Cattle: The Cows2021 Dataset
*   **中文标题：** 面向荷斯坦-弗里斯兰牛个体视频识别的自监督：Cows2021数据集
*   **作者：** Jing Gao, Tilo Burghardt, William Andrew, Andrew W. Dowsey, Neill W. Campbell
*   **期刊：** arXiv
*   **中文关键字：** 荷斯坦-弗里斯兰牛，自监督学习，视频识别，个体识别，数据集
*   **英文关键字：** Holstein-Friesian cattle, self-supervision, video identification, individual identification, dataset
*   **论文发表时间：** 2021年5月5日

**摘要：**
论文发布了最大的身份标注荷斯坦-弗里斯兰牛数据集（Cows2021）和一个用于个体动物视频识别的初步自监督框架。该数据集包含 10,402 张 RGB 图像，标注了定位和身份信息，以及来自同一牛群的 301 个视频。这些数据展示了从上方拍摄的牛棚内部图像，捕捉了该品种牛个体独特的黑白花纹。考虑到构建视觉牛识别系统所涉及的标注负担，论文提出利用视频中随时间变化的皮毛花纹外观作为动物身份学习的自监督信号。通过使用产生方向边界框的个体无关牛检测器，通过检测跟踪形成个体旋转归一化轨迹，并通过增强来丰富。这为每个轨迹产生了一个“正”样本集，并与从其他视频中随机牛样本的“负”样本集配对。然后，采用帧三元组对比学习来构建度量潜在空间。将高斯混合模型拟合到这个空间会产生一个牛身份分类器。结果显示，与真实值相比，Top-1 准确度为 57.0%，Top-4 为 76.9%，调整后的兰德指数为 0.53。虽然有监督训练大大超过了这个基准，但论文得出的结论是，在最初构建监督信息时，自监督仍然可以发挥高度有效的作用，以加快标注工作。论文提供了所有数据和完整的源代码，以及对系统的分析和评估。

**背景/目标/创新点：**
*   **背景：** 荷斯坦-弗里斯兰牛是世界上数量最多、产奶量最高的牛品种。牛的个体识别对于畜牧业管理至关重要。传统方法存在一定的局限性，而基于监督学习的视觉识别方法需要大量标注数据。
*   **目标：** 减少牛个体识别系统构建中的人工标注工作，探索基于视频数据的自监督学习方法，并发布一个大型荷斯坦-弗里斯兰牛数据集。
*   **创新点：**
    *   **Cows2021数据集：** 目前最大的带有身份标注的荷斯坦-弗里斯兰牛数据集。
    *   **自监督学习框架：** 利用视频中 coat pattern 的时序信息作为自监督信号，实现牛个体身份识别。
    *   **Catle Tracking by Detection:** 使用旋转box的tracker, 获取鲁棒轨迹。
    *   **Metric Learning using Frame Triplet:** 使用frame triplet进行对比学习。
    *   **GMM Clustering:** 使用GMM进行类别划分。

**方法/实验设计/技术细节：**
1.  **数据采集与标注：**
    *   使用 Intel D435 摄像头在牛棚内采集视频和图像数据。
    *   手动标注图像中的牛 torso 实例（oriented bounding-box）。
    *   为检测到的牛实例分配个体 ID。
2.  **ID-agnostic 牛检测器：**
    *   修改 RetinaNet，添加旋转 anchors，实现牛的方向感知检测。
3.  **基于视频的自监督动物身份学习：**
    *   使用 ID-agnostic 牛检测器生成可靠的 tracklets。
    *   利用 coat pattern 的外观作为自监督信号，训练个体动物识别模型。
    *   Contrastive Training：
        *   Identification Network and Triplet Loss: 使用ResNet50 作为特征提取器， 输出128维的向量。 正样本来自于同一视频的traclets， 负样本来自于其他视频。 loss使用Reciprocal triplet loss。

4.  **通过聚类发现动物身份：**
    *   将高斯混合模型（GMM）拟合到生成的潜在空间。
    *   将聚类结果解释为不同的动物身份。

**核心数据/图表/异常值：**
*   图 1：概念概述。概述Cows2021 数据集，使用方法。
*   图 2：Cows2021牛群。
*   图 4： 跨个人获取。
*   表 1：性能结果。

**结论解释/局限性/未来方向：**
*   **结论：** 论文提出的自监督学习框架在牛个体识别方面取得了一定的进展，为减少人工标注工作提供了新的思路。
*   **局限性：** 自监督学习的效果离有监督学习还有较大差距。
*   **未来方向：** 需要更大的数据集和更先进的自监督学习方法。

