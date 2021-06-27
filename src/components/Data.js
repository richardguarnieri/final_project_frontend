import { Link } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import * as d3 from 'd3';

const Data = () => {

    const herokuBackend = 'https://ec2-3-17-42-22.us-east-2.compute.amazonaws.com:5000'

    const [genre, setGenre] = useState('Action');
    const [language, setLanguage] = useState('Aboriginal');

    const tbody = d3.select("tbody");

    useEffect(()=>{
        const general = async() => {

            let menuGenre = d3.selectAll("#genre-movie");
            menuGenre.selectAll("option").remove();
            let menuLanguage = d3.selectAll("#language-movie");
            menuLanguage.selectAll("option").remove();
            try{
                // Populate genre & language dropdown
                const genre_response = await fetch(`${herokuBackend}/genres`);
                const genre_data = await genre_response.json();

                Object.entries(genre_data).forEach(function([key, value]){

                    menuGenre.append("option")
                    .text(value)
                    .attr("value", value);
                });

                const language_response = await fetch(`${herokuBackend}/language`);
                const language_data = await language_response.json();
                Object.entries(language_data).forEach(function([key, value]){
                    menuLanguage.append("option")
                    .text(value)
                    .attr("value", value);
                });
                
                deleteTable();
                const response = await fetch(`${herokuBackend}/filter/${genre}/${language}`);
                const data = await response.json();

                let filteredArray = Object.values(data).map(d => d);
                console.log(filteredArray);


                filteredArray.forEach(entry => {
                    entry.genre_1 = entry.genre_1 ? entry.genre_1 : 'None'
                    entry.lang_1 = entry.lang_1 ? entry.lang_1 : 'None'
                    return entry
                });


                filteredArray = filteredArray.sort((a, b) => b.avg_vote_f - a.avg_vote_f);
                filteredArray = filteredArray.slice(0,50);
                let tbody2 = d3.select("tbody"); 
                filteredArray.forEach(d => {
                    let newRow = tbody2.append('tr')
                        newRow.append('td').text(d.title)
                        newRow.append('td').text(d.year_mv)
                        newRow.append('td').text(d.genre_1)
                        newRow.append('td').text(d.lang_1)
                        newRow.append('td').text(d.country_1)
                        newRow.append('td').text(d.duration)
                        newRow.append('td').text(d.avg_vote_f);
                    console.log(newRow);
                });
                console.log("Aquí estoy4");
            

            } catch(err) {
                console.log(err);
            }
        }
        general();


    }, []);

    const filterData = async () => {
        try {
            deleteTable();
            console.log(`${genre} & ${language}`);
            const response = await fetch(`${herokuBackend}/filter/${genre}/${language}`);
            const data = await response.json();

            let filteredArray = Object.values(data).map(d => d);
            console.log(filteredArray);


            filteredArray.forEach(entry => {
                entry.genre_1 = entry.genre_1 ? entry.genre_1 : 'None'
                entry.lang_1 = entry.lang_1 ? entry.lang_1 : 'None'
                return entry
            });

            filteredArray = filteredArray.sort((a, b) => b.avg_vote_f - a.avg_vote_f);
            filteredArray = filteredArray.slice(0,50);
            filteredArray.forEach(d => {
                let newRow = tbody.append('tr')
                    newRow.append('td').text(d.title)
                    newRow.append('td').text(d.year_mv)
                    newRow.append('td').text(d.genre_1)
                    newRow.append('td').text(d.lang_1)
                    newRow.append('td').text(d.country_1)
                    newRow.append('td').text(d.duration)
                    newRow.append('td').text(d.avg_vote_f)
        })
        } catch(err) {
            console.log(err);
        }
    }


    function deleteTable(){
        tbody.selectAll("tr").remove().selectAll("td").remove();
 }
    
    return (
        <div>
            <div class="container">
            <div class="row pt-5">
                <div class="col">
                    <h4 class="pb-3 mb-0">Search for Movies</h4>
                    <p>Note: The default value for Genre is "Action" and Language is "Aboriginal"</p>
                    <p class="lead">Please ensure to fill in both selections</p>
                    <form action="" onSubmit="return false;">
                        <div class="form">
                            <select id="genre-movie" className="form-select mb-5" 
                            onChange={(e) => {
                                setGenre(e.target.value);
                            }}>
                            </select>  
                        </div>
                        <div class="form mt-3">
                            <select id="language-movie" className="form-select mb-5" 
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}>
                            </select> 
                        </div>
                        <button type='button' onClick={filterData} class="btn btn-dark mx-3 mt-3">Find Movies</button>
                        <button type='button' onClick={deleteTable} class="btn btn-dark mx-3 mt-3">Clear Movies</button>
                    </form>
                </div>
            </div>

                <div class="row py-5">
                    <div class="col">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <td>Movie Title</td>
                                    <td>Year</td>
                                    <td>Genre</td>
                                    <td>Language</td>
                                    <td>Country</td>
                                    <td>Duration</td>
                                    <td>Rating</td>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data
