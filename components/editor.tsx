
"use client"

import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";


import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";


// Our <Editor> component we can reuse later


type Props ={
    onChange :(value:string)=>void,
    initialContent?:string,
    editable?:boolean
}
export default function Editor({onChange,initialContent,editable}:Props) {


const {resolvedTheme} = useTheme()

  
    const {edgestore} = useEdgeStore()

    const handleUpload = async(file:File)=>{

        const response = await edgestore.publicFiles.upload({file})

        return response.url

    }
    



  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange:(editor)=> {
        onChange(JSON.stringify(editor.topLevelBlocks,null,2))
    },
    uploadFile:handleUpload,

  });




  return <div><BlockNoteView theme={resolvedTheme ==='dark' ? 'dark' : 'light'}  editor={editor} /></div>;
}