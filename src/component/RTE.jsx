import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from 'tinymce'

const RTE = ({control,name,label}) => {
  return (
    <div>
       {label && <label className=''>{label}</label>}
       <Controller
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
            <Editor
              init={{
                selector: 'textarea#basic-example',
                height: 500,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
              }}
              onEditorChange={onChange}
            />
        )}
       />
    </div>
  )
}

export default RTE
