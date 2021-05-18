// 1: Using D3 Library to read in samples.json.
d3.json("data/samples.json").then(function(data) {
    // console.log(data);
    
    console.log(OTU)
    var name_id_filter = data.names
    
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
    console.log(name_id_filter)
    
    
    var OTU = data.samples[0].sample_values
    var OTU_Count = [];
    for (var i = 0; i < OTU.length; i++){
        // console.log(OTU[i]);
        OTU_Count.push(OTU[i])
    }
    
    
    
  // console.log(OTU_Count)    
  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }    
  // var OTU_Unique = OTU_Count.filter(onlyUnique);
  // console.log(OTU_Unique);

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

    console.log(a)
    console.log(b)
    console.log(output)
    var scores = b
    var countries = output;

    var score = {};
    for( var i=0,n = scores.length; i<n; i++){
      score[scores[i]] = countries[i];
    }
    
    for( var key in keys=Object.keys(score).sort((c,d) => d-c) ){
      var prop = keys[key];
      console.log(prop, score[prop]);
    }
    return [b, output];
    }
    
    var result = bar(OTU);
    console.log('[' + result[0] + ']','[' + result[1] + ']')
   

    // Create the Trace
    console.log(result)
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

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);

  });

  function createFeatures(id_filter) {
  
    if (id_filter == "940") {
      var id_selected = "940"
      console.log("id_selected: ", id_selected)
    }
   
    else{
      var id_selected = this.value
      console.log("id_selected: ", id_selected);
    }
  
    d3.json("data/samples.json").then((data) => {
      
      var name_id_filters = data.filter(row => row.names == id_selected)
      var indexName = name_id_filter.indexOf(name_id_filters)
      console.log(indexName)
    

          // Create the Trace
    console.log(result)
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

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);






  
      // Sending our whales layer to the createMap function
      createMap(whales, id_selected );
    });
  };