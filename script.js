const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
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
        goToAddOutfit() {
            window.location.href = 'add-outfit.html';
        },
        goToSearchOutfit() {
            window.location.href = 'search-outfit.html';
        },
        goToDisplayAll() {
            window.location.href = 'display-all.html';
        },
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
            try {
                const response = await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/INSERT', param);
                console.log(response.data);

                this.snackbarMessage = 'Outfit added successfully!';
                this.snackbar = true;

                this.Temperature = '';
                this.Item = '';
                this.Imageurl = '';
            } catch (error) {
                console.error('Error adding data:', error);
            }
        },
        readData: async function () {
            try {
                const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT');
                const newData = response.data.List.map(item => {
                    const existingItem = this.dataList.find(oldItem => oldItem.Imageurl === item.Imageurl);
                    return existingItem ? { ...item, liked: existingItem.liked, saved: existingItem.saved } : { ...item, liked: false, saved: false };
                });
                this.dataList = newData;
            } catch (error) {
                console.error('Error reading data:', error);
            }
        },
        readData2: async function () {
            if (!this.Temperature) {
                console.log("Temperatureが入力されていません");
                return;
            }
            const param = {
                Temperature: this.Temperature,
            };
            try {
                const response = await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT2', param);
                this.dataList2 = response.data.List.map(item => ({ ...item, liked: false, saved: false }));
            } catch (error) {
                console.error('Error reading data2:', error);
            }
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
            try {
                await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/DELETE', param);
                list.splice(index, 1);
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        },
        openDialog: function (imageUrl) {
            this.dialogImageUrl = imageUrl;
            this.dialog = true;
        },
        toggleLike: function (index, listType = 'dataList') {
            const list = listType === 'dataList' ? this.dataList : this.dataList2;
            list[index].liked = !list[index].liked;
        },
    }
});
