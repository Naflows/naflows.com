const wordsPerDayRatio = (
    end, length
) => {
    const ms = new Date(end).getTime() - new Date().getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const words = parseInt(length);
    return Math.round(words / days);
};

export default wordsPerDayRatio;