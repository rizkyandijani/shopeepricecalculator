import {
  categoryPresets,
  defaultCategoryId,
  defaultTierId,
} from './category-presets.js';
import {
  DEFAULT_STATE,
  PERCENT_FIELDS,
  calculate,
  formatPercent,
  formatCurrency,
} from './calculator.js';

const state = {
  form: { ...DEFAULT_STATE },
  selectedCategoryId: defaultCategoryId,
  selectedTierId: defaultTierId,
};

const breakdownOrder = [
  { key: 'commission', label: 'Komisi Penjualan', percentField: 'commissionPercent' },
  { key: 'freeShipping', label: 'Gratis Ongkir XTRA', percentField: 'freeShippingPercent' },
  { key: 'cashback', label: 'Program Cashback', percentField: 'cashbackProgramPercent' },
  { key: 'voucher', label: 'Program Voucher', percentField: 'voucherProgramPercent' },
  { key: 'transaction', label: 'Biaya Layanan Transaksi', percentField: 'transactionFeePercent' },
  { key: 'vat', label: 'PPN atas Biaya Layanan', percentField: 'vatPercent' },
  { key: 'other', label: 'Biaya Persentase Lain', percentField: 'otherPercentFee' },
];

const percentFieldTooltips = {
  commissionPercent: {
    text: 'Komisi penjualan Shopee dikenakan berdasarkan kategori produk dan status toko atas harga jual sebelum potongan.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'Panduan komisi Shopee',
    },
  },
  freeShippingPercent: {
    text: 'Biaya partisipasi program Gratis Ongkir XTRA yang ditanggung penjual sesuai tier toko.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'Detail Gratis Ongkir XTRA',
    },
  },
  cashbackProgramPercent: {
    text: 'Persentase kontribusi penjual untuk Program Cashback Shopee, dihitung dari harga jual setelah diskon.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'Aturan Program Cashback',
    },
  },
  voucherProgramPercent: {
    text: 'Biaya yang dikenakan Shopee saat produk mengikuti Program Voucher yang didanai platform.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'Ketentuan Program Voucher',
    },
  },
  transactionFeePercent: {
    text: 'Biaya layanan transaksi (administrasi) yang berlaku untuk setiap pesanan selesai sesuai tier penjual.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'Biaya layanan transaksi',
    },
  },
  vatPercent: {
    text: 'PPN 11% yang dikenakan atas total biaya layanan Shopee, ditambahkan otomatis setelah biaya dihitung.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'PPN biaya layanan Shopee',
    },
  },
  otherPercentFee: {
    text: 'Tambahkan persentase biaya lain misalnya program kampanye musiman atau biaya khusus kategori.',
    link: {
      href: 'https://seller.shopee.co.id/edu/article/7187',
      label: 'Lihat contoh biaya tambahan',
    },
  },
};

const root = document.getElementById('app');

function cloneFormState() {
  return JSON.parse(JSON.stringify(state.form));
}

function applyTierValues(tier) {
  const nextForm = cloneFormState();
  PERCENT_FIELDS.forEach((field) => {
    const nextValue = tier.values[field];
    if (typeof nextValue === 'number') {
      nextForm[field] = nextValue;
    }
  });
  state.form = nextForm;
}

function findCategoryById(categoryId) {
  return categoryPresets.find((item) => item.id === categoryId) || categoryPresets[0];
}

function findTier(category, tierId) {
  return category.tiers.find((item) => item.id === tierId) || category.tiers[0];
}

function handleCategoryChange(categoryId) {
  const category = findCategoryById(categoryId);
  const tier = category.tiers[0];
  state.selectedCategoryId = category.id;
  state.selectedTierId = tier.id;
  applyTierValues(tier);
  render();
}

function handleTierChange(tierId) {
  const category = findCategoryById(state.selectedCategoryId);
  const tier = findTier(category, tierId);
  state.selectedTierId = tier.id;
  applyTierValues(tier);
  render();
}

function updateField(field, value) {
  const numericValue = Number.parseFloat(value);
  state.form[field] = Number.isFinite(numericValue) ? numericValue : 0;
  render();
}

function createElement(tag, { className, text, html, attrs, children } = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text != null) element.textContent = text;
  if (html != null) element.innerHTML = html;
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value == null) return;
      if (key === 'value') {
        element.value = value;
      } else {
        element.setAttribute(key, value);
      }
    });
  }
  if (children) {
    children.forEach((child) => {
      if (child) element.appendChild(child);
    });
  }
  return element;
}

function createTooltip({ text, link, ariaLabel }) {
  const tooltip = createElement('span', {
    className: 'field-tooltip',
    attrs: {
      tabindex: '0',
      role: 'button',
      'aria-label': ariaLabel || text,
      title: text,
    },
  });

  tooltip.appendChild(
    createElement('span', {
      className: 'tooltip-icon',
      attrs: { 'aria-hidden': 'true' },
      text: 'i',
    }),
  );

  const content = createElement('span', { className: 'tooltip-content' });
  content.appendChild(createElement('p', { text }));

  if (link && link.href) {
    content.appendChild(
      createElement('a', {
        attrs: {
          href: link.href,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        text: link.label || 'Pelajari lebih lanjut',
      }),
    );
  }

  tooltip.appendChild(content);
  return tooltip;
}

function createNumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
  tooltip,
  min,
  step,
}) {
  const wrapper = createElement('label', { className: 'field' });
  const labelMain = createElement('span', {
    className: 'field-label-main',
    children: [createElement('span', { className: 'field-label-text', text: label })],
  });

  if (tooltip) {
    labelMain.appendChild(
      createTooltip({ text: tooltip.text, link: tooltip.link, ariaLabel: tooltip.ariaLabel }),
    );
  }

  const labelChildren = [labelMain];
  if (helper) {
    labelChildren.push(createElement('span', { className: 'field-helper', text: helper }));
  }

  const labelSpan = createElement('span', {
    className: 'field-label',
    children: labelChildren,
  });

  const inputWrapper = createElement('span', { className: 'field-input' });
  if (prefix) {
    inputWrapper.appendChild(createElement('span', { className: 'affix', text: prefix }));
  }
  const input = createElement('input', {
    attrs: {
      type: 'number',
      inputmode: 'decimal',
      step: step != null ? step : 'any',
      min: min != null ? String(min) : null,
    },
  });
  input.value = Number.isNaN(value) ? '' : value;
  input.addEventListener('input', (event) => onChange(event.target.value));
  inputWrapper.appendChild(input);
  if (suffix) {
    inputWrapper.appendChild(createElement('span', { className: 'affix', text: suffix }));
  }

  wrapper.append(labelSpan, inputWrapper);
  return wrapper;
}

function createSelectField({ label, value, onChange, options, helper, tooltip }) {
  const wrapper = createElement('label', { className: 'field' });
  const labelMain = createElement('span', {
    className: 'field-label-main',
    children: [createElement('span', { className: 'field-label-text', text: label })],
  });

  if (tooltip) {
    labelMain.appendChild(
      createTooltip({ text: tooltip.text, link: tooltip.link, ariaLabel: tooltip.ariaLabel }),
    );
  }

  const labelChildren = [labelMain];
  if (helper) {
    labelChildren.push(createElement('span', { className: 'field-helper', text: helper }));
  }

  const labelSpan = createElement('span', {
    className: 'field-label',
    children: labelChildren,
  });

  const select = createElement('select');
  options.forEach((option) => {
    const optionEl = createElement('option', {
      attrs: { value: option.value },
      text: option.label,
    });
    if (option.value === value) optionEl.selected = true;
    select.appendChild(optionEl);
  });
  select.addEventListener('change', (event) => onChange(event.target.value));

  wrapper.append(labelSpan, createElement('span', { className: 'field-input', children: [select] }));
  return wrapper;
}

function renderProgramHighlights(category) {
  const list = createElement('ul', { className: 'bullet-list' });
  category.programHighlights.forEach((item) => {
    list.appendChild(createElement('li', { text: item }));
  });
  return list;
}

function renderBreakdownTable(calculation) {
  const list = createElement('div', { className: 'breakdown-grid' });

  breakdownOrder.forEach((item) => {
    const row = createElement('div', { className: 'breakdown-row' });
    const label = createElement('div', { className: 'breakdown-label', text: item.label });
    const percent = createElement('div', {
      className: 'breakdown-percent',
      text: formatPercent(state.form[item.percentField] || 0),
    });
    const value = createElement('div', {
      className: 'breakdown-value',
      text: formatCurrency(calculation.breakdown[item.key] || 0),
    });
    row.append(label, percent, value);
    list.appendChild(row);
  });

  return list;
}

function renderInvalidBanner() {
  return createElement('div', {
    className: 'alert',
    children: [
      createElement('div', { text: 'Kombinasi persentase melebihi 100%.' }),
      createElement('small', {
        text: 'Kurangi target margin atau biaya program agar harga jual dapat dihitung.',
      }),
    ],
  });
}

function renderSummary(calculation) {
  const summary = createElement('section', { className: 'section panel summary-section' });
  summary.append(
    createElement('header', {
      children: [
        createElement('h2', { text: 'Ringkasan Harga' }),
        createElement('p', {
          className: 'muted',
          text: 'Harga jual direkomendasikan memperhitungkan seluruh biaya persentase Shopee, biaya tetap, dan margin target.',
        }),
      ],
    }),
    createElement('div', {
      className: 'summary-grid',
      children: [
        createSummaryCard({
          title: 'Harga Jual Ideal',
          description: 'Patokan harga jual setelah memperhitungkan seluruh biaya.',
          value: calculation.formatted.recommendedPrice,
        }),
        createSummaryCard({
          title: 'Total Biaya Persentase',
          description: 'Akumulasi biaya program berbasis persentase.',
          value: calculation.formatted.totalPercentageFeeValue,
        }),
        createSummaryCard({
          title: 'Total Biaya Tetap',
          description: 'Jumlah biaya tetap yang dibayar per produk.',
          value: calculation.formatted.fixedCost,
        }),
        createSummaryCard({
          title: 'Perkiraan Profit',
          description: 'Laba bersih setelah seluruh biaya dipotong.',
          value: calculation.formatted.profit,
        }),
      ],
    }),
  );

  const metrics = createElement('div', { className: 'metrics-grid' });
  metrics.append(
    createMetric('Efektivitas Margin', formatPercent(Math.max(calculation.effectiveMargin, 0))),
    createMetric('Persentase Biaya', formatPercent(Math.max(calculation.totalPercentFees, 0))),
    createMetric('Proporsi Menutup Biaya', formatPercent(Math.max(calculation.costCoverage, 0))),
  );
  summary.appendChild(metrics);

  if (calculation.invalid) {
    summary.appendChild(renderInvalidBanner());
  }

  summary.append(
    createElement('div', {
      className: 'section',
      children: [
        createElement('h3', { text: 'Rincian Biaya Persentase' }),
        renderBreakdownTable(calculation),
      ],
    }),
  );

  return summary;
}

function createSummaryCard({ title, description, value }) {
  return createElement('div', {
    className: 'summary-card',
    children: [
      createElement('div', {
        className: 'summary-card-header',
        children: [
          createElement('h3', { className: 'summary-title', text: title }),
          createElement('p', { className: 'summary-description', text: description }),
        ],
      }),
      createElement('div', { className: 'summary-value', text: value }),
    ],
  });
}

function createMetric(title, value) {
  return createElement('div', {
    className: 'metric-card',
    children: [createElement('span', { text: title }), createElement('strong', { text: value })],
  });
}

function createBadge(title, value) {
  return createElement('div', {
    className: 'percentage-badge',
    children: [createElement('span', { text: title }), createElement('strong', { text: value })],
  });
}

function renderApp() {
  const calculation = calculate(state.form);
  const category = findCategoryById(state.selectedCategoryId);
  const tier = findTier(category, state.selectedTierId);

  const shell = createElement('div', { className: 'app-shell' });

  const header = createElement('header', { className: 'page-header' });
  header.append(
    createElement('div', {
      children: [
        createElement('h1', { text: 'Kalkulator Harga Shopee Indonesia' }),
        createElement('p', {
          text: 'Hitung harga jual ideal berdasarkan biaya produk, target margin, dan biaya program Shopee. Pilih kategori produk serta status toko untuk mengisi otomatis persentase biaya layanan.',
        }),
      ],
    }),
    createElement('div', {
      className: 'badge-wrap',
      children: [
        createBadge('Total Persentase Biaya', formatPercent(calculation.totalPercentFees)),
        createBadge('Target Margin', formatPercent(state.form.targetMarginPercent || 0)),
      ],
    }),
  );
  shell.appendChild(header);

  const presetSection = createElement('section', { className: 'section panel form-section' });
  presetSection.append(
    createElement('header', {
      children: [
        createElement('h2', { text: 'Preset Biaya Program' }),
        createElement('p', {
          className: 'muted',
          text: 'Pilih kategori dan status toko untuk mengisi otomatis komisi, biaya Gratis Ongkir XTRA, cashback, voucher, dan biaya layanan lain sesuai tabel acuan.',
        }),
      ],
    }),
  );

  const presetGrid = createElement('div', { className: 'section-grid' });
  presetGrid.append(
    createSelectField({
      label: 'Kategori Produk',
      value: state.selectedCategoryId,
      onChange: handleCategoryChange,
      options: categoryPresets.map((item) => ({ value: item.id, label: item.name })),
    }),
    createSelectField({
      label: 'Status Toko / Tier',
      value: state.selectedTierId,
      onChange: handleTierChange,
      helper: tier.description,
      options: category.tiers.map((item) => ({ value: item.id, label: item.label })),
    }),
  );
  presetSection.append(presetGrid);
  presetSection.append(
    createElement('div', {
      className: 'program-card',
      children: [
        createElement('h3', { text: 'Catatan & Sorotan Program' }),
        createElement('p', { className: 'muted', text: category.categoryNotes }),
        renderProgramHighlights(category),
      ],
    }),
  );
  shell.appendChild(presetSection);

  const costSection = createElement('section', { className: 'section panel form-section' });
  costSection.append(
    createElement('header', {
      children: [
        createElement('h2', { text: 'Biaya Tetap & Target Margin' }),
        createElement('p', {
          className: 'muted',
          text: 'Masukkan total biaya produk, logistik, subsidi voucher, hingga target margin yang ingin dicapai.',
        }),
      ],
    }),
  );

  const costGrid = createElement('div', { className: 'section-grid' });
  costGrid.append(
    createNumberField({
      label: 'Harga Pokok Produk (HPP)',
      value: state.form.costOfGoods,
      prefix: 'Rp',
      onChange: (value) => updateField('costOfGoods', value),
      min: 0,
      step: 100,
    }),
    createNumberField({
      label: 'Biaya Logistik / Gudang',
      value: state.form.logisticCost,
      prefix: 'Rp',
      onChange: (value) => updateField('logisticCost', value),
      min: 0,
      step: 100,
    }),
    createNumberField({
      label: 'Biaya Tetap Lainnya',
      value: state.form.otherFixedCost,
      prefix: 'Rp',
      onChange: (value) => updateField('otherFixedCost', value),
      min: 0,
      step: 100,
    }),
    createNumberField({
      label: 'Subsidi Voucher Penjual',
      value: state.form.sellerVoucherSubsidy,
      prefix: 'Rp',
      onChange: (value) => updateField('sellerVoucherSubsidy', value),
      min: 0,
      step: 100,
    }),
    createNumberField({
      label: 'Biaya Koin Cashback',
      value: state.form.coinCashbackCost,
      prefix: 'Rp',
      onChange: (value) => updateField('coinCashbackCost', value),
      min: 0,
      step: 100,
    }),
    createNumberField({
      label: 'Subsidi Ongkir Penjual',
      value: state.form.sellerShippingSubsidy,
      prefix: 'Rp',
      onChange: (value) => updateField('sellerShippingSubsidy', value),
      min: 0,
      step: 100,
    }),
    createNumberField({
      label: 'Target Margin',
      value: state.form.targetMarginPercent,
      suffix: '%',
      onChange: (value) => updateField('targetMarginPercent', value),
      min: 0,
      step: 0.1,
    }),
  );
  costSection.append(costGrid);
  shell.appendChild(costSection);

  const percentSection = createElement('section', { className: 'section panel form-section' });
  percentSection.append(
    createElement('header', {
      children: [
        createElement('h2', { text: 'Biaya Persentase Shopee' }),
        createElement('p', {
          className: 'muted',
          text: 'Sesuaikan apabila ada biaya tambahan di luar preset kategori, misalnya kampanye tertentu.',
        }),
      ],
    }),
  );

  const percentGrid = createElement('div', { className: 'section-grid' });
  percentGrid.append(
    createNumberField({
      label: 'Komisi Penjualan',
      value: state.form.commissionPercent,
      suffix: '%',
      onChange: (value) => updateField('commissionPercent', value),
      tooltip: percentFieldTooltips.commissionPercent,
      min: 0,
      step: 0.1,
    }),
    createNumberField({
      label: 'Gratis Ongkir XTRA',
      value: state.form.freeShippingPercent,
      suffix: '%',
      onChange: (value) => updateField('freeShippingPercent', value),
      tooltip: percentFieldTooltips.freeShippingPercent,
      min: 0,
      step: 0.1,
    }),
    createNumberField({
      label: 'Program Cashback',
      value: state.form.cashbackProgramPercent,
      suffix: '%',
      onChange: (value) => updateField('cashbackProgramPercent', value),
      tooltip: percentFieldTooltips.cashbackProgramPercent,
      min: 0,
      step: 0.1,
    }),
    createNumberField({
      label: 'Program Voucher',
      value: state.form.voucherProgramPercent,
      suffix: '%',
      onChange: (value) => updateField('voucherProgramPercent', value),
      tooltip: percentFieldTooltips.voucherProgramPercent,
      min: 0,
      step: 0.1,
    }),
    createNumberField({
      label: 'Biaya Layanan Transaksi',
      value: state.form.transactionFeePercent,
      suffix: '%',
      onChange: (value) => updateField('transactionFeePercent', value),
      tooltip: percentFieldTooltips.transactionFeePercent,
      min: 0,
      step: 0.1,
    }),
    createNumberField({
      label: 'PPN atas Biaya Layanan',
      value: state.form.vatPercent,
      suffix: '%',
      onChange: (value) => updateField('vatPercent', value),
      tooltip: percentFieldTooltips.vatPercent,
      min: 0,
      step: 0.1,
    }),
    createNumberField({
      label: 'Biaya Persentase Lainnya',
      value: state.form.otherPercentFee,
      suffix: '%',
      onChange: (value) => updateField('otherPercentFee', value),
      tooltip: percentFieldTooltips.otherPercentFee,
      min: 0,
      step: 0.1,
    }),
  );
  percentSection.append(percentGrid);
  shell.appendChild(percentSection);

  shell.appendChild(renderSummary(calculation));

  return shell;
}

function render() {
  root.innerHTML = '';
  root.appendChild(renderApp());
}

function init() {
  const category = findCategoryById(state.selectedCategoryId);
  const tier = findTier(category, state.selectedTierId);
  applyTierValues(tier);
  render();
}

init();
