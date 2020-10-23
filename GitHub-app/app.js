const requri   = 'https://api.github.com/users/';
//const repouri  = 'https://api.github.com/users/'+username+'/repos';

//Selectors
const profileTemplate = document.getElementById('card-template');
const cardContainer = document.querySelector('.profile-card');
const formSearch = document.getElementById('user-search');
const searchInput = document.getElementById('profileInput');
//Events

window.addEventListener('DOMContentLoaded' , ()=>{
    getProfile();
});

formSearch.addEventListener('submit' , (event)=>{
    event.preventDefault();
    const userNmae = searchInput.value;
    searchInput.value = '';
    getProfile(userNmae);
})

//Fnctions
async function getProfile(username = 'Ghoulami'){
    const resonse = await fetch(requri+username);
    const profile = await resonse.json();

    renderProfile(profile);
}

async function renderProfile(profile){
    const profileEl = document.importNode(profileTemplate, true).content;
    const repos = await getRepos(profile['repos_url']);

    profileEl.querySelector('.img-container img').setAttribute('src' , profile['avatar_url']);
    profileEl.querySelector('.img-container img').setAttribute('alt' , profile['name']);
    profileEl.querySelector('.user-info .user-name').innerHTML = profile['name'] != null ? profile['name'] : 'null';
    profileEl.querySelector('.user-info .user-bio').innerHTML = profile['bio'] != null ? profile['bio'] : 'null';
    profileEl.querySelector('#Followers').innerHTML = profile['followers'] + ' <span>Followers</span>';
    profileEl.querySelector('#Following').innerHTML = profile['following'] + ' <span>Following</span>';
    profileEl.querySelector('#Repos').innerHTML = profile['public_repos'] + ' <span>Repos</span>';

    console.log(profile);
    
    for (let i = 0 ; i < repos.length  ; i++){
        const repoTag = document.createElement('a');
        repoTag.className = 'user-repo';
        repoTag.setAttribute('href' , repos[i]['clone_url']);
        repoTag.innerHTML = repos[i]['name']
        profileEl.querySelector('.user-info .repos').appendChild(repoTag);
        if(i > 8){
            break;
        }
    }
    cardContainer.innerHTML = '';
    cardContainer.appendChild(profileEl);
}

async function getRepos(repsUrl){
    const resonse = await fetch(repsUrl);
    const responseData = await resonse.json();

    return responseData;
}