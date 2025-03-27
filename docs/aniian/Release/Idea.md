
**学术会议**

CNN + VIT 
	swin Deit personvit(自监督)
	多尺度融合
	自监督
	无监督
	迁移学习
	混合模型：TCCNet 、 ResTNet、efficentvit、mobilevit
	CNN金字塔特征提取 + W-MSA(Swin)
	每次encoder出来cnn卷一遍特征  
	personvit  + SIE +CNN + W-MSA(Swin)
	sigmoid或softmax计算权重，控制CNN特征的贡献
	[EfficientNet B0 to B7](https://keras.io/api/applications/efficientnet/)


effcientnet提取局部特征 vit提取全局特征  将局部特征进行处理和vit进行拼接 encoder，除了最后一次外，对encoder出来的数据利用efficentnet进行局部特征提取，再拼接回去


#### 拼接
- 拼接意味着将额外特征与每个补丁的嵌入沿特征维度连接，增加输入的维度。
- 例如，如果补丁嵌入是768维，额外特征是128维，拼接后每个补丁的维度变为896维。
- 这允许模型将原始补丁信息和额外特征视为独立的通道，**学习它们之间的复杂交互**。
#### 相加
- 相加意味着将额外特征与补丁嵌入进行元素-wise相加，要求额外特征与补丁嵌入有相同的维度。
- 例如，如果补丁嵌入是768维，额外特征也必须是768维，相加后维度保持768。
- 这直接修改补丁嵌入，适合**额外特征是补丁嵌入的补充或修正**，如位置编码。


