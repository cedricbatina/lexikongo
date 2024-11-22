import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(); // Charger la configuration
  const stripe = new Stripe(config.stripeSecretKey); // Utiliser la clé secrète

  try {
    const body = await readBody(event);

    if (!body || !body.amount || isNaN(body.amount)) {
      throw new Error("Montant invalide.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Contribution à Lexikongo",
            },
            unit_amount: body.amount * 100, // Montant en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${config.public.baseUrl}/success`,
      cancel_url: `${config.public.baseUrl}/cancel`,
    });

    return { id: session.id };
  } catch (error) {
    console.error("Erreur Stripe:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Erreur interne du serveur",
    });
  }
});
