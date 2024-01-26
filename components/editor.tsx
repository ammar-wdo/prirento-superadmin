
"use client"
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";



import { useEdgeStore } from "@/lib/edgestore";


// Our <Editor> component we can reuse later


type Props ={
    onChange :(value:string)=>void,
    initialContent?:string,
    editable?:boolean
}
export default function Editor({onChange,initialContent,editable}:Props) {




  
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




  return <div><BlockNoteView   editor={editor} /></div>;
}