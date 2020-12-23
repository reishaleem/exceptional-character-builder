import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useField } from "formik";
import { useState } from "react";

interface Props extends IAllProps {
    content: string;
    onEditorChange: any;
}

export const RichTextEditor = ({ content, onEditorChange }: Props) => {
    return (
        <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={content}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                ],
                toolbar:
                    "formatselect | fontselect | bold italic underline | alignleft aligncenter alignright alignjustify | forecolor | lineheight | bullist numlist | help",
            }}
            onEditorChange={onEditorChange}
        />
    );
};
