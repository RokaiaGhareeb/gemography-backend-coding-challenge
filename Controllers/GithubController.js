const { response } = require("express");
const fetch = require("node-fetch");


const fetchData = fetch("https://api.github.com/search/repositories?q=created:%3E2021-04-26&sort=stars&order=desc&per_page=100")
                    .then((response) => response.json())
                    .then((data) => {
                        const filtered_list = withOutNulls(data["items"]);
                        const language_list = filterLanguages(filtered_list);
                        const repo_list = filterRepos(filtered_list, language_list);
                        return repo_list;
                    })
                    .catch((err) => console.log(err));


function withOutNulls(response_list){
    let new_list = [];
    new_list = response_list.filter(item => {
        return item.language != null;
    });
    return new_list;
}

function filterLanguages(filtered_list){
    let new_list = [];
    filtered_list.forEach(element => {
        new_list.push(element.language);
    });
    new_list = new_list.filter((v, i, a) => a.indexOf(v) === i);
    return new_list;
}

function filterRepos(filtered_list, language_list){
    let new_list = [];
    language_list.forEach(lang =>{
        let repo_list = filtered_list.filter(item => {
            return item.language == lang;
        });
        let obj = {
            language : lang,
            repo_list: repo_list,
            no_repo: repo_list.length
        }
        new_list.push(obj);
    });
    return new_list;
}

module.exports = fetchData;