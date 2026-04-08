export default {
    app: {
      title: 'CO2llect',
    },

    menu: {
      home: 'Accueil',
      users: 'Utilisateurs',
      stats: 'Statistiques',
      settings: 'Paramètres',
      form: 'Formulaire',
      connexion: 'Connexion',
    },

    auth: {
      login: 'Connexion',
      logout: 'Déconnexion',
      welcome: 'Bonjour {name}',
    },
    
    form: {
      required: 'Ce champ est obligatoire',
    },

    loginPage: {
    welcome_title: 'Bienvenue sur<br>CO<sub>2</sub>llect !',
    speech_bubble: 'Avant tout,<br>connecte-toi ou<br>crée un compte !',
    email_label: 'Nom d’utilisateur',
    email_placeholder: 'Tape ton nom ici...',
    password_label: 'Mot de passe',
    password_placeholder: 'Tape ton mot de passe...',
    submit_btn: 'Se connecter !',
    no_account: "Pas encore de compte ?",
    create_account: 'Alors crée-en un !'
    },

    results: {
    "transports": "Transports",
    "alimentation": "Alimentation",
    "consommation": "Consommation",
    "logement": "Logement"
    },

    home: {
    daily: "Ton bilan quotidien",
    do_quiz: "Faire le questionnaire",
    yesterday: "Résultats d'hier",
    score: "Score"
    },

    onboarding: {
      error_password: "Les mots de passe ne correspondent pas !",
      error_cgu: "Tu dois accepter la politique de confidentialité.",
      error_empty: "Veuillez sélectionner au moins une option pour chaque question.",
      firstname: "Prénom",
      firstname_placeholder: "Tape ton prénom ici...",
      lastname: "Nom",
      lastname_placeholder: "Tape ton nom ici...",
      email: "Adresse mail",
      email_placeholder: "Tape ton adresse mail ici...",
      password: "Mot de passe",
      password_placeholder: "Tape ton mot de passe ici...",
      confirm_password: "Confirmer le mot de passe",
      cgu: "J'accepte la politique de confidentialité",
      submit_btn1: "Créer mon compte",
      welcome: "Bienvenue, <strong>{name}</strong> !",
      speech: "Pour bien utiliser l'app, tu dois d'abord renseigner tes habitudes de transports, consommations, etc... À toi de jouer !",
      q1_title: "Quels moyens de transport utilises-tu ?<br><small>(Tu peux en choisir plusieurs)</small>",
      q1_opt1: "<strong>Transports en commun</strong> (trains, bus, blablacar)",
      q1_opt2: "<strong>Véhicules motorisés</strong> (voitures, motos)",
      q1_opt3: "<strong>Véhicules verts</strong> (vélos, trottinette, à pieds)",
      q2_title: "Quel est ton régime alimentaire ?",
      q2_opt1: "Viande presque tous les repas",
      q2_opt2: "<strong>Viande régulièrement</strong> (viande 4-5 fois/semaine)",
      q2_opt3: "<strong>Peu de viande</strong> (viande 1-2 fois/semaine)",
      q2_opt4: "<strong>Végétarien/Vegan</strong>",
      q3_title: "À quelle fréquence achètes-tu des produits neufs ?<br><small>(vêtement, technologie...)</small>",
      q3_opt1: "Très rarement",
      q3_opt2: "Occasionnellement",
      q3_opt3: "Souvent",
      q3_opt4: "Très souvent",
      q4_title: "Quel type de chauffage utilises-tu dans ton logement ?",
      q4_opt1: "Énergies renouvelables / bois",
      q4_opt2: "Électrique",
      q4_opt3: "Gaz",
      q4_opt4: "Fioul",
      submit_btn2: "Enregistrer"
    },

    home: {
      daily: "Ton bilan quotidien",
      do_quiz: "Faire le questionnaire",
      yesterday: "Résultats d'hier",
      score: "Score",
      survey_info_1: "Bienvenue sur CO₂llect ! Ce questionnaire est à faire tous les jours pour suivre ta consommation de CO₂ en direct.",
      survey_info_2: "Mais pas de panique ! Si tu oublies de le remplir, les données renseignées lors de la création de ton compte nous aideront à faire une estimation de ta consommation journalière. Allez, à toi de jouer !"
    },

    quiz: {
      next_btn: "Suivant",
      common: {
        yes: "Oui",
        no: "Non",
        nothing: "Rien",
        none: "Aucun",
        little: "Peu",
        a_lot: "Beaucoup"
      },
      food: {
        q1: "Quel a été votre régime aujourd'hui ?",
        vegan: "Végétalien",
        vegetarian: "Végétarien",
        white_meat: "Viande blanche",
        red_meat: "Viande rouge",
        q2: "Avez-vous consommé des produits locaux/de saison ?",
        q3: "Avez-vous jeté de la nourriture aujourd'hui ?"
      },
      transport: {
        q1: "Quel a été votre mode de transport principal aujourd'hui ?",
        walk_bike: "Marche/Vélo",
        public: "Transports en commun",
        car: "Voiture (solo)",
        carpool: "Covoiturage",
        q2: "Quelle distance avez-vous parcouru aujourd'hui ?",
        q3: "Quel était le type de motorisation utilisé pour ce trajet ?",
        thermic: "Thermique",
        hybrid: "Hybride",
        electric: "Électrique"
      },
      consumption: {
        q1: "Avez-vous effectué un achat de bien durable aujourd'hui ?",
        clothes: "Vêtements",
        furniture: "Ameublement",
        hightech: "High-Tech",
        q2: "Était-ce un achat de seconde main ?",
        q3: "Avez-vous acheté des produits avec beaucoup d'emballages plastique ?"
      },
      housing: {
        q1: "Avez-vous réduit le chauffage ou éteint la clim en quittant votre domicile ?",
        q2: "Avez-vous utilisé des appareil énergivores ?",
        washing_machine: "Lave-linge",
        oven: "Four",
        dishwasher: "Lave-vaisselle",
        q3: "Avez-vous éteint vos appareils en veille ce soir ?"
      }
    },

    stats: {
      title: "Ton bilan {period}",
      of_week: "de la semaine",
      of_month: "du mois",
      of_year: "de l'année",
      week: "Semaine",
      month: "Mois",
      year: "Année",
      chart_subtitle: "Graphique {period}",
      period_semaine: "hebdomadaire",
      period_mois: "mensuel",
      period_annee: "annuel",
      total_emitted: "Total émis",
      kg_co2: "kg CO₂",
      average: "Moyenne",
      kg_per_day: "kg/j",
      car_equivalent: "Équivalent Voiture",
      km_driven: "km parcourus"
    },

    chart: {
    week: 'Semaine',
    month: 'Mois',
    year: 'Année',
    carbon_score: 'Score Carbone'
    },
}