<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>{$content}</div>
  </body>
  <script lang="ts">
    interface x {
      {$for1}
    }
    export default {
      mounted(){

        let data = {
          {$for2}
        }
      }
    }
  </script>
</html>