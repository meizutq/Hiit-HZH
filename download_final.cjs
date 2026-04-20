const fs = require('fs');
const axios = require('axios');
const path = require('path');

const exercises = {
    "jumping-jacks": "l0HlJ877XqZPvGYuQ",
    "push-ups": "MTiR7U1mIid68",
    "squats": "3o7TKP8O8J8yK8wSgA",
    "plank": "3o6Zt4X8WzXy2e5K8A",
    "burpees": "3o7TKVUn7XYMhxuHm0",
    "mountain-climbers": "l41lSjJv7uDdzWp6E",
    "lunges": "3o6ZtH6N0G4g2E4kO",
    "high-knees": "l41lSjJv7uDdzWp6E",
    "bicycle-crunches": "3o6Zt4X8WzXy2e5K8A",
    "leg-raises": "3o6Zt4X8WzXy2e5K8A",
    "abdominal-crunches": "3o6ZtH6N0G4g2E4kO",
    "russian-twists": "3o6ZtH6N0G4g2E4kO",
    "heel-touches": "3o7TKIFfG6M5S7N2Y8",
    "cobra-stretch": "3o6ZtwYfR8S1n7S7S0", // Testing this ID
    "spinal-twist-left": "MTiR7U1mIid68",
    "spinal-twist-right": "MTiR7U1mIid68",
    "glute-bridge": "3o6Zt4X8WzXy2e5K8A",
    "tricep-dips": "MTiR7U1mIid68",
    "side-plank-left": "3o6Zt4X8WzXy2e5K8A",
    "side-plank-right": "3o6Zt4X8WzXy2e5K8A",
    "bird-dog": "3o6Zt4X8WzXy2e5K8A"
};

const dir = path.join(__dirname, 'public', 'exercises');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function download(id, giphyId) {
    const url = `https://media.giphy.com/media/${giphyId}/giphy.gif`;
    const filePath = path.join(dir, `${id}.gif`);
    
    console.log(`Downloading ${id} from ${url}...`);
    
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
