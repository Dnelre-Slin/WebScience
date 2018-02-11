<!DOCTYPE html>
<html>
<head>
<style>


/*Start*/
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: login; }
.item5 { grid-area: footer; }



body{
background-image: url("flowers.jpg");
background-size: cover;
background-attachment: fixed;
}

.grid-container {
  display: grid;
  width: 1500px;
  margin: auto;
  grid-template-areas:
    'header header'
    'login login'
    'menu  main  '
    'menu footer ';
  grid-template-rows: 150px 40px auto 40px;
  grid-gap: 5px;
  background-color: rgba(153, 102, 255, 0.2);
  grid-template-columns: 3fr 10fr;
 
}
.grid-container div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.grid-container .item2 ul{
  text-decoration: none;
  background-color: cyan;
  padding: 0;
  margin: 0;
}

.grid-container .item2 ul li{
  list-style-type: none;
  margin-bottom: 1px;
  background-color: green;
  padding: 30px;
  height: 20px;
}

.grid-container .item2 ul li a{
  padding: 50px;
}




</style>
</head>
<body>
<div class="grid-container">
  <div class="item1">Header</div>
  <div class="item2">
    <ul>
      <li href="">Side1</li>
      <li href="">Side2</li>
      <li href="">Side3</li>
      <li href="">Side4</li>
      <li href="">Side5</li>
      <li href="">Side6</li>
    </ul>
  </div><!--Menu-->
  <div class="item3">Main
    <?php 
     for($i = 0; $i < 50; $i++) {
     echo "<p> Heeeei </p>";
   } ?>
  
  </div>
  <div class="item4">login</div>
  <div class="item5">Footer</div>
</div>

</body>
</html>