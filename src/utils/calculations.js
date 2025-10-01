export function calculateReturns(navData) {
  if (!navData || navData.length === 0) {
    return {
      ytd: 0,
      oneDay: 0,
      oneWeek: 0,
      oneMonth: 0,
      threeMonth: 0,
      sixMonth: 0,
      oneYear: 0,
      threeYear: 0,
      sinceInception: 0,
      currentDD: 0,
      maxDD: 0
    };
  }

  const latest = navData[navData.length - 1];
  const latestNav = latest.nav;
  
  // Helper function to find NAV at a specific date or closest before it
  const getNavAtDate = (targetDate) => {
    const target = new Date(targetDate);
    for (let i = navData.length - 1; i >= 0; i--) {
      const navDate = new Date(navData[i].date);
      if (navDate <= target) {
        return navData[i].nav;
      }
    }
    return navData[0].nav;
  };

  // Calculate date ranges
  const today = new Date(latest.date);
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const threeMonthAgo = new Date(today);
  threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);
  const sixMonthAgo = new Date(today);
  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const threeYearAgo = new Date(today);
  threeYearAgo.setFullYear(threeYearAgo.getFullYear() - 3);

  // Get NAV values
  const ytdNav = getNavAtDate(yearStart);
  const oneDayNav = getNavAtDate(oneDayAgo);
  const oneWeekNav = getNavAtDate(oneWeekAgo);
  const oneMonthNav = getNavAtDate(oneMonthAgo);
  const threeMonthNav = getNavAtDate(threeMonthAgo);
  const sixMonthNav = getNavAtDate(sixMonthAgo);
  const oneYearNav = getNavAtDate(oneYearAgo);
  const threeYearNav = getNavAtDate(threeYearAgo);
  const inceptionNav = navData[0].nav;

  // Calculate returns
  const calcReturn = (oldNav, newNav, years = null) => {
    if (!oldNav) return 0;
    const absoluteReturn = ((newNav - oldNav) / oldNav) * 100;
    if (years && years > 1) {
      // Annualized return
      return (Math.pow(newNav / oldNav, 1 / years) - 1) * 100;
    }
    return absoluteReturn;
  };

  // Calculate drawdown
  let maxNav = 0;
  let maxDrawdown = 0;
  let currentDrawdown = 0;

  navData.forEach(item => {
    if (item.nav > maxNav) {
      maxNav = item.nav;
    }
    const dd = ((item.nav - maxNav) / maxNav) * 100;
    if (dd < maxDrawdown) {
      maxDrawdown = dd;
    }
  });

  currentDrawdown = ((latestNav - maxNav) / maxNav) * 100;

  // Calculate years for annualization
  const inceptionDate = new Date(navData[0].date);
  const latestDate = new Date(latest.date);
  const yearsSinceInception = (latestDate - inceptionDate) / (365.25 * 24 * 60 * 60 * 1000);
  const threeYears = 3;

  return {
    ytd: calcReturn(ytdNav, latestNav).toFixed(2),
    oneDay: calcReturn(oneDayNav, latestNav).toFixed(2),
    oneWeek: calcReturn(oneWeekNav, latestNav).toFixed(2),
    oneMonth: calcReturn(oneMonthNav, latestNav).toFixed(2),
    threeMonth: calcReturn(threeMonthNav, latestNav).toFixed(2),
    sixMonth: calcReturn(sixMonthNav, latestNav).toFixed(2),
    oneYear: calcReturn(oneYearNav, latestNav, 1).toFixed(2),
    threeYear: calcReturn(threeYearNav, latestNav, threeYears).toFixed(2),
    sinceInception: calcReturn(inceptionNav, latestNav, yearsSinceInception).toFixed(2),
    currentDD: currentDrawdown.toFixed(2),
    maxDD: maxDrawdown.toFixed(2)
  };
}

export function calculateDrawdown(navData) {
  if (!navData || navData.length === 0) return 0;
  
  let maxNav = 0;
  navData.forEach(item => {
    if (item.nav > maxNav) {
      maxNav = item.nav;
    }
  });

  const latest = navData[navData.length - 1];
  return ((latest.nav - maxNav) / maxNav) * 100;
}

