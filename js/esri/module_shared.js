// warning : this is only for ESRI folder hub use, 
// not for dynamic layers

// knowing issue, editor not yet load completed, then server.html try to set json on it, cause error. 
// not fix, how to await json editor load completed, then run other code?


            //import { JSONEditor } from 'https://unpkg.com/vanilla-jsoneditor@0.17.2/index.js'
           import { JSONEditor } from '../../js/lib/new_jsoneditor/vanilla_jsoneditor_index.js'
           


            let content_json_root = {
            text: 'json_root', //undefined,
            json: {
                greeting: 'Hello World _field'
            }
            }

            let content_json_mapserver = {
            text: 'json_mapserver', //undefined,
            json: {
                greeting: 'Hello World _field'
            }
            }

            let content_json_layer = {
            text: 'json_layer', //undefined,
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



            editor_json_mapserver = new JSONEditor({
                                        target: document.getElementById('json-mapserver'),
                                        props: {
                                            content_json_mapserver,
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


            editor_json_layer = new JSONEditor({
                                        target: document.getElementById('json-layer'),
                                        props: {
                                            content_json_layer,
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







            let content_field = {
            text: 'field', //undefined,
            json: {
                greeting: 'Hello World _field'
            }
            }

            let content_subtype = {
            text: 'SubType', //undefined,
            json: {
                greeting: 'Hello World _subtype'
            }
            }
            let content_domain = {
            text: 'Combined Domain (single domain + nested subtype domain)', //undefined,
            json: {
                greeting: 'Hello World _domain'
            }
            }

            // create the editor, see  https://github.com/josdejong/svelte-jsoneditor/tree/main
            editor_field = new JSONEditor({
                                        target: document.getElementById('jsoneditor_field'),
                                        props: {
                                            content_field,
                                            mode: 'table',     //'tree' | 'text' | 'table'. Open the editor in 'tree' mode (default)
                                            mainMenuBar: false, // Show the main menu bar. Default value is true.
                                            navigationBar: false, //Show the navigation bar with, where you can see the selected path and navigate through your document from there. Default value is true.
                                            statusBar: false,
                                            readOnly: true,

                                            flattenColumns: true,  // table mode only
                                            onChange: (updatedContent_field, previousContent_field, { contentErrors_field, patchResult_field }) => {
                                                // content is an object { json: JSONValue } | { text: string }
                                                console.log('onChange', { updatedContent_field, previousContent_field, contentErrors_field, patchResult_field })
                                                content_field = updatedContent_field
                                            }
                                            }
                                        })

            editor_subtype = new JSONEditor({
                                        target: document.getElementById('jsoneditor_subtype'),
                                        props: {
                                            content_subtype,
                                            mode: 'tree',     //'tree' | 'text' | 'table'. Open the editor in 'tree' mode (default)
                                            mainMenuBar: false, // Show the main menu bar. Default value is true.
                                            navigationBar: false, //Show the navigation bar with, where you can see the selected path and navigate through your document from there. Default value is true.
                                            statusBar: false,
                                            readOnly: true,

                                            onChange: (updatedContent_subtype, previousContent_subtype, { contentErrors_subtype, patchResult_subtype }) => {
                                                // content is an object { json: JSONValue } | { text: string }
                                                console.log('onChange', { updatedContent_subtype, previousContent_subtype, contentErrors_subtype, patchResult_subtype })
                                                content_subtype = updatedContent_subtype
                                            }
                                            }
                                        })

            editor_domain = new JSONEditor({
                    target: document.getElementById('jsoneditor_domain'),
                    props: {
                                            content_domain,
                                            mode: 'tree',     //'tree' | 'text' | 'table'. Open the editor in 'tree' mode (default)
                                            mainMenuBar: false, // Show the main menu bar. Default value is true.
                                            navigationBar: false, //Show the navigation bar with, where you can see the selected path and navigate through your document from there. Default value is true.
                                            statusBar: false,
                                            readOnly: true,

                                            onChange: (updatedContent_domain, previousContent_domain, { contentErrors_domain, patchResult_domain }) => {
                                                // content is an object { json: JSONValue } | { text: string }
                                                console.log('onChange', { updatedContent_domain, previousContent_domain, contentErrors_domain, patchResult_domain })
                                                content_domain = updatedContent_domain
                                            }
                                            }
                                        })




