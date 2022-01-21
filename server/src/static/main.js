const URL = 'http://localhost:3000/api/plants';

const myVueApp =  Vue.createApp({
    data () {
        
        return {
            plants : []
        };
    },
    methods: {
        
    },
    computed : {
        
    },
    async mounted(){
        this.plants =  await (await fetch(URL)).json();
    }
})




// myVueApp.component('', {
//     data () {

//     },

//     template: `

//     `
// })

myVueApp.mount("#container");