Vue.createApp({
  data(){
      return {
          posts: "",
          info: {},
          total:0,
          deaths:0,
          choice:"",
          vaccinated:0,
          vaccinationsAdministered:0,
          population:0,
          arrOfDates: [],
          name:'Every State',
          
          
      }
  },
  methods:{
      showTotal(){
          for (each in this.posts){
              if (this.choice == this.posts[each].state){
                  
                  this.info = {"cases": this.posts[each].actuals.cases, "deaths":this.posts[each].actuals.deaths,"vaccinated":this.posts[each].actuals.vaccinationsCompleted}
                  this.total = this.info.cases;
                  this.deaths = this.info.deaths;
                  this.vaccinated= (this.info.vaccinated / this.posts[each].population *100).toFixed(2);
                  this.name = this.posts[each].url.slice(27,-3)
                  this.vaccinationsAdministered=this.posts[each].actuals.vaccinesAdministered
                  // console.log(this.deathPercentage)
              }
          }
      },
      dialogueBox(event){
          var para = document.createElement("p");
          for(each in this.posts){
              if(event.target.id==this.posts[each].state){
                  this.info = {"cases" : this.posts[each].actuals.cases, "deaths":this.posts[each].actuals.deaths}
                  console.log(this.info.cases,this.info.deaths)
                  console.log(this.posts[each].state)
              }
          }
          para.textContent = this.info.cases;
          para.id = "myPopup"
          event.target.appendChild(para)
      },

      mapGraph(){
          // var x = this.posts[0].actualsTimeseries.length
          // this.arrOfDates = this.posts[0].actualsTimeseries
          // for (i=x-30;i<=x;i++){
          //     this.datesIwant.push(this.arrOfDates[i].date)
          //     console.log(this.datesIwant)
          // }.toISOString().split('T')[0]
          var start = new Date(new Date().setDate(new Date().getDate() - 30));
          var end = new Date(new Date().setDate(new Date().getDate()));
          let loop = new Date(start)
          while (loop <= end){
              this.arrOfDates.push(loop.toISOString().split('T')[0])
              let newDate = loop.setDate(loop.getDate()+1)
              loop = new Date(newDate);
          }
          const ctx = document.getElementById('myChart').getContext('2d');
          const myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: this.arrOfDates,
                  datasets: [{
                      label: 'Cases by day',
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1,
                      
                  }],
                  
              },
              options:{
                maintainAspectRatio: false,
            }
              
          });
          
      },

      mapDeath(){
          // var x = this.posts[0].actualsTimeseries.length
          // this.arrOfDates = this.posts[0].actualsTimeseries
          // for (i=x-30;i<=x;i++){
          //     this.datesIwant.push(this.arrOfDates[i].date)
          //     console.log(this.datesIwant)
          // }.toISOString().split('T')[0]
          var start = new Date(new Date().setDate(new Date().getDate() - 30));
          var end = new Date(new Date().setDate(new Date().getDate()));
          let loop = new Date(start)
          while (loop <= end){
              this.arrOfDates.push(loop.toISOString().split('T')[0])
              let newDate = loop.setDate(loop.getDate()+1)
              loop = new Date(newDate);
          }
          const ctx = document.getElementById('myChart').getContext('2d');
          const myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: this.arrOfDates,
                  datasets: [{
                      label: 'Cases by day',
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options:{
                  maintainAspectRatio: false,
              }
              
          });
          
      },

  },
  created(){
      axios.get('https://api.covidactnow.org/v2/states.timeseries.json?apiKey=b5bff55af2cc45cca78de9f5963b3385')
      .then(response=>{
          this.posts=response.data;

          for (each in this.posts){
              this.deaths += this.posts[each].actuals.deaths
              this.total += this.posts[each].actuals.cases
              this.vaccinated += this.posts[each].actuals.vaccinationsCompleted
              this.population += this.posts[each].population
              
          }
          this.vaccinationsAdministered=this.vaccinated
          this.vaccinated = (this.vaccinated/this.population*100).toFixed(2);
                
      })
      .catch(error =>{
          this.posts = [{ entry: 'There was an error' + error.message }]
      })
  },
  mounted(){
    this.mapGraph()
  }
}).mount('#app')

fetchData();