
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as tf from '@tensorflow/tfjs';
import modelI from '../tfjsmodel/model.json';
// import inputss from '../inputs.csv';
//const tfn = require("@tensorflow/tfjs-node");

const modelJson = require('../tfjsmodel/model.json');
const modelWeights = require('../tfjsmodel/group1-shard1of1.bin');

const url = {
  model: 'https://tfjsmodel1212121212.b-cdn.net/model.json',
  };

const options = { "data":
	["genre_Action",
  "genre_Adult",
  "genre_Adventure",
  "genre_Animation",
  "genre_Biography",
  "genre_Comedy",
  "genre_Crime",
  "genre_Documentary",
  "genre_Drama",
  "genre_Family",
  "genre_Fantasy",
  "genre_Film-Noir",
  "genre_History",
  "genre_Horror",
  "genre_Music",
  "genre_Musical",
  "genre_Mystery",
  "genre_News",
  "genre_Reality-TV",
  "genre_Romance",
  "genre_Sci-Fi",
  "genre_Sport",
  "genre_Thriller",
  "genre_War",
  "genre_Western",
  "country_Afghanistan",
  "country_Albania",
  "country_Algeria",
  "country_Andorra",
  "country_Angola",
  "country_Argentina",
  "country_Armenia",
  "country_Aruba",
  "country_Australia",
  "country_Austria",
  "country_Azerbaijan",
  "country_Bahamas",
  "country_Bahrain",
  "country_Bangladesh",
  "country_Belarus",
  "country_Belgium",
  "country_Belize",
  "country_Bermuda",
  "country_Bhutan",
  "country_Bolivia",
  "country_Bosnia and Herzegovina",
  "country_Botswana",
  "country_Brazil",
  "country_British Virgin Islands",
  "country_Brunei",
  "country_Bulgaria",
  "country_Burkina Faso",
  "country_Burma",
  "country_Cambodia",
  "country_Cameroon",
  "country_Canada",
  "country_Cape Verde",
  "country_Cayman Islands",
  "country_Chad",
  "country_Chile",
  "country_China",
  "country_Colombia",
  "country_Cook Islands",
  "country_Costa Rica",
  "country_Croatia",
  "country_Cuba",
  "country_Cyprus",
  "country_Czech Republic",
  "country_Czechoslovakia",
  "country_Côte d'Ivoire",
  "country_Denmark",
  "country_Djibouti",
  "country_Dominican Republic",
  "country_East Germany",
  "country_Ecuador",
  "country_Egypt",
  "country_El Salvador",
  "country_Equatorial Guinea",
  "country_Estonia",
  "country_Ethiopia",
  "country_Faroe Islands",
  "country_Federal Republic of Yugoslavia",
  "country_Fiji",
  "country_Finland",
  "country_France",
  "country_Gabon",
  "country_Georgia",
  "country_Germany",
  "country_Ghana",
  "country_Gibraltar",
  "country_Greece",
  "country_Greenland",
  "country_Guadeloupe",
  "country_Guatemala",
  "country_Guinea",
  "country_Guinea-Bissau",
  "country_Haiti",
  "country_Holy See (Vatican City State)",
  "country_Honduras",
  "country_Hong Kong",
  "country_Hungary",
  "country_Iceland",
  "country_India",
  "country_Indonesia",
  "country_Iran",
  "country_Iraq",
  "country_Ireland",
  "country_Isle Of Man",
  "country_Israel",
  "country_Italy",
  "country_Jamaica",
  "country_Japan",
  "country_Jordan",
  "country_Kazakhstan",
  "country_Kenya",
  "country_Korea",
  "country_Kosovo",
  "country_Kuwait",
  "country_Kyrgyzstan",
  "country_Laos",
  "country_Latvia",
  "country_Lebanon",
  "country_Lesotho",
  "country_Liberia",
  "country_Libya",
  "country_Liechtenstein",
  "country_Lithuania",
  "country_Luxembourg",
  "country_Macao",
  "country_Malawi",
  "country_Malaysia",
  "country_Maldives",
  "country_Mali",
  "country_Malta",
  "country_Martinique",
  "country_Mauritania",
  "country_Mauritius",
  "country_Mexico",
  "country_Moldova",
  "country_Monaco",
  "country_Mongolia",
  "country_Montenegro",
  "country_Morocco",
  "country_Mozambique",
  "country_Myanmar",
  "country_Namibia",
  "country_Nepal",
  "country_Netherlands",
  "country_Netherlands Antilles",
  "country_New Caledonia",
  "country_New Zealand",
  "country_Nicaragua",
  "country_Niger",
  "country_Nigeria",
  "country_North Korea",
  "country_North Vietnam",
  "country_Norway",
  "country_Oman",
  "country_Pakistan",
  "country_Palestine",
  "country_Panama",
  "country_Papua New Guinea",
  "country_Paraguay",
  "country_Peru",
  "country_Philippines",
  "country_Poland",
  "country_Portugal",
  "country_Puerto Rico",
  "country_Qatar",
  "country_Republic of North Macedonia",
  "country_Reunion",
  "country_Romania",
  "country_Russia",
  "country_Rwanda",
  "country_Samoa",
  "country_Saudi Arabia",
  "country_Senegal",
  "country_Serbia",
  "country_Serbia and Montenegro",
  "country_Singapore",
  "country_Slovakia",
  "country_Slovenia",
  "country_Somalia",
  "country_South Africa",
  "country_South Korea",
  "country_Soviet Union",
  "country_Spain",
  "country_Sri Lanka",
  "country_Sudan",
  "country_Suriname",
  "country_Svalbard And Jan Mayen",
  "country_Swaziland",
  "country_Sweden",
  "country_Switzerland",
  "country_Syria",
  "country_Taiwan",
  "country_Tajikistan",
  "country_Tanzania",
  "country_Thailand",
  "country_The Democratic Republic Of Congo",
  "country_Trinidad and Tobago",
  "country_Tunisia",
  "country_Turkey",
  "country_UK",
  "country_USA",
  "country_Uganda",
  "country_Ukraine",
  "country_United Arab Emirates",
  "country_Uruguay",
  "country_Uzbekistan",
  "country_Vanuatu",
  "country_Venezuela",
  "country_Vietnam",
  "country_West Germany",
  "country_Yemen",
  "country_Yugoslavia",
  "country_Zaire",
  "country_Zambia",
  "country_Zimbabwe",
  "lang_Abkhazian",
  "lang_Aboriginal",
  "lang_Acholi",
  "lang_Afrikaans",
  "lang_Akan",
  "lang_Albanian",
  "lang_Algonquin",
  "lang_American Sign Language",
  "lang_Amharic",
  "lang_Ancient (to 1453)",
  "lang_Apache languages",
  "lang_Arabic",
  "lang_Aragonese",
  "lang_Aramaic",
  "lang_Arapaho",
  "lang_Armenian",
  "lang_Aromanian",
  "lang_Assamese",
  "lang_Assyrian Neo-Aramaic",
  "lang_Athapascan languages",
  "lang_Australian Sign Language",
  "lang_Awadhi",
  "lang_Aymara",
  "lang_Azerbaijani",
  "lang_Bable",
  "lang_Balinese",
  "lang_Bambara",
  "lang_Basque",
  "lang_Belarusian",
  "lang_Bemba",
  "lang_Bengali",
  "lang_Berber languages",
  "lang_Bhojpuri",
  "lang_Bicolano",
  "lang_Bosnian",
  "lang_Brazilian Sign Language",
  "lang_Breton",
  "lang_British Sign Language",
  "lang_Bulgarian",
  "lang_Burmese",
  "lang_Cantonese",
  "lang_Catalan",
  "lang_Central American Indian languages",
  "lang_Chechen",
  "lang_Cheyenne",
  "lang_Chinese",
  "lang_Cornish",
  "lang_Corsican",
  "lang_Cree",
  "lang_Creek",
  "lang_Crimean Tatar",
  "lang_Croatian",
  "lang_Crow",
  "lang_Czech",
  "lang_Danish",
  "lang_Dari",
  "lang_Dinka",
  "lang_Dutch",
  "lang_Dyula",
  "lang_Dzongkha",
  "lang_Eastern Frisian",
  "lang_Egyptian (Ancient)",
  "lang_English",
  "lang_Esperanto",
  "lang_Estonian",
  "lang_Ewe",
  "lang_Faroese",
  "lang_Filipino",
  "lang_Finnish",
  "lang_Flemish",
  "lang_French",
  "lang_French Sign Language",
  "lang_Frisian",
  "lang_Fulah",
  "lang_Gallegan",
  "lang_Georgian",
  "lang_German",
  "lang_German Sign Language",
  "lang_Greek",
  "lang_Greenlandic",
  "lang_Guarani",
  "lang_Gujarati",
  "lang_Gumatj",
  "lang_Haida",
  "lang_Haitian",
  "lang_Hakka",
  "lang_Haryanvi",
  "lang_Hassanya",
  "lang_Hausa",
  "lang_Hawaiian",
  "lang_Hebrew",
  "lang_Himachali",
  "lang_Hindi",
  "lang_Hmong",
  "lang_Hokkien",
  "lang_Hopi",
  "lang_Hungarian",
  "lang_Ibo",
  "lang_Icelandic",
  "lang_Indian Sign Language",
  "lang_Indonesian",
  "lang_Inuktitut",
  "lang_Irish",
  "lang_Italian",
  "lang_Japanese",
  "lang_Japanese Sign Language",
  "lang_Kabuverdianu",
  "lang_Kabyle",
  "lang_Kalmyk-Oirat",
  "lang_Kannada",
  "lang_Kashmiri",
  "lang_Kazakh",
  "lang_Khanty",
  "lang_Khmer",
  "lang_Kikuyu",
  "lang_Kinyarwanda",
  "lang_Kirghiz",
  "lang_Kirundi",
  "lang_Klingon",
  "lang_Konkani",
  "lang_Korean",
  "lang_Korean Sign Language",
  "lang_Kriolu",
  "lang_Kru",
  "lang_Kurdish",
  "lang_Ladakhi",
  "lang_Ladino",
  "lang_Lao",
  "lang_Latin",
  "lang_Latvian",
  "lang_Lingala",
  "lang_Lithuanian",
  "lang_Low German",
  "lang_Luxembourgish",
  "lang_Macedonian",
  "lang_Maithili",
  "lang_Malay",
  "lang_Malayalam",
  "lang_Malinka",
  "lang_Maltese",
  "lang_Mandarin",
  "lang_Mandingo",
  "lang_Maori",
  "lang_Mapudungun",
  "lang_Marathi",
  "lang_Mari",
  "lang_Marshallese",
  "lang_Maya",
  "lang_Mende",
  "lang_Micmac",
  "lang_Middle English",
  "lang_Min Nan",
  "lang_Minangkabau",
  "lang_Mirandese",
  "lang_Mixtec",
  "lang_Mohawk",
  "lang_Mongolian",
  "lang_Montagnais",
  "lang_More",
  "lang_Nahuatl",
  "lang_Nama",
  "lang_Navajo",
  "lang_Neapolitan",
  "lang_Nenets",
  "lang_Nepali",
  "lang_None",
  "lang_Norse",
  "lang_North American Indian",
  "lang_Norwegian",
  "lang_Nyanja",
  "lang_Occitan",
  "lang_Ojibwa",
  "lang_Old",
  "lang_Old English",
  "lang_Papiamento",
  "lang_Parsee",
  "lang_Pawnee",
  "lang_Persian",
  "lang_Peul",
  "lang_Polish",
  "lang_Polynesian",
  "lang_Portuguese",
  "lang_Pular",
  "lang_Punjabi",
  "lang_Purepecha",
  "lang_Pushto",
  "lang_Quechua",
  "lang_Quenya",
  "lang_Raeto-Romance",
  "lang_Rajasthani",
  "lang_Rhaetian",
  "lang_Romanian",
  "lang_Romany",
  "lang_Rotuman",
  "lang_Russian",
  "lang_Russian Sign Language",
  "lang_Ryukyuan",
  "lang_Saami",
  "lang_Samoan",
  "lang_Sanskrit",
  "lang_Sardinian",
  "lang_Scanian",
  "lang_Scots",
  "lang_Scottish Gaelic",
  "lang_Serbian",
  "lang_Serbo-Croatian",
  "lang_Shanghainese",
  "lang_Shanxi",
  "lang_Shona",
  "lang_Shoshoni",
  "lang_Sicilian",
  "lang_Sign Languages",
  "lang_Sindarin",
  "lang_Sindhi",
  "lang_Sinhalese",
  "lang_Sioux",
  "lang_Slovak",
  "lang_Slovenian",
  "lang_Somali",
  "lang_Southern Sotho",
  "lang_Spanish",
  "lang_Spanish Sign Language",
  "lang_Sranan",
  "lang_Swahili",
  "lang_Swedish",
  "lang_Swiss German",
  "lang_Syriac",
  "lang_Tagalog",
  "lang_Tajik",
  "lang_Tamashek",
  "lang_Tamil",
  "lang_Tarahumara",
  "lang_Tatar",
  "lang_Telugu",
  "lang_Teochew",
  "lang_Thai",
  "lang_Tibetan",
  "lang_Tigrigna",
  "lang_Tok Pisin",
  "lang_Tonga",
  "lang_Tswana",
  "lang_Tulu",
  "lang_Tupi",
  "lang_Turkish",
  "lang_Turkmen",
  "lang_Tzotzil",
  "lang_Uighur",
  "lang_Ukrainian",
  "lang_Ukrainian Sign Language",
  "lang_Ungwatsi",
  "lang_Urdu",
  "lang_Uzbek",
  "lang_Vietnamese",
  "lang_Visayan",
  "lang_Washoe",
  "lang_Wayuu",
  "lang_Welsh",
  "lang_Wolof",
  "lang_Xhosa",
  "lang_Yakut",
  "lang_Yiddish",
  "lang_Yoruba",
  "lang_Zulu",]
}
 




const NW = () => {

    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');

    const herokuBackend = 'https://ec2-3-17-42-22.us-east-2.compute.amazonaws.com:5000';

    let datac;
    useEffect(() => {
        const general = async () => {
            try {
/*                const response = await fetch(`${herokuBackend}/all_movies`);
                const data = await response.json()
                datac = data;
                init();*/
                chargeData();
                console.log("charged");
            } catch(err) {
                console.log(err);
            }
        }
        general();
    }, [genre, language]);

   
    


    //simulating UNIQUES
    let bedata = {"country":["US","UK"],
                "language":["English","Spanish"],
                "genre":["Drama","Crime"]};

    //Holding initial filters and also will hold further filters
    let filters = {"country":[],"lang":[],"genre":[],"top":""};
    let maxLenght = {"country":5,"lang":5,"genre":3}
    let inputs = [];
    let indexes = {};
    

    let ids=['genre','country','lang'];
    function chargeData(){
      //d3.json(options).then(function(Inputs){
        //console.log(inputs)
        let mapp = options.data;
        //console.log(mapp)
        let count = 1;
        ids.forEach(function(id,i){
          let items = mapp.filter(function(d){  return d.substring(0,id.length) == id; }).map(d => d.substring(id.length+1));
          let select = d3.select("#myDropdown"+(i+1))
                          .selectAll("a")
                          .data(items);
                          
                          let group = select.enter()
                          .append("a")
                          /*.attr("onclick", function(d) {
                              count++; 
                              indexes[d.replace(/\s/g, '')] = count;
                              return "hold('"+id+"','"+d.replace(/\s/g, '')+"')"; })*/
                          .attr("id",function(d){
                                count++; 
                                indexes[d.replace(/\s/g, '')] = count;
                                return d.replace(/\s/g, '');})
                          .on("click", function(d) {
                              hold(id,d3.select(this).attr("id")); // my react method
                              
                          } )
                          
                          .merge(select)
                          .text(function(d){
                                             return d;})
        });
        /*items = mapp.filter(function(d){ return d.substring(0,5) == "genre"; }).map(d => d.substring(6));
        console.log(items);*/
      // }).catch(function(error) {
      //   console.log(error);
      // })
    }
    function colorWeighted(w){
      switch(w){
        case 5:
          return "#CACFD2";
        case 4:
          return "#BDC3C7";
        case 3:
          return "#A6ACAF";
        case 2:
          return "#909497";
        case 1:
          return "#797D7F";
      }
    }

    function hold(i,id){
      if(inFilters(i,id)){
        d3.select("#"+id).style("background-color","#f6f6f6");
        let index = filters[i].indexOf(id);
        if (index > -1) {
          filters[i].splice(index, 1);
        }
        for(let j=0;j<filters[i].length;j++){
          d3.select("#"+filters[i][j]).style("background-color",colorWeighted(j+1));
        }
        
      }else{
        if(filters[i].length==maxLenght[i]){
          return;
        }
        filters[i].push(id);   
        d3.select("#"+id).style("background-color",colorWeighted(filters[i].length));
      }
    }

    async function init(){
      let url = {model:'https://tfjsmodel1212121212.b-cdn.net/model.json'}
      const model = await tf.loadLayersModel(url.model);
      let array = [];
      for(let i=0;i<484;i++){
        array.push(.01);
      }
      //const inputData = tf.tensor(array, [1, 484])
      const inputData = tf.tensor(inputs, [1, 484])
      const result = model.predict([inputData]);
      //result.dataSync()[0];
    
    // Display the winner
      let prediction = Math.round(result.dataSync()[0]*100)/100;
    
      if(prediction < 0){
        d3.select("#pt").text("This rating is probably not meaningful since it's below 0: ");
      }
      else if(prediction > 10){
        d3.select("#pt").text("This rating is probably not meaningful since it's above 10: ");
      }
      else{
        d3.select("#pt").text("The predicted rating for this movie is: ");
      }
      d3.select("#prediction").text(prediction);
    }
      
    function myFunction(id) {
        let element = d3.select("#"+id);
        if(element.style("display")=="block"){
            element.style("display","none"); 
        }
        else{
            element.style("display","block");
        }
    }
    
    function filterFunction(id) {
        let input, filter, ul, li, a, i,div,txtValue;
        input = document.getElementById("myInput"+id);
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown"+id);
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            } else {
            a[i].style.display = "none";
            }
        }
    }
    function inFilters(i,id){
     return filters[i].includes(id);
    }



    function predictions(){
      inputs = [];
      for(let i=0;i<484;i++){
        inputs.push(0);
      }
      
      let year = document.getElementById("year").value;
      let duration = document.getElementById("duration").value;
      /*console.log(year);
      console.log(duration);*/
      if(isNaN(year)){
        d3.select("#prediction").text("Not a valid year");
        return;
      } 
      inputs[0] = (year - 1894) / (2020 - 1894)
      if(isNaN(duration)){
        d3.select("#prediction").text("Not a valid duration");
        return;
      } 
      inputs[1] = (duration - 40) / (3360 - 40)
    
      ids.forEach(function(kind){
        filters[kind].forEach(function(el,i){
          inputs[indexes[el]] = (maxLenght[kind]-i)/(maxLenght[kind])
        });
      });
      init();
    }






    return (
        <div>
            <div className="container">
              <div className="row p-3">
                  <div className='col'>
                      <h2 className="display-6 pt-3 pb-3">Regressional neural network</h2>
                      <p className="lead">Description</p>
                      <p>Select up to three genres, and 5 countries and languages for a movie, with a possible year of realease and duration, get a rating prediction!
                        (Mean absolute error: 0.70 trained with over 74 thousand movies and tested on over 6 thousand)
                      </p>
                  </div>
                  <hr className='mt-4 mb-4'/>
              </div>



              <div className="row">
                <div className="col-md-3 text-center">

                  <div className="dropdown">
                    <p>Select up to 3 genres</p>
                    <button onClick={() => myFunction('myDropdown1')} className="dropbtn">Genre</button>
                    <div id="myDropdown1" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput1" onKeyUp={() => filterFunction(1)}></input>
                    </div>
                  </div>

                  <p>Select up to 5 countries</p>
                  <div className="dropdown">
                    <button onClick={() => myFunction('myDropdown2')} className="dropbtn">Country</button>
                    <div id="myDropdown2" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput2" onKeyUp={() => filterFunction(2)}></input>
                    </div>
                  </div>

                  <p>Select up to 5 languages</p>
                  <div className="dropdown">
                    <button onClick={() => myFunction('myDropdown3')} className="dropbtn">Language</button>
                    <div id="myDropdown3" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput3" onKeyUp={() => filterFunction(3)}></input>
                    </div>
                  </div>

                  <p>Write a year (Between 1894 and 2020 for optimal performance)</p>
                  <input id="year" type="text"></input>

                  <p>Write a duration in minutes (Between 40 and 3360 for optimal performance)</p>
                  <input id="duration" type="text"></input>
                  
                </div>
                <div className="col text-center">
                  <button onClick={() => predictions()} className="dropbtn">Predict</button>
                  <h1 id='pt'>The predicted rating for this movie is:</h1>
                  <h2 id ="prediction">10</h2>
                </div> 

              </div>
              <script crossorigin src="https://tfjsmodel1212121212.b-cdn.net/model.json"></script>




              {/* <div className="d-flex justify-content-center pt-4">
                          <Link to="/visualizations" className="btn btn-dark btn-lg m-2">Back to Visualizations</Link>
                  </div>
                  */}

            </div>
        </div>
        
    )
}

export default NW
