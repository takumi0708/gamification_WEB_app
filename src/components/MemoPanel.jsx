import ReactMarkdown from "react-markdown"

function MemoPanel({
    selectedNode, //選択されてるnode
    editMemo, // 編集してるメモ
    setEditMemo, // 編集してるメモを変える関数
    saveMemo, // 保存したメモ
  }) {
    // ノード選択されてないなら、何も表示しない
    if(!selectedNode){
        return null
    }

    return(
        <div>

            {/* 選択中のノード名 */}
            <h2>{selectedNode.id}</h2>

            {/* Markdown 編集欄　外に表示しないので、</>で完結*/}
            <textarea 
                value={editMemo}
                onChange={(e) => setEditMemo(e.target.value)}
                cols={10}
                rows={40}
            />

            {/* メモ保存*/}
            <button onClick={saveMemo}>
                保存
            </button>

            {/* Markdown プレビュー*/}
            <h3>プレビュー</h3>

            <ReactMarkdown>
                {editMemo}
            </ReactMarkdown>
        </div>
    )
  }
  export default MemoPanel