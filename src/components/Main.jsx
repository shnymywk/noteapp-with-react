import "./Main.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const Main = ({ activeNote, onUpdateNote }) => {
  // 引数にkeyとvalueが与えられる関数でonUpdateNote関数を呼び出す
  const onEditNote = (key, value) => {
    // activeNoteオブジェクトの情報全てと動的なkey、今の日付を含んだオブジェクトを引数にもつ関数
    onUpdateNote({
      ...activeNote,
      [key]: value,
      modDate: Date.now(),
    })
  }
  
  // activeNoteのデータがない場合にreturnを返す
  if(!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input 
          id="title"
          type="text" 
          value={activeNote.title}
          // この値に変更があった場合にonEditNoteのtitleキーの値を変更する
          onChange={(e) => onEditNote("title", e.target.value)}
        />
        <textarea 
          id="content" 
          placeholder="ノート内容を記入" 
          value={activeNote.content}
          // この値に変更があった場合にonEditNoteのcontentキーの値を変更する
          onChange={(e) => onEditNote("content", e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        {/* reactのマークダウン方式を採用する */}
        <ReactMarkdown className="markdown-preview">{activeNote.content}</ReactMarkdown>
      </div>
    </div>
  )
}
export default Main