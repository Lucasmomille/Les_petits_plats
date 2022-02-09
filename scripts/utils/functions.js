
async function getReceipts() { // get receipts' info
    const response = await fetch('./../../assets/data/receipts.json');
    // console.log('res', response.json())
    return response.json();
}

function getAppliance(receipts) {
    // get all appliance
   // console.log('appli', data.map(r => r.appliance))
   // keep only one of each
   console.log('appliance', receipts.map(r => r.appliance.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")))
}
// casserole avec un seul l -> json deux
export { getReceipts, getAppliance }

// lowar case et accents à mettre pour la recherche uniquement ?