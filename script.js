const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        tab: 0,
        Temperature: '',
        Item: '',
        Imageurl: '',
        dataList: [],
        dataList2: [],
        snackbar: false,
        snackbarMessage: '',
        dialog: false,
        dialogImageUrl: '',
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

            this.snackbarMessage = 'Outfit added successfully!';
            this.snackbar = true;

            this.Temperature = '';
            this.Item = '';
            this.Imageurl = '';
        },
        readData: async function () {
            const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT');
            const newData = response.data.List.map(item => {
                const existingItem = this.dataList.find(oldItem => oldItem.Imageurl === item.Imageurl);
                return existingItem ? { ...item, liked: existingItem.liked, saved: existingItem.saved } : { ...item, liked: false, saved: false };
            });
            this.dataList = newData;
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
            this.dataList2 = response.data.List.map(item => ({ ...item, liked: false, saved: false }));
        },
        deleteData: async function (index, listType = 'dataList') {
            const list = listType === 'dataList' ? this.dataList : this.dataList2;
            const itemToDelete = list[index];
            if (!itemToDelete) {
                console.log("削除対象が見つかりません");
                return;
            }
            const param = {
                Temperature: itemToDelete.Temperature,
                Item: itemToDelete.Item,
                Imageurl: itemToDelete.Imageurl
            };
            await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/DELETE', param);
            list.splice(index, 1);
        },
        openDialog: function (imageUrl) {
            this.dialogImageUrl = imageUrl;
            this.dialog = true;
        },
        toggleLike: function (index, listType = 'dataList') {
            const list = listType === 'dataList' ? this.dataList : this.dataList2;
            list[index].liked = !list[index].liked;
        },
    },
});
