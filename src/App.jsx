import { useState } from "react"

import NodeForm from "./components/NodeForm"
import Graph from "./components/Graph"
import MemoPanel from "./components/MemoPanel"


function App(){
  // ==================================================
  // State defnition
  // ==================================================
  
  // ノードの定義
  const [nodes, setNodes] = useState([
    {
      id: "ナノコネ",
      memo: `# ナノコネ
## 特徴
- ゲーミフィケーション
- WEBアプリ開発
- インターン 
`
    },

    {
      id: "業界研究",
      memo: `# 業界研究`
    },

    {
      id: "企業研究",
      memo: `# 企業研究`
    },

    {
      id: "ゲーミフィケーション",
      memo: `# GF`
    }

  ])

  // リンクの定義
  const [links, setLinks] = useState([
    { source: "ナノコネ", target: "業界研究" },
    { source: "ナノコネ", target: "ゲーミフィケーション" },
    { source: "ナノコネ", target: "企業分析" },
  ])

  //入力 from
  const [input, setInput] = useState("")

  // 追加　to
  const [target, setTarget] =
    useState("ナノコネ")

  // 削除 to
  const [deleteTarget, setDeleteTarget] =
    useState("ナノコネ")

  // 選択
  const [selectedNode, setSelectedNode] =
    useState(null)

  // 編集
  const [editMemo, setEditMemo] =
    useState("")

  // ==================================================
  // Graph Data
  // ==================================================

  const graphData = {
    nodes,
    links
  }


  // ==================================================
  // Add Node and link
  // ==================================================

  const addNode = () => {
    //　空文字ならば何もしない
    if(input.trim() == "") return

    // ノード追加(変更) 既存のものに追加する
    setNodes([
      ...nodes,
      {
        id: input,
        memo: "",
      },
    ])

    // リンク追加
    setLinks([
      ...links,
      {
        source: target, // select で選んだ既存のノード
        target: input,
      },
    ])
    // 追加したら空にする
    setInput("")
  }


  // ==================================================
  // Delete Node
  // ==================================================

  const deleteNode = () => {
    // ノード削除
    setNodes(
      nodes.filter(
        (node) =>
          node.id !== deleteTarget
      )
    )
    // リンク削除
    setLinks(
      links.filter(
        (link) =>
          link.source !== deleteTarget &&
          link.target !== deleteTarget
      )
    )
  }


  // ==================================================
  // マークダウン保存
  // ==================================================

  // マークダウンを保存するボタン押された時実行
  const saveMemo = () => {

    // 選択されたノードがない場合,終了
    if (!selectedNode) return

    // 選択ノードの更新を変数に入れる
    const updatedNodes =
      nodes.map((node) => {
        //今のノードが選択してるやつなら
        if (node.id === selectedNode.id) {

          // 編集したメモに更新
          return {
            ...node,
            memo: editMemo,
          }
        }

        // 選択してないやつはそのまま返す
        return node
      })

    // グラフ側のノードを更新
    setNodes(updatedNodes)

    // 選択中のノードの中身を更新
    setSelectedNode({
      ...selectedNode,
      memo: editMemo,
    })
  }


  // ==================================================
  // UI(表示する部分)
  // ==================================================
  return (
    <div>

      {/* ノード追加・削除 
      NodeForm.jsxを利用してるってこと
      必要なデータをApp.jsxからNodeForm.jsxに渡してる
      */}
      <NodeForm
        nodes={nodes}

        input={input}
        setInput={setInput}

        target={target}
        setTarget={setTarget}

        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}

        addNode={addNode}
        deleteNode={deleteNode}
      />


      {/* Markdown */}
      <MemoPanel
        selectedNode={selectedNode}

        editMemo={editMemo}
        setEditMemo={setEditMemo}

        saveMemo={saveMemo}
      />


      {/* グラフ */}
      <Graph
        graphData={graphData}

        setSelectedNode={setSelectedNode}
        setEditMemo={setEditMemo}
      />

    </div>
  )
}

export default App