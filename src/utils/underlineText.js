import {
    ContentBlock,
    ContentState,
    EditorState,
    SelectionState,
  } from "draft-js";
  
  // Function to handle making text underline
  export const underlineTextHandler = (
    selectionState,
    contentState,
    block,
    text,
    blockKey,
    editorState
  ) => {
    // Create a new selection for the current block
    const blockSelection = selectionState.merge({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: text.indexOf(" ") + 1,
    });
  
    // Update the content state to apply underline formatting
    const updatedContentState = contentState.merge({
      blockMap: contentState.getBlockMap().merge({
        [blockKey]: block.merge({
          type: "block-underline",
          text: text.slice(4),
        }),
      }),
    });
  
    // Push the updated content state to the editor state
    const newEditorState = EditorState.push(
      editorState,
      updatedContentState,
      "change-block-data"
    );
  
    // Force selection to update the editor state with the new block selection
    return EditorState.forceSelection(newEditorState, blockSelection);
  };
  