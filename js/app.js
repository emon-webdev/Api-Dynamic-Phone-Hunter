const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data, dataLimit)
    } catch (error) {
        console.error(error)
    }
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear previous data
    phoneContainer.textContent = '';
    //display 10 phones only
    const showAll =  document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10)
      showAll.classList.remove('d-none')
    }else{
        showAll.classList.add('d-none')
    }

    //display no phones founds message
    const foundMessage = document.getElementById('found-message');
    if(phones.length === 0){
        foundMessage.classList.remove('d-none')
    }
    else{
        foundMessage.classList.add('d-none')
    }
    // foundMessage.textContent = ''
    //display all phones
    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;

        const phoneDiv = document.createElement('div');
        phoneDiv.className = 'col'
        phoneDiv.innerHTML = `
            <div class="card h-100">
                <img src=${image} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">${brand}</p>
                </div>
                <button onclick = "loadPhoneDetails('${slug}')" class="card-footer btn btn-warning" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
                    Show Details
                </button>
            </div>
            
            `
        phoneContainer.appendChild(phoneDiv)

    })
    // stop loader or spinner
    toggleSpinner(false)
};

const processSearch = (dataLimit) => {
    //start loader
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
    searchField.value = '';
};
// handle search btn click
document.getElementById('btn-search').addEventListener('click', () => {
    processSearch(10)
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        processSearch(10)
    }
})

// spinner toggle
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    } else{
        loaderSection.classList.add('d-none')
    }
};

//not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch()
})


const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayPhoneDetails(data.data)
    }catch(error){
        console.error(error)
    } 
    
} ;



const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
    <p>Others: ${phone.others.Bluetooth}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    `
    
};








loadPhones('apple')






