

//SNIPPET
//name=layout
const layout = engine.layout.build({
  parent:parent,
  names:0,
  styles:{
    all:{
      landscape:{
          //path with separated "-" for items
          "main-body":[]
      },
      //same as landscape
      portrait:{}
    },
  },
  builders:{
    //path with separated "-" for items
    "main":{tag:"div"},
  },
  layouts:{
    all:{
      landscape:{
        //row
        "#1*r:60px auto=main":[],
        //column
        "#2*c:50px auto=bottom":["side_menu","body"],
        //grid
        "#3*g3":[
          "one","two","three",
          "one","two","three"
        ]
      },
      //same as landscape
      portrait:{},
    },
  }
});