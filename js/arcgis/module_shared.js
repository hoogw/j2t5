// warning : 
//  only for dynamic layers
//  this is NOT for ESRI folder hub use, 




            //import { JSONEditor } from 'https://unpkg.com/vanilla-jsoneditor@0.17.2/index.js'
            import { JSONEditor } from '../../js/lib/new_jsoneditor/vanilla_jsoneditor_index.js'

                

                                        let content_dynamicLayers_array = {
                                                                            text: 'dynamicLayers_array', //undefined,
                                                                            json: {
                                                                                greeting: 'Hello World _dynamicLayers_array'
                                                                            }
                                                                            }
                                                                
                                                                            
                                                                
                                        // create the editor
                                        editor_dynamicLayers_array = new JSONEditor({
                                                                        target: document.getElementById('jsoneditor_dynamicLayers_array'),
                                                                        props: {
                                                                            content_dynamicLayers_array,
                                                                            onChange: (updatedContent_dynamicLayers_array, previousContent_dynamicLayers_array, { contentErrors_dynamicLayers_array, patchResult_dynamicLayers_array }) => {
                                                                                // content is an object { json: JSONValue } | { text: string }
                                                                                console.log('onChange', { updatedContent_dynamicLayers_array, previousContent_dynamicLayers_array, contentErrors_dynamicLayers_array, patchResult_dynamicLayers_array })
                                                                                content_dynamicLayers_array = updatedContent_dynamicLayers_array
                                                                            }
                                                                            }
                                                                        })

