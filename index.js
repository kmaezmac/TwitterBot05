import express from "express";
import { TwitterApi } from "twitter-api-v2";
import process from "process";
import https from 'https';

// consumer keys - api key
const appKey = process.env.TWITTER_API_KEY;
// consumer keys - api key secret
const appSecret = process.env.TWITTER_API_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const client = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
});

client.readWrite;

const app = express();

const greet = async () => {

    https.get(process.env.AMAZON_API_URL, (resp) =>{
        let data = ''; 
        // A chunk of data has been received. 
        resp.on('data', (chunk) => { 
            data += chunk; 
        }); 
    
        // The whole response has been received. Print out the result. 
        resp.on('end', async () => {
            var body = JSON.parse(data)
            console.log(body); 
            console.log(body.length);
            if(body.length == 0){
                return false;
            }
            var random = Math.floor(Math.random() * (body.length));
            console.log(random);
            var text = "【" + body[random].percentage +"%オフ" + "】"
            var url = body[random].url;
            var title = body[random].title.substring(0,88);
            client.v2.tweet(text + " " + url + " " +title + " #Amazonセール #PR");
            return true;
        }); 
    
    }).on("error", (err) => { 
        console.log("Error: " + err.message); 
        return false;
    })

};

app.get("/tiktok", (req, res) => {
    try {
        var text = "【期間限定】今なら誰でも" + process.env.TIKTOK_AMOUNT + "円ゲットできるよ\n招待URL: " + process.env.TIKTOK_URL + "\nルールを守らないとお金がもらえないので必ず↓を見て登録してね"
        const emojis = [
            "😀",
            "😆",
            "🤣",
            "😉",
            "🥰",
            "😍",
            "🤩",
            "😘",
            "😚",
            "😋",
            "😝",
            "🤑",
            "🫣",
            "🤫",
            "🤔",
            "🫡",
            "😏",
            "🥳",
            "😎",
            "😲",
            "😮",
            "😳",
            "🥺",
            "🥹",
            "😻",
            "🙊",
            "💖",
            "❤️‍🔥",
            "💯",
            "🐶",
            "🐺",
            "🐱",
            "🐭",
            "🐹",
            "🐰",
            "🐸",
            "🐯",
            "🐨",
            "🐻",
            "🐷",
            "🐽",
            "🐮",
            "🐗",
            "🐵",
            "🐒",
            "🐴",
            "🐑",
            "🐘",
            "🐼",
            "🐧",
            "🐦",
            "🐤",
            "🐥",
            "🐣",
            "🐔",
        ]
        var random = emojis[Math.floor(Math.random()* emojis.length)];
        console.log(random)
        var count = Math.floor(Math.random() * 10) + 1;
        var randomEmojiText = "";
        for(var i = 0; i < count; i++){
            randomEmojiText += random;
        }
        var hashTag = "\n#TikTokLite #ポイ活";
        var link = "\n" + process.env.HATENA_URL;
        var tweet = text + randomEmojiText + hashTag + link;
        console.log(tweet)
        client.v2.tweet(tweet); 
    } catch (err) {
        console.log(err);
    }
    res.send('get');
});

app.get("/", (req, res) => {
    try {
        console.log("ログ定期実行")
    } catch (err) {
        console.log(err);
    }
    res.send('get');
});

app.get('/tweet', (req, res, next) => {
    (async () => {
        await greet();
        res.send("成功")

    })().catch(next);
  })

const PORT = process.env.PORT || 3000;
app.listen(PORT);