import { useState } from "react"
import ForceGraph2D from "react-force-graph-2d"

function App(){
  // nodes      : 現在のノード一覧
  // setNodes   : nodesを書き換える関数
  const [nodes, setNodes] = useState([
    {id: "ナノコネ"},
    {id: "業界研究"},
    {id: "企業分析"},
    {id: "ゲーミフィケーション"},
  ])
  //最初は空文字
  const [input, setInput] = useState("")

  const graphData = {
    nodes: nodes,
    // link はとりあえず、自分で定義
    links: [
      {source: "ナノコネ", target: "業界研究"},
      {source: "ナノコネ", target: "ゲーミフィケーション"},
    ],
  }


  // ボタン押されたとき実行される関数（アロー関数）
  const addNode = () => {
    // 何もないとき用
    if(input == " ") return

    // 現在のノードに追加
    setNodes([
      // 今あるnodes をすべて展開
      ...nodes,
      {id: input},
    ])

    //ノード追加後、入力欄を空に
    setInput("");
  }
  //ここからReact
  return(
    <div>
      <input 
      type="text" 
      value={input}
      // 文字が入力されるたびにinput Stateを更新
      onChange={(e) => setInput(e.target.value)}

      //入力欄の説明
      placeholder="追加する情報を入力"
      />

      {/*クリックするとaddNode */}
      <button onClick={addNode}>
        追加
      </button>

      {/*グラフ表示 */}
      <ForceGraph2D

        // nodesとlinksを渡す
        graphData={graphData}

        // ノードにマウスを合わせたときidを表示
        nodeLabel="id"

        // linkの色を白にする
        linkColor={() => 'white'}

        // linkの太さ
        linkWidth={1}
      />
    </div>
  )
}
export default App