const toCurrency = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
});

export default toCurrency;