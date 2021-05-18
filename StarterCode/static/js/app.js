// 1: Using D3 Library to read in samples.json.
d3.json("data/samples.json").then(function(data) {
  // console.log(data);
  
  var metaData = data.metadata[0]
  var name_id_filter = data.names
  var test = data.samples;
  var indexarray = test.filter(x => x.id == id_filter)
  var baseindex = indexarray[0]
  console.log(indexarray)
  console.log(test)
  console.log(baseindex)
  
  var id_filter = name_id_filter.filter((x, index) =>{
      return name_id_filter.indexOf(x) === index;
  });
 
  var name_id = d3.select("#selDataset");

  var test = id_filter.map((id) => {
      name_id
        .append("option")
        .property("value", id)
        .text(id);
    });


    console.log(metaData)
    createFeatures(id_filter[0]);

    //4. Display the sample metadata, i.e., an individual's demographic information.
  var meta = d3.select(".panel-title");
      meta
       .append("li").text("ID:"+ metaData.id)
       .append("li").text("Age:"+metaData.age)
       .append("li").text("Gender:" +metaData.gender)
       .append("li").text("Ethnicity:"+metaData.ethnicity)
       .append("li").text("Bbtype:"+metaData.bbtype)
       .append("li").text("Wfreq:"+metaData.wfreq)
       .append("li").text("Location: "+metaData.location);
  // var test2 = metaData.map((info) => {
  //   meta
  //     .append("option")
  //     .property("value", info)
  //     .text(info);
  // });


});

var dropdown = d3.select("#selDataset").on("change", createFeatures);

function createFeatures(id_filter) {
  
  if (id_filter == "940") {
    var id_selected = "940"
    console.log("id_selected: ", id_selected)
  }
 
  else{
    var id_selected = this.value
    console.log("id_selected: ", id_selected);
  }
  
  ///////////////////
  d3.json("data/samples.json").then(function(data) {
  var OTU = data.samples[id_selected[0]].sample_values
  var BID = data.samples[id_selected[0]].otu_ids
  var text = data.samples[id_selected[0]].otu_labels
  console.log(OTU)
  console.log(id_selected)
    var OTU_Count = [];
    for (var i = 0; i < OTU.length; i++){
        OTU_Count.push(OTU[i])
    }

    function bar(OTU) {
      var a = [],
          b = [],
          prev;

      OTU.sort();
      for (var i = 0; i < OTU.length; i++) {
          if (OTU[i] !== prev) {
          a.push(OTU[i]);
          b.push(1);
          } else {
          b[b.length - 1]++;
          }
          prev = OTU[i];
          
      }
      var item = a
      function setID(item, index) {
          var fullname = "id:" + item;
          return fullname;
        }
        
        var output = item.map(setID);

      // console.log(a)
      // console.log(b)
      // console.log(output)
      var scores = b
      var l = output;

      var score = {};
      for( var i=0,n = scores.length; i<n; i++){
        score[scores[i]] = l[i];
      }
      
      for( var key in keys=Object.keys(score).sort((c,d) => d-c) ){
        var prop = keys[key];
        console.log(prop, score[prop]);
      }
      return [b, output];
      }
      
      var result = bar(OTU);
      // console.log('[' + result[0] + ']','[' + result[1] + ']')

      var trace1 = {
        x: result[0],
        y: result[1],
        type: "bar"
    };

    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "OTU ID vs OTU Frequency",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "OTU Frequency" }
    };

    Plotly.newPlot("bar", data, layout);
    
        var trace2 = {
        x:  OTU,
        y: BID,
        text: text,
        mode: 'markers',
        marker: {
          color: BID,
          size: OTU,
        }
      };
      
      var bubbledata = [trace2];
      
      var bubblelayout = {
        title: `Sample Belly Button Biodiversity`,
        showlegend: false,
        hovermode: "closest",
        xaxis: {title:"OTU ID"},
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', bubbledata, bubblelayout);



  });

};