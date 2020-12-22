import { Button } from "@material-ui/core";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";

export const RichTextEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    function handleKeyCommand(command: any, editorState: any) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return "handled";
        }

        return "not-handled";
    }

    function onBoldClick(e: any) {
        e.preventDefault();
        const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");

        if (newState) {
            setEditorState(newState);
            return "handled";
        }

        return "not handled";
    }

    return (
        <div style={{ border: "1px solid black" }}>
            <Button variant="contained" onClick={onBoldClick}>
                B
            </Button>
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
            />
        </div>
    );
};
