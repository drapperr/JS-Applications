function loadCommits() {
    const username=document.querySelector('#username').value;
    const repo=document.querySelector('#repo').value;
    const ul=document.querySelector('#commits');

    ul.innerHTML='';

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then(x=>{
        if (x.status>=400) {
           throw x; 
        }
        return x.json()
    })
    .then(repos=>{
        repos.forEach(repo => {
            let author=repo.commit.author.name;
            let message=repo.commit.message;
            
            let newLi=document.createElement('li');
            newLi.textContent=`${author}: ${message}`;

            ul.appendChild(newLi);
        });
    })
    .catch(e=>{
        let newLi=document.createElement('li');
            newLi.textContent=`Error: ${e.status} (${e.statusText})`;
            ul.appendChild(newLi);
    })
}