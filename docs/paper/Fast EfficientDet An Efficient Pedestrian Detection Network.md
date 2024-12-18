### 快速EfficientDet：一种高效的行人检测网络

---

## 1. 标题
- **原文标题**: Fast EfficientDet: An Efficient Pedestrian Detection Network
- **中文标题**: 快速EfficientDet：一种高效的行人检测网络

---

## 2. 摘要
### 英文摘要
As an essential application in object detection, pedestrian detection has received extensive attention in many areas such as autonomous driving, video surveillance, and criminal investigation. With the rapid development of deep learning, pedestrian detection has made significant progress. However, when faced with multi-scale target pedestrians and dense crowds, false and missed detections are prone to occur, affecting accuracy. To overcome this problem, this study presents a multi-scale object detection network (Fast EfficientDet), based on an improved EfficientDet. Firstly, the backbone network EfficientNet is improved, and some of the deepwise separable convolutions that affect the speed of the model in the early training stage are discarded. At the same time, the Mish activation function is introduced to speed up the model's training. Secondly, a new feature pyramid-network Skip-BiFPN is proposed. Based on BiFPN, a cross-layer data stream is added to integrate the object's semantic and location information. In the face of complex environments, the network can better detect objects with large differences in size. Finally, the DIoU calculation method is introduced in the NMS post-processing. The suppression problem between the candidate frames is better handled by referring to the center point distance to solve object occlusion. Compared to the original EfficientDet series algorithm, the Fast EfficientDet-D0 obtained the best mAP of 84.98%, and the training speed increased by 15%. Compared to other algorithms, the Fast EfficientDet model has better performance.

### 中文摘要
作为目标检测中的一项重要应用，行人检测在自动驾驶、视频监控和刑事侦查等诸多领域受到广泛关注。随着深度学习的快速发展，行人检测取得了显著进展。然而，面对多尺度目标行人以及密集人群时，容易出现误检和漏检情况，影响检测准确性。为克服这一问题，本研究提出一种基于改进EfficientDet的多尺度目标检测网络（Fast EfficientDet）。首先，对主干网络EfficientNet进行改进，舍弃部分在训练早期影响模型速度的深度可分离卷积，同时引入Mish激活函数以加快模型训练速度。其次，提出一种新的特征金字塔网络Skip - BiFPN。在BiFPN的基础上增加跨层数据流，整合对象的语义和位置信息，使其在复杂环境下能更好地检测尺寸差异较大的对象。最后，在NMS后处理中引入DIoU计算方法，通过参考中心点距离更好地处理候选框之间的抑制问题，以解决对象遮挡情况。与原始EfficientDet系列算法相比，Fast EfficientDet - D0获得了84.98%的最佳mAP，且训练速度提高了15%。与其他算法相比，Fast EfficientDet模型具有更好的性能。

---

## 3. 作者
- **姓名**: M. Y. Cao（曹梦圆）、J. Zhao（赵骥）
- **背景**: 均来自辽宁科技大学计算机科学与软件工程学院，在计算机视觉和深度学习领域有一定研究经验，致力于目标检测相关技术的研究与创新。
- **相关论文**: 可能在深度学习算法优化、目标检测应用等方面发表过相关学术论文，为本文的研究奠定了理论和实践基础。

---

## 4. 关键词
- EfficientDet: 一种先进的目标检测网络架构，具有高效性和可扩展性，本文基于其进行改进以应用于行人检测任务。
- 行人检测 (Pedestrian Detection): 计算机视觉领域的重要研究方向，旨在检测图像或视频中的行人，为众多应用提供基础支持。
- 深度学习 (Deep Learning): 机器学习的一个分支，通过构建多层神经网络自动学习数据特征，在行人检测中发挥关键作用，本文利用其提升检测精度和效率。
- 特征金字塔网络 (Feature Pyramid Network): 用于多尺度特征融合的网络结构，有助于检测不同尺度的目标，本文提出的Skip - BiFPN是对其的改进，以更好适应行人检测需求。
- 非极大值抑制 (NMS): 目标检测中的后处理技术，用于去除冗余检测框，本文引入DIoU计算改进NMS，提高处理遮挡情况下候选框的准确性。

---

## 5. 领域背景
### 技术历史
行人检测技术经历了从传统方法到深度学习方法的发展历程。早期传统方法主要依赖手动构建的特征，如方向梯度直方图（HOG）、哈尔特征（Haar）和局部二值模式（LBP）等，这些方法在简单场景下有一定效果，但面对复杂背景和遮挡时性能受限。随着深度学习的兴起，卷积神经网络（CNN）如AlexNet、VGGNet等被广泛应用于目标检测，极大提高了检测精度，后续又发展出R - CNN、Faster R - CNN等一系列基于深度学习的检测模型，推动了行人检测技术的进步。

### 算法比较
传统手动特征提取方法与深度学习方法相比，深度学习方法能够自动学习更复杂的特征表示，从而获得更高的检测精度。在深度学习方法内部，两阶段检测算法（如Faster R - CNN）通常具有较高的精度，但检测速度相对较慢；单阶段检测算法（如YOLO、SSD）速度较快，但精度稍低。不同算法在处理多尺度目标、遮挡问题以及计算资源需求等方面各有优劣。

### 技术挑战
当前行人检测面临的主要技术挑战包括复杂场景中的遮挡问题，如行人之间相互遮挡或被其他物体遮挡；多尺度目标问题，由于行人在图像中距离相机远近不同，导致其在图像中的尺寸差异较大；以及密集人群场景下，如何准确区分和检测每个行人，同时保证检测的实时性，这些都是行人检测技术需要解决的关键问题。

---

## 6. 文献归纳
### 传统检测方法
早期行人检测主要采用基于手动构建特征的方法，如Dalal和Triggs提出的HOG + SVM算法，通过计算图像局部区域的梯度变化信息作为特征，利用线性分类器进行检测，能有效应对小变形物体，但在复杂背景和遮挡情况下效果不佳。Felzenszwalb等人提出的可变形部件模型（DPM）是HOG的进一步扩展，可检测不同姿态行人。P. Dollar等人提出的集成通道特征（ICF）算法利用积分图技术计算特征通道，融合相关行人特征，但这些传统方法的模型计算特征耗时，分类器检测时间长，影响实时性。

### 深度学习方法
近年来，基于深度学习的方法成为主流。Zhang等人分析了Fast - RCNN在行人检测中的不足，提出利用区域建议网络（RPN）直接生成候选区域并结合提升树进行分类。Li等人使用两个子网络检测不同尺度行人，并采用尺度感知加权机制减少物体尺度对检测精度的影响。Yang等人提出的深度神经网络融合架构，先利用SSD网络生成不同大小和遮挡程度的行人候选，再进一步细化。Mendes等人提出统一深度神经网络实现多尺度对象快速检测，在不同中间网络层进行检测，节省内存和计算资源。Guan等人提出基于检测和跟踪构建3D行人虚拟空间的无监督方法，有效区分异常行为。

### 网络架构优化
EfficientDet作为一种先进的目标检测网络，其主干网络EfficientNet通过提出模型缩放方法，包括增加网络宽度、深度和输入图像分辨率等，在相同计算资源下提高了网络性能。BiFPN在特征金字塔网络（FPN）基础上进一步改进，通过优化跨尺度连接和提出加权融合方法，实现更多特征融合。本文基于这些网络架构进行优化，提出Fast EfficientDet，以更好地适应行人检测任务。

---

## 7. 切入点
针对传统行人检测方法在复杂场景下准确性低以及现有深度学习算法存在的多尺度目标和遮挡处理不足等问题，以EfficientDet网络为基础，通过改进其主干网络、特征金字塔网络和非极大值抑制算法，提出Fast EfficientDet网络，旨在提高行人检测的准确性和效率，特别是在复杂背景、多尺度目标和密集人群等具有挑战性的场景中实现更优的检测性能。

---

## 8. 缺口分析
### 算法性能方面
原始EfficientDet在处理多尺度行人目标时，浅层特征提取能力不足，导致对小尺度行人检测效果欠佳。在面对遮挡情况时，其检测性能也有待提高，容易出现漏检现象。

### 训练效率方面
EfficientDet网络层数较多，且在训练过程中使用大量深度可分离卷积，导致训练时占用过多视频内存，使得训练时间过长，效率低下，难以在资源有限的设备上快速训练模型。

### 实际应用方面
在实际复杂场景中，如密集人群场景，行人之间相互遮挡严重，同时存在不同尺度行人，现有的行人检测算法难以准确、快速地检测出所有行人，无法满足实际应用中对准确性和实时性的高要求。

---

## 9. 原因分析
### 网络结构设计
原始EfficientDet的主干网络EfficientNet在浅层使用过多深度可分离卷积，这种结构在实践中“计算量低但数据读写频繁”，导致GPU资源多用于数据读写而非计算，从而严重影响训练速度。

### 特征融合方式
BiFPN虽然在特征融合方面有所改进，但在处理复杂场景下多尺度特征融合时仍不够充分，缺乏对不同层语义和位置信息的全面整合，使得网络在检测不同尺度行人目标时性能受限。

### NMS算法局限性
传统的非极大值抑制（NMS）算法仅依赖交并比（IoU）来判断候选框是否属于同一对象，在处理遮挡问题时存在缺陷。当两个对象实际距离较近但未完全重叠时，IoU可能较大，导致NMS误将其视为同一对象而删除其中一个，造成漏检。

---

## 10. 研究问题
如何改进EfficientDet网络，使其在复杂场景下（包括多尺度目标行人、密集人群和遮挡情况）能够更准确、快速地检测出行人，同时提高网络训练效率，降低对硬件资源的依赖，以满足实际应用中对行人检测的高精度和实时性要求。

---

## 11. 研究内容
### 主干网络优化
用普通3×3卷积替换EfficientNet中MBConv模块里的部分深度可分离卷积，减少网络层数，降低训练时的视频内存占用，同时引入Mish激活函数稳定网络梯度流，提高训练速度和模型准确性。

### 特征金字塔网络改进
提出Skip - BiFPN特征金字塔网络，在BiFPN基础上增加跨层数据流，实现上下层语义和位置信息的充分融合，更好地检测不同尺度目标，尤其增强了对小目标行人的检测能力。

### NMS算法改进
在传统NMS算法中引入DIoU计算方法，考虑候选框中心点距离，更准确判断两个框是否属于同一对象，有效解决行人检测中的遮挡问题，提高检测精度。

### 实验验证与分析
在VOC 2012、Caltech和INRIA Person等数据集上进行实验，对比Fast EfficientDet与原始EfficientDet及其他主流算法的性能，包括检测精度（mAP）、训练速度等指标，同时进行消融实验分析各个改进模块对整体模型性能的影响。

---

## 12. 研究目的
### 性能提升
显著提高行人检测的准确性，特别是在复杂场景下减少误检和漏检，同时提升检测速度，以满足实时检测需求，如自动驾驶、视频监控等应用场景对行人检测的高精度和快速响应要求。

### 效率优化
通过改进网络结构和算法，减少模型训练时间和资源消耗，使模型能够在有限的硬件资源下高效训练，降低训练成本，提高模型的实用性和可扩展性。

### 技术创新
提出一种创新的行人检测网络架构和算法改进方案，为行人检测技术的发展提供新的思路和方法，推动相关领域的研究进展，同时为后续研究提供参考和借鉴。

### 实际应用推动
使改进后的行人检测模型更适用于实际复杂场景，提高行人检测技术在实际应用中的可靠性和有效性，为保障公共安全、智能交通等领域的发展提供技术支持。

---

## 13. 研究方法
### 网络架构改进
- 对EfficientNet主干网络进行优化，实验性地确定替换MBConv模块中深度可分离卷积的最佳范围（2 - 4阶段），减少网络层数，提高训练速度。
- 设计Skip - BiFPN特征金字塔网络，增加跨层数据流，改进特征融合方式，通过加权融合使网络学习不同节点的重要性，增强多尺度特征表达能力。

### 算法改进
在NMS算法中引入DIoU计算，通过计算候选框中心点距离与对角线长度的关系，结合IoU判断两个框是否属于同一对象，优化候选框筛选过程，减少遮挡导致的漏检。

### 实验设置与训练策略
- 采用VOC 2012数据集进行实验，将其随机划分为训练集、训练验证集和测试集，比例为81:9:10。同时在Caltech和INRIA Person数据集上进行对比测试。
- 基于PyTorch深度学习框架，在配备Intel Xeon E5系列处理器、128G内存、两块NVIDIA GTX TITAN XP显卡的DELL T7920图形工作站上进行实验。采用迁移学习和冻结训练策略，先进行50轮冻结训练，学习率设为\(1e^{-3}\)，再进行50轮解冻训练，学习率设为\(1e^{-4}\)，训练批次大小设为8，共训练100轮。

### 性能评估与分析
- 通过计算平均精度均值（mAP）评估模型检测精度，比较不同算法在不同数据集上的性能表现，包括在处理单目标、多目标、遮挡、密集人群、小目标等不同场景下的检测效果。
- 分析模型训练时间，对比Fast EfficientDet与原始EfficientDet在相同硬件条件下的训练速度，验证改进措施对训练效率的提升效果。同时进行消融实验，逐一添加改进模块，评估每个模块对模型整体性能（mAP）的贡献。

---

## 14. 最大创新点
### 网络结构创新
提出Skip - BiFPN特征金字塔网络，创新性地引入跨层数据流，实现多层多节点融合学习，充分利用上下层语义和位置信息，有效增强了网络对多尺度行人目标的检测能力，尤其是在处理小目标行人时表现出色。

### 算法改进
在NMS算法中引入DIoU计算，考虑候选框中心点距离，改进了传统NMS仅基于IoU的局限性，能够更准确地处理遮挡情况下的候选框抑制问题，显著提高了行人检测的精度，减少了漏检情况。

### 性能提升
通过对EfficientDet的改进，Fast EfficientDet在检测精度和训练速度方面取得显著提升。Fast EfficientDet - D0模型的mAP达到84.98%，相比原始EfficientDet - D0提高了2.31%，同时训练速度提高了15%，在与其他主流算法对比中也展现出优越性能，为行人检测提供了更高效准确的解决方案。

### 综合优化
综合改进主干网络、特征金字塔网络和NMS算法，从多个方面优化行人检测网络，不仅提高了检测精度和速度，还在一定程度上降低了对硬件资源的依赖，使模型在实际应用中更具可行性和实用性。

---

## 15. 启发与展望
### 网络轻量化探索
进一步研究如何在保持或提高检测精度的前提下，对网络进行轻量化处理，减少模型参数和计算量，使其能够在资源受限的设备（如移动设备、嵌入式设备）上更高效地运行，拓展行人检测技术的应用范围。

### 多模态信息融合
考虑融合多种模态信息（如图像、激光雷达、语义信息等）进行行人检测，充分利用不同模态的互补性，提高检测系统在复杂环境下的鲁棒性和准确性，例如在恶劣天气或低光照条件下更准确地检测行人。

### 模型适应性增强
研究如何使行人检测模型更好地适应不同场景和数据集的变化，减少对特定场景或数据集的依赖，提高模型的泛化能力。例如，开发自适应学习算法或预训练模型的微调策略，使其能够快速适应新的场景需求。

### 实时性与准确性平衡
继续探索在保证实时检测的同时进一步提高检测准确性的方法，优化算法和网络结构，以满足日益增长的对行人检测技术在自动驾驶、智能安防等领域的高要求，确保系统在复杂动态环境下能够及时准确地检测出行人，保障交通安全和公共安全。

### 应用领域拓展
将改进后的行人检测技术拓展到更多领域，如智能交通中的行人流量统计与行为分析、智能家居中的人员监测与安全防护、虚拟现实中的虚拟场景交互等，为不同领域的发展提供技术支持，创造更多的应用价值。

---

## 16. 术语解释
### EfficientDet
一种先进的目标检测网络架构，通过模型缩放技术在不同资源约束下实现高效准确的目标检测，由主干网络EfficientNet、双向特征提取网络BiFPN和框/类预测网络组成，本文基于其进行改进用于行人检测。

### EfficientNet+
对EfficientNet主干网络的改进版本，通过用普通3×3卷积替换部分MBConv模块中的深度可分离卷积，并引入Mish激活函数，提高了网络训练速度和模型准确性，是Fast EfficientDet的重要组成部分。

### Skip - BiFPN
一种新的特征金字塔网络，在BiFPN基础上增加跨层数据流，实现多层多节点融合学习，更好地整合了不同层的语义和位置信息，用于增强Fast EfficientDet对多尺度行人目标的检测能力，特别是对小目标行人的检测。

### DIoU - NMS
基于距离交并比（DIoU）的非极大值抑制