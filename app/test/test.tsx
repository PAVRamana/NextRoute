.hero {
  position:relative;
  background-color:#e15915;
  height:50px !important;
  width:50px !important;
  border-radius:100px;
  border-bottom-left-radius:0;
  border-bottom-right-radius:0;
}

.hero:after {
  content:'';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 0;
  border-top: solid 65px #e15915;
  border-left: solid 25px transparent;
  border-right: solid 25px transparent;
}