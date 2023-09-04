// firebase Connection

const firebaseConfig = {
    apiKey: "AIzaSyAOhQP8jkCNberWRA9PefljnOYlHWG9WW4",
    authDomain: "e-commerce-team.firebaseapp.com",
    databaseURL: "https://e-commerce-team-default-rtdb.firebaseio.com",
    projectId: "e-commerce-team",
    storageBucket: "e-commerce-team.appspot.com",
    messagingSenderId: "179278069948",
    appId: "1:179278069948:web:d7480e1797dbe5feaed0b9",
    measurementId: "G-GT3M3WQEEH"
};


firebase.initializeApp(firebaseConfig);

const SearchInput = document.getElementById('searchBar');
const SearchButton = document.getElementById('searchButton');
const SearchError = document.getElementById('errorMassage');
const ImageContainer = document.getElementById('imageContainer');
const productName = document.getElementById('productName');
const productNameError = document.getElementById('productNameErrorText');
const productPrice = document.getElementById('productPrice');
const productPriceError = document.getElementById('productPriceErrorText');
const productCode = document.getElementById('productCode');
const productCodeError = document.getElementById('productCodeErrorText');
const productDescription = document.getElementById('productDescription');
const productDescriptionError = document.getElementById('productDescriptionErrorText');



SearchInput.onkeyup = () => {
    SearchError.innerText = " ";
    SearchError.innerHTML

}

SearchButton.addEventListener('click', function () {
    ImageContainer.textContent = '';
    firebase.database().ref('BlackPearl').once('value', (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data)

        if (keys.includes(SearchInput.value)) {
            firebase.database().ref('BlackPearl/' + SearchInput.value).once('value', (snapshot) => {
                var data = snapshot.val();

                console.log(data.ExtraImageURL1);

                productCode.value = SearchInput.value;
                productName.value = data.Name;
                productDescription.value = data.Description;
                productPrice.value = data.Price;

                if(data.defaultImageURL !== undefined){
                    addImage(data.defaultImageURL,'defaultImage')
                }else{
                    console.log('defaultImage not Found!')
                }
                if(data.ExtraImageURL1 !== undefined){
                    addImage(data.ExtraImageURL1,'ExtraImageURL1')
                }else{
                    console.log('ExtraImageURL1 not Found!')
                }
                if(data.ExtraImageURL2 !== undefined){
                    addImage(data.ExtraImageURL2,'ExtraImageURL2')
                }else{
                    console.log('ExtraImageURL2 not Found!')
                }
                if(data.ExtraImageURL3 !== undefined){
                    addImage(data.ExtraImageURL3,'ExtraImageURL3')
                }else{
                    console.log('ExtraImageURL3 not Found!')
                }
                SearchInput.value = '';

            })
        } else {

            SearchError.innerText = "Product Code Doesn't Matched!";
        }

    })
})

function addImage(url,id){
    const img = document.createElement('div');
    img.setAttribute('class', 'w-40 relative');
    img.innerHTML = `
            <img class="rounded-lg" src="${url}" alt="">
            <div id="${id}deleteButton" class="absolute -bottom-2 -right-2 bg-yellow-400 hover:cursor-pointer rounded-full px-1">
                <i class="fa-solid fa-trash-can" ></i>
            </div>
        `;
    ImageContainer.appendChild(img);
}


