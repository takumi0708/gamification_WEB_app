import { useState } from "react"
import ForceGraph2D from "react-force-graph-2d"
import ReactMarkdown from "react-markdown"

function App(){
  // nodes      : 現在のノード一覧
  // setNodes   : nodesを書き換える関数
  const [nodes, setNodes] = useState([
    {id: "ナノコネ",
    memo: `# ナノコネ
## 特徴
- ゲーミフィケーション
    - Web開発
    - インターン`
  },
    {id: "業界研究",
    memo: `# ナノコネ

    ## 特徴
    -  ゲーミフィケーション
    - Web開発
    - インターン
    `},
    {id: "企業分析",
    memo: `# ナノコネ

    ## 特徴
    -  ゲーミフィケーション
    - Web開発
    - インターン
    `},
    {id: "ゲーミフィケーション",
    memo: `# ナノコネ

    ## 特徴
    -  ゲーミフィケーション
    - Web開発
    - インターン
    `},
  ])

  // クリックされたノード保存
  const [selectedNode, setSelectedNode] = useState(null)

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

       {/* 選択したノードのメモ */}
       {selectedNode && (
        <div>
          {/* メモがあればMarkdownで表示 */}
          {selectedNode.memo ? (
            <ReactMarkdown>
            {selectedNode.memo}
          </ReactMarkdown>
          ) : (
            <p>メモはありません。</p>
          )
        }
        </div>
      )}    
  
  
      {/* グラフ */}
      <ForceGraph2D
        graphData={graphData}
        linkColor={() => 'white'}
        linkWidth={1}

        // ノードを自分で描画
        // ノード情報、図形や文字書く、現在のズーム率
        nodeCanvasObject={(node, ctx, globalScale) =>{

          const label = node.id

           // ズームしても文字サイズがある程度一定になるようにする
           // 倍率大きくしたら、小さくなるように
          const fontSize = 14 / globalScale

          ctx.font = `${fontSize}px Sans-Serif`
          // 文字幅を取得
          const textWidth = ctx.measureText(label).width

          // ノード本体
          // 図形描画開始
          ctx.beginPath()

          // 円を描く
          ctx.arc(node.x, node.y,
              5, // 半径
              0, 2 * Math.PI //円一周
             )
          ctx.fillStyle = '#2389c9'
          ctx.fill() //塗りつぶし

          // 文字の色
          ctx.fillStyle = 'white'
          
          // 文字を入れる部分
          ctx.fillText(
            label,// label の名前
            /*
            canva は左上が（0,0）
            */
            node.x - textWidth / 2, //ノードの左　文字幅の半分だけ
            node.y + 12 //ノードの下
          )
              }}

          onNodeClick={(node) => {
                setSelectedNode(node)
              }}
      />

        
    </div>
  )
  
}
export default App