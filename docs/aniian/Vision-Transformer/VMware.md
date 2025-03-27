 1. 下载Miniconda安装脚本
```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```
1. 为安装脚本添加执行权限
```
chmod +x Miniconda3-latest-Linux-x86_64.sh

```
1. 运行安装脚本
```
bash Miniconda3-latest-Linux-x86_64.sh

```
 5. 使环境变量生效（或重新登录）
```
source ~/.bashrc

```

```
cd transreid_pytorch
pip install -e .
```

```
python train.py --config_file configs/market/vit_small.yml \
DATASETS.ROOT_DIR ./data/ \
SOLVER.BASE_LR 4e-4 \
MODEL.DEVICE_ID "('cpu')" \
MODEL.DEVICE "cpu" \
MODEL.PRETRAIN_PATH ./pretrained/vits.lup.256x128.wopt.csk.4-8.ar.375.n8/checkpoint0260.pth \
OUTPUT_DIR logs/market.vits.checkpoint0260 \
MODEL.PRETRAIN_HW_RATIO 2 \
SOLVER.IMS_PER_BATCH 16 \
TEST.IMS_PER_BATCH 16
```

```
python train.py --config_file configs/market/vit_small.yml \
DATASETS.ROOT_DIR ./data/ \
SOLVER.BASE_LR 4e-4 \
MODEL.DEVICE_ID "('0')" \
MODEL.DEVICE "gpu" \
MODEL.PRETRAIN_PATH ./pretrained/vits.lup.256x128.wopt.csk.4-8.ar.375.n8/checkpoint0260.pth \
OUTPUT_DIR logs/market.vits.checkpoint0260 \
MODEL.PRETRAIN_HW_RATIO 2 \
SOLVER.IMS_PER_BATCH 16 \
TEST.IMS_PER_BATCH 16
```


```
conda install pytorch==1.6.0 torchvision==0.7.0 cudatoolkit=10.1 -c pytorch
pip install Cython numpy wheel pkgconfig timm-0.3.2
conda install h5py
```


```
python train.py --config_file configs/market/efficient_vit_hybrid.yml \
DATASETS.ROOT_DIR ./data/ \
SOLVER.BASE_LR 4e-4 \
MODEL.DEVICE_ID "('0')" \
MODEL.DEVICE "gpu" \
MODEL.PRETRAIN_PATH ./pretrained/vits.lup.256x128.wopt.csk.4-8.ar.375.n8/checkpoint0260.pth \
OUTPUT_DIR logs/market/efficient_vit_hybrid_sigmoid.checkpoint0260 \
MODEL.PRETRAIN_HW_RATIO 2 \
SOLVER.IMS_PER_BATCH 16 \
TEST.IMS_PER_BATCH 16
```