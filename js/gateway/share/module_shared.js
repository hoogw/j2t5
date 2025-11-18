

            //import { JSONEditor } from 'https://unpkg.com/vanilla-jsoneditor@0.17.2/index.js'
            import { JSONEditor } from '../../../js/lib/new_jsoneditor/vanilla_jsoneditor_index.js'




            let content_json_root = {
            text: 'json_root', //undefined,
            json: {
                greeting: 'Hello World _field'
            }
            }


            // create the editor, see  https://github.com/josdejong/svelte-jsoneditor/tree/main
            editor_json_root = new JSONEditor({
                                        target: document.getElementById('json-root'),
                                        props: {
                                            content_json_root,
                                            mode: 'tree',     //'tree' | 'text' | 'table'. Open the editor in 'tree' mode (default)
                                            mainMenuBar: false, //false, // Show the main menu bar. Default value is true.
                                            navigationBar: false, //false, //Show the navigation bar with, where you can see the selected path and navigate through your document from there. Default value is true.
                                            statusBar: false, //false,
                                            readOnly: true,

                                            onChange: (updatedContent_subtype, previousContent_subtype, { contentErrors_subtype, patchResult_subtype }) => {
                                                // content is an object { json: JSONValue } | { text: string }
                                                console.log('onChange', { updatedContent_subtype, previousContent_subtype, contentErrors_subtype, patchResult_subtype })
                                                content_subtype = updatedContent_subtype
                                            }
                                            }
                                        })








