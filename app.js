// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const resultGroup = document.querySelector('.result-group');
const loader = document.querySelector('.loader');

let state = 'idle';

form.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();
    resultGroup.textContent = '';
    resultGenerator();
}

async function request() {
    state = 'loading';
    loader.style.display = 'flex';
    console.log(state);
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput.value}`;
    const req = await fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            state = 'idle';
            loader.style.display = 'none';
            console.log(state)
            return result
        });
        
    return req.query.search;
}

async function resultGenerator(){
    const res = await request();
    await res.forEach(item => {
        generateElement(item);
    })
}

function generateElement(data) {
    const div = document.createElement('div');
    div.className = 'result-item';
    const p1 = document.createElement('p');
    p1.className = 'result-item-title';
    const a = document.createElement('a');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    p2.className = 'result-item-url';
    p2.textContent = `https://en.wikipedia.org?curid=${data.pageid}`;
    p3.className = 'result-item-snippet';
    p3.innerHTML = data.snippet;
    a.href = `https://en.wikipedia.org?curid=${data.pageid}`;
    a.textContent = data.title;
    p1.appendChild(a);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    resultGroup.appendChild(div);
}

