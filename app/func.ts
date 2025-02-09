export const generateRandomAgentData = () => {
  // Arrays for strategies and deepModels
  const strategies = ["LP", "Directional", "Quant", "Arbitrage"];
  const deepModels = ["DeepSeek-R1", "ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini-2.0-Flash-001"];

  // 모든 strategy, model의 유니크 조합 생성
  const uniquePairs: { strategy: string; model: string }[] = [];
  for (const strategy of strategies) {
    for (const model of deepModels) {
      uniquePairs.push({ strategy, model });
    }
  }

  // 유니크 조합 배열 셔플 (Fisher-Yates 셔플)
  for (let i = uniquePairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniquePairs[i], uniquePairs[j]] = [uniquePairs[j], uniquePairs[i]];
  }

  // 각 조합마다 랜덤 데이터 생성
  const agentData = uniquePairs.map((pair, index) => {
    // Capital: 100,000 ~ 1,000,000 사이
    const capital = Math.floor(Math.random() * 900000) + 100000;
    // Return rate: -5% ~ 15% (소수점 둘째 자리까지)
    const returnRate = parseFloat((Math.random() * 20 - 5).toFixed(2));
    // Total investment: 100,000 ~ 300,000 사이
    const totalInvestment = Math.floor(Math.random() * 200000) + 100000;
    // Trade count: 10 ~ 110 사이
    const tradeCount = Math.floor(Math.random() * 100) + 10;
    // Win rate: 50% ~ 100%
    const winRate = Math.floor(Math.random() * 50) + 50;
    // Average investment per trade (소수점 둘째 자리까지)
    const avgInvestment = parseFloat((totalInvestment / tradeCount).toFixed(2));
    // Net Profit: (capital * returnRate / 100)
    const netProfit = parseFloat((capital * (returnRate / 100)).toFixed(2));

    return {
      rank: index + 1,
      strategy: pair.strategy,
      model: pair.model,
      capital,
      returnRate,       // Return Rate (%)
      totalInvestment,
      tradeCount,
      winRate,          // Win Rate (%)
      avgInvestment,    // Average Investment per trade
      netProfit         // Net Profit
    };
  });

  return agentData;
};