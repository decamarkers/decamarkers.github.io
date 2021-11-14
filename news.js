const app = Vue.createApp({
    data(){
        return{
            news: [],
        }
    },
    methods:{

    },
    created(){
    const url = 'https://newsapi.org/v2/top-headlines?country=us&category=health&q=covid&apiKey=905f4a8f0a2c4354920f2285ef4750be'
    axios.get(url)

    .then(response => {
        var data = response.data
        console.log(data.articles)

        var counter = 0;
        var newsCounter = 0;
        var newsArray = [];
        while(counter <6){
            if(data.articles[newsCounter].title == null || data.articles[newsCounter].description == null || data.articles[newsCounter].url == null || data.articles[newsCounter].urlToImage == null){
                newsCounter++;
            }
            else{
                newsArray.push(data.articles[newsCounter])
                counter++;
                newsCounter++
            }
        }
        this.news = newsArray;
        // console.log(this.news);

    })

    .catch(error => {
        console.log(error.message);
    })

    }
})

app.component('news-portion',{
    props:['title','description','urltoimage','url'],
    template:`
    <div class="col-4">
    <a :href = "url" target = "_blank" style="color:black; text-decoration: none;">
        <div class="card" style="width: auto; margin: 15px; height: 500px;">
            <img class = "img-responsive center-block d-block " :src = "urltoimage">
            <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">{{description}}</p>
            </div>
        </div>
    </a> 
    </div>
    `
})



app.mount("#news")



// original //
{/* <a :href = "url" target = "_blank" style="color:black; text-decoration: none;">
    
    <div class = "row" style="border-radius: 25px;
    border: 1px solid #a8aeb3;
    background-color: #edf3f7;
    padding: 15px; 
    width: 200;
    height: 150;
    margin: 15px;">
    
    <p> 
    <h3>{{title}}</h3>
    <img class = "img-responsive center-block d-block" style = "height: 120px; width: 200px;padding:10;float:left;margin-right:20px" :src = "urltoimage">
    <h5 style="text-decoration: none; font-family: Arial, Helvetica, sans-serif;">{{description}}</h5>
    </p>

    </div>

    </a>  */}