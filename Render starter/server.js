setInterval(async () => {
    console.log("I am here");
    try {
        const res = await fetch('https://zerepyserver.onrender.com/');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}, 60000); // 60000 ms = 1 minute
