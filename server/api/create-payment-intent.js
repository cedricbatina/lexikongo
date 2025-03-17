import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(); // Accès aux clés de configuration
  const stripe = new Stripe(config.stripeSecretKey); // Initialiser Stripe avec la clé secrète

  try {
    // Lire le corps de la requête
    const body = await readBody(event);

    // Validation stricte des entrées
    if (
      !body ||
      !body.amount ||
      isNaN(body.amount) ||
      parseFloat(body.amount) < 1
    ) {
      throw new Error("Le montant doit être valide et supérieur ou égal à 1€.");
    }

    // Créer un PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(body.amount) * 100), // Convertir en centimes
      currency: "eur",
      description: "Contribution à Lexikongo",
      metadata: {
        project: "Lexikongo", // Ajouter des métadonnées si nécessaire
        contributor: body.contributor || "Anonyme", // Optionnel : Nom ou ID du contributeur
      },
    });

    // Retourner le client_secret au frontend
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    // Log détaillé pour le débogage
    console.error(
      "Erreur lors de la création du PaymentIntent :",
      error.message
    );

    // Retourner une erreur structurée
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Erreur interne du serveur",
    });
  }
});

/*
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
*/
