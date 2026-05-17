import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import uuid from "react-uuid"


function App() {
  // 状態変数を定義
  // 上が少し特殊でlocalStorageから"notes"をとってきているがJSON形式なのでJavascriptで作用するようにparseさせている。
  // ||はorを意味していてnotesが取得できればnotesを返すし、なければから配列を返す
  const [ notes, setNotes ] = useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [ activeNote, setActiveNote ] = useState(false)

  useEffect(() => {
    // ローカルストレージにノートを保存する
    // localStorageに"notes"を追加する。またnotesはJSON形式に変換される
    // notesが更新されるたびこの関数は呼び出される
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]) 
  
  // notesの最初の配列のidを引数としてsetActiveNote関数を呼び出す。空配列のためマウント時のみ作用
  useEffect(() => {
    setActiveNote((notes[0].id))
  },[]) 

  // onAddNote たぶんonClickのたびに呼び出される関数
  const onAddNote = () => {
    // 4つの要素を含んだオブジェクトが呼び出される
    const newNote = {
      id:uuid(),
      title:"新しいノート",
      content:"",
      modDate: Date.now(),
    }
    // setNotesに今までのnotes配列の最後にnewNoteを追加した新しい配列を返す
    setNotes([...notes, newNote])
  }

  // idが引数として渡される関数
  // この場合のidはonClickで呼ばれたnoteのidだと思われる
  const onDeleteNote = (id) => {
    // notes配列の1つ1つにnoteと命名して管理。
    // 渡されたidとnote.idが一致しない場合に抽出する
    const filterNotes = notes.filter((note) => note.id !== id );
    // 抽出されたdataをsetNotesに渡してuseStateを更新
    setNotes(filterNotes)
  }

  // notes配列の1つ1つをnoteと命名して管理。
  // findはtrueを抽出するからnote.idがactiveNoteとイコールならdataを抽出する
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  // ゲキムズポイントここから
  // updatedNoteは別の場所で仮引数なので子要素のオブジェクトが入る

  const onUpdateNote = (updatedNote) => {
    // updatedNotesArrayはnotes配列を1つ1つ展開してnoteと命名して
    // noteのidがupdateNoteのidと一致した倍に限りupdateNoteを返し
    // それ以外の場合はnoteを返す関数

    // updatedNoteにはこのオブジェクトが入る({...activeNote,[key]: value,modDate: Date.now(),})
    // これはactiveNoteの中身全部と動的keyの値、更新日時が含まれている
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id){
        // ...activeNoteとしている理由はここでupdatedNoteを返す必要があるから
        // activenote.idにするとここでid情報しか返らなくなってしまって他の情報が消えてしまう
        return updatedNote;
      } else {
        return note;
      }
    })
  // ゲキムズポイントここまで

    // 最終的にsetNotesに上記を渡してuseStateを更新
    setNotes( updatedNotesArray )
  }

  return (
    // 小要素にpropsを渡す
    <div className="App">
      <Sidebar 
        onAddNote={ onAddNote } 
        notes={ notes } 
        onDeleteNote={ onDeleteNote }
        activeNote={ activeNote }
        setActiveNote={ setActiveNote }
        />
      <Main 
        activeNote={ getActiveNote() } 
        onUpdateNote={ onUpdateNote }
        />
    </div>
  )
}

export default App
