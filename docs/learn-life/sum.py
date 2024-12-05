def calculate_sum():
    # 输入每项金额
    try:
        print("请输入各项金额（单位：元），若无金额请直接回车：")
        
        # 信用卡部分
        bofa = float(input("中国银行信用卡金额：") or 0)
        icbc = float(input("工商银行信用卡金额：") or 0)
        abc = float(input("中国农业银行信用卡金额：") or 0)
        credit_card = bofa + icbc + abc

        # 房贷部分
        mortgage = 1000.00

        # 支付宝花呗部分
        huabei = 200.00
        # huabei = float(input("支付宝花呗金额：") or 0)

        # 总和计算
        total = credit_card + mortgage + huabei

        # 显示结果
        print(f"\n计算结果：")
        print(f"信用卡总金额 = {credit_card:.2f} 元")
        print(f"总金额 = 信用卡总金额 + 房贷金额 + 花呗金额 = {total:.2f} 元")
    except ValueError:
        print("输入错误，请确保输入的是数字！")

if __name__ == "__main__":
    calculate_sum()
