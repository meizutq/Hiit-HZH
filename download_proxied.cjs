const fs = require('fs');
const axios = require('axios');
const path = require('path');

const exercises = {
    "jumping-jacks": "3o7TKv8pD2qQoYyYyQ",
    "mountain-climbers": "3o7TKv8pD2qQoYyYyQ",
    "burpees": "26tP7axeXpSkaS092",
    "plank": "l0HlPtt7WfR1S9Y9a",
    "squats": "3o7TKpx6lW2y6QZ6Y8",
    "push-ups": "3o7TKx6lW2y6QZ6Y8",
    "bicycle-crunches": "3o7TKIFfG6M5S7N2Y8",
    "lunges": "3o7TKx6lW2y6QZ6Y8",
    "leg-raises": "3o7TKIFfG6M5S7N2Y8",
    "abdominal-crunches": "3o7TKpx6lW2y6QZ6Y8",
    "russian-twists": "3o7TKpx6lW2y6QZ6Y8",
    "heel-touches": "3o7TKpx6lW2y6QZ6Y8",
    "cobra-stretch": "l0Hlxv3m8O9O2rK8w",
    "spinal-twist-left": "3o7TKv8pD2qQoYyYyQ",
    "spinal-twist-right": "3o7TKv8pD2qQoYyYyQ",
    "high-knees": "3o7TKv8pD2qQoYyYyQ",
    "glute-bridge": "l0HlPtt7WfR1S9Y9a",
    "tricep-dips": "3o7TKIFfG6M5S7N2Y8",
    "side-plank-left": "l0HlPtt7WfR1S9Y9a",
    "side-plank-right": "l0HlPtt7WfR1S9Y9a",
    "bird-dog": "3o7TKIFfG6M5S7N2Y8"
};

const dir = path.join(__dirname, 'public', 'exercises');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function download(id, giphyId) {
    // Use weserv.nl as a proxy to bypass Giphy blocks during download
    const url = `https://images.weserv.nl/?url=media.giphy.com/media/${giphyId}/giphy.gif&n=-1`;
    const filePath = path.join(dir, `${id}.gif`);
    
    console.log(`Downloading ${id} via proxy...`);
    
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download ${id}: ${error.message}`);
    }
}

async function main() {
    for (const [id, giphyId] of Object.entries(exercises)) {
        await download(id, giphyId);
        console.log(`Saved ${id}.gif`);
        // Small delay
        await new Promise(r => setTimeout(r, 200));
    }
}

main();
