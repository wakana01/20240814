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
        snackbar: false, // スナックバーの表示制御用
        snackbarMessage: '', // スナックバーに表示するメッセージ
        dialog: false, // ダイアログの表示制御用
        dialogImageUrl: '', // ダイアログに表示する画像のURL
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

            // 成功時にスナックバーを表示
            this.snackbarMessage = 'Outfit added successfully!';
            this.snackbar = true;

            // 入力フィールドをクリア
            this.Temperature = '';
            this.Item = '';
            this.Imageurl = '';
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
        deleteData: async function (index) {
            const itemToDelete = this.dataList[index];
            if (!itemToDelete) {
                console.log("削除対象が見つかりません");
                return;
            }
            const param = {
                Temperature: itemToDelete.Temperature,
                Item: itemToDelete.Item,
                Imageurl: itemToDelete.Imageurl
            };
            const response = await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/DELETE', param);
            console.log(response.data);

            // 削除が成功した場合、ローカルのdataListからアイテムを削除
            this.dataList.splice(index, 1);
        },
        openDialog: function (imageUrl) {
            this.dialogImageUrl = imageUrl;
            this.dialog = true;
        },
        toggleLike: function (index) {
            this.dataList[index].liked = !this.dataList[index].liked;
        // ここで、サーバーに「いいね」状態の変更を送信することもできます
    },
});
