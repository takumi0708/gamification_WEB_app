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

  // 削除ノード
  const [deleteTarget, setDeleteTarget] = useState("ナノコネ")

  // グラフに入れるデータ
  const graphData = {
    nodes: nodes,
    links: links,
  }

  // ボタン押されたとき実行される関数（アロー関数）
  const addNode = () => {
    // 何もないとき用
    if(input.trim() === "") return

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
  // 削除関数
  const deleteNode = () =>{
    
    // nodes から選択したノードを削除
    setNodes(
      //filter() は、条件に合うデータだけ残す処理
      // deleteTarget以外をnodeに入れる
      nodes.filter((node) => node.id !== deleteTarget)
    )
  
    // 削除したノードにつながるlinkも削除
    setLinks(
      links.filter((link) =>
        // deleteTargetがsource target以外の部分残す
        link.source !== deleteTarget &&
        link.target !== deleteTarget
      )
    )
    }

  //ここからReact
  return (
    <div> 
  
      {/* 追加エリア */}
      <div>
        <h3>情報を追加</h3>
  
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="追加する情報を入力"
        />
  
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        >
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.id}
            </option>
          ))}
        </select>
  
        <button onClick={addNode}>
          追加
        </button>
      </div>
  
  
      {/* 削除エリア */}
      <div>
        <h3>情報を削除</h3>
  
        <select
          value={deleteTarget}
          onChange={(e) => setDeleteTarget(e.target.value)}
        >
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.id}
            </option>
          ))}
        </select>
  
        <button onClick={deleteNode}>
          削除
        </button>
      </div>
  
  
      {/* グラフ */}
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="id"
        linkColor={() => 'white'}
        linkWidth={1}
      />
  
    </div>
  )
  
}
export default App