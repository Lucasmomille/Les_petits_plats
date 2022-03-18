

/**
 * Normalisation des chaines de caractères, tableaux compris
 *
 * @param   {String| Array}  s  donnée à normaliser
 *
 * @return  {String| Array}     donnée normalisée
 */
 export const normalizeString = (s) => {
    if (Array.isArray(s)) {
        return s.map(item => item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
    }
    return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

export const capitalizeFirstLetter = (s) => {
    if (Array.isArray(s)) {
        return s.map(item => item.charAt(0).toUpperCase() + item.substring(1).toLowerCase())
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
}