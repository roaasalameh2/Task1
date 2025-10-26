const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    const company = card.querySelector('.td1').textContent;
    const title = card.querySelector('.p').textContent;
    const skillsElements = card.querySelectorAll('.button');
    const skills = Array.from(skillsElements).map(btn => btn.textContent);

    console.log(company, title, skills);
});

selectedFilters = [];
const buttons = document.querySelectorAll('.button');
function toggleFilter(filterName) {
    if (selectedFilters.includes(filterName)) {
        selectedFilters = selectedFilters.filter(f => f !== filterName);
    } else {
        selectedFilters.push(filterName);
    }

    console.log('Selected filters:', selectedFilters);
    filterJobs();

    displaySelectedFilters();
}
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const filter = this.textContent;
        toggleFilter(filter);
    });
});

filterJobs = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const skillsbuttons = card.querySelectorAll('.button');
        const skillsArray = Array.from(skillsbuttons);
        const skillsText = skillsArray.map(btn => btn.textContent);

        const skills = selectedFilters.every(filter => skillsText.includes(filter));

        if (selectedFilters.length === 0 || skills) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};

function displaySelectedFilters() {
    const filterContainer = document.getElementById('selected-filters');
    const filterBar = document.querySelector('.filter-bar');

    filterContainer.innerHTML = '';

    if (selectedFilters.length === 0) {
        filterBar.classList.remove('active');
        return;
    }

    filterBar.classList.add('active');

    selectedFilters.forEach(filter => {
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.innerHTML = `
      <span>${filter}</span>
      <button class="remove-btn" onclick="removeFilter('${filter}')">×</button>
    `;
        filterContainer.appendChild(filterTag);
    });
}
function removeFilter(filterName) {
    selectedFilters = selectedFilters.filter(f => f !== filterName);
    filterJobs();
    displaySelectedFilters();
}

clearFilters = () => {
    selectedFilters = [];
    console.log('filters cleard');
    filterJobs();
    displaySelectedFilters();
};

document.getElementById('clear').addEventListener('click', clearFilters);