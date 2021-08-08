// imports
import express from 'express';
import path from 'path';
import { kStatic, log } from './utils/helpers';
require("dotenv").config()

// Init
const app = express();
const port = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || "https://localhost"
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Middlewares
app.use(kStatic);
app.use(express.static(path.join(__dirname, "static")))

// routes
app.post("/checkout", async (req, res) => {
    // log(req.url)
    // const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            'card',
        ],
        line_items: [
            {
                price: 'price_1JM821SFWt1I2TIXKLmKbasj',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${DOMAIN}/checkout-status?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/checkout-status?canceled=true`,
    });
    res.json({ id: session.id })
})

// 404 route
app.get("*", (req, res) => {
    res.send("sed lyf")
    // TODO error page
})


app.listen(port, () => {
    log(`server started on ${port}`)
})