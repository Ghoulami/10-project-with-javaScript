//selectors
const fav_items = document.querySelectorAll(".fav_item");

//events
fav_items.forEach((item)=>{
    item.addEventListener('mouseenter' ,()=>{
        item.querySelector('button').style.display = 'block'
    } );

    item.addEventListener('mouseleave' ,()=>{
        item.querySelector('button').style.display = 'none'
    } );
});

//functions