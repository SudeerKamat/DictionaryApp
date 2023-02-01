import { LightningElement } from 'lwc';

export default class DictionaryApp extends LightningElement {
    meaningData = false;
    handleSearch(){
        const searchText = this.refs.word.value;
            let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchText;
            fetch(url)
            .then(response => {
                if(response.ok) {
                    this.meaningData = true;
                    return response.json();
                } else {
                    this.meaningData = false;
                    this.refs.meaningDiv.innerHTML = 'Unable To Find The Meaning Of <b>"'+ searchText+ '"</b>. Please, Try To Search For Another Word.';
                    this.refs.audioDiv.innerHTML = null;
                    throw Error(response);
                }
            })
            .then(datas => {
            let meaningList = '';
            const meanings = datas[0].meanings[0].definitions;
                meanings.forEach((meaning, ind) => {
                meaningList += '<br/><p>&#x2022; ' + meaning.definition + '</p>';
            });
                this.refs.meaningDiv.innerHTML = meaningList;
                this.refs.audioDiv.innerHTML = '<audio src="' + datas[0].phonetics[0].audio +'" controls>';
            })
            .catch(error => console.log(error))
        }
}