import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripeSecretKey); // Utilisez votre clé Stripe secrète

  try {
    const body = await readBody(event);

    if (!body || !body.amount || isNaN(body.amount)) {
      throw new Error("Montant invalide.");
    }

    // Créer un PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount * 100, // Montant en centimes
      currency: "eur",
      description: "Contribution à Lexikongo",
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error(
      "Erreur lors de la création du PaymentIntent:",
      error.message
    );
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Erreur interne du serveur",
    });
  }
});
