import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(); // Charger la configuration
  const stripe = new Stripe(config.stripeSecretKey); // Utiliser la clé secrète

  try {
    // Lecture du corps de la requête
    const body = await readBody(event);

    // Vérifiez que le montant est valide
    if (!body || !body.amount || isNaN(body.amount)) {
      throw new Error("Montant invalide.");
    }

    // Créez une session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Méthodes de paiement
      line_items: [
        {
          price_data: {
            currency: "eur", // Devise
            product_data: {
              name: "Contribution à Lexikongo", // Nom affiché dans Stripe
            },
            unit_amount: Math.round(body.amount * 100), // Convertir en centimes
          },
          quantity: 1, // Quantité
        },
      ],
      mode: "payment", // Mode de paiement unique
      success_url: `${config.public.baseUrl}/success`, // URL de succès
      cancel_url: `${config.public.baseUrl}/cancel`, // URL d'annulation
    });

    // Retourner l'ID de session à l'utilisateur
    return { id: session.id };
  } catch (error) {
    console.error("Erreur Stripe:", error.message);
    // Retourner une erreur HTTP en cas de problème
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Erreur interne du serveur",
    });
  }
});
