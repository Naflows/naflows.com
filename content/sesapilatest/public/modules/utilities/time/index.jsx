const AppTimeConverter = (time) => {
    const t = new Date(time);
    const m = t.getMinutes();
    const h = t.getHours();

    const months = [
        "Jan." , "Feb." , "Mar." , "Apr." , "May" , 
        "Jun." , "Jul." , "Aug." , "Sep." , "Oct.",
        "Nov." , "Dec."
    ];
    const days = [
        "Mon." , "Tue." , "Wed." , "Thu." , "Fri.",
        "Sat." , "Sun."
    ]

    return (
        `
        ${months[t.getMonth() - 1]} ${days[t.getDay()]} 
        at ${h > 9 ? h%12 : '0'+h%12}:${m > 9 ? m : '0'+m } ${h >= 12 ? "PM" : "AM"}
        `
    )
};

export default AppTimeConverter;