//selectors 
const addNoteBtn = document.getElementById('add-button');
const notesContainer = document.getElementById('notes');

//events
addNoteBtn.addEventListener("click" , addNewNote.bind(null ,''));

window.addEventListener('DOMContentLoaded' , ()=>{
    const notes = getNotes();
    notes.forEach(note => {
        addNewNote(note);
    })
})

//functions
function addNewNote(text = ''){
    const noteTemplte = document.getElementById('note-template');
    const newNote = noteTemplte.content.cloneNode(true);
    const editBtn = newNote.querySelector('.edit-button');
    const trashBtn = newNote.querySelector('.trash-button');
    const noteArea = newNote.querySelector('.note-area');
    const noteContent = newNote.querySelector('.note-content');

    if(text !== ''){
        noteArea.value = text;
        noteContent.innerHTML = text;
        noteContent.classList.remove('hiden');
        noteArea.classList.add('hiden');
    }
    
    editBtn.addEventListener('click', (event)=>{
        const note = event.target.closest('.note');
        noteArea.classList.toggle('hiden');
        noteContent.classList.toggle('hiden');
    });

    trashBtn.addEventListener('click' , (event)=>{
        const note = event.target.closest('.note');
        note.remove();
        updateLS();
    });

    noteArea.addEventListener('input' , (event)=>{
        noteContent.innerHTML += event.data;
        updateLS();
    })

    notesContainer.appendChild(newNote);
}

function updateLS(){
    const textArea = [...document.getElementsByClassName('note-area')];
    let notes = [];

    textArea.forEach(item=>{
        if(item.value != ''){
            notes.push(item.value);
        }
    })

    localStorage.setItem('notes' , JSON.stringify(notes));
}

function getNotes(){
    let notes = [];

    if(localStorage.getItem('notes') === null){
        notes = [];
    }else{
        notes = JSON.parse(localStorage.getItem('notes'));
    }

    return notes;
}
