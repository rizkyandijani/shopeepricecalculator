// Auto-generated from the Shopee fee presets used by the calculator React implementation.
// Provides category-based defaults for each fee percentage so the vanilla build can stay in sync.
export const categoryPresets = [
  {
    id: 'fashion',
    name: 'Fashion & Aksesoris',
    categoryNotes:
      'Termasuk pakaian, sepatu, tas, dan aksesoris yang mengikuti program Gratis Ongkir XTRA dan Cashback.',
    programHighlights: [
      'Gratis Ongkir XTRA biasanya 3% untuk penjual baru dan turun hingga 2.5% untuk Star+',
      'Program Cashback bersama Shopee berkisar 1.5% - 2%',
      'Biaya komisi berkisar antara 4% - 5.5% tergantung status toko'
    ],
    tiers: [
      {
        id: 'nonProgram',
        label: 'Non-Program / Penjual Baru',
        description: 'Penjual umum tanpa status Star.',
        values: {
          commissionPercent: 5.5,
          freeShippingPercent: 3.2,
          cashbackProgramPercent: 2,
          voucherProgramPercent: 2,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.4
        }
      },
      {
        id: 'star',
        label: 'Star Seller',
        description: 'Penjual dengan status Star.',
        values: {
          commissionPercent: 4.5,
          freeShippingPercent: 2.8,
          cashbackProgramPercent: 1.8,
          voucherProgramPercent: 1.8,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.3
        }
      },
      {
        id: 'starPlus',
        label: 'Star+ / Star Elite',
        description: 'Penjual dengan performa Star+ atau Star Elite.',
        values: {
          commissionPercent: 4,
          freeShippingPercent: 2.5,
          cashbackProgramPercent: 1.6,
          voucherProgramPercent: 1.6,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.2
        }
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Kecantikan & Perawatan Tubuh',
    categoryNotes:
      'Kosmetik, skincare, personal care yang mengikuti kombinasi program cashback dan voucher.',
    programHighlights: [
      'Komisi lebih tinggi untuk kategori kecantikan karena tingkat promosi tinggi',
      'Gratis Ongkir XTRA 3% untuk penjual umum dan 2.5% untuk Star+',
      'Biasanya mengikuti program cashback 2.2% dari harga jual'
    ],
    tiers: [
      {
        id: 'nonProgram',
        label: 'Non-Program / Penjual Baru',
        description: 'Penjual umum tanpa status Star.',
        values: {
          commissionPercent: 6,
          freeShippingPercent: 3.1,
          cashbackProgramPercent: 2.2,
          voucherProgramPercent: 2,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.5
        }
      },
      {
        id: 'star',
        label: 'Star Seller',
        description: 'Penjual dengan status Star.',
        values: {
          commissionPercent: 5,
          freeShippingPercent: 2.8,
          cashbackProgramPercent: 2,
          voucherProgramPercent: 1.8,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.4
        }
      },
      {
        id: 'starPlus',
        label: 'Star+ / Star Elite',
        description: 'Penjual dengan performa Star+ atau Star Elite.',
        values: {
          commissionPercent: 4.8,
          freeShippingPercent: 2.5,
          cashbackProgramPercent: 1.8,
          voucherProgramPercent: 1.6,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.35
        }
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Elektronik & Gadget',
    categoryNotes:
      'Perangkat elektronik, gadget, dan aksesoris resmi/non-resmi.',
    programHighlights: [
      'Komisi lebih rendah untuk menjaga daya saing',
      'Gratis Ongkir XTRA 2.5% - 3%',
      'Cashback biasanya lebih kecil untuk menjaga margin',
    ],
    tiers: [
      {
        id: 'nonProgram',
        label: 'Non-Program / Penjual Baru',
        description: 'Penjual umum tanpa status Star.',
        values: {
          commissionPercent: 4,
          freeShippingPercent: 2.8,
          cashbackProgramPercent: 1.5,
          voucherProgramPercent: 1.8,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.3
        }
      },
      {
        id: 'star',
        label: 'Star Seller',
        description: 'Penjual dengan status Star.',
        values: {
          commissionPercent: 3.5,
          freeShippingPercent: 2.5,
          cashbackProgramPercent: 1.2,
          voucherProgramPercent: 1.6,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.25
        }
      },
      {
        id: 'starPlus',
        label: 'Star+ / Star Elite',
        description: 'Penjual dengan performa Star+ atau Star Elite.',
        values: {
          commissionPercent: 3.2,
          freeShippingPercent: 2.2,
          cashbackProgramPercent: 1.1,
          voucherProgramPercent: 1.4,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.2
        }
      }
    ]
  },
  {
    id: 'groceries',
    name: 'Makanan, Minuman & FMCG',
    categoryNotes:
      'Produk cepat habis seperti bahan makanan, minuman, dan kebutuhan harian.',
    programHighlights: [
      'Gratis Ongkir XTRA tetap tinggi untuk mendorong pembelian ulang',
      'Cashback program berkisar antara 1.5% - 2%',
      'Komisi menengah 4.5% - 5.5% bergantung status toko'
    ],
    tiers: [
      {
        id: 'nonProgram',
        label: 'Non-Program / Penjual Baru',
        description: 'Penjual umum tanpa status Star.',
        values: {
          commissionPercent: 5.2,
          freeShippingPercent: 3,
          cashbackProgramPercent: 1.8,
          voucherProgramPercent: 1.6,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.4
        }
      },
      {
        id: 'star',
        label: 'Star Seller',
        description: 'Penjual dengan status Star.',
        values: {
          commissionPercent: 4.5,
          freeShippingPercent: 2.7,
          cashbackProgramPercent: 1.6,
          voucherProgramPercent: 1.5,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.3
        }
      },
      {
        id: 'starPlus',
        label: 'Star+ / Star Elite',
        description: 'Penjual dengan performa Star+ atau Star Elite.',
        values: {
          commissionPercent: 4.2,
          freeShippingPercent: 2.4,
          cashbackProgramPercent: 1.5,
          voucherProgramPercent: 1.4,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.25
        }
      }
    ]
  },
  {
    id: 'homeLiving',
    name: 'Rumah Tangga & Hobi',
    categoryNotes:
      'Produk rumah tangga, dekorasi, mainan, perlengkapan hobi dan taman.',
    programHighlights: [
      'Gratis Ongkir XTRA berada di kisaran 2.5% - 3%',
      'Cashback program relatif ringan (1% - 1.6%)',
      'Komisi 4% - 5% mengikuti kebijakan layanan Shopee'
    ],
    tiers: [
      {
        id: 'nonProgram',
        label: 'Non-Program / Penjual Baru',
        description: 'Penjual umum tanpa status Star.',
        values: {
          commissionPercent: 4.8,
          freeShippingPercent: 2.9,
          cashbackProgramPercent: 1.6,
          voucherProgramPercent: 1.6,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.3
        }
      },
      {
        id: 'star',
        label: 'Star Seller',
        description: 'Penjual dengan status Star.',
        values: {
          commissionPercent: 4.2,
          freeShippingPercent: 2.6,
          cashbackProgramPercent: 1.4,
          voucherProgramPercent: 1.4,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.25
        }
      },
      {
        id: 'starPlus',
        label: 'Star+ / Star Elite',
        description: 'Penjual dengan performa Star+ atau Star Elite.',
        values: {
          commissionPercent: 3.8,
          freeShippingPercent: 2.3,
          cashbackProgramPercent: 1.2,
          voucherProgramPercent: 1.3,
          transactionFeePercent: 1.6,
          otherPercentFee: 0.2
        }
      }
    ]
  }
];

export const defaultCategoryId = categoryPresets[0].id;
export const defaultTierId = categoryPresets[0].tiers[0].id;
