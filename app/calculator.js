const currencyFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export const DEFAULT_STATE = {
  costOfGoods: 100000,
  logisticCost: 12000,
  otherFixedCost: 0,
  sellerVoucherSubsidy: 5000,
  coinCashbackCost: 0,
  sellerShippingSubsidy: 0,
  targetMarginPercent: 25,
  commissionPercent: 5.5,
  freeShippingPercent: 3.2,
  cashbackProgramPercent: 2,
  voucherProgramPercent: 2,
  transactionFeePercent: 1.6,
  otherPercentFee: 0.4,
  vatPercent: 11,
};

export const PERCENT_FIELDS = [
  'commissionPercent',
  'freeShippingPercent',
  'cashbackProgramPercent',
  'voucherProgramPercent',
  'transactionFeePercent',
  'otherPercentFee',
];

export function calculate(values) {
  const {
    costOfGoods,
    logisticCost,
    otherFixedCost,
    sellerVoucherSubsidy,
    coinCashbackCost,
    sellerShippingSubsidy,
    targetMarginPercent,
    commissionPercent,
    freeShippingPercent,
    cashbackProgramPercent,
    voucherProgramPercent,
    transactionFeePercent,
    otherPercentFee,
    vatPercent,
  } = values;

  const fixedCost =
    costOfGoods +
    logisticCost +
    otherFixedCost +
    sellerVoucherSubsidy +
    coinCashbackCost +
    sellerShippingSubsidy;

  const percentFees = {
    commission: commissionPercent / 100,
    freeShipping: freeShippingPercent / 100,
    cashback: cashbackProgramPercent / 100,
    voucher: voucherProgramPercent / 100,
    transaction: transactionFeePercent / 100,
    other: otherPercentFee / 100,
    vat: vatPercent / 100,
  };

  const totalPercentFees =
    percentFees.commission +
    percentFees.freeShipping +
    percentFees.cashback +
    percentFees.voucher +
    percentFees.transaction +
    percentFees.other +
    percentFees.vat;

  const targetMarginFraction = targetMarginPercent / 100;
  const invalid = totalPercentFees + targetMarginFraction >= 1;

  const recommendedPrice = invalid
    ? 0
    : fixedCost / (1 - totalPercentFees - targetMarginFraction);

  const breakdown = {
    commission: recommendedPrice * percentFees.commission,
    freeShipping: recommendedPrice * percentFees.freeShipping,
    cashback: recommendedPrice * percentFees.cashback,
    voucher: recommendedPrice * percentFees.voucher,
    transaction: recommendedPrice * percentFees.transaction,
    other: recommendedPrice * percentFees.other,
    vat: recommendedPrice * percentFees.vat,
  };

  const totalPercentageFeeValue = Object.values(breakdown).reduce(
    (sum, value) => sum + value,
    0,
  );

  const profit = recommendedPrice - (fixedCost + totalPercentageFeeValue);
  const effectiveMargin = recommendedPrice ? (profit / recommendedPrice) * 100 : 0;
  const costCoverage = recommendedPrice ? (fixedCost / recommendedPrice) * 100 : 0;

  return {
    recommendedPrice,
    breakdown,
    totalPercentageFeeValue,
    profit,
    effectiveMargin,
    costCoverage,
    invalid,
    totalPercentFees: totalPercentFees * 100,
    formatted: {
      recommendedPrice: currencyFormat.format(Math.max(recommendedPrice, 0)),
      profit: currencyFormat.format(Math.max(profit, 0)),
      totalPercentageFeeValue: currencyFormat.format(
        Math.max(totalPercentageFeeValue, 0),
      ),
      fixedCost: currencyFormat.format(Math.max(fixedCost, 0)),
    },
  };
}

export function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

export function formatCurrency(value) {
  return currencyFormat.format(value);
}
