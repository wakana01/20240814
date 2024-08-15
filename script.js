const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  vuetify: new Vuetify(),
  data: {
    // Vue内部で使いたい変数は全てこの中に定義する
    Temperature: '', // パラメーター「Temperature」格納変数
    Item: '', // パラメーター「Item」格納変数
    Imageurl: '', // パラメーター「Imageurl」格納変数
    dataList: [], // データ表示用配列
    dataList2: [],
    dataList3: [],
    dataList4: [],
  },
  methods: {
    // DBにデータを追加する関数
    addData: async function() {

      //Temperatureの入力チェック（空白なら終了）
      if(!this.Temperature){
        console.log("Temperatureが入力されていません");
        return;
      }
      
      //POSTメソッドで送るパラメーターを作成
      const param = {
        Temperature : this.Temperature,
        Item: this.Item,
        Imageurl : this.Imageurl
      };
      
      //INSERT用のAPIを呼び出し
          const response = await axios.post('https://m3h-tanabe2-functionapi.azurewebsites.net/api/INSERT', param);
      
      //結果をコンソールに出力
      console.log(response.data);

    },
    // データベースからデータを取得する関数
    readData: async function() {
      //SELECT用のAPIを呼び出し      
        const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT');
      
      //結果をコンソールに出力
      console.log(response.data);
      
      //結果リストを表示用配列に代入
      this.dataList = response.data.List;
    },

      readData2: async function() {
          const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT2');

          console.log(response.data);

          this.dataList2 = response.data.List2;
      }

      readData3: async function () {
          const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT3');

          console.log(response.data);

          this.dataList3 = response.data.List3;
      }

      readData4: async function () {
          const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/api/SELECT4');

          console.log(response.data);

          this.dataList4 = response.data.List4;
      }

  },
});