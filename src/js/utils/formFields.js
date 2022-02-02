const formFields = {
    lastName : {
        regex : /^[a-zA-Zéèêëïîô]+([\- ]{1}[a-zA-Zéèêëïîô]+)?$/,
        errorMessage : "Votre nom a un format non valide. ex : dupond, dupond-dupont, dupond dupont."
    },

    firstName : {
        regex : /^[a-zA-Zéèêëïîô]+([\- ]{1}[a-zA-Zéèêëïîô]+)?$/,
        errorMessage : "Votre prénom a un format non valide. ex : jean, jean-luc, jean luc."
    },

    pseudo : {
        regex : /^[\w]{6,}$/,
        errorMessage : "Votre pseudo a un format non valide. Min 6 lettres. ex : pseudo, Pseudo, pseuDo75, pseudo_75."
    },

    email : {
        regex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        errorMessage : "Votre email a un format non valid."
    },

    password : {
        regex : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
        errorMessage : "Votre mot de passe a un format non valid. Min 8 charactères, 1 majuscule, 1 chiffre, 1 charactère spécial ( !@#$%^&* )"
    },

    title : {
        regex : /[^\=\{\}\\\/]/,
        errorMessage : "Votre titre a un format non valide. pas de signe = { } \\ /."
    },

    text : {
        regex : /[^\=\{\}\\\/]/,
        errorMessage : "Votre texte comporte des signe non autorisé  = { } \\ /  "
    },

    
}

export default formFields;