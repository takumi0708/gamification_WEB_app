import ForceGraph2D from "react-force-graph-2d"

function Graph({
  graphData, // データの中身
  setSelectedNode, // 選択されたノードを変更
  setEditMemo, // 編集メモを変更
}){
    
    return(
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
          

          // ノードクリック
          onNodeClick={(node) => {
                // 選択中ノード
                setSelectedNode(node)

                // memoを編集欄に
                // メモなければ空
                setEditMemo(node.memo || "")
              }}
      />

  )
    
}
export default Graph