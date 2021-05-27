const fetch = require("node-fetch");
const moment = require("moment");

async function fetchData() {
    try {
        let date = moment().subtract(30, 'days').format('YYYY-MM-DD').toString();
        const response = await fetch(`https://api.github.com/search/repositories?q=created:%3E${date}&sort=stars&order=desc&per_page=100`);
        const data = await response.json();
        const filtered_list = withOutNulls(data["items"]);
        const language_list = filterLanguages(filtered_list);
        const repo_list = filterRepos(filtered_list, language_list);
        return repo_list;
    } catch (error) {
        console.log(error);
    }

}

// filter repos with null language
function withOutNulls(response_list) {
    let new_list = [];
    new_list = response_list.filter(item => {
        return item.language != null;
    });
    return new_list;
}

// extract distinct languages list
function filterLanguages(filtered_list) {
    let new_list = [];
    filtered_list.forEach(element => {
        new_list.push(element.language);
    });
    new_list = new_list.filter((v, i, a) => a.indexOf(v) === i);
    return new_list;
}

// list repo of the same language together 
function filterRepos(filtered_list, language_list) {
    let new_list = [];
    language_list.forEach(lang => {
        let repo_list = filtered_list.filter(item => {
            return item.language == lang;
        });
        let obj = {
            no_repo: repo_list.length,
            language: lang,
            repo_list: repo_list
        }
        new_list.push(obj);
    });
    return new_list;
}

module.exports = fetchData;