// document.getElementById('vision')
// document.createElement()

Array.from(document.getElementsByClassName('wf-img')).forEach(e => {
    console.log(e);
    e.addEventListener('click', () =>{
        e.style.width === "1000px" ? e.style.width = "500px" : e.style.width = "1000px" ;
    });
});
