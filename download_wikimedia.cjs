const fs = require('fs');
const https = require('https');
const path = require('path');

const exercises = {
    "jumping-jacks": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Jumping_Jack.gif",
    "mountain-climbers": "https://upload.wikimedia.org/wikipedia/commons/1/18/Mountain_Climbers.gif",
    "burpees": "https://upload.wikimedia.org/wikipedia/commons/2/22/Burpee_exercise.gif",
    "plank": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Forearm_Plank.gif",
    "squats": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Air_Squat.gif",
    "push-ups": "https://upload.wikimedia.org/wikipedia/commons/2/22/Push-Up.gif",
    "bicycle-crunches": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bicycle_Crunches.gif",
    "lunges": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Lunge.gif",
    "leg-raises": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Leg_Raises.gif",
    "abdominal-crunches": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Abdominal_Crunches.gif",
    "russian-twists": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Russian_Twist.gif",
    "heel-touches": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Heel_Touches.gif",
    "cobra-stretch": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cobra_Stretch.gif",
    "spinal-twist-left": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Heel_Touches.gif", // Fallback
    "spinal-twist-right": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Heel_Touches.gif", // Fallback
    "high-knees": "https://upload.wikimedia.org/wikipedia/commons/e/e5/High_Knees.gif",
    "glute-bridge": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Glute_Bridge.gif",
    "tricep-dips": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Tricep_Dips.gif",
    "side-plank-left": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Side_Plank.gif",
    "side-plank-right": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Side_Plank.gif",
    "bird-dog": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Forearm_Plank.gif" // Fallback
};

const dir = path.join(__dirname, 'public', 'exercises');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(id, url) {
    const filePath = path.join(dir, `${id}.gif`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const request = https.get(url, options, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                https.get(response.headers.location, options, (res) => {
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`Downloaded ${id}`);
                        resolve();
                    });
                });
            } else if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded ${id}`);
                    resolve();
                });
            }
        });
        
        request.on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

async function main() {
    for (const [id, url] of Object.entries(exercises)) {
        try {
            await downloadFile(id, url);
            await new Promise(r => setTimeout(r, 100)); // Be nice to Wikimedia
        } catch (err) {
            console.error(`Error downloading ${id}: ${err.message}`);
        }
    }
}

main();
