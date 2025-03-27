- [[../../docs/Re-identification-for-long-term-tracking-and-management-o_2025_Biosystems-En.pdf|Re-identification-for-long-term-tracking-and-management-o_2025_Biosystems-En]]
- [Re-identification for long-term tracking and management of health and welfare challenges in pigs - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S153751102500025X?via%3Dihub)

**1. 英文标题:**  Re-identification for long-term tracking and management of health and welfare challenges in pigs

**2. 中文标题:**  猪的重识别技术用于健康和福利挑战的长期跟踪和管理

**3. 作者:**  Anicetus Odo, Niall McLaughlin, Ilias Kyriazakis

**4. 期刊:**  Biosystems Engineering

**5. 摘要:**
基于视频分析的精细化畜牧管理依赖于对个体动物的长期视觉跟踪。当个体被遮挡或超出相机视野时，跟踪可能会丢失。使用视觉特征在跟踪丢失后重新分配身份的问题被称为重识别（ReID）。对于猪来说，由于猪圈内大多数个体动物的外观相似，这个问题尤其具有挑战性。

为了解决这个问题，开发了一种基于图像的猪重识别方法，该方法对姿态、光照和相机视角具有不变性。该方法允许重新识别猪，从而实现长期监测。该方法使用了先前为行人重识别开发的 Vision-Transformer 模型（ViT）。该模型使用专门设计的猪重识别数据集进行训练，数据集涵盖了各种住房和管理条件。这些数据集使用了顶置摄像头，从而可以研究检测方法对重识别性能的影响。将使用传统轴对齐猪检测器的重识别与最近开发的定向猪检测器进行了比较，定向猪检测器在从更广阔的图像中提取猪时，能更好地匹配猪的姿态。研究发现，使用定向检测器可以提高性能。所提出的系统达到了 90.5% 的峰值 rank-1 累积匹配特性 (CMC) 性能。此外，研究表明该模型能够推广到不同的农场，在跨农场环境中取得了平均 81.8% 的 rank-1 CMC。最后，所提出的重识别特征可以整合到现有的多目标跟踪系统中，以提高在跟踪丢失时重新获取猪身份的性能。总的来说，这项工作证明了使用猪的视觉重识别特征来支持个体水平动物管理的潜力。

**6. 背景/目标/创新点:**
* **背景:**
    * 精细化畜牧管理 (PLF) 依赖于个体动物的长期跟踪，视觉跟踪是重要手段。
    * 动物行为监测对于早期发现健康和福利问题至关重要，例如猪咬尾或咬耳。
    * 传统 RFID 技术存在福利问题，视觉识别成为重要的替代方案。
    * 猪的外观相似性以及遮挡、视角变化等因素给猪的个体识别和长期跟踪带来挑战。
    * 现有方法或依赖人工标记，或性能有待提升，缺乏对不同检测方法和监控条件下的系统性评估。

* **目标:**
    * 开发一种基于图像的猪重识别方法，解决猪外观相似性、姿态变化、光照变化和视角变化带来的挑战。
    * 实现对猪个体的长期、鲁棒的视觉跟踪，无需人工标记。
    * 探索不同猪检测方法（轴对齐 vs. 定向 bounding box）对重识别性能的影响。
    * 将重识别技术整合到多目标跟踪系统中，提升跟踪系统的长期性能和身份保持能力。
    * 验证模型在不同农场环境下的泛化能力。

* **创新点:**
    * **针对猪重识别任务，适配并应用了 Vision Transformer (ViT) 模型。** 首次将 ViT 应用于猪 ReID 任务，并验证了其有效性。
    * **系统性地比较了轴对齐 bounding box 和定向 bounding box 对猪重识别性能的影响。** 证明了定向 bounding box 能够减少背景干扰，提升重识别精度。
    * **提出了将猪重识别特征整合到多目标跟踪系统中的方法，并验证了其对提升长期跟踪性能的有效性。**  通过 ReID 特征增强了 MOT 系统在 tracklet linking 方面的能力，减少了 ID switch。
    * **构建了包含不同农场和管理条件下的猪重识别数据集，并验证了模型的跨农场泛化能力。**  数据集的多样性提升了模型的实用性。
    * **实验设计考虑了开放世界和封闭世界两种 ReID 场景，更全面地评估了模型性能。**

**7. 方法/实验设计/技术细节:**
* **数据集:**
    * **Cockle Park Dataset:** 来自纽卡斯尔大学 Cockle Park 农场，包含混合性别猪，顶置 Kinect v2 RGB 摄像头拍摄。4 个猪圈，每个猪圈 20 头猪。 多摄像头部分重叠覆盖。
    * **AFBI Dataset:** 来自北爱尔兰 Agri-Food and Biosciences Institute (AFBI)，断奶仔猪，顶置 4MP 网络摄像头拍摄。5 个房间，每个房间 6 个猪圈，每个猪圈 10 头猪。存在不同管理挑战的视频。
    * **数据集预处理:** 使用预训练的猪检测器和追踪器进行半自动标注和身份分配，人工修正身份切换错误。数据集划分为 Gallery 和 Probe，中间有时间间隔，模拟多摄像头场景。数据增强包括水平翻转、随机擦除、padding。

* **猪图像提取:**
    * **Oriented Bounding Box (OBB):** 使用定向 bounding box 检测猪，并旋转对齐猪躯干到 y 轴，减少背景像素。
    * **Axis-Aligned Bounding Box (AABB):** 使用轴对称 bounding box 检测，可能包含更多背景像素。
    * 两种 bounding box 的检测结果均用于实验对比。

* **ReID 模型:**
    * **Vision Transformer (ViT) with ICS (IBN-Based Convolution Stem):**  基于 ViT 架构，采用 ICS 模块提升特征提取能力。预训练于 ImageNet 或 LUPerson 数据集，并在猪数据集上微调。
    * **Omni-Scale Network (OSNet):** 基于 CNN 架构，多尺度特征学习，轻量级。  预训练权重，并在猪数据集上微调。
    * 模型训练细节：120 epochs，batch size 64，learning rate 4e-4，图像 resize 到 128x256。

* **实验设计:**
    * **Bounding Box 类型影响实验:**  对比 OBB 和 AABB 对 ReID 性能的影响 (Cockle Park 单摄像头数据集)。
    * **开放世界 vs. 封闭世界 ReID 实验:**  比较两种场景下 ReID 性能 （Cockle Park 双摄像头数据集）。
    * **跨数据集泛化实验:** 验证模型在 Cockle Park 和 AFBI 数据集之间的跨数据集泛化能力。
    * **Probe 和 Gallery 大小影响实验:**  研究 Probe 和 Gallery 图像数量对性能的影响 （封闭世界场景）。
    * **旋转影响实验:**  评估图像旋转 180° 和小角度随机旋转对 ReID 性能的影响。
    * **ReID 特征辅助跟踪实验:** 将 ReID 特征整合到多目标跟踪系统，对比跟踪性能 (AFBI 数据集)。

* **评估指标:** Rank-1 Cumulative Matching Characteristic (CMC), 多目标跟踪指标 (FP, FN, Precision, Recall, ID Switches, IDF1, MOTA)。


**8. 核心数据/图表/异常值:**
* **核心数据:**
    * **表 6:** 定向 bounding box 较轴对齐 bounding box 显著提升 ReID  rank-1 CMC (定向 ViT 模型峰值 90.5% vs. 轴对齐 ViT 模型 78.2%)。
    * **表 7:**  封闭世界 ReID 性能高于开放世界 ReID 性能 (封闭世界 ViT 模型平均 rank-1 CMC 81.1% vs. 开放世界 ViT 模型 75.0%)。
    * **表 8:**  增加 Gallery 图像数量可以提升 ReID 性能，Probe 图像数量影响不明显，峰值 rank-1 CMC 达 93%。
    * **表 9:**  模型在 Cockle Park 和 AFBI 数据集之间具有较好的跨数据集泛化能力 (平均 rank-1 CMC 81.8%)，但 Cockle Park 训练模型泛化到 AFBI 数据集更好。
    * **表 12:**  整合 ReID 特征到多目标跟踪系统可减少 ID switches，提升 MOTA 和 Recall。
    * **ViT 模型在大多数实验中优于 OSNet 模型。**
    * **定向 bounding box 结合 ViT 模型取得了最佳的 ReID 性能。**

* **核心图表:**
    * **图 7:**  ReID 排名可视化，展示了成功和失败的匹配案例，指示图像质量可能影响匹配结果。
    * **图 8:**  显著性区域可视化，轴对称 bounding box 模型更容易被背景干扰，定向 bounding box 模型更关注猪本身。

* **异常值/讨论:**
    * 模型对图像旋转 180° 较为敏感，表明依赖头部朝上的姿态。 但对小角度旋转不敏感。
    * 图像质量（例如对比度）可能影响 ReID 性能。
    * 开放世界 ReID 性能下降，干扰项会降低模型精度。

**9. 结论解释/局限性/未来方向:**
* **结论解释:**
    * ViT 模型和定向 bounding box 的结合能够有效提升猪重识别性能，实现个体猪的视觉长期跟踪。
    * ReID 特征可以有效提升多目标跟踪系统的长期性能和身份保持能力。
    * 该方法具有跨农场泛化的潜力。

* **局限性:**
    * 模型对图像旋转敏感，实际部署中需要保证猪姿态检测的准确性。
    * 数据集规模相对有限，跨农场泛化能力需要在更大规模、更多样化的数据集上验证。
    * 真实农场环境可能更加复杂，例如存在更极端的遮挡、光照变化等，需要进一步研究模型的鲁棒性。

* **未来方向:**
    * 研究更鲁棒的特征提取方法，提升模型对姿态、光照、遮挡等因素的鲁棒性。
    * 构建更大规模、更多样化的猪重识别数据集，提升模型的泛化能力。
    * 将 ReID 方法应用于真实的多摄像头跟踪系统，验证其在实际场景中的性能。
    * 探索 ReID 技术在个体猪健康和福利管理中的实际应用，例如行为异常检测、疾病早期预警等。

**10. 参考文献追踪:**
* **关键参考文献:**
    * Cowton et al. (2019):  基线方法，本文与其方法和性能进行了比较。
    * Wang et al. (2022), Psota et al. (2020):  现有猪重识别方法，本文指出了其局限性 (人工标记等)。
    * Zhou et al. (2019):  OSNet 模型的来源。
    * Luo et al. (2021): ViT 模型 (IBN-based convolution stem) 的来源。
    * Zheng et al. (2015): Market1501 行人重识别数据集，常用于预训练 ReID 模型。
    * Fu et al. (2021): LUPerson  非监督行人重识别数据集，也用于预训练。

* **参考文献整体方向:**
    * 行人重识别 (Person Re-identification)：借鉴行人 ReID 的方法和模型 (ViT, OSNet)。
    * 多目标跟踪 (Multi-Object Tracking)：将 ReID 应用于 MOT 系统以提升性能。
    * 畜牧精准化养殖 (Precision Livestock Farming)：应用背景和驱动力。

**11. 补充材料（代码/附录）:**
* **数据可用性声明:**  数据和代码可向作者合理请求获取。
* **论文中未包含代码或附录，但声明数据和代码可获取，因此可能有补充材料存在但未在 PDF 中直接提供。**

