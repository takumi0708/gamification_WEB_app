function NodeForm({
    nodes,
    input, //追加する名前 from
    setInput, // 受け取る関数
    target, // to
    setTarget, 
    deleteTarget,
    setDeleteTarget,
    addNode,
    deleteNode,
}){
    return(
        <div>
            {/* =========================
          情報追加
            ========================= */}
            <div>
                <h3>情報を追加</h3>
                {/*新たなノード */}
                <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="追加する情報入力"
                />

                {/*接続先 */}
                <select 
                    velue={target}
                    onChange={(e) => setTarget(e.target.value)}
                >
                    {nodes.map((node) => (
                        <option 
                            key={node.id}
                            value={node.id}
                        >   
                            {node.id}
                        </option>
                    ))}
                </select>
                {/*追加ボタン */}
                <button onClick={addNode}>
                        追加
                </button>

            </div>

             {/* =========================
            情報削除
            ========================= */}
            <div>

                <h3>情報を削除</h3>

                {/*削除するノード */}
                <select 
                    value={deleteTarget}
                    onChange={(e) => setDeleteTarget(e.target.value)}
                >
                    {nodes.map((node) => (
                        <option
                         key={node.id}
                         value={node.id}
                         >
                            {node.id}
                         </option>
                    ))}
                </select>

                {/*削除するボタン */}
                <button onClick={deleteNode}>
                    削除
                </button>
            </div>
        </div>
    )
}

export default NodeForm