var bookmarkName= document.getElementById("bookmarkName");
var siteUrl= document.getElementById("siteUrl");
var tableData = document.getElementById("tableData")
var bookmarkList=[]

if(localStorage.getItem("bookmark") != null){
   bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    console.log(bookmarkList);
    displayData(bookmarkList)
    
}


function addUrl(){

    if(nameValidation() && urlValidation()){
        var bookmarks ={
            name :bookmarkName.value,
            url : siteUrl.value
        }
        bookmarkList.push(bookmarks)
        console.log(bookmarkList);
        localStorage.setItem("bookmark", JSON.stringify(bookmarkList))
        clearInputs()
        displayData(bookmarkList)
        document.getElementById("alertMsg").classList.add('d-none')
    }else{
        document.getElementById("alertMsg").classList.remove('d-none')
    }
   
}

function clearInputs(){
    bookmarkName.value = ""
    siteUrl.value = ""
    bookmarkName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}

function displayData(bookmarkArray){
    var cartona=""
    for(var i=0 ; i< bookmarkArray.length ; i++){
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarkArray[i].name}</td>
        <td><a href="${bookmarkArray[i].url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-delete"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    tableData.innerHTML = cartona

}


function deleteBookmark(bookmarkIndex){
    bookmarkList.splice(bookmarkIndex, 1)
    console.log(bookmarkList);
    displayData(bookmarkList)
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList))
    
}


function nameValidation(){
    var regex =/^[a-z][a-z ]{2,20}$/gi
    var text = bookmarkName.value
    var nameMsg =document.getElementById("nameMsg")
    
    if(regex.test(text)){
      bookmarkName.classList.add('is-valid')
      bookmarkName.classList.remove('is-invalid')
      nameMsg.classList.add('d-none')
      return true;
    }else{
      bookmarkName.classList.add('is-invalid')
      bookmarkName.classList.remove('is-valid')
      nameMsg.classList.remove('d-none')
      return false;
    }
}


function urlValidation(){
    var regex =/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/gm
    var text = siteUrl.value
    var urlMsg =document.getElementById("urlMsg")
    
    if(regex.test(text)){
      siteUrl.classList.add('is-valid')
      siteUrl.classList.remove('is-invalid')
      urlMsg.classList.add('d-none')
      return true;
    }else{
      siteUrl.classList.add('is-invalid')
      siteUrl.classList.remove('is-valid')
      urlMsg.classList.remove('d-none')
      return false;
    }
}