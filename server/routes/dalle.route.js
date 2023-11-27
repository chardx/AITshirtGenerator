import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from "openai";

dotenv.config();
const router = express.Router()

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

const openai = new OpenAI();

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL.E 2.0 ROUTES' })

})

router.route('/').post(async (req, res) => {
    try {

        const { prompt } = req.body;
        console.log(prompt)
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        });
        const image = response.data[0].b64_json;
        console.log(response);

        // return image url

        res.status(200).json({ photo: image });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
})
export default router;