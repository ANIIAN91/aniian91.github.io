# 数据挖掘

1. 人工神经网络的优缺点是什么？  
    优点：人工神经网络（ANN）具有强大的拟合能力，能够自动学习数据中的复杂模式，并且适用于多种类型的数据。它在图像、语音等领域表现突出，并具有一定的容错性和并行计算优势。  
    缺点：ANN的主要缺点包括计算资源消耗大、训练时间长、对超参数的敏感性以及解释性差。此外，ANN容易出现过拟合，且对大量标注数据的依赖较强。

2. 简述人工神经网络中神经元的基本结构与功能。  
    结构：神经元由输入、权重、偏置、加权和、激活函数和输出组成。输入信号经过权重加权后与偏置相加，通过激活函数处理后产生输出信号。  
    功能：神经元的功能是接收输入信号，进行加权求和并通过激活函数产生输出。神经元不仅传递信息，还通过学习调整权重和偏置，以适应不同的任务需求，允许神经网络进行复杂的非线性建模。

3. 贝叶斯分类的基本原理是什么？为什么需要每个属性数据是独立同分布？  
    通过计算给定输入数据的条件下，选择最可能的类别作为预测结果。即根据每个类别的先验概率和特征数据的条件概率，计算各个类别的后验概率，然后选择具有最大后验概率的类别作为最终预测结果。  
    如果特征之间是独立的，那么似然概率就可以分解为各个特征的条件概率的乘积，尤其是在特征维度很高时，避免了计算复杂的联合概率。

4. 标签预测与数值预测的区别是什么？  
    标签预测解决的是类别分类问题，而数值预测解决的是数值预测（回归）问题。两者在目标输出的形式上有本质区别，标签预测输出离散的类别标签，而数值预测输出一个连续的数值。

5. 贝叶斯分类的优缺点是什么？  
   贝叶斯分类适合特征相对独立、数据量较小、噪声较少的任务。它是一种高效、易于理解的分类方法，特别适用于简单问题和要求快速部署的场景。然而，在特征之间有较强依赖关系、数据分布复杂或特征维度过高时，贝叶斯分类的效果可能不如其他更复杂的算法。