const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  vuetify: new Vuetify(),
  data: {
    // Vue内部で使いたい変数は全てこの中に定義する
    Temperature: '', // パラメーター「Temperature」格納変数
    Outfit: '', // パラメーター「Outfit」格納変数
    Imageurl: '', // パラメーター「Imageurl」格納変数
    dataList: [], // データ表示用配列
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
        Outfit : this.Outfit,
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
      const response = await axios.get('https://m3h-tanabe2-functionapi.azurewebsites.net/SELECT');
      
      //結果をコンソールに出力
      console.log(response.data);
      
      //結果リストを表示用配列に代入
      this.dataList = response.data.List;
    },
  },
});