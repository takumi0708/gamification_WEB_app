import ForceGraph2D from 'react-force-graph-2d'

// App 関数宣言
function App(){
  // グラフデータ保存する変数
  // graphData オブジェクトのvalueに配列を入れてる
  // その配列の中身にオブジェクトを入れてる
  const graphData = {
    nodes: [
      { id: 'ナノコネ' },
      { id: 'ゲーム業界' },
      { id: 'ゲーミフィケーション' },
      { id: 'エンジニア' },
      { id: '企画職' },
    ],
    links: [
      { source: 'ナノコネ', target: 'ゲーム業界' },
      { source: 'ナノコネ', target: 'ゲーミフィケーション' },
      { source: 'ナノコネ', target: 'エンジニア' },
      { source: 'ナノコネ', target: '企画職' },
    ],
  }
  // JSX を書けるReactの記法
  /*
  画面縦横いっぱい
  ForceGraph2DはReact 部品（ここに２Dグラフ表示）
  node label はid使う指定
  */
  return(
    <div style={{ width: '100vw', height: '100vh' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeLavel="id"
        linkColor={() => "white"}
        linkWidth={2}
      />
    </div>
  )
}
//このファイルの機能を他ファイルから使えるように
export default App