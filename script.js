const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        tab: 0, // タブの状態を管理するための変数
        Temperature: '',
        Item: '',
        Imageurl: '',
        dataList: [],
        dataList2: [],
    },
    methods: {
        addData: async function () {
            if (!this.Temperature) {
                console.log("Temperatureが入力されていません");
                return;
            }
            const param = {
                Temperature: this.Temperature,
                Item: this.Item,
                Imageurl: this.Imageurl
            };
            const response = await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/INSERT', param);
            console.log(response.data);
        },
        readData: async function () {
            const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT');
            console.log(response.data);
            this.dataList = response.data.List;
        },
        readData2: async function () {
            if (!this.Temperature) {
                console.log("Temperatureが入力されていません");
                return;
            }
            const param = {
                Temperature: this.Temperature,
            };
            const response = await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT2', param);
            console.log(response.data);
            this.dataList2 = response.data.List;
        },
    },
});
