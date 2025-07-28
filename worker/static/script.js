
// Handle form submission
const form = document.getElementById('user-input-form');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Gather user input
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Call the backend API to get template suggestions
    const response = await fetch('/functions/api/handler.ts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const templates = await response.json();
        displayTemplates(templates);
    } else {
        console.error('Error fetching templates');
    }
});

function displayTemplates(templates) {
    const templateSection = document.getElementById('template-selection');
    templateSection.classList.remove('hidden');

    // Clear previous templates
    templateSection.innerHTML = '<h2 class="text-2xl font-bold mb-4">Choose Your Template</h2>';

    // Display new templates
    templates.forEach(template => {
        const templateDiv = document.createElement('div');
        templateDiv.className = 'p-4 bg-gray-100 mb-4 rounded-md';
        templateDiv.innerHTML = `<h3 class="text-lg font-bold">${template.name}</h3><p>${template.description}</p>`;
        templateSection.appendChild(templateDiv);
    });
}
