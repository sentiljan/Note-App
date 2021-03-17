const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });

}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "" ) {
    const note = document.createElement("div");
    let notes = document.querySelectorAll(".notes");

    note.classList.add("note") 
    note.innerHTML = `
    
            <div class="notes">
                <div class="tools">
                    <p id="noteTitle">Note No.${notes.length + 1}</p>
                    <div class="btn-end">
                        <button class="edit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                         <button class="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                             </svg>
                         </button>
                    </div>
                
                </div>
                    <div class="main ${text ? "" : "hidden"}"></div>
                    <textarea class="${text ? "hidden" : ""}"></textarea>
            </div>
        
    `;

const editBtn = note.querySelector(".edit");
const deleteBtn = note.querySelector(".delete");
const main = note.querySelector(".main");
const textArea = note.querySelector("textarea");

textArea.value = text;
main.innerHTML = marked(text);

editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
});

deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
});


textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();

});
    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll("textarea");
     
    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}