const dropBtn = document.getElementById('dropBtn');
const ingredientsOption = document.getElementById('IngOpt');
dropBtn.addEventListener('click', () => {
    if (ingredientsOption.classList.contains('hidden')) {
        ingredientsOption.classList.remove('hidden');
    } else {
        ingredientsOption.classList.add('hidden');
    }
})