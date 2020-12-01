
let mainDiv = document.getElementById("container"); 
// fetching element
if(mainDiv){

    axios.get('https://jsonplaceholder.typicode.com/albums/2/photos')
    // response contains all the data from API
    .then((response) =>{
        let count = 0;
        let picNum = document.getElementById('items-count');
        // using for each loop to loop through every picture
        response.data.forEach((i) => {
            // wrap all the each url and title into containerDiv 
            let containerDiv = document.createElement('div');
            mainDiv.appendChild(containerDiv);
            // get url 
            let img = document.createElement('img');
            img.src = i.url;
            containerDiv.appendChild(img);
            // get title, using innerText to display
            let title = document.createElement('h2');
            title.innerText = i.title;
            containerDiv.appendChild(title);

            count++;

            containerDiv.addEventListener("click", ()=>{
                containerDiv.remove();
                count--;
                picNum.innerText = count;
            })

        })
        picNum.innerText = count;

    })
}


