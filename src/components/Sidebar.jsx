import "./Sidebar.css";

const Sidebar = ({onAddNote, notes, onDeleteNote, activeNote, setActiveNote }) => {
    
    // notes配列の順番をmodDateを基準に降順にソートする
    // 数値的にプラスだと降順らしい。日にちが経てば経つほど数値が大きくなるとのこと
    const sortedNotes = notes.sort((a,b) => b.modDate - a.modDate)
    
    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>ノート</h1>
                <button onClick={onAddNote}>追加</button>
            </div>
            <div className="app-sidebar-notes">
                {/* sortedNotes配列を展開してそれぞれに代入 */}
                {sortedNotes.map((note) => (
                    <div 
                        // note.idとactiveNoteの値が一致する場合はclassNameにactiveを追加する
                        // activeNoteはuseState関数でsetActiveNotにはidの値が直接入っているからidを指しているのと同義
                        className={`app-sidebar-note ${note.id === activeNote && "active"}`} 
                        key={note.id} 
                        onClick={() => setActiveNote(note.id)}
                    >
                        <div className="sidebar-note-title">
                            <strong>{note.title}</strong>
                            {/* クリック時にonDeleteNote関数を実行。idを引数に渡す */}
                            <button onClick={() => onDeleteNote(note.id)}>削除</button>
                        </div>
                        <p>{note.content}</p>
                        {/* note.modDateの値を作成したオブジェクトに変換。さらに日本の時刻に変換している */}
                        <small>{new Date(note.modDate).toLocaleDateString("ja-JP",{
                            hour: "2-digit",
                            minute:"2-digit",
                        })}</small>
                    </div>
                ))} 
            </div>
        </div>
    )
}


export default Sidebar