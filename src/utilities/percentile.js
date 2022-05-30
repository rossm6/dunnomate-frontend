const percentile = (percentage) => {
    const lastDigit = percentage % 10;
  
    let suffix = "th";
    if (lastDigit === 1) {
      suffix = "st";
    } else if (lastDigit === 2) {
      suffix = "nd";
    } else if (lastDigit === 3) {
      suffix = "rd";
    }
  
    return `${percentage}${suffix}`;
  };
  
  export default percentile;