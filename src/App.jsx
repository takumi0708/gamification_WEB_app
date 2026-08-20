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

  // リンク一覧
  const [links, setLinks] = useState([
    { source: 'ナノコネ', target: '業界研究' },
    { source: 'ナノコネ', target: 'ゲーミフィケーション' },
    { source: 'ナノコネ', target: '企業分析' }
  ])

  //最初は空文字
  const [input, setInput] = useState("")

  // 接続先
  // 最初は「ナノコネ」
  const [target, setTarget] = useState('ナノコネ')

  // グラフに入れるデータ
  const graphData = {
    nodes: nodes,
    links: links,
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

    // 現在のリンクに追加
    setLinks([
      ...links,
      //既存のlinksに追加する内容
      {
        source: target, // from
        target: input, // to
      },
    ])

    //ノード追加後、入力欄を空に
    setInput("");
  }
  //ここからReact
  return(
    <div>
      {/*入力設定 */}
      <input 
      type="text" 
      value={input}
      // 文字が入力されるたびにinput Stateを更新
      onChange={(e) => setInput(e.target.value)}

      //入力欄の説明
      placeholder="追加する情報を入力"
      />

      {/*接続先 
      複数の候補から1つ選ぶプルダウン
      */}
      <select 
      value={target}
      //選択肢が変更されたときの処理
      onChange={(e) => setTarget(e.target.value)}
      >   
          {/*配列をループして一覧に map */}
         {nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.id}
          </option>
        ))}
      </select>

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