

/**/        
//  bootstrap 5 icon ,  color name and code see .css ,  https://icons.getbootstrap.com/#install
   
            var folder_icon = "" //"bi bi-folder2-open blue_green";
            var folder_fill_icon = "" //"bi bi-folder-fill blue_green";
            var folder_check_icon = "" //"bi bi-folder-check blue_green";
            var open_new_tab_icon = "" //"bi bi-box-arrow-up-right glaucous";
            var fieldNameAlias_icon = "" //"bi bi-cloud-moon glaucous";
            var fieldName_icon = "" //"bi bi-cloud-sun glaucous";
            var displayfieldName_icon = "" //"bi bi-cloud-sun-fill glaucous";
            var fieldType_icon = "" //"bi bi-box glaucous";
            var fieldDomain_icon = "" //"bi bi-droplet-half glaucous";
            var fieldRoot_icon = "" //"bi bi-brightness-high glaucous";

            /*
            //var yes_icon = "bi bi-check-square-fill moss_green";
            //var no_icon = "bi bi-x-circle black";

            svg
            https://icons.getbootstrap.com/icons/check-square-fill/
            https://icons.getbootstrap.com/icons/x-circle/

            */
            
            var yes_icon ='<svg fill="#00FF00" width="14px" height="14px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="green" d="M13 4.1974q0 .3097-.21677.5265L7.17806 10.329l-1.0529 1.0529q-.21677.2168-.52645.2168-.30968 0-.52645-.2168L4.01935 10.329 1.21677 7.5264Q1 7.3097 1 7t.21677-.5265l1.05291-1.0529q.21677-.2167.52645-.2167.30968 0 .52645.2167l2.27613 2.2839 5.07871-5.0864q.21677-.2168.52645-.2168.30968 0 .52645.2168l1.05291 1.0529Q13 3.8877 13 4.1974z"/></svg>'
            var no_icon = '<svg fill="#FF0000" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <rect x="0" fill="none" width="20" height="20"/> <g> <path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"/> </g> </svg>'
            var warning_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.88 111.54"><defs><style>.cls-1{fill:#cf1f25;}.cls-2{fill:#fec901;fill-rule:evenodd;}.cls-3{fill:#010101;}</style></defs><title>warning</title><path class="cls-1" d="M2.35,84.42,45.28,10.2l.17-.27h0A23,23,0,0,1,52.5,2.69,17,17,0,0,1,61.57,0a16.7,16.7,0,0,1,9.11,2.69,22.79,22.79,0,0,1,7,7.26q.19.32.36.63l42.23,73.34.24.44h0a22.48,22.48,0,0,1,2.37,10.19,17.63,17.63,0,0,1-2.17,8.35,15.94,15.94,0,0,1-6.93,6.6c-.19.1-.39.18-.58.26a21.19,21.19,0,0,1-9.11,1.75v0H17.61c-.22,0-.44,0-.65,0a18.07,18.07,0,0,1-6.2-1.15A16.42,16.42,0,0,1,3,104.24a17.53,17.53,0,0,1-3-9.57,23,23,0,0,1,1.57-8.74,7.66,7.66,0,0,1,.77-1.51Z"/><path class="cls-2" d="M9,88.75,52.12,14.16c5.24-8.25,13.54-8.46,18.87,0l42.43,73.69c3.39,6.81,1.71,16-9.33,15.77H17.61C10.35,103.8,5.67,97.43,9,88.75Z"/><path class="cls-3" d="M57.57,83.78A5.53,5.53,0,0,1,61,82.2a5.6,5.6,0,0,1,2.4.36,5.7,5.7,0,0,1,2,1.3,5.56,5.56,0,0,1,1.54,5,6.23,6.23,0,0,1-.42,1.35,5.57,5.57,0,0,1-5.22,3.26,5.72,5.72,0,0,1-2.27-.53A5.51,5.51,0,0,1,56.28,90a5.18,5.18,0,0,1-.36-1.27,5.83,5.83,0,0,1-.06-1.31h0a6.53,6.53,0,0,1,.57-2,4.7,4.7,0,0,1,1.14-1.56Zm8.15-10.24c-.19,4.79-8.31,4.8-8.49,0-.82-8.21-2.92-29.34-2.86-37.05.07-2.38,2-3.79,4.56-4.33a12.83,12.83,0,0,1,5,0c2.61.56,4.65,2,4.65,4.44v.24L65.72,73.54Z"/></svg>'
            var info_icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" fill="blue" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M61.44,0c33.926,0,61.44,27.514,61.44,61.44c0,33.926-27.514,61.439-61.44,61.439 C27.513,122.88,0,95.366,0,61.44C0,27.514,27.513,0,61.44,0L61.44,0z M79.42,98.215H43.46v-6.053h6.757v-36.96H43.46v-4.816h16.808 c4.245,0,8.422-0.51,12.549-1.551v43.328h6.604V98.215L79.42,98.215z M63.859,21.078c2.785,0,4.975,0.805,6.571,2.396 c1.579,1.59,2.377,3.771,2.377,6.581c0,2.848-1.358,5.381-4.093,7.601c-2.751,2.22-5.941,3.338-9.577,3.338 c-2.733,0-4.905-0.765-6.569-2.297c-1.665-1.551-2.497-3.556-2.497-6.05c0-3.143,1.358-5.853,4.059-8.152 C56.83,22.219,60.072,21.078,63.859,21.078L63.859,21.078z"/></g></svg>'
            var search_icon = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            var yellow_square_icon = '<svg fill="#FFFF00" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 6 6 L 6 26 L 26 26 L 26 6 L 6 6 z"/></svg>'
            var red_square_icon = '<svg fill="#FF0000" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 6 6 L 6 26 L 26 26 L 26 6 L 6 6 z"/></svg>'
            var pink_square_icon = '<svg fill="#FFC0CB" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 6 6 L 6 26 L 26 26 L 26 6 L 6 6 z"/></svg>'
            
            
            var usa_icon = '<svg xmlns="http://www.w3.org/2000/svg"  width="36" height="36"  viewBox="0 0 512 512" xml:space="preserve"> <path style="fill:#F5F5F5;" d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V385.38 	c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.621 	C512,105.443,494.833,88.276,473.655,88.276z"/> <g> 	<path style="fill:#FF4B55;" d="M2.109,114.08H509.89c-5.196-15.017-19.452-25.804-36.235-25.804H38.345 C21.561,88.276,7.306,99.063,2.109,114.08z"/> 	<rect y="191.49" style="fill:#FF4B55;" width="512" height="25.803"/> 	<rect y="139.88" style="fill:#FF4B55;" width="512" height="25.803"/> 	<path style="fill:#FF4B55;" d="M0,260.074c0,4.875,3.953,8.828,8.828,8.828H512v-25.804H0V260.074z"/> 	<rect y="346.32" style="fill:#FF4B55;" width="512" height="25.804"/> 	<path style="fill:#FF4B55;" d="M509.891,397.92H2.109c5.197,15.017,19.453,25.804,36.236,25.804h435.31 C490.439,423.724,504.694,412.937,509.891,397.92z"/> 	<rect y="294.71" style="fill:#FF4B55;" width="512" height="25.803"/> </g> <path style="fill:#41479B;" d="M8.828,268.902h220.69c4.875,0,8.828-3.953,8.828-8.828V97.103c0-4.876-3.953-8.828-8.828-8.828 	H38.345C17.167,88.276,0,105.443,0,126.621v133.453C0,264.95,3.953,268.902,8.828,268.902z"/> <g> 	<path style="fill:#F5F5F5;" d="M24.789,108.537l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.669 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928L24,122.841l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.669c-0.643-0.476-0.312-1.496,0.488-1.502l6.177-0.047l1.954-5.86C23.463,107.778,24.535,107.778,24.789,108.537z"/> 	<path style="fill:#F5F5F5;" d="M24.789,139.191l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928L24,153.496l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,138.433,24.535,138.433,24.789,139.191z"/> 	<path style="fill:#F5F5F5;" d="M24.789,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928L24,184.151l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,169.087,24.535,169.087,24.789,169.846z"/> 	<path style="fill:#F5F5F5;" d="M24.789,200.5l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928L24,214.805l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,199.741,24.535,199.741,24.789,200.5z"/> 	<path style="fill:#F5F5F5;" d="M24.789,231.154l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928L24,245.459l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C23.463,230.396,24.535,230.396,24.789,231.154z"/> 	<path style="fill:#F5F5F5;" d="M48.582,123.566l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.256,122.808,48.329,122.808,48.582,123.566z"/> 	<path style="fill:#F5F5F5;" d="M48.582,154.221l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.256,153.462,48.329,153.462,48.582,154.221z"/> 	<path style="fill:#F5F5F5;" d="M48.582,184.875l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.256,184.116,48.329,184.116,48.582,184.875z"/> 	<path style="fill:#F5F5F5;" d="M48.582,215.529l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C47.256,214.771,48.329,214.771,48.582,215.529z"/> 	<path style="fill:#F5F5F5;" d="M72.375,108.537l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.669 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.669c-0.643-0.476-0.312-1.496,0.488-1.502l6.177-0.047l1.954-5.86C71.049,107.778,72.122,107.778,72.375,108.537z"/> 	<path style="fill:#F5F5F5;" d="M72.375,139.191l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,138.433,72.122,138.433,72.375,139.191z"/> 	<path style="fill:#F5F5F5;" d="M72.375,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,169.087,72.122,169.087,72.375,169.846z"/> 	<path style="fill:#F5F5F5;" d="M72.375,200.5l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,199.741,72.122,199.741,72.375,200.5z"/> 	<path style="fill:#F5F5F5;" d="M72.375,231.154l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C71.049,230.396,72.122,230.396,72.375,231.154z"/> 	<path style="fill:#F5F5F5;" d="M96.169,123.566l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,122.808,95.916,122.808,96.169,123.566z"/> 	<path style="fill:#F5F5F5;" d="M96.169,154.221l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,153.462,95.916,153.462,96.169,154.221z"/> 	<path style="fill:#F5F5F5;" d="M96.169,184.875l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,184.116,95.916,184.116,96.169,184.875z"/> 	<path style="fill:#F5F5F5;" d="M96.169,215.529l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C94.842,214.771,95.916,214.771,96.169,215.529z"/> 	<path style="fill:#F5F5F5;" d="M119.962,108.537l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.669 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.591l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.669c-0.643-0.476-0.312-1.496,0.488-1.502l6.177-0.047l1.954-5.86C118.636,107.778,119.709,107.778,119.962,108.537z"/> 	<path style="fill:#F5F5F5;" d="M119.962,139.191l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,138.433,119.709,138.433,119.962,139.191z"/> 	<path style="fill:#F5F5F5;" d="M119.962,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.593l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,169.087,119.709,169.087,119.962,169.846z"/> 	<path style="fill:#F5F5F5;" d="M119.962,200.5l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,199.741,119.709,199.741,119.962,200.5z"/> 	<path style="fill:#F5F5F5;" d="M119.962,231.154l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.026-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C118.636,230.396,119.709,230.396,119.962,231.154z"/> 	<path style="fill:#F5F5F5;" d="M143.755,123.566l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,122.808,143.502,122.808,143.755,123.566z"/> 	<path style="fill:#F5F5F5;" d="M143.755,154.221l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,153.462,143.502,153.462,143.755,154.221z"/> 	<path style="fill:#F5F5F5;" d="M143.755,184.875l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,184.116,143.502,184.116,143.755,184.875z"/> 	<path style="fill:#F5F5F5;" d="M143.755,215.529l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C142.43,214.771,143.502,214.771,143.755,215.529z"/> 	<path style="fill:#F5F5F5;" d="M167.549,108.537l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.669 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.669c-0.643-0.476-0.312-1.496,0.488-1.502l6.177-0.047l1.954-5.86C166.222,107.778,167.296,107.778,167.549,108.537z"/> 	<path style="fill:#F5F5F5;" d="M167.549,139.191l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,138.433,167.296,138.433,167.549,139.191z"/> 	<path style="fill:#F5F5F5;" d="M167.549,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,169.087,167.296,169.087,167.549,169.846z"/> 	<path style="fill:#F5F5F5;" d="M167.549,200.5l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,199.741,167.296,199.741,167.549,200.5z"/> 	<path style="fill:#F5F5F5;" d="M167.549,231.154l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C166.222,230.396,167.296,230.396,167.549,231.154z"/> 	<path style="fill:#F5F5F5;" d="M191.342,123.566l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,122.808,191.089,122.808,191.342,123.566z"/> 	<path style="fill:#F5F5F5;" d="M191.342,154.221l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,153.462,191.089,153.462,191.342,154.221z"/> 	<path style="fill:#F5F5F5;" d="M191.342,184.875l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,184.116,191.089,184.116,191.342,184.875z"/> 	<path style="fill:#F5F5F5;" d="M191.342,215.529l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C190.016,214.771,191.089,214.771,191.342,215.529z"/> 	<path style="fill:#F5F5F5;" d="M215.136,108.537l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.669 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.466-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.669c-0.643-0.476-0.312-1.496,0.488-1.502l6.177-0.047l1.954-5.86C213.81,107.778,214.882,107.778,215.136,108.537z"/> 	<path style="fill:#F5F5F5;" d="M215.136,139.191l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,138.433,214.882,138.433,215.136,139.191z"/> 	<path style="fill:#F5F5F5;" d="M215.136,169.846l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.165-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,169.087,214.882,169.087,215.136,169.846z"/> 	<path style="fill:#F5F5F5;" d="M215.136,200.5l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.027,0.488,1.502l-4.969,3.67l1.864,5.889 c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889l-4.969-3.67 c-0.643-0.474-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,199.741,214.882,199.741,215.136,200.5z"/> 	<path style="fill:#F5F5F5;" d="M215.136,231.154l1.954,5.86l6.177,0.047c0.8,0.007,1.131,1.026,0.488,1.502l-4.969,3.67 l1.864,5.889c0.242,0.762-0.627,1.394-1.278,0.928l-5.025-3.592l-5.025,3.592c-0.651,0.465-1.518-0.166-1.278-0.928l1.864-5.889 l-4.969-3.67c-0.643-0.476-0.312-1.495,0.488-1.502l6.177-0.047l1.954-5.86C213.81,230.396,214.882,230.396,215.136,231.154z"/> </g> </svg>'
            var euro_icon = '<svg height="40" width="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 	 viewBox="0 0 512 512" xml:space="preserve"> <path style="fill:#41479B;" d="M473.655,88.275H38.345C17.167,88.275,0,105.442,0,126.62V385.38 	c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.62 	C512,105.442,494.833,88.275,473.655,88.275z"/> <g> 	<path style="fill:#FFE15A;" d="M259.59,126.684l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C257.187,125.31,259.132,125.31,259.59,126.684z"/> 	<path style="fill:#FFE15A;" d="M259.59,354.547l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C257.187,353.172,259.132,353.172,259.59,354.547z"/> 	<path style="fill:#FFE15A;" d="M373.521,240.615l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C371.118,239.242,373.063,239.242,373.521,240.615z"/> 	<path style="fill:#FFE15A;" d="M145.658,240.615l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C143.256,239.242,145.201,239.242,145.658,240.615z"/> 	<path style="fill:#FFE15A;" d="M162.762,181.119l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C160.36,179.745,162.303,179.745,162.762,181.119z"/> 	<path style="fill:#FFE15A;" d="M360.096,295.05l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.382-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C357.694,293.677,359.638,293.677,360.096,295.05z"/> 	<path style="fill:#FFE15A;" d="M318.395,139.417l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.102,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.087l3.54-10.613C315.992,138.044,317.935,138.044,318.395,139.417z"/> 	<path style="fill:#FFE15A;" d="M204.463,336.753l3.54,10.613l11.187,0.087c1.449,0.011,2.049,1.859,0.884,2.72l-9,6.646 l3.374,10.666c0.437,1.38-1.135,2.524-2.314,1.681l-9.101-6.506l-9.101,6.506c-1.178,0.842-2.751-0.3-2.314-1.681l3.374-10.666 l-9-6.646c-1.165-0.861-0.565-2.709,0.884-2.72l11.187-0.086l3.54-10.613C202.061,335.378,204.006,335.378,204.463,336.753z"/> 	<path style="fill:#FFE15A;" d="M357.236,181.119l-3.54,10.613l-11.187,0.087c-1.449,0.011-2.049,1.859-0.884,2.72l9,6.646 l-3.374,10.666c-0.437,1.38,1.135,2.524,2.314,1.681l9.101-6.506l9.101,6.506c1.178,0.842,2.751-0.3,2.314-1.681l-3.374-10.666 l9-6.646c1.165-0.861,0.565-2.709-0.884-2.72l-11.187-0.087l-3.54-10.613C359.638,179.745,357.694,179.745,357.236,181.119z"/> 	<path style="fill:#FFE15A;" d="M159.902,295.05l-3.54,10.613l-11.187,0.087c-1.449,0.011-2.049,1.859-0.884,2.72l9,6.646 l-3.374,10.666c-0.437,1.382,1.135,2.524,2.314,1.681l9.101-6.506l9.101,6.506c1.178,0.842,2.751-0.3,2.314-1.681l-3.374-10.666 l9-6.646c1.165-0.861,0.565-2.709-0.884-2.72l-11.187-0.087l-3.54-10.613C162.303,293.677,160.36,293.677,159.902,295.05z"/> 	<path style="fill:#FFE15A;" d="M201.603,139.417l-3.54,10.613l-11.187,0.087c-1.449,0.011-2.049,1.859-0.884,2.72l9,6.646 l-3.374,10.666c-0.437,1.38,1.135,2.524,2.314,1.681l9.101-6.506l9.101,6.506c1.178,0.842,2.751-0.3,2.314-1.681l-3.374-10.666 l9-6.646c1.165-0.861,0.565-2.709-0.884-2.72l-11.187-0.087l-3.54-10.613C204.004,138.044,202.061,138.044,201.603,139.417z"/> 	<path style="fill:#FFE15A;" d="M315.534,336.753l-3.54,10.613l-11.187,0.087c-1.449,0.011-2.049,1.859-0.884,2.72l9,6.646 l-3.374,10.666c-0.437,1.38,1.135,2.524,2.314,1.681l9.101-6.506l9.101,6.506c1.178,0.842,2.751-0.3,2.314-1.681l-3.374-10.666 l9-6.646c1.165-0.861,0.565-2.709-0.884-2.72l-11.187-0.086l-3.54-10.613C317.935,335.378,315.992,335.378,315.534,336.753z"/> </g> </svg>'

            // html unicode, you can change color with span css, seems not work.
            //var yes_icon ='<span style="color: lime;">&#128077;</span>'
            //var no_icon = '&#9940;'



            var mapservice_icon = "bi bi-layers" //"bi bi-folder-plus"
            var GroupLayer_icon = "bi bi-layers-half"
            var polygon_icon = "bi bi-pentagon" // "bi bi-heptagon"
            var line_icon = "bi bi-slash-lg"
            var point_icon = "bi bi-geo-alt"
            var layer_icon = "bi bi-play-btn cadmium_green";
            var table_icon = "bi bi-table";
            var coming_icon = "bi bi-exclamation-circle blue_green";

            // -123 means void, blank icon, for everything other than map-server, feature-server, feature-layer
            var VectorTileServer_icon = "bi bi-map-fill"
            var ImageServer_icon = "bi bi-images"
            var SceneServer_icon = "bi bi-map"
            var GeocodeServer_icon = "bi bi-cursor" //"bi bi-pin-map"
            var NAServer_icon = "bi bi-sign-turn-right"
            var unknow_server_icon = "bi bi-stack"

            var AnnotationLayer_icon = "bi bi-play-fill taupe"
            var RasterLayer_icon = "bi bi-file-earmark-image"
            var RasterCatalogLayer_icon = "bi bi-heptagon"
            var MosaicLayer_icon = "bi bi-play-fill taupe"
            var unknow_layer_icon = "bi bi-layers-fill"
            var unknow_geometry_icon = "bi bi-triangle"
//  - end - bootstrap 5 icon ,
/**/


// https://spatialreference.org/ref/epsg/4362/,   must add '/' at the end
var epsg_link = 'https://spatialreference.org/ref/epsg/'   
var esri_link = 'https://spatialreference.org/ref/esri/' 

var currentVersion = '0.0'


var _support_dynamic_layers = true 

var detail_panel_status = true;
var _html_for_message_icon = ''
var _html_for_more_info_icon  = ''


var raw_mapserver  // global var  mapserver json
var raw_singleServer

// legend
var mapserver_legend







// top level folder jstree
var folder_structure_flatjson= [];

// 2nd level service (mapserver) jstree
var mapserver_flatjson = [];


// 3nd level icon jstree
var icon_flatjson = [];



var iconJstreeNodeOpened =  false; // true is expanded all,  false is collapse all 
var iconJstreeforceOpen = true;

;





        /**/
        //  ... ... .. ... subtype domain ... ... .. ( new jsoneditor, https://github.com/josdejong/svelte-jsoneditor/issues/265,   https://jsbin.com/yuwapaj/edit?html,output)
        /**/

        
                    var editor_json_root
                    var editor_json_mapserver
                    var editor_json_layer


                    // jsoneditor
                    var editor_field
                    var editor_subtype
                    var editor_domain
        
        /**/
        //  ... end ... ... .. ... subtype domain ... ... ..
        /**/



                /**/
                // ~~~~~~~~~~~~ server info, layer info, legend , layer-fields etc... ~~~~~~~~~~~~~~~~~
                /**/


// original from folder.js 2nd level - fn jstree_mapserver
async function get_mapserver_info_html(mapserver_url){

    var _html_for_more_info_mapserver  = '' // for more_info
    var _html_thumbnail_for_mapserver  = '' // thumbnail
    var _thumbnail_for_mapserver_url = ''
    

    //  ...  ...  ...  ...  ...  thumbnail for mapserver ...  ...  ...  ...  ...  ...  ... 
        /*

                Check if image exists on server using JavaScript
                https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript


                jquery how to check response type for ajax call
                https://stackoverflow.com/questions/3741574/jquery-how-to-check-response-type-for-ajax-call


                <img class="fit-picture"
                    src="https://gis.la-quinta.org/arcgis/rest/services/Community_and_economic/school_district/MapServer/info/thumbnail"
                    alt="thumbnail for mapserver">
        */

        _thumbnail_for_mapserver_url = mapserver_url + '/info/thumbnail'

        $.get(_thumbnail_for_mapserver_url)
                .done(function(response, status, xhr) {

                    var content_type = xhr.getResponseHeader("content-type") || "";

                    if (content_type.indexOf('json') > -1) {
                        // handle json here
                    } 

                    if (content_type.indexOf('image/png') > -1) {
                            // Do something now you know the image exists.
                            _html_thumbnail_for_mapserver = '<img  width="100%"  src="' + _thumbnail_for_mapserver_url + '" alt="thumbnail for mapserver">'                                            
                            $('#thumbnail_for_mapserver').html(_html_thumbnail_for_mapserver);
                    } else {

                            // Image is blank empty, with 200 success response
                            $('#thumbnail_for_mapserver').html('');
                    }


                }).fail(function() { 
                    // Image doesn't exist - do something else.
                    $('#thumbnail_for_mapserver').html('');
                })

    //  ...  ... end ...  ...  ...  thumbnail for mapserver ...  ...  ...  ...  ...  ...  ... 


    _html_for_more_info_mapserver    += '</fieldset>'

   

  
       // for 3 panel, already have raw map server json loaded, no need reload here, 
       // but for 2 panel, did not load, must re-load again 
    var mapServerRootJson = await arcgis_ajax_cross_origin(mapserver_url, 'cors');
   
    
    console.log('get mapserver info html ', mapServerRootJson)



    _html_for_more_info_mapserver    += '<fieldset>'
    _html_for_more_info_mapserver    +=  '<legend>'
    _html_for_more_info_mapserver    +=    '<span>Capabilities(' + mapServerRootJson.capabilities + ')</span>'
    _html_for_more_info_mapserver    +=  '</legend>'


    /**/
    // # # # # # # dynamic layer # # # # # #

    
        if (mapServerRootJson){

           

            if (mapServerRootJson.serviceDescription){
                _html_for_more_info_mapserver    +=  '<span>Service-Description(' + mapServerRootJson.serviceDescription + ')</span>'
                _html_for_more_info_mapserver    +=  ', '
                _html_for_more_info_mapserver    +=  '</br>'
            } 
            
            

            //_html_for_more_info_mapserver    +=  '</br>'

            if (mapServerRootJson.hasOwnProperty("supportsDynamicLayers")){
                _html_for_more_info_mapserver    += yes_icon +  '<span>Dynamic-Layers(Yes)</span>'
                _support_dynamic_layers = true
            } else {
                _html_for_more_info_mapserver    += no_icon + '<span>Dynamic-Layers(No)</span>'
                _support_dynamic_layers = false
            }
        }
    // # # #  end  # # # dynamic layer # # # # # #
    /**/

    

    /**/
    //  = = = = =  tile  = = = = =  Yes  = = = = =   or  = = = = =  No = = = = =
    /*
        Warning: .capabilities is not accurate,
            for example 'usgs pad' have tile, but does not have 'tilemap' in their capability. 

        for MapServer, FeatureServer, only  "capabilities": "Data,Map,Query,Tilemap",
        for ImageServer only "capabilities": "Image,Mensuration,Metadata,Tilemap",

        Tilemap : means tile is available
        Map or Image : means image is available
        Query :  featureServer only have 'Query', both image and tile are not available
    */
    if (mapServerRootJson){

        var _capabilities = mapServerRootJson.capabilities 
        console.log('map server capabilities could be for mapserver and featureserver is(Data,Map,Query,Tilemap), for imageserver is(Image,Mensuration,Metadata) ', _capabilities )
        var _singleFusedMapCache = mapServerRootJson.singleFusedMapCache 
        console.log('map server singleFusedMapCache true or false or undefined', _singleFusedMapCache )
        console.log('  = = = = =  tile  = = = = =  Yes  = = = = =   or  = = = = =  No = = = = =  ', _singleFusedMapCache)
    
        if ((mapServerRootJson.hasOwnProperty('singleFusedMapCache'))){ 
            // single fused map cache could be 'true' 'false' or 'undefined'
            if (mapServerRootJson.singleFusedMapCache == true){  
                    // true, tile available
                    _html_for_more_info_mapserver    +=  ', ' + yes_icon +  '<span>Tile(Yes, Note:No Maplex Dynamic Labeling)</span>'                                                         
            } else {
                    // false, disable tile
                    _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Tile(No)</span>'
            }//if
        } else {
            //'undefined' disable tile
            _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Tile(No)</span>'
        }

        

        if (_capabilities){ 
            if ( (!(_capabilities.includes('Map'))) &&  (!(_capabilities.includes('Image')))  ) {
                // disable image
                _html_for_more_info_mapserver    +=  ', ' + no_icon +  '<span>Map-Image(No)</span>'
            } else {
                _html_for_more_info_mapserver    +=  ', ' + yes_icon +   '<span>Map-Image(Yes)</span>'
            }
        }


    }//if
    //   = = = = =   end    = = = = =  tile  = = = = =  Yes  = = = = =   or  = = = = =  No = = = = =  
    /**/  

     

    /**/
    //   = = = = =   others  = = = = =  = = = = =

    if (mapServerRootJson){

        if (mapServerRootJson.maxRecordCount){
        _html_for_more_info_mapserver    +=  ', ' +  '<span>Max-Return-Items</span>' + '<mark>'  + mapServerRootJson.maxRecordCount + '</mark>'
        } 


        


        // fix, vectorTileServer, no layers,
        if (mapServerRootJson.hasOwnProperty('layers')){
            if (mapServerRootJson.layers.length){
                if (mapServerRootJson.layers[0].hasOwnProperty('supportsDynamicLegends')){                                  
                        _html_for_more_info_mapserver    +=  ', ' + yes_icon + 'Dynamic-Legend(Yes)</span>'
                } else {
                        _html_for_more_info_mapserver    +=  ', ' + no_icon + 'Dynamic-Legend(No)</span>'
                }
            }
        }

        

        if (mapServerRootJson.supportsClipping){
        _html_for_more_info_mapserver    +=  ', ' + yes_icon + '<span>Clipping-Image(Yes)</span>'
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Clipping-Image(No)</span>'
        }

        

        if (mapServerRootJson.supportsSpatialFilter){
        _html_for_more_info_mapserver    +=  ', ' + yes_icon + '<span>Spatial-Filter-Image(Yes)</span>'
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Spatial-Filter-Image(No)</span>'
        }

        

        if (mapServerRootJson.supportsTimeRelation){
        _html_for_more_info_mapserver    +=  ', ' + yes_icon +  '<span>Time-Relation(Yes)</span>' 
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Time-Relation(No)</span>' 
        }

        

        if (mapServerRootJson.supportsQueryDataElements){
        _html_for_more_info_mapserver    +=  ', ' + yes_icon + '<span>Query-Data-Elements(Yes)</span>'  
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Query-Data-Elements(No)</span>' 
        }

        

        if (mapServerRootJson.supportsDatumTransformation){
        _html_for_more_info_mapserver    +=  ', ' + yes_icon + '<span>Datum-Transformation(Yes)</span>'  
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon +  '<span>Datum-Transformation(No)</span>'  
        }

        

        if (mapServerRootJson.resampling){
        _html_for_more_info_mapserver    +=  ', ' + yes_icon + '<span>Resampling(Yes)</span>'  
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Resampling(No)</span>'  
        }

        

        if (mapServerRootJson.maxImageHeight){
        _html_for_more_info_mapserver    +=  ', ' + '<span>Max-Image-Height(' + mapServerRootJson.maxImageHeight + ')</span>'
        } 

        

        if (mapServerRootJson.maxImageWidth){
        _html_for_more_info_mapserver    +=  ', ' + '<span>Max-Image-Width(' + mapServerRootJson.maxImageWidth + ')</span>'
        } 

        

        if (mapServerRootJson.supportedExtensions){
        _html_for_more_info_mapserver    +=  ', ' + '<span>Supported-Extensions(' + mapServerRootJson.supportedExtensions + ')</span>'
        } else {
        _html_for_more_info_mapserver    +=  ', ' + no_icon + '<span>Supported-Extensions(No)</span>'
        } 





       







        _html_for_more_info_mapserver    += '</fieldset>'

        //_html_for_more_info_mapserver    += '<br>'
        //_html_for_more_info_mapserver    += '<br>'

    }//if
    // = = = = =   end  = = = = =   others  = = = = =  = = = = =
    /**/






 /**/
    //   = = = = =   locator  = = = = =  = = = = =
    /**/
   
    var _html_for_locator_geocodeserver = ''
    if ((mapServerRootJson) && (mapserver_url.includes("GeocodeServer"))){
       console.log(' only for locator ', mapServerRootJson)


        
        

        _html_for_locator_geocodeserver    += '<fieldset>'
          


        // composite locator or not
        if (mapServerRootJson.locators){

            // composite locator
            _html_for_locator_geocodeserver    +=  '<legend>'
            _html_for_locator_geocodeserver    +=   '<span>Composite-Locator-' + (mapServerRootJson.locators.length) + '</span>'
            _html_for_locator_geocodeserver    +=  '</legend>'

            _html_for_locator_geocodeserver    +=  '<span><b>Locator</b> chain(in order):'
            _html_for_locator_geocodeserver    += '<br>' 

            
            for (let i = 0; i < mapServerRootJson.locators.length; i++) {
                _html_for_locator_geocodeserver   += yes_icon
                _html_for_locator_geocodeserver    += "#"+ (i+1) + "." +  mapServerRootJson.locators[i].name
                _html_for_locator_geocodeserver    += ', '
            }//for
            _html_for_locator_geocodeserver    +=  '</span>' 
            _html_for_locator_geocodeserver    += '<br>' 

        } else {

            // single locator
            

            //  . . . ArcPro or ArcMap, always at top, no line break   . . . 
            if (mapServerRootJson.locatorProperties.LocatorVersion){
                _html_for_locator_geocodeserver    +=  '<legend>'
                _html_for_locator_geocodeserver    +=      '<span><b>ArcPro</b> Locator Version(<b>' + mapServerRootJson.locatorProperties.LocatorVersion + '</b>)</span>'
                _html_for_locator_geocodeserver    +=  '</legend>'

                _html_for_locator_geocodeserver    += warning_icon + '<span>Warning: search address by no. not allowed in ArcPro locator, add at least 1st letter of street name</span>'
                _html_for_locator_geocodeserver   += '<br>'
            } else {
                _html_for_locator_geocodeserver    +=  '<legend>'
                _html_for_locator_geocodeserver    +=       '<span><b>ArcMap</b> Locator</span>'
                _html_for_locator_geocodeserver    +=  '</legend>'

                _html_for_locator_geocodeserver    += yes_icon + '<span>ArcMap allow search addr no.</span>'
                _html_for_locator_geocodeserver   += '<br>'
            }// locatorProperties 
            //   . . . end . . . ArcPro or ArcMap, always at top, no line break   . . . 



      }// composite locator or not
            



            //   . . . categories    . . . 
            if (mapServerRootJson.categories){

                
                 /*
                //_html_for_locator_geocodeserver   += info_icon
                //_html_for_locator_geocodeserver    += '<b>Categories</b>-' + (mapServerRootJson.categories.length) + ':{ '
                for (let j = 0; j < mapServerRootJson.categories.length; j++) {
                    _html_for_locator_geocodeserver    += "#"+ (j+1) + ":" +  mapServerRootJson.categories[j].name
                    _html_for_locator_geocodeserver    += ', '
                }//for
                _html_for_locator_geocodeserver    += ' }'
                */
                _html_for_locator_geocodeserver    += '<b>Categories:</b>'



                _html_for_locator_geocodeserver   += '<br>'
                
                
                for (let j = 0; j < mapServerRootJson.categories.length; j++) {

                   
                    _html_for_locator_geocodeserver    += yes_icon + "Role#"+ (j+1) + ":<b>" +  mapServerRootJson.categories[j].name + "</b>"


                    // p-a-r-c-e-l category don't have sub-category
                    if (mapServerRootJson.categories[j].categories){

                        _html_for_locator_geocodeserver    += "{Cat.( "

                        for (let k = 0; k < mapServerRootJson.categories[j].categories.length; k++) {
                            _html_for_locator_geocodeserver    += mapServerRootJson.categories[j].categories[k].name
                            _html_for_locator_geocodeserver    += ', '
                        }//for

                        _html_for_locator_geocodeserver    += ' )'
                        _html_for_locator_geocodeserver    += ' }'

                    }//if

                    
                    _html_for_locator_geocodeserver   += '<br>'

                }//for



                // fake street address warning 
                var fake_address_found = false
                
                for (let f = 0; f < mapServerRootJson.categories.length; f++) {

                    // p-a-r-c-e-l category don't have sub-category
                    if (mapServerRootJson.categories[f].categories){

                        for (let h = 0; h < mapServerRootJson.categories[f].categories.length; h++) {
                        if (mapServerRootJson.categories[f].categories[h].name == "Street Address"){
                            _html_for_locator_geocodeserver   += warning_icon + '<span>Warning: fake street address</span>'
                            fake_address_found = true
                            _html_for_locator_geocodeserver   += '<br>'
                            break;
                            }
                        }//for

                    }//if
                }//for
                if (!(fake_address_found)){
                   //_html_for_locator_geocodeserver   += info_icon + '<span>street address (estimated,may not real)  NOT present</span>'
                }
               // _html_for_locator_geocodeserver   += '<br>'
                // - -  end  - -  fake street address warning 





            }// categories  
            //   . . . end   . . . categories    . . . 


           


            //   . . . street intersection    . . .

            _html_for_locator_geocodeserver    += "<b>Search cross street:</b>"
            _html_for_locator_geocodeserver    += "</br>" 
            if (mapServerRootJson.locatorProperties.IntersectionConnectors){
                 _html_for_locator_geocodeserver    += yes_icon + "use customized:[ <b>" + mapServerRootJson.locatorProperties.IntersectionConnectors 
            } else {
                 //https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/fundamentals-of-intersection-geocoding.htm

                 if (fake_address_found){
                          _html_for_locator_geocodeserver  += yes_icon + "Use Default:[ <b>" + '&, |, \\, and, at' 
                 } else {
                          _html_for_locator_geocodeserver  += warning_icon + "Either Not Available or Use Default:[ <b>" + '&, |, \\, and, at' 
                 }
            }
            _html_for_locator_geocodeserver += "</b> ]between 2 street name"
            _html_for_locator_geocodeserver   += '<br>'
            //   . . . end   . . . street intersection    . . .
            
            
  










        if (mapServerRootJson.capabilities){
            //_html_for_locator_geocodeserver    += '<span><b>Capabilities</b>(' + mapServerRootJson.capabilities + ')</span>'
            _html_for_locator_geocodeserver    += '<span><b>Locator capabilities:</b></span>'
            //_html_for_locator_geocodeserver    += ', '
            _html_for_locator_geocodeserver   += '<br>'
        
            if (mapServerRootJson.capabilities.includes("Geocode")){
                _html_for_locator_geocodeserver    += yes_icon + '<span>Geocode(convert Address to Lat-Lng) Yes</span>'
                _html_for_locator_geocodeserver    += ', '
            } else {
                _html_for_locator_geocodeserver    += no_icon + '<span>Geocode(convert Address to Lat-Lng) No</span>'
                _html_for_locator_geocodeserver    += ', '
            }

            _html_for_locator_geocodeserver   += '<br>'

            if (mapServerRootJson.capabilities.includes("ReverseGeocode")){
                _html_for_locator_geocodeserver    += yes_icon + '<span>ReverseGeocode(convert Lat-Lng to Address) Yes</span>'
                _html_for_locator_geocodeserver    += ', '
            } else {
                _html_for_locator_geocodeserver    += no_icon + '<span>ReverseGeocode(convert Lat-Lng to Address) No</span>'
                _html_for_locator_geocodeserver    += ', '
            }

            _html_for_locator_geocodeserver   += '<br>'

            if (mapServerRootJson.capabilities.includes("Suggest")){
                _html_for_locator_geocodeserver    += yes_icon + '<span>Suggest(search POI, common-name, address...) Yes</span>'
                _html_for_locator_geocodeserver    += ', '
            } else {
                _html_for_locator_geocodeserver    += no_icon + '<span>Suggest(search POI, common-name, address...) No</span>'
                _html_for_locator_geocodeserver    += ', '
            }

        }// capability 


        _html_for_locator_geocodeserver    += '</fieldset>'


    
    }//if

    

    /**/
    //   = = = = =    end  = = = = =  locator  = = = = =  = = = = =
    /**/

   


    
    /**/
    //   = = = = =   f=json  = = = = =  = = = = =
    /**/
    var _html_for_f_json = ''
    _html_for_f_json += '<br>'
    _html_for_f_json += '<a target="_blank" id="_mapserver_link2" href="'+  mapserver_url + '?f=json" style="font-size:xx-small; font-weight: lighter;">'
    _html_for_f_json +=    mapserver_url + '?f=json' 
    _html_for_f_json += '</a>'
                
    // must show, because it often hidden if user click item on parent panel
    $("#json-mapserver").show();
    console.log('e d i t o r _ j s o n _ m a p s e r v e r ,  mapServerRootJson :', mapServerRootJson)
    if (editor_json_mapserver){
      editor_json_mapserver.set({json:mapServerRootJson})
    }
    

    
    /**/
    //   = = = = =    end   = = = = =   f=json  = = = = =  = = = = =
    /**/




    // render other first, lastly render coordinate system because it need ajax
     $('#message_more_info_mapserver').html(_html_for_locator_geocodeserver + _html_for_more_info_mapserver + _html_for_f_json);









            /*   coordinate system 


            *   1) latestWkid (EPSG)  : I normally use this to look up detais at https://spatialreference.org
            *   2) wkt : well-know-text, if no wkid, wkt string will be used, as custom-coordinate-system, it is text string.
            *   3) wkid : not sure, where to look up details.   
            * 
            *    ESRI doc
            *    https://developers.arcgis.com/web-map-specification/objects/spatialReference/
            * 
            *    
            *   
            * 
            *    There are 4 groups of authorities
            *          1) EPSG  (4362)  not use 
            *                              look up wkid from EPSG   https://spatialreference.org/ref/epsg/3857/prettywkt/'
            *                              need ajax, some ESRI wkid are missing,  
            * 
            *          2) ESRI  (447) in use
            *                             look up wkid for ESRI  
            *                                               https://localhost:3200/esri_wkid/3857
            * 
            *                                        To update library go here: 
            *                                                    https://www.npmjs.com/package/@esri/proj-codes
            *                                                    https://github.com/Esri/projection-engine-db-doc#readme
            *                              guarantee ESRI wkid found, no missing, 
            * 
            * 
            *          3) IAU2000 (2380)
            *          4) spatialreference.org (2717)
            * 
            * 
            *   Example:

                    102100 [Esri:] ->   3857 [EPSG:] WGS_1984_Web_Mercator_Auxiliary_Sphere

                    pcs: projected-coord-sys
                        vcs: vertical-coord-sys
                        gcs: geographic-coord-sys
                        gtf: geographic transformation
                        dat: datum
                        vdt: vertical datum
                        lin: linear unit
                        sph: spheroid
                        vtf: vertical transformation
            * 
            */
            
    if (mapServerRootJson){ 
        if (mapServerRootJson.spatialReference){

            var _html_coordinate_system = ''
                            
            
            _html_coordinate_system += '<fieldset>'
            _html_coordinate_system +=  '<legend>'
            _html_coordinate_system +=   'Coordinate System'
            _html_coordinate_system +=  '</legend>'
           





            /**/
            // ============  vertical-coord-sys  ============  vcsWkid  ============ latestWkid  ============

            var _vcsWkid  // esri
            var _latestVcsWkid // euro

            if (mapServerRootJson.spatialReference.vcsWkid){

                _vcsWkid = mapServerRootJson.spatialReference.vcsWkid
                _latestVcsWkid = mapServerRootJson.spatialReference.latestVcsWkid

                   

                    // ------- ESRI vcsWkid: sync-version  -------
                    var _esri_vcsWkid_lookup_url ='https://spatialreference.org/ref/esri/' + _vcsWkid    // look up wkid from EPSG   https://spatialreference.org/
                    var ___url_getJson = _esri_vcsWkid_lookup_url + '/esriwkt.txt'
                    console.log('esri vcsWkid lookup ', ___url_getJson)
                    var _custom_timeout = 9000
                    var _customized_datatype = 'text'
                    console.log('ajax (timeout) ',___url_getJson, _custom_timeout)
                    $.ajax({
                        timeout: _custom_timeout,
                        url: ___url_getJson,
                        type : 'GET',
                        dataType: _customized_datatype,

                        error: function (error_1) { 
                                console.log('ajax_error_1 ',error_1)
                                // ESRI not found or website is not available
                                
                                _html_coordinate_system    += usa_icon + '<span>ESRI-<b><mark>vertical</mark></b>-coord-sys(USA)</span>' 
                                _html_coordinate_system    += ', '
                                _html_coordinate_system    += '<span>' + "<b>not found.</b>"  + '</span>'


                                _html_coordinate_system    +=  '</br>'

                                // sync version, must keep here to append it in front
                                $('#coord-sys-mapserver').html(_html_coordinate_system);

                        }, 
                                                                                                                                        
                        success: function (_esri_vcsWkid_txt) {
                            console.log(' esri wkid text ', _wkid,  _esri_vcsWkid_txt)

                            var _custom_coordinate_system_wkt = _esri_vcsWkid_txt
                            var _custom_coordinate_system_name = _custom_coordinate_system_wkt.substring(_esri_vcsWkid_txt.indexOf('"')+1)
                            _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )
                            // from datum to spheroid
                            var _custom_coordinate_system_datum = _custom_coordinate_system_wkt.substring( (_custom_coordinate_system_wkt.indexOf('DATUM[\"') + 7),  _custom_coordinate_system_wkt.indexOf('\",SPHEROID[\"'))
                            var _custom_coordinate_system_unit  = _custom_coordinate_system_wkt.substring( (_custom_coordinate_system_wkt.lastIndexOf('UNIT[\"') + 6),  _custom_coordinate_system_wkt.lastIndexOf('\"'))

                            console.log(' esri wkid text , name ', _custom_coordinate_system_name)
                            
                           
                            _html_coordinate_system    +=  usa_icon + '<span>ESRI-<b><mark>vertical</mark></b>-coord-sys(USA)</span>' 
                            _html_coordinate_system    +=  ', '
                            _html_coordinate_system    +=  '<span>Name(<a target="_blank" href="' + _esri_vcsWkid_lookup_url +'">'  + _custom_coordinate_system_name    + '</a>)</span>'
                            _html_coordinate_system    +=  ', '


                            _html_coordinate_system    +=  '<span>vcsWkid(<a target="_blank" href="' + _esri_vcsWkid_lookup_url +'">' + _vcsWkid + '</a>)</span>' 

                            _html_coordinate_system    +=  ', '
                            _html_coordinate_system    +=   '<span>Unit(' + _custom_coordinate_system_unit + '), '  + 'Datum('+ _custom_coordinate_system_datum + ')</span>'

                            _html_coordinate_system    +=  '</br>'


                            // sync version, must keep here to append it in front
                            $('#coord-sys-mapserver').html(_html_coordinate_system);

                                                                                                                                            
                        }  // success 
                    }); // ajax
                    // ------- end  -------  epsg: sync-version  -------





            // ------- epsg: sync-version  -------
            // some ESRI wkid are missing,
            //var _prettywkt_url =  'https://spatialreference.org/ref/epsg/' + _latestVcsWkid + '/prettywkt/'   // look up wkid from EPSG   https://spatialreference.org/
            var _vcsprettywkt_url =  'https://spatialreference.org/ref/epsg/' + _latestVcsWkid    // look up wkid from EPSG   https://spatialreference.org/

            //works but do not use a-s-y-n-c-a-w-a-i-t for epsg 
            //var _prettywkt_txt = await arcgis_ajax_cross_origin(_prettywkt_url, 'proxy');  // only proxy works, cors, jsonp failed 
            //var _prettywkt_txt = await ajax_proxy_only_customized_type(_prettywkt_url, 3000, 'text')

            var ___url_getJson = _prettywkt_url + '/ogcwkt/'
            var _custom_timeout = 9000
            var _customized_datatype = 'text'
            console.log('ajax do not proxy, (timeout) ',___url_getJson, _custom_timeout) 
            //var _proxified_url = proxify_url(___url_getJson)
            //console.log('try ajax do not proxy =======> ',  _proxified_url) 

            $.ajax({
            timeout: _custom_timeout,
            url: ___url_getJson, //_proxified_url,
            type : 'GET',
            dataType: _customized_datatype,

            error: function (proxy_error_1) { 
                        console.log('ajax proxy_error_1 ',proxy_error_1) 
                        // epgs not found or website is not available

                        //_html_coordinate_system    +=  '</br>'
                        
                        _html_coordinate_system    += euro_icon + '<span>EPSG-<b><mark>vertical</mark></b>-coord-sys(European)</span>' 
                        _html_coordinate_system    += ', '
                        
                        _html_coordinate_system    += '<span>' + "<b>not found.</b>"   + '</span>' 

                        _html_coordinate_system    +=  '</br>'
                        
                        // sync version, must keep here to append it in front
                        $('#coord-sys-mapserver').html(_html_coordinate_system);

                        
                        
            },

            success: function (_vcsprettywkt_txt) {
                console.log(' > epsg well know text <  ', _latestVcsWkid,  _vcsprettywkt_txt)

                var _custom_coordinate_system_name  =  _vcsprettywkt_txt.substring(_vcsprettywkt_txt.indexOf('"')+1)
                var _custom_coordinate_system_datum =  _vcsprettywkt_txt.substring( (_vcsprettywkt_txt.indexOf('DATUM["') + 7),  _vcsprettywkt_txt.indexOf('",SPHEROID["'))
                var _custom_coordinate_system_unit_raw  =  _vcsprettywkt_txt.substring( (_vcsprettywkt_txt.lastIndexOf('UNIT["') + 6) )
                var _custom_coordinate_system_unit  = _custom_coordinate_system_unit_raw.substring(0, _custom_coordinate_system_unit_raw.indexOf('",'))

                console.log(' _custom_coordinate_system_name : 1 ', _custom_coordinate_system_name)
                _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )


                // because of first line, no need line break
                //_html_coordinate_system    += '</br>'
                
                _html_coordinate_system    += euro_icon + '<span>EPSG-<b><mark>vertical</mark></b>-coord-sys(European)</span>'
                _html_coordinate_system    +=  ', '
                _html_coordinate_system    +=  '<span>Name(<a target="_blank" href="' + _vcsprettywkt_url +'">'  + _custom_coordinate_system_name    + '</a>)</span>'
                _html_coordinate_system    +=  ', '
                _html_coordinate_system    +=  '<span>latestVcsWkid(<a target="_blank" href="' + _vcsprettywkt_url +'">' + _latestVcsWkid + '</a>)</span>' 
                _html_coordinate_system    +=  ', '
                _html_coordinate_system    +=   '<span>Unit(' + _custom_coordinate_system_unit + '), ' + 'Datum('+ _custom_coordinate_system_datum + ')</span>'

                _html_coordinate_system    += '</br>'

                // sync version, must keep here to append it in front
                $('#coord-sys-mapserver').html(_html_coordinate_system);


                                                                                                                            
                    }  // success 
                }); // ajax
                // ------- end  -------  epsg: sync-version  -------



                 
                } // if vcsWkid
            //   ============  end  ============  esri  ============  wkid  ============













            /**/
            // ============  esri  ============  wkid  ============

            var _wkid // means ESRI-coord-sys
            if (mapServerRootJson.spatialReference.wkid){
                _wkid = mapServerRootJson.spatialReference.wkid

                    // Spatial Reference: esri-sys  (euro-sys) 
                    // Spatial Reference: wkid      (latestWkid) 
                    // Spatial Reference: 4326      (4326)      degree
                    // Spatial Reference: 102100    (3857)      metre 
                    //if ((_wkid == '102100') || (_wkid == '4326') ){...}   

                    // ------- ESRI wkid: sync-version  -------
                    var _esri_wkid_lookup_url ='https://spatialreference.org/ref/esri/' + _wkid    // look up wkid from EPSG   https://spatialreference.org/
                    var ___url_getJson = _esri_wkid_lookup_url + '/esriwkt.txt'
                    console.log('esri wkid lookup ', ___url_getJson)
                    var _custom_timeout = 9000
                    var _customized_datatype = 'text'
                    console.log('ajax (timeout) ',___url_getJson, _custom_timeout)
                    $.ajax({
                        timeout: _custom_timeout,
                        url: ___url_getJson,
                        type : 'GET',
                        dataType: _customized_datatype,

                        error: function (error_1) { 
                                console.log('ajax_error_1 ',error_1)
                                // ESRI not found or website is not available
                                
                                _html_coordinate_system    += usa_icon + '<span>ESRI-coord-sys(USA)</span>' 
                                _html_coordinate_system    += ', '
                               // _html_coordinate_system    += '<mark>' + _wkid  + '</mark>' 
                                _html_coordinate_system    += '<span>' + "<b>not found.</b>"   + '</span>'

                                _html_coordinate_system    +=  '</br>'

                                // sync version, must keep here to append it in front
                                $('#coord-sys-mapserver').html(_html_coordinate_system);

                        }, 
                                                                                                                                        
                        success: function (_esri_wkid_txt) {
                            console.log(' esri wkid text ', _wkid,  _esri_wkid_txt)

                            var _custom_coordinate_system_wkt = _esri_wkid_txt
                            var _custom_coordinate_system_name = _custom_coordinate_system_wkt.substring(_esri_wkid_txt.indexOf('"')+1)
                            _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )
                            // from datum to spheroid
                            var _custom_coordinate_system_datum = _custom_coordinate_system_wkt.substring( (_custom_coordinate_system_wkt.indexOf('DATUM[\"') + 7),  _custom_coordinate_system_wkt.indexOf('\",SPHEROID[\"'))
                            var _custom_coordinate_system_unit  = _custom_coordinate_system_wkt.substring( (_custom_coordinate_system_wkt.lastIndexOf('UNIT[\"') + 6),  _custom_coordinate_system_wkt.lastIndexOf('\"'))

                            console.log(' esri wkid text , name ', _custom_coordinate_system_name)
                            
                           
                           
                            _html_coordinate_system    +=  usa_icon + '<span>ESRI-coord-sys(USA)</span>' 
                            _html_coordinate_system    +=  ', '
                            _html_coordinate_system    +=  '<span>Name(<a target="_blank" href="' + _esri_wkid_lookup_url +'">'  + _custom_coordinate_system_name    + '</a>)</span>'
                            _html_coordinate_system    +=  ', '


                            _html_coordinate_system    +=  '<span>Well-Known-ID WKID(<a target="_blank" href="' + _esri_wkid_lookup_url +'">' + _wkid + '</a>)</span>' 

                            _html_coordinate_system    +=  ', '
                            _html_coordinate_system    +=   '<span>Unit(' + _custom_coordinate_system_unit + '), '  + 'Datum('+ _custom_coordinate_system_datum + ')</span>'

                            _html_coordinate_system    +=  '</br>'


                            // sync version, must keep here to append it in front
                            $('#coord-sys-mapserver').html(_html_coordinate_system);

                                                                                                                                            
                        }  // success 
                    }); // ajax
                    // ------- end  -------  epsg: sync-version  -------
                 
                } // if wkid
            //   ============  end  ============  esri  ============  wkid  ============




            /**/
            // -------  epsg  -------  -------  ------- lastest wkid -------  -------  -------  -------

           
            var _latestWkid
            if (mapServerRootJson.spatialReference.latestWkid){

            _latestWkid = mapServerRootJson.spatialReference.latestWkid
            
            // Spatial Reference: esri-sys  (euro-sys) 
            // Spatial Reference: wkid      (latestWkid) 
            // Spatial Reference: 4326      (4326)      degree
            // Spatial Reference: 102100    (3857)      metre 
            //if ((_latestWkid == '3857') || (_latestWkid == '4326') ){...}  


            // ------- epsg: sync-version  -------
            // some ESRI wkid are missing,
            //var _prettywkt_url =  'https://spatialreference.org/ref/epsg/' + _latestWkid + '/prettywkt/'   // look up wkid from EPSG   https://spatialreference.org/
            var _prettywkt_url =  'https://spatialreference.org/ref/epsg/' + _latestWkid    // look up wkid from EPSG   https://spatialreference.org/

            //works but do not use a-s-y-n-c-a-w-a-i-t for epsg 
            //var _prettywkt_txt = await arcgis_ajax_cross_origin(_prettywkt_url, 'proxy');  // only proxy works, cors, jsonp failed 
            //var _prettywkt_txt = await ajax_proxy_only_customized_type(_prettywkt_url, 3000, 'text')

            var ___url_getJson = _prettywkt_url + '/ogcwkt/'
            var _custom_timeout = 9000
            var _customized_datatype = 'text'
            console.log('ajax do not proxy, (timeout) ',___url_getJson, _custom_timeout) 
            //var _proxified_url = proxify_url(___url_getJson)
            //console.log('try ajax do not proxy =======> ',  _proxified_url) 

            $.ajax({
            timeout: _custom_timeout,
            url: ___url_getJson, //_proxified_url,
            type : 'GET',
            dataType: _customized_datatype,

            error: function (proxy_error_1) { 
                        console.log('ajax proxy_error_1 ',proxy_error_1) 
                        // epgs not found or website is not available

                        _html_coordinate_system    += euro_icon + '<span>EPSG-coord-sys(European)</span>' 
                        _html_coordinate_system    += ', '
                        //_html_coordinate_system    += '<mark>' + _latestWkid  + '</mark>' 
                        _html_coordinate_system    += '<span>' + "<b>not found.</b>"   + '</span>' 

                        _html_coordinate_system    +=  '</br>'
                        
                        // sync version, must keep here to append it in front
                        $('#coord-sys-mapserver').html(_html_coordinate_system);

                        
                        
            },

            success: function (_prettywkt_txt) {
                console.log(' > epsg well know text <  ', _latestWkid,  _prettywkt_txt)
                /*
                        1) 2230 will give you following string:

                            pretty human readable wkt: 
                                        PROJCS["NAD83 / California zone 6 (ftUS)",
                                            GEOGCS["NAD83",
                                                DATUM["North_American_Datum_1983",...
                                                UNIT["US survey foot",0.3048006096012192,
                                                AUTHORITY["EPSG","9003"]],
                                                PROJECTION["Lambert_Conformal_Conic_2SP"],
                            
                        OGC wkt:
                        PROJCS["NAD83 / Utah Central (ftUS)",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["US survey foot",0.3048006096012192,AUTHORITY["EPSG","9003"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",40.65],PARAMETER["standard_parallel_2",39.01666666666667],PARAMETER["latitude_of_origin",38.33333333333334],PARAMETER["central_meridian",-111.5],PARAMETER["false_easting",1640416.6667],PARAMETER["false_northing",6561666.666700001],AUTHORITY["EPSG","3566"],AXIS["X",EAST],AXIS["Y",NORTH]]


                        2) in case of error, you will get:
                                Not found, /ref/epsg/35660/prettywkt/. 
                */

                var _custom_coordinate_system_name  =  _prettywkt_txt.substring(_prettywkt_txt.indexOf('"')+1)
                var _custom_coordinate_system_datum =  _prettywkt_txt.substring( (_prettywkt_txt.indexOf('DATUM["') + 7),  _prettywkt_txt.indexOf('",SPHEROID["'))
                var _custom_coordinate_system_unit_raw  =  _prettywkt_txt.substring( (_prettywkt_txt.lastIndexOf('UNIT["') + 6) )
                var _custom_coordinate_system_unit  = _custom_coordinate_system_unit_raw.substring(0, _custom_coordinate_system_unit_raw.indexOf('",'))

                console.log(' _custom_coordinate_system_name : 1 ', _custom_coordinate_system_name)
                _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )


                // because of first line, no need line break
               
                
                _html_coordinate_system    += euro_icon + '<span>EPSG-coord-sys(European)</span>'
                _html_coordinate_system    +=  ', '
                _html_coordinate_system    +=  '<span>Name(<a target="_blank" href="' + _prettywkt_url +'">'  + _custom_coordinate_system_name    + '</a>)</span>'
                _html_coordinate_system    +=  ', '
                _html_coordinate_system    +=  '<span>Well-Known-ID WKID(<a target="_blank" href="' + _prettywkt_url +'">' + _latestWkid + '</a>)</span>' 
                _html_coordinate_system    +=  ', '
                _html_coordinate_system    +=   '<span>Unit(' + _custom_coordinate_system_unit + '), ' + 'Datum('+ _custom_coordinate_system_datum + ')</span>'

                _html_coordinate_system    += '</br>'

                // sync version, must keep here to append it in front
                $('#coord-sys-mapserver').html(_html_coordinate_system);


                                                                                                                            
                    }  // success 
            }); // ajax
            // ------- end  -------  epsg: sync-version  -------

          
            } // if latestWkid
            // -------  epsg  -------  -------  ------- lastest wkid -------  -------  -------  -------
            /**/


                                

            // ============  custom  ============  wkt  ============ 

            // _html_coordinate_system += '</br>'

            /* 
            only have custom wkt string (no wkid)
            Spatial Reference : {
            wkt: 'PROJCS["NAD_1983_StatePlane_Utah_Central_FIPS_4302_Feet",GEOGCS["GCS_North_American_1983",DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Conformal_Conic"],
            PARAMETER["False_Easting",1640416.666666667],PARAMETER["False_Northing",6561666.666666666],PARAMETER["Central_Meridian",-111.5],PARAMETER["Standard_Parallel_1",39.01666666666667],
            PARAMETER["Standard_Parallel_2",40.65],PARAMETER["Latitude_Of_Origin",38.33333333333334],UNIT["Foot_US",0.3048006096012192]],VERTCS["NAVD_1988",VDATUM["North_American_Vertical_Datum_1988"],
            PARAMETER["Vertical_Shift",0.0],PARAMETER["Direction",1.0],UNIT["Foot_US",0.3048006096012192]]
            '
            }
            */ 
            var _custom_wkt_txt 
            if (mapServerRootJson.spatialReference.wkt){
            _custom_wkt_txt =  mapServerRootJson.spatialReference.wkt
            var _custom_coordinate_system_name = _custom_wkt_txt.substring(_custom_wkt_txt.indexOf('"')+1)
            console.log(' _custom_coordinate_system_name : 1 ', _custom_coordinate_system_name)
            _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )

            _html_coordinate_system    +=  '</br>' 
            _html_coordinate_system    +=  warning_icon + '<span>CUSTOM-coord-sys(<mark>'  + _custom_coordinate_system_name    + '</mark>)</span>'
            }
            // ============  end  ============  custom  ============  wkt  ============ 



















                
        }// if spatial reference

    }//if
    // = = = = =   end  = = = = =   coordinate  = = = = =  system = = = = =

    // sync version, must keep here to append it in front

    $('#coord-sys-mapserver').html(_html_coordinate_system);
    
            
}






                    // for mapserver, imageserver, (image legend)   only right panel attach to div 'layer_legend' 
                    function show_legend(_layer_id_, _all_layer_legend){



                                    console.log('find this layer id from all layer legend or show all legend depends on layer id = -99999 ',_layer_id_,  _all_layer_legend)
                                    if (_all_layer_legend.layers){

                                                if (_layer_id_ == -99999){

                                                        // MapServer or ImageServer, show all layers legend
                                                        var _allLayerLegendArray = _all_layer_legend.layers
                                                        var _layer_legend
                                                        var _legend_html = ''
                                                        var _layer_legend_array

                                                        for (var i = 0; i < _allLayerLegendArray.length; i++) {

                                                            _layer_legend = _allLayerLegendArray[i]
                                                            if (_layer_legend){

                                                                    _layer_legend_array = _layer_legend.legend;

                                                                    _legend_html += '<fieldset>'
                                                                    _legend_html +=  '<legend>' + _layer_legend.layerName +  '</legend>'

                                                                    for (var l = 0; l < _layer_legend_array.length; l++) {
                                                                    
                                                                            _legend_html += '<img src="data:image/png;base64,' + _layer_legend_array[l].imageData + '"></img>&nbsp;'
                                                                            _legend_html += '<label>' + _layer_legend_array[l].label + '</label> <br/>'
                                                                    }// for

                                                                    _legend_html += '</fieldset>'
                                                            } // if
                                                        } // for 
                                                        /**/
                                                        // set html to legend_div
                                                        document.getElementById('layer_legend').innerHTML = _legend_html




                                                
                                                } else {
                                                    // layer only, only this layer id legend
                                                   
                                                                            // array.find()  must be array
                                                                            var _layer_legend = _all_layer_legend.layers.find(el => el.layerId == _layer_id_);

                                                                            console.log('current layer legend',_layer_id_,  _layer_legend)

                                                                            if (_layer_legend){
                                                                                                            var _layer_legend_array = _layer_legend.legend;

                                                                                                            var _legend_html = '<fieldset>'
                                                                                                                _legend_html +=  '<legend>' + _layer_legend.layerName +  '</legend>'

                                                                                                                for (var l = 0; l < _layer_legend_array.length; l++) {
                                                                                                                
                                                                                                                        _legend_html += '<img src="data:image/png;base64,' + _layer_legend_array[l].imageData + '"></img>&nbsp;'
                                                                                                                        _legend_html += '<label>' + _layer_legend_array[l].label + '</label> <br/>'
                                                                                                                

                                                                                                                }// for

                                                                                                                _legend_html += '</fieldset>'

                                                                                                            // console.log(' legend html ', _legend_html)


                                                                                                                // set html to legend_div
                                                                                                                document.getElementById('layer_legend').innerHTML = _legend_html
                                                                            }
                                                                                

                                                } // if

                                    }// if
                    }

                    async function get_layer_fields(___thislayerurl___){
                            
                            var _thisLayer_fullJSON = await arcgis_ajax_cross_origin(___thislayerurl___, _cross);  // cross origin method 
                            console.log(' this Layer full JSON ', _thisLayer_fullJSON)

                            // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                            if (typeof _thisLayer_fullJSON === 'object') {
                                // is object
                                _thisLayer_fullJSON = _thisLayer_fullJSON
                            } else {
                                // is string
                                _thisLayer_fullJSON = JSON.parse(_thisLayer_fullJSON)
                                
                            }


                            /**/     
                            // # # # # # # geometry type - for icon # # # # # #

                            if (_thisLayer_fullJSON.hasOwnProperty('geometryType')){
                                _html_for_more_info_icon    += '<span>Geometry-Type(<mark>' +  _thisLayer_fullJSON.geometryType + '</mark>)</span>'
                            } else {
                                _html_for_more_info_icon    += '<span>Geometry-Type(<mark>Not Defined</mark>)</span>'  
                            }



                            if (_thisLayer_fullJSON.hasOwnProperty('displayField')){
                                _html_for_more_info_icon    += ', ' + '<span>Display-Field(<mark>' +  _thisLayer_fullJSON.displayField + '</mark>)</span>'
                            } else {
                                _html_for_more_info_icon    += ', ' + '<span>Display-Field(<mark>Not Defined</mark>)</span>'  
                            }

                            // # # #  end  # # # geometry type - for icon # # # # # #
                            /**/


                                  
                            /**/     
                            // # # # # # # dynamic layer - for icon # # # # # #
                            if (_support_dynamic_layers == true){
                                _html_for_more_info_icon    += ', ' + yes_icon  + '<span>Dynamic-Layers(Yes)</span>'
                            } else {
                                _html_for_more_info_icon    += ', ' + no_icon + '<span>Dynamic-Layers(No)</span>'
                            }
                            // # # #  end  # # # dynamic layer - for icon # # # # # #
                            /**/

                            
                                         
                            /**/
                            //  ... support dynamic legend or not   ... 
                            if (_thisLayer_fullJSON.hasOwnProperty('supportsDynamicLegends')){
                                _html_for_more_info_icon    += ', ' + yes_icon + '<span>Dynamic-Legend(Yes)</span>'
                            } else {
                                _html_for_more_info_icon    += ', ' + no_icon + '<span>Dynamic-Legend(No)</span>' 
                            }
                            //  ... end ... support dynamic legend or not   ... 
                            /**/

                            


                                    /**/
                                    //  ... ... .. ... subtype domain ... ... .. 
                                    /**/
                                        get_subtype_domain_info(_thisLayer_fullJSON)
                                    /**/
                                    //  ... end ... ... .. ... subtype domain ... ... ..
                                    /**/



                                    
    /**/
    //   = = = = =   f=json  = = = = =  = = = = =
    /**/
    var _html_for_f_json = ''
    _html_for_f_json += '<br>'
    _html_for_f_json += '<a target="_blank" id="___thislayerurl____link2" href="'+  ___thislayerurl___ + '?f=json" style="font-size:xx-small; font-weight: lighter;">'  
    _html_for_f_json += ___thislayerurl___ + '?f=json' 
    _html_for_f_json += '</a>'
    
    $("#layer-more-info").html(_html_for_f_json)         



    // must show, because it often hidden if user click item on parent panel
    $("#json-layer").show();
    if (editor_json_layer){
        editor_json_layer.set({json:_thisLayer_fullJSON})
    }

    
    /**/
    //   = = = = =    end   = = = = =   f=json  = = = = =  = = = = =
    /**/



                            // ... ... ...  geodatabase ... yes ... no ...  ... ... ... 

                              var _advancedQueryCapabilities = _thisLayer_fullJSON.advancedQueryCapabilities

                              if (_advancedQueryCapabilities){

                                console.log(' geodatabase,  Yes, or No, ', _thisLayer_fullJSON.supportsAdvancedQueries)
                                if (_thisLayer_fullJSON.supportsAdvancedQueries){
                                            // geodatabase, advanced query-> true
                                            if (_thisLayer_fullJSON.supportsAdvancedQueries == true){
                                                _html_for_more_info_icon    += ', ' + yes_icon + '<span>GeoDatabase(Yes)</span>'
                                                
                                            }   
                                } else {
                                            if (_thisLayer_fullJSON.supportsAdvancedQueries == false){
                                                _html_for_more_info_icon    += ', ' + no_icon  + '<span>GeoDatabase(No)</span>'
                                                
                                            } else {
                                                // advanced query, undefined,  not a feature layer ,  nothing display
                                                console.log('advanced query, undefined,  not a feature layer ,  nothing display')
                                            }
                                }

                            

                                if (_advancedQueryCapabilities.supportsPagination){
                                    
                                    _html_for_more_info_icon    += ', ' +  yes_icon   + 'Pagination' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'Pagination' 
                                }

                               

                                if (_advancedQueryCapabilities.supportsStatistics){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'Statistics' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'Statistics' 
                                }

                              

                                if (_advancedQueryCapabilities.supportsDistinct){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'Distinct' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'Distinct' 
                                }

                             

                                if (_advancedQueryCapabilities.supportsOrderBy){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'OrderBy' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'OrderBy' 
                                }

                            

                                if (_advancedQueryCapabilities.supportsHavingClause){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'HavingClause' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'HavingClause' 
                                }

                             

                                if (_advancedQueryCapabilities.supportsCountDistinct){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'CountDistinct' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'CountDistinct' 
                                }

                        

                                if (_advancedQueryCapabilities.supportsSqlExpression){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'SqlExpression' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'SqlExpression' 
                                }

                            

                                if (_advancedQueryCapabilities.supportsQueryWithDistance){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'QueryWithDistance' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'QueryWithDistance' 
                                }

                             

                                if (_advancedQueryCapabilities.supportsReturningQueryExtent){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'ReturningQueryExtent' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'ReturningQueryExtent' 
                                }

                              

                                if (_advancedQueryCapabilities.useStandardizedQueries){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'StandardizedQueries' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'StandardizedQueries' 
                                }

                            

                                if (_advancedQueryCapabilities.supportsTrueCurve){
                                    _html_for_more_info_icon    += ', ' +  yes_icon    + 'TrueCurve' 
                                } else {
                                    _html_for_more_info_icon    += ', ' +  no_icon    + 'TrueCurve' 
                                }
                                $('#message_more_info_icon').html(_html_for_more_info_icon);

                            }// if exist

                     //  ... ... ...   end ... ... ...  geodatabase ... yes ... no ...  ... ... ...
                     /**/







                             
                    }

                 



                        
                        /**/
                        //  ... ... .. ... subtype domain ... ... .. 
                        /**/
                            function get_subtype_domain_info(_featurelayerJSON){


                               

                                /**/
                                // --- ---  field  ---  ---
                                /**/ 

                                var field_array
                                $("#field_fieldset").show();
                                $('#jsoneditor_field').show();
                                // default
                                editor_field.set({json:{'Warning': 'Field does not exist !'}})

                                if (_featurelayerJSON.hasOwnProperty('fields')){
                                        field_array = _featurelayerJSON.fields
                                        console.log(' show field ... ', field_array, editor_field )
                                        if (field_array){
                                           if (Object.keys(field_array).length > 0){
                                                                editor_field.set({json:field_array});
                                           } 
                                        }
                                }//if


                                /**/
                                // --- end  ---  field  ---  --- 
                                /**/



                         /**/
                         // --- ---  subtype  ---  --- 

                           
                            var field_raw
                            var subtype_raw
                            var subtype = {}
                            var subtype_field // each layer only allow to have one subtype, one field associate with that subtype.  but allow multiple field associate with multiple domain.
                            var subtype_fieldName  // is identical with subtype_field, not use this
                            var subtypes_array


                            $("#subtype_fieldset").show();
                            $('#jsoneditor_subtype').show();
                            // default
                            editor_subtype.set({json:{'Warning': 'SubType does not exist !'}})



                            if (_featurelayerJSON.hasOwnProperty('fields')){
                                        if (_featurelayerJSON.fields){
                                            field_raw = _featurelayerJSON.fields
                                        }
                            }//if


                                if (_featurelayerJSON.hasOwnProperty('subtypes')){
                                        if (_featurelayerJSON.subtypes){

                                                        subtype_raw = _featurelayerJSON.subtypes
                                                        for (let s = 0; s < subtype_raw.length; s++) {
                                                        subtype[subtype_raw[s]['code']] = subtype_raw[s]['name'];
                                                        }

                                        } else if (_featurelayerJSON.types){

                                                        subtype_raw = _featurelayerJSON.types
                                                        for (let s = 0; s < subtype_raw.length; s++) {
                                                        subtype[subtype_raw[s]['id']] = subtype_raw[s]['name'];
                                                        }

                                        } else {
                                                        subtype = {}
                                        }
                                }//if




                                if (_featurelayerJSON.hasOwnProperty('subtypeField')){
                                    if (_featurelayerJSON.subtypeField){
                                                    subtype_field = _featurelayerJSON.subtypeField
                                                    // this is field alias, must convert to real field name
                                                    
                                                    for (let f = 0; f < field_raw.length; f++) {
                                                        if (field_raw[f].alias == subtype_field){
                                                        subtype_field = field_raw[f].name
                                                        break; // break for loop
                                                        }//if
                                                    }//for


                                    } else {
                                                    subtype_field = null
                                    }
                                }//if




                                if (_featurelayerJSON.hasOwnProperty('subtypeFieldName')){
                                        if (_featurelayerJSON.subtypeFieldName){
                                                        subtype_fieldName = _featurelayerJSON.subtypeFieldName
                                                        // this is field alias, must convert to real field name
                                                        
                                                        for (let f = 0; f < field_raw.length; f++) {
                                                        if (field_raw[f].alias == subtype_fieldName){
                                                            subtype_fieldName = field_raw[f].name
                                                            break; // break for loop
                                                        }//if
                                                        }//for
                                        } else {
                                                        subtype_fieldName = null
                                        }
                                }//if
                                

                                console.log(' show subtype ... ', subtype, editor_subtype )
                                
                                

                                if (Object.keys(subtype).length > 0){
                                                editor_subtype.set({json:subtype});
                                } 


                                


                                /**/
                                // --- end  ---  subtype  ---  --- 
                                /**/





                                /**/
                                // --- ---  domain  ---  --- 


                                 /* 
                                    { fieldName: [coded value]}  have not handle range value yet   
                                    domain have both single domain and nested domain initially from 'field' object, but the nested one is fake(only have one subdomain), must remove
                                    nested_domain only have nested domain
                                    combined_domain is domain + nested_domain for display in jsoneditor only, does not use for translate from code to description
                                */ 
                                    var domain = {}  // multiple fields with domain, can be retrieve from this domain object key. 
                                    var nested_domain = {}  // only have nested domain
                                    var combined_domain = {}
                                    var nested_subtype_domain_field // each layer allow max one subtype, so max allow one field to carry nested subtype domain. 
                
    


                                                $("#domain_fieldset").show();
                                                $('#jsoneditor_domain').show();
                                                // default
                                                editor_domain.set({json:{'Warning': 'Domain does not exist !'}})


                                                /**/
                                                // get not-nested domain from 'field' object  
                                                if (field_raw){
                                                        for (let d = 0; d < field_raw.length; d++) {

                                                            if (field_raw[d].hasOwnProperty('domain')){
                                                            if ((field_raw[d].domain) && (field_raw[d].domain.codedValues)){
                                                                    console.log(' this field has domain', field_raw[d].name )
                                                                    // field only have first record of nested subtype domain, or if not nested domain, field will have full info of not-nested domain  
                                                                    // { fieldName: [coded value]}  // have not handle range value yet


                                                                    var single_domain_code_value_array = field_raw[d].domain.codedValues 

                                                                    
                                                                    var single_domain_code_value = {}
                                                                    for (let s = 0; s < single_domain_code_value_array.length; s++) {
                                                                            single_domain_code_value[single_domain_code_value_array[s]['code']] = single_domain_code_value_array[s]['name'] 
                                                                    }//for
                                                                    domain[field_raw[d].name] = single_domain_code_value


                                                            } else {
                                                                        //domain:null (means without domain)  nothing to do
                                                            }//if
                                                            }//if

                                                        }//for
                                                }//if
                                                //  - - - end   - - -  get not-nested domain from 'field' object 
                                                /**/ 

                                                
                                                /**/
                                                // get nested sub-domain from 'subtypes' object , loop through each subtype,  subtype have nested domain,  each subtype has its own domain array, 2 level deep
                                                if (_featurelayerJSON.hasOwnProperty('subtypes')){
                                                    if (_featurelayerJSON.subtypes){

                                                        subtypes_array = _featurelayerJSON.subtypes
                                                        for (let n = 0; n < subtypes_array.length; n++) {

                                                                            var single_subtype_domain_group = subtypes_array[n]['domains']
                                                                            for (var fieldNameAsKey in single_subtype_domain_group) {
                                                                                if (single_subtype_domain_group.hasOwnProperty(fieldNameAsKey)){
                                                                                        var single_subtype_domain = single_subtype_domain_group[fieldNameAsKey]
                                                                                        if (single_subtype_domain.type == 'inherited'){
                                                                                        // nothing to do
                                                                                        } else if (single_subtype_domain.type == 'codedValue'){

                                                                                                    nested_subtype_domain_field = fieldNameAsKey

                                                                                                    var single_subtype_domain_codedValue_array = single_subtype_domain.codedValues
                                                                                                    var each_subtype_domain = {}
                                                                                                    for (let c = 0; c < single_subtype_domain_codedValue_array.length; c++) {

                                                                                                        each_subtype_domain[single_subtype_domain_codedValue_array[c]['code']] = single_subtype_domain_codedValue_array[c]['name']
                                                                                                    
                                                                                                    }
                                                                                                    nested_domain[subtypes_array[n].code] = each_subtype_domain
                                                                                        

                                                                                        } else if (single_subtype_domain.type == 'rangedValue'){

                                                                                            // ranged value, not yet handle. 
                                                                                        }//if

                                                                                }//if
                                                                                    
                                                                            }//for

                                                        }//for

                                                    }//if
                                                }//if
                                                //   - - - end   - - -  get nested sub-domain from 'subtypes' object , loop through each subtype,  subtype have nested domain,  each subtype has its own domain array, 2 level deep
                                                /**/



                                            console.log(' domain', domain)
                                            console.log(' nested domain', nested_domain)
                                            console.log(' nested subtype domain field', nested_subtype_domain_field)

                                            
                                            if ((Object.keys(domain).length > 0) || (Object.keys(nested_domain).length > 0)){

                                                        if (Object.keys(domain).length > 0){
                                                            combined_domain = structuredClone(domain)
                                                        }
                                                        
                                                        if (Object.keys(nested_domain).length > 0){
                                                            // domain only have single domain, so must delete nested domain
                                                            delete domain[nested_subtype_domain_field];
                                                            combined_domain[nested_subtype_domain_field] = nested_domain
                                                        } 

                                                        console.log(' show combined_domain ... ', combined_domain, editor_domain )
                                                        editor_domain.set({json:combined_domain});
                                            } 

                                // --- end ---  domain  ---  --- 





                            






                            } 
                        /**/
                        //  ... end ... ... .. ... subtype domain ... ... ..
                        /**/




                /**/
                // ~~~~~~~~~~~~ end ~~~~~~~~~~  server info, layer info, legend , layer-fields etc...  ~~~~~~~~~~~~~~~~~
                /**/




  /**/
          // - - - filter layer list  - - - 
          /**/

          // folder
          var filterfolderList_by_keyword
          async function filter_folderList_now(event){
            
            filterfolderList_by_keyword = $('#filter_folder_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('filterfolderList now keyword ...  ', filterfolderList_by_keyword)
            if ($('#jstree_root_folder').jstree(true)){
                $('#jstree_root_folder').jstree(true).search(filterfolderList_by_keyword);
            }
            
          }
          function show_all_folder_list(){
            
            filterfolderList_by_keyword = ''
            $("#filter_folder_list_by").val(filterfolderList_by_keyword)
            console.log('show all folder list now, you clicked clear button . . .  ', filterfolderList_by_keyword)
            if ($('#jstree_root_folder').jstree(true)){
                $('#jstree_root_folder').jstree(true).clear_search();
            }
          }

          // server
          var filterserverList_by_keyword
          async function filter_serverList_now(event){
            
            filterserverList_by_keyword = $('#filter_server_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('filterserverList now keyword ...  ', filterserverList_by_keyword)
            if ($('#jstree_mapserver').jstree(true)){
                $('#jstree_mapserver').jstree(true).search(filterserverList_by_keyword);
            }
            
          }
          function show_all_server_list(){
            
            filterserverList_by_keyword = ''
            $("#filter_server_list_by").val(filterserverList_by_keyword)
            console.log('show all server list now, you clicked clear button . . .  ', filterserverList_by_keyword)
            if ($('#jstree_mapserver').jstree(true)){
                $('#jstree_mapserver').jstree(true).clear_search();
            }
          }


          // icon
          var filtericonList_by_keyword
          async function filter_iconList_now(event){

            filtericonList_by_keyword = $('#filter_icon_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('filtericonList now keyword ...  ', filtericonList_by_keyword)
            if ($('#jstree_icon').jstree(true)){
                $('#jstree_icon').jstree(true).search(filtericonList_by_keyword);
            }
          }
          function show_all_icon_list(){
            
            filtericonList_by_keyword = ''
            $("#filter_icon_list_by").val(filtericonList_by_keyword)
            console.log('show all icon list now, you clicked clear button . . .  ', filtericonList_by_keyword)
            if ($('#jstree_icon').jstree(true)){
                $('#jstree_icon').jstree(true).clear_search();
            }
            
          }


  /**/
  // ... end ...  - - - filter layer list  - - -
  /**/









    // all init button, click event, including collapse expand button, // origianl from folder.js
    function ui_event_register(){



        // ------- large text, dark light  ------- 
        var iphone_scale =  "50%" 
        var desktop_hd_scale =  "100%"  
        var desktop_4k_scale =  "150%" 

        var large_text = "200%"
        var standard_text = "100%"
        var small_text = "50%"



        $("#large-text-button").on('click',function(){

        if (document.getElementById("jstree_root_folder")){
        document.getElementById("jstree_root_folder").style.zoom = large_text;
        }

        if (document.getElementById("jstree_mapserver")){
        document.getElementById("jstree_mapserver").style.zoom = large_text;
        }

        if (document.getElementById("jstree_icon")){
        document.getElementById("jstree_icon").style.zoom = large_text;
        }

        }); 

        $("#standard-text-button").on('click',function(){

        if (document.getElementById("jstree_root_folder")){
        document.getElementById("jstree_root_folder").style.zoom = standard_text;
        }

        if (document.getElementById("jstree_mapserver")){
        document.getElementById("jstree_mapserver").style.zoom = standard_text;
        }

        if (document.getElementById("jstree_icon")){
        document.getElementById("jstree_icon").style.zoom = standard_text;
        }

        }); 


        $("#small-text-button").on('click',function(){

        if (document.getElementById("jstree_root_folder")){
        document.getElementById("jstree_root_folder").style.zoom = small_text;
        }

        if (document.getElementById("jstree_mapserver")){
        document.getElementById("jstree_mapserver").style.zoom = small_text;
        }

        if (document.getElementById("jstree_icon")){
        document.getElementById("jstree_icon").style.zoom = small_text;
        }


        }); 






        $("#iphone-button").on('click',function(){
        document.body.style.zoom = iphone_scale;
        }); 
        $("#desktop-button").on('click',function(){
        document.body.style.zoom = desktop_hd_scale;
        }); 
        $("#4k-button").on('click',function(){
        document.body.style.zoom = desktop_4k_scale;
        }); 




        //   -------   end ------- large text, dark light  ------- 






        //  - -- - only for mobile  - -- -

        $("#back-3-panel").on('click', back_3_panel);
        $("#back-2-panel").on('click', back_2_panel);

        //  - -- - end  - -- -   only for mobile  - -- -








        /**/
        // - - - filter layer list  - - - 
        /**/

        $("#filter_folder_list_by").on('keyup', filter_folderList_now);
        $("#search_folder_list_button").on('click', filter_folderList_now);
        $('#clear_filter_folder_list_button').on('click', show_all_folder_list);  

        $("#filter_server_list_by").on('keyup', filter_serverList_now);
        $("#search_server_list_button").on('click', filter_serverList_now);
        $('#clear_filter_server_list_button').on('click', show_all_server_list); 

        $("#filter_icon_list_by").on('keyup', filter_iconList_now);
        $("#search_icon_list_button").on('click', filter_iconList_now);
        $('#clear_filter_icon_list_button').on('click', show_all_icon_list); 





        //  - - - when user click x at end of search bar(input type=search)  - - -
        // so no need filter by button, clear button
        $('#filter_folder_list_by').on('search', function(event) {
        if ($('#filter_folder_list_by').val().trim().toLowerCase()){
        filter_folderList_now()
        } else {
        // empty
        show_all_folder_list()
        }
        });
        $('#filter_server_list_by').on('search', function(event) {
        if ($('#filter_server_list_by').val().trim().toLowerCase()){
        filter_serverList_now()
        } else {
        // empty
        show_all_server_list()
        }
        });
        $('#filter_icon_list_by').on('search', function(event) {
        if ($('#filter_icon_list_by').val().trim().toLowerCase()){
        filter_iconList_now()
        } else {
        // empty
        show_all_icon_list()
        }
        });
        //  - - -  end  - - - when user click x at end of search bar(input type=search)   - - -


        /**/
        // ... end ...  - - - filter layer list  - - -
        /**/





            





        $("#collapse_button_folder").on('click',function(){
            if ($('#jstree_root_folder').jstree(true)){
                $('#jstree_root_folder').jstree('close_all');
            }
        }); 

        $("#expand_button_folder").on('click',function(){
            if ($('#jstree_root_folder').jstree(true)){
                $('#jstree_root_folder').jstree('open_all');
            }
        }); 





        $("#collapse_button_layer").on('click',function(){
            if ($('#jstree_mapserver').jstree(true)){
                $('#jstree_mapserver').jstree('close_all');
            }
        }); 

        $("#expand_button_layer").on('click',function(){
            if ($('#jstree_mapserver').jstree(true)){
                $('#jstree_mapserver').jstree('open_all');
            }
        }); 







        $("#collapse_button_icon").on('click',function(){
            console.log('collapse 3rd icon jstree , clicked')
            iconJstreeNodeOpened =  false
            
            if ($('#jstree_icon').jstree(true)){
                $('#jstree_icon').jstree('close_all');
            }
        }); 
        $("#expand_button_icon").on('click',function(){
            console.log('expand 3rd icon jstree , clicked')
            iconJstreeNodeOpened =  true
            
            if ($('#jstree_icon').jstree(true)){
                $('#jstree_icon').jstree('open_all');
            }
        }); 

    }


    // -  end  - all init button, click event, including collapse expand button, // origianl from folder.js



    

//  - -- - only for mobile  - -- -
    function back_3_panel(){

        if ($('#root-folder-div').is(':visible')) {
            $("#back-3-panel").hide();
        } else if ($('#map-server-div').is(':visible')) {
            $("#back-3-panel").hide();
            $("#root-folder-div").show();
            $("#map-server-div").hide();
            $("#app-div").hide();
            $("#map-window-iframe").hide();
        } else if ($('#app-div').is(':visible')) {
            $("#back-3-panel").show();
            $("#root-folder-div").hide();
            $("#map-server-div").show();
            $("#app-div").hide();
            $("#map-window-iframe").hide();
        } else if ($('#map-window-iframe').is(':visible')) {
            $("#back-3-panel").show();
            $("#root-folder-div").hide();
            $("#map-server-div").hide();
            $("#app-div").show();
            $("#map-window-iframe").hide();
        }//if

    }



    function back_2_panel(){

        if ($('#root-folder-div').is(':visible')) {
            $("#back-2-panel").hide();
        } else if ($('#app-div').is(':visible')) {
            $("#back-2-panel").hide();
            $("#root-folder-div").show();
            $("#app-div").hide();
            $("#map-window-iframe").hide();
        } else if ($('#map-window-iframe').is(':visible')) {
            $("#back-2-panel").show();
            $("#root-folder-div").hide();
            $("#app-div").show();
            $("#map-window-iframe").hide();
        }//if

    }

//  - -- - end  - -- -   only for mobile  - -- -



    





        function turn_on_detail_panel() {

            $('#detail_panel').show();
           
            detail_panel_status = true;

        }



        function turn_off_detail_panel(){

                    
                $('#detail_panel').hide();
               
                detail_panel_status = false;

        }




    function populate_namingLink(_map_server_url_, _layer_id_,  _layer_name_ , _type_){

                // must destroy last time old tree
                $('#jstree_naming').jstree('destroy');
                $("#jstree_naming").html('');

                var _node_path_ = null // no use, 
                var _layer_absolute_path_url = _map_server_url_ + '/' +  _layer_id_
                console.log('create tree icon flatjson:    _layer_absolute_path_url', _layer_absolute_path_url)
                console.log('create tree icon flatjson:    _map_server_url_', _map_server_url_)
                console.log('create tree icon flatjson:    _layer_id_', _layer_id_)
                console.log('create tree icon flatjson:    _layer_name_', _layer_name_)
                console.log('create tree icon flatjson:    _type_', _type_)
                console.log('create tree icon flatjson:    _node_path_', _node_path_)
                var tree_icon_flatjson = create_tree_icon_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

                jstree_folder(tree_icon_flatjson)
    }










    
                        

    /**/
    // ------- let's go to your REST api  -------
    /**/


    



                function letsgo_handler(){

                    ___url_string = $("#current_rest_api_endpoint").val().trim();

                    reset_everything()

                    if (___url_string){

                        ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                        ___hostname   = ___url.hostname; //    sampleserver3.arcgisonline.com
                        _organization = ___hostname

                        update_url_parameter('org', _organization)
                        update_url_parameter('url', ___url_string)
                        
                        document.getElementById("title").innerHTML = _organization; 
                        
                        scan_root_folder()
                    }//if

                }

    
                function init_start_root_input(){
    
    
                    reset_everything()
    
                    $("#current_rest_api_endpoint").val(___url_string)
    
                    $('#current_rest_api_endpoint').on('search', letsgo_handler);
                    $( "#letsgo").click(letsgo_handler);

                    // token
                    $( "#generate_token").click(generate_token_handler);
                    $( "#clear_token").click(clear_token_handler);
    
                }



                // token
                async function generate_token_handler(){


                    // Generate Token param : https://developers.arcgis.com/rest/services-reference/enterprise/generate-token.htm
                    var token_data_param = {}

                    /* working sample
                    token_data_param.username = 'your-portal-online-account-name'
                    token_data_param.password = 'Your-pass-word'
                    token_data_param.client = ''
                    token_data_param.ip = ''
                    // 'referer' must be specified."]
                    token_data_param.referer = 'https://gisnexus.palmspringsca.gov/server/admin'
                    token_data_param.expiration = 1440
                    token_data_param.f = 'pjson'
                    */
                    token_data_param.username = $("#login_name").val() //'your-portal-online-account-name'
                    token_data_param.password = $("#login_password").val() //'Your-pass-word'
                    token_data_param.client = ''
                    token_data_param.ip = ''
                    // 'referer' must be specified."]
                    token_data_param.referer = token_referer  //'http://localhost:10/json2tree'  'https://transparentgov.net/'  'https://gisnexus.palmspringsca.gov/server/admin'
                    
                    token_data_param.expiration = parseInt($("#expire_in_days").val()) * 1440
                    token_data_param.f = 'pjson'

                    var token_response

                    try{
                        var token_response_raw = await $.ajax({
                                    type: "POST",
                                    url: generateTokenUrl,
                                    data: token_data_param,
                                    success: function (data) {

                                        console.log(data);
                                        return data;
                                    },
                                    //dataType: dataType
                                });
                    } catch(error){
                        console.log('ajax token failed : ', error)
                        alert(error)
                    }// try - catch

                    console.log('token response raw : ', token_response_raw)
                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                    if (typeof token_response_raw === 'object') {
                        // is object
                        token_response = token_response_raw
                    } else {
                        // is string
                        token_response = JSON.parse(token_response_raw)
                    }
                    console.log('token response object : ', token_response)


                    if (token_response.token){
                        arcgis_online_token = token_response.token
                        $("#arcgis_online_token").val(arcgis_online_token)
                        // refresh with new token
                        letsgo_handler()
                    } 
                    if (token_response.error){
                        var error_message = token_response.error.details[0] + ' : ' + token_response.error.message
                        // do not do this, token should be always empty if no token used.
                        //$("#arcgis_online_token").val(error_message)
                        // instead use alert
                        alert(error_message)


                    }
                   



                }

                function clear_token_handler(){
                    arcgis_online_token = ''
                    $("#arcgis_online_token").val(arcgis_online_token)
                    update_url_parameter('arcgis_online_token', arcgis_online_token)
                }
    
    
    
    /**/
    // --- end --- let's go to your REST api -------
    /**/



 // +++++++++++ helper ++++++++++++++

                                function render_message_service_panel(_msg_){

                                    var list_array = ["<div class='list-group'>"];
                                   
                                    list_array.push("<label>" + _msg_ + "</label>")
                                    list_array.push("</div>")
                                    $("#inside_folder_item_list").html(list_array.join(""));
                                }

                                function render_message_icon_panel(_msg_){

                                    var list_array = ["<div class='list-group'>"];
                                   
                                    list_array.push("<label>" + _msg_ + "</label>")
                                    list_array.push("</div>")
                                    $("#icon_list").html(list_array.join(""));

                                }

                   


                                function progressing_info(_which_panel, _signal, _info){


                                    console.log(_which_panel, ' ( '+ _signal + ' ) ' + _info)
                                                    
                                    switch(_which_panel) {

                                        case 'folder':
                                            $('#message_root_folder').text(' ('+ _signal + ')' + _info); 
                                          break;

                                        case 'layer':
                                            $('#message_mapserver').text(' ('+ _signal + ')' + _info); 
                                          break;

                                        case 'icon':
                                            $('#message_icon').text(' ('+ _signal + ')' + _info); 
                                            break;


                                        default:
                                          // code block
                                      }
                                                        
                                                    
                                    

                                }

                     // +++++++++++ end ++++++++++  helper ++++++++++++++




    

            function render_single_imageserver_root_folder(_imageServer_root, _imageServer_url){


                                    /*

                                          
                                                  .../rest/services/.../ImageServer
                                                  https://emapsplus.com/arcgis/rest/services/Orthos/ALBarbour2015/ImageServer

                                                       {
                                                          advancedQueryCapabilities: {useStandardizedQueries: true, supportsStatistics: true, supportsOrderBy: true, supportsDistinct: true,…}
                                                          allowComputeTiePoints: false
                                                          allowRasterFunction: true
                                                          allowedMosaicMethods: "NorthWest,Center,LockRaster,ByAttribute,Nadir,Viewpoint,Seamline,None"
                                                          bandCount: 3
                                                          capabilities: "Image,Metadata,Catalog"
                                                          copyrightText: ""
                                                          currentVersion: 10.31
                                                          defaultCompressionQuality: 75
                                                          defaultMosaicMethod: "Northwest"
                                                          defaultResamplingMethod: "Bilinear"
                                                          description: "Orthos/ALBarbour2015"
                                                          editFieldsInfo: null
                                                          exportTilesAllowed: false
                                                          extent: {xmin: 680085.0512943268, ymin: 383020.5546703398, xmax: 916230.5512943268, ymax: 617293.0546703398,…}
                                                          fields: [{name: "OBJECTID", type: "esriFieldTypeOID", alias: "OBJECTID", domain: null},…]
                                                          fullExtent: {xmin: 680085.0512943268, ymin: 383020.5546703398, xmax: 916230.5512943268, ymax: 617293.0546703398,…}
                                                          hasColormap: false
                                                          hasHistograms: true
                                                          hasMultidimensions: false
                                                          hasRasterAttributeTable: false
                                                          initialExtent: {xmin: 680085.0512943268, ymin: 383020.5546703398, xmax: 916230.5512943268, ymax: 617293.0546703398,…}
                                                          maxDownloadImageCount: 20
                                                          maxDownloadSizeLimit: 2048
                                                          maxImageHeight: 4100
                                                          maxImageWidth: 15000
                                                          maxMosaicImageCount: 20
                                                          maxPixelSize: 0
                                                          maxRecordCount: 1000
                                                          maxScale: 0
                                                          maxValues: [255, 255, 255]
                                                          meanValues: [68.50144885956104, 83.65670840420518, 82.23853310654343]
                                                          mensurationCapabilities: "None"
                                                          minPixelSize: 0
                                                          minScale: 0
                                                          minValues: [0, 0, 0]
                                                          mosaicOperator: "First"
                                                          name: "Orthos/ALBarbour2015"
                                                          objectIdField: "OBJECTID"
                                                          ownershipBasedAccessControlForRasters: null
                                                          pixelSizeX: 0.5
                                                          pixelSizeY: 0.5
                                                          pixelType: "U8"
                                                          rasterFunctionInfos: []
                                                          rasterTypeInfos: [{name: "Raster Dataset", description: "Supports all ArcGIS Raster Datasets", help: ""}]
                                                          serviceDataType: "esriImageServiceDataTypeRGB"
                                                          serviceDescription: ""
                                                          sortField: ""
                                                          sortValue: null
                                                          spatialReference: {wkid: 102629, latestWkid: 102629}
                                                          stdvValues: [54.08312313448168, 61.45362817410963, 59.15355889026894]
                                                          supportsAdvancedQueries: true
                                                          supportsStatistics: true
                                                          useStandardizedQueries: true
                                                       }


                                                       ImageServer have single layer, no nested structure, so just output 1 single layer


                                        */


                                                       // get center lat, center long, from image-server "extent" , "fullextent" properties
                                                        // not use, because it slow down the whole process
                                                       //clientSide_project(_imageServer_root) 



                                                       folder_structure_flatjson = [ 
                                                        
                                                                // root 
                                                                {
                                                                    absolute_path: _imageServer_url,
                                                                    icon: folder_icon,
                                                                    id: 0,
                                                                    node_path: "/",
                                                                    parent: "#",
                                                                    relative_path: "Root",
                                                                    state: {opened: true},
                                                                    text: "Root",
                                                                    type: "folder",

                                                                }, 

                                                                // image server
                                                                {

                                                                    absolute_path: _imageServer_url,
                                                                    icon: ImageServer_icon,
                                                                    id: 1,
                                                                    node_path: _imageServer_root.name,                         // "Aerial/La_Quinta_areial_2013",
                                                                    parent: 0,
                                                                    relative_path: _imageServer_root.name,                     // "La_Quinta_areial_2013",
                                                                    state: {},
                                                                    text:   _imageServer_root.name + ' <sup>ImageServer</sup>',      // "La_Quinta_areial_2013 ( ImageServer ) ",
                                                                    type: "ImageServer"

                                                                }


                                                     ]


                                                      jstree_root_folder(folder_structure_flatjson, ___url_string,  _organization, ___hostname )


            }




            

                                            // when user click a folder, find all sub-item which use this _folder_item_id as their parent id, show sub-item (children item) at service panel (center)
                                            // will not use jstree, only display list collection
                                            function render_folder(_parent_id){


                                                console.log('render  folder  id is ', _parent_id )

                                               
                                            
                                                var list_array = ["<div class='list-group'>"];


                                                for (f = 0; f < folder_structure_flatjson.length; f++) {
                                                
                                                    // if (folder_structure_flatjson[f].parent == _parent_id.toString()) {
                                                    if (folder_structure_flatjson[f].parent == _parent_id) {


                                                                                

                                                                    // no need based on type, always use  onclick='selectFolderLevelItem(id)'
                                                                    // when user click list-collection any type item(group layer, feature layer, or table), always trigger select correspondent node on jstree, so no mather what type is.
                                                                    // just like (equal to) user manually click any jstree node, then follow downstream processing. 

                                                        

                                                                    if (folder_structure_flatjson[f].type == 'folder') {


                                                                            // folder 
                                                                                            
                                                                                        
                                                                                     // List group with transparent background  https://github.com/twbs/bootstrap/issues/29318
                                                                                            var _html_tag   = "<a href='javascript:;' onclick='selectFolderLevelItem(" + folder_structure_flatjson[f].id + ");'>";

                                                                                            _html_tag  +=       "<span class='" + folder_structure_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                                            _html_tag  +=       "  " +  folder_structure_flatjson[f].text

                                                                                            _html_tag  +=    "</a>"
                                                                                            _html_tag  +=    "</br>"

                                                                                            list_array.push(_html_tag);
                                                                                    


                                                                    } else {
                                                                            // service , mapserver, etc....
                                                                                            


                                                                                                var _html_tag   = "<a href='javascript:;' onclick='selectFolderLevelItem(" + folder_structure_flatjson[f].id + ");'>";

                                                                                                _html_tag  +=       "<span class='" + folder_structure_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                                                _html_tag  +=       "  " + folder_structure_flatjson[f].text 

                                                                                                _html_tag  +=    "</a>"
                                                                                                _html_tag  +=    "</br>"

                                                                                                list_array.push(_html_tag);
                                                                    }//if

                                                    }//if




                                                }// for 


                                                list_array.push("</div>")
                                                $("#inside_folder_item_list").html(list_array.join(""));
                                                



                                                if (list_array.length > 2) {
                                                            // not empty, nothing to do
                                                } else {
                                                            // empty, insert empty message
                                                            render_message_service_panel("Empty ( or maybe login to gis portal with password required)")
                                                }




                                                // at bottom of render folder function, because render folder do not use jstree. 
                                                // other render xxx use jstree, will place message_xxxx into there jstree_xxxx function
                                                // wrong
                                                //var parent_folder_itself = folder_structure_flatjson[_parent_id]

                                                // find the item, item.id = parent id
                                                var parent_folder_itself = folder_structure_flatjson.find(element => element.id == _parent_id);

                                                                                    


                                                var parent_folder_display_text = parent_folder_itself.relative_path
                                                var parent_folder_full_url = parent_folder_itself.absolute_path
                                                console.log("parent_folder_itself", parent_folder_itself)

                                                // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                                var _html_for_message_mapserver = '<a target="_blank" id="_mapserver_link" href="' + parent_folder_full_url + '?f=html">' 
                                                _html_for_message_mapserver    +=   parent_folder_display_text 
                                                _html_for_message_mapserver    += '</a>'
                                                _html_for_message_mapserver    += '<br>'
                                                _html_for_message_mapserver    += '<a target="_blank" id="_mapserver_link2" href="' + parent_folder_full_url + '?f=html">' 
                                                _html_for_message_mapserver    +=   parent_folder_full_url 
                                                _html_for_message_mapserver    += '</a>'
                                               
                                                $('#message_mapserver').html( _html_for_message_mapserver);

                                                

                                            }






   // only for list(searchLayer), not for folder.js
   // only for feature-layer, table, raster-layer, scene-server
   async function show_details(_map_server_url_, _layer_id_,  _layer_name_ , _type_){

             
              populate_namingLink(_map_server_url_, _layer_id_,  _layer_name_ , _type_)



              // only show details on MapServer
              //if (_type_ == "MapServer"){

                                            turn_on_detail_panel()


                                            console.log(' show details ', _map_server_url_, _layer_id_,  _layer_name_, _type_)


                                            var _link_url
                                            
                                            if (_layer_id_ == -99999){

                                                // MapServer or ImageServer
                                                _link_url = _map_server_url_
                                            } else {
                                                // layer
                                                _link_url   = _map_server_url_ + '/' +  _layer_id_
                                            }


                                            _html_for_message_icon = ''
                                            _html_for_more_info_icon  = ''

                                            var _link_display_text = _layer_name_ + ' ( ' + _type_ + ' ) '

                                             // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                            _html_for_message_icon = '<a target="_blank" id="_layer_link" href="'+ _link_url + '?f=html" style="font-size:small; font-weight: bolder;">'  
                                            _html_for_message_icon +=  _link_display_text 
                                            _html_for_message_icon += '</a>'

                                            _html_for_message_icon    += '<br>' 

                                            _html_for_message_icon    += '<a target="_blank" id="_layer_link2" href="'+ _link_url + '?f=html" style="font-size:xx-small; font-weight: lighter;">' 
                                            _html_for_message_icon    +=   _link_url 
                                            _html_for_message_icon    += '</a>'

                                            $('#message_icon').html(_html_for_message_icon);

                                            /**/     
                                            //  .................. map server only  .................. 
                                            
                                            var  _url_mapserver_legend = _map_server_url_ + '/legend'
                                            mapserver_legend  =await arcgis_ajax_cross_origin(_url_mapserver_legend, _cross);  // cross origin method 
                                                                                                
                                            console.log( ' ** mapserver ** legend **  ', mapserver_legend )
                                            var mapServerRootJson =await arcgis_ajax_cross_origin(_map_server_url_, _cross);  // cross origin method 

                                            //  ..................  end .................. map server only  .................. 
                                            /**/



                                            
                                            get_mapserver_info_html(_map_server_url_)



                                            /**/
                                            // show layer legend
                                            show_legend(_layer_id_, mapserver_legend)

                                            // layer only
                                            $("#message_more_info_icon").show();
                                            
                                            get_layer_fields(_link_url)
                                
             // } // if MapServer


   }