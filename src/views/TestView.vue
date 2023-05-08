<template>
    <div class="home">
      <editor
        api-key="eg041ccwvkp18fjm6tnp9ky43bbx6cinicnggeitkt1haqny"
        plugins="code"
        toolbar="bold italic underline code"
        :init="{ menubar: false, height: 500 }"
      />
    </div>
  </template>
  
  <script>
  import Editor from '@tinymce/tinymce-vue'
  export default {
    components: {
       'editor': Editor
     }
  }
  </script>
  