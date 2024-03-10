import {
    ContentBlock,
    ContentState,
    EditorState,
    SelectionState,
  } from "draft-js";
  
  /**
   * Function to handle creating highlighted text.
   * @param {SelectionState} selectionState - The current selection state in the editor.
   * @param {ContentState} contentState - The current content state in the editor.
   * @param {ContentBlock} block - The current content block in the editor.
   * @param {string} text - The text content of the block.
   * @param {string} blockKey - The key of the current content block.
   * @param {EditorState} editorState - The current editor state.
   * @returns {EditorState} - The updated editor state with the highlighted text.
   */
  export const highlightedTextHandler = (
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
  
    // Update the content state to apply highlighted formatting
    const updatedContentState = contentState.merge({
      blockMap: contentState.getBlockMap().merge({
        [blockKey]: block.merge({
          type: "block-highlighted",
          text: text.slice(3), // Remove the ``` prefix
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
  