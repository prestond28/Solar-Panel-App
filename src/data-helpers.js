export const formatData = (rawData) => {
    return rawData.map(data => ({
        ...data,
        date: new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }),
        calc_solar_cost_per_kWh: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(data.calc_solar_cost_per_kWh),
        grid_cost_per_kWh: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(data.grid_cost_per_kWh),
        calc_total_cost_for_date: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(data.calc_total_cost_for_date),
        calc_supposed_total_cost_for_date: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(data.calc_supposed_total_cost_for_date),
    }));
}

export const formatDateOnly = (rawData) => {
    return rawData.map(data => ({
        ...data,
        date: new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }));
}

export const condenseDataMonthly = (data) => {
    return data.reduce((acc, row) => {
        const dateObj = new Date(row.date);
        const year = dateObj.getFullYear();
        const month = dateObj.toLocaleString("en-US", { month: "long" });
        const monthYear = `${month} ${year}`;

        if (!acc[monthYear]) {
            acc[monthYear] = {
                monthYear,
                // kWhProduced: 0,
                // kWhUsed: 0,
                // netKWhUsage: 0,
                costWithSolar: 0,
                potentialCostWithoutSolar: 0,
            };
        }

        // acc[monthYear].kWhProduced += row.kWh_produced;
        // acc[monthYear].kWhUsed += row.kWh_used;
        // acc[monthYear].netKWhUsage += row.net_kWh_usage;
        acc[monthYear].costWithSolar += row.calc_total_cost_for_date;
        acc[monthYear].potentialCostWithoutSolar += row.calc_supposed_total_cost_for_date;

        return acc;
    }, {});
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

export const reduceData = (monthlyData) => {
    const totals = {
      costWithSolar: 0,
      potentialCostWithoutSolar: 0
    };
  
    monthlyData.forEach(item => {
      totals.costWithSolar += item.costWithSolar || 0;
      totals.potentialCostWithoutSolar += item.potentialCostWithoutSolar || 0;
    });
    
    return [
      { name: 'Cost With Solar', cost: totals.costWithSolar },
      { name: 'Potential Cost Without Solar', cost: totals.potentialCostWithoutSolar }
    ];
  };