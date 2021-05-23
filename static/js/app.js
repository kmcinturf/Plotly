// 1: Using D3 Library to read in samples.json.
d3.json("data/samples.json").then(function(data) {
  // console.log(data);
  
  
  var name_id_filter = data.names
  var test = data.samples;
  var id_filter = name_id_filter.filter((x, index) =>{
    return name_id_filter.indexOf(x) === index;
    }); 
  var indexarray = test.filter(x => x.id == id_filter)
  var baseindex = indexarray[0]
  
  // console.log(id_filter)
  // console.log(indexarray)
  // console.log(test)
  // console.log(baseindex)
  
 
 
  var name_id = d3.select("#selDataset");

  var test = id_filter.map((id) => {
      name_id
        .append("option")
        .property("value", id)
        .text(id);
    });


    // console.log(metaData)
    optionChanged(id_filter[0]);

    //4. Display the sample metadata, i.e., an individual's demographic information.
 
  // var test2 = metaData.map((info) => {
  //   meta
  //     .append("option")
  //     .property("value", info)
  //     .text(info);
  // });


});

// var dropdown = d3.select("#selDataset").on("change", optionChanged);

function optionChanged(id_filter) {
  // console.log(id_filter)
 
  
  // if (id_filter == "940") {
  //   var id_selected = "940"
  //   console.log("id_selected: ", id_selected)
  // }
 
  // else{
  //   var id_selected = this.value
  //   console.log("id_selected: ", id_selected);
  // }
  
  ///////////////////
  d3.json("data/samples.json").then(function(data) {
  var indexarray = data.samples.filter(x => x.id == id_filter)
  // console.log(indexarray)
  var OTU = indexarray[0]["sample_values"]
  var BID = indexarray[0]["otu_ids"]
  var text = indexarray[0].otu_labels
  // console.log(indexarray[0].id)
  var length = data.names.indexOf(indexarray[0].id, 0)
  var metaData = data.metadata[length]
 
  // console.log(length)
  // console.log(data.metadata[length])
  
 
  // console.log(data.metadata[length].id)
  var meta = d3.select("#sample-metadata");
  meta
   .html("li").text("ID:"+indexarray[0].id)
   .append("li").text("Age:"+metaData.age)
   .append("li").text("Gender:" +metaData.gender)
   .append("li").text("Ethnicity:" + "\n" +metaData.ethnicity)
   .append("li").text("Bbtype:"+metaData.bbtype)
   .append("li").text("Wfreq:"+metaData.wfreq)
   .append("li").text("Location: "+ metaData.location);
 
    // var OTU_Count = [];
    // for (var i = 0; i < OTU.length; i++){
    //     OTU_Count.push(OTU[i])
    // }

    // function bar(OTU) {
    //   var a = [],
    //       b = [],
    //       prev;

    //   OTU.sort();
    //   for (var i = 0; i < OTU.length; i++) {
    //       if (OTU[i] !== prev) {
    //       a.push(OTU[i]);
    //       b.push(1);
    //       } else {
    //       b[b.length - 1]++;
    //       }
    //       prev = OTU[i];
          
    //   }
    //   var item = a
    //   function setID(item, index) {
    //       var fullname = "id:" + item;
    //       return fullname;
    //     }
        
    //     var output = item.map(setID);

    //   // console.log(a)
    //   // console.log(b)
    //   // console.log(output)
    //   var scores = b
    //   var l = output;

    //   var score = {};
    //   for( var i=0,n = scores.length; i<n; i++){
    //     score[scores[i]] = l[i];
    //   }
      
    //   for( var key in keys=Object.keys(score).sort((c,d) => d-c) ){
    //     var prop = keys[key];
    //     // console.log(prop, score[prop]);
    //   }
    //   return [b, output];
    //   }
      
    //   var result = bar(OTU);
      // console.log('[' + result[0] + ']','[' + result[1] + ']')

      var trace1 = {
        x: indexarray[0]["sample_values"].slice(0,10).reverse(),
        y: indexarray[0]["otu_ids"].slice(0,10).map(label => `OTU ${label}`).reverse(),
        type: "bar",
        orientation: 'h',
        text: indexarray[0]["otu_labels"]
    };

    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "OTU ID vs OTU Frequency",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "Top Ten OTU's " }
    };

    Plotly.newPlot("bar", data, layout);
    
        var trace2 = {
        x:  indexarray[0]["otu_ids"],
        y: indexarray[0]["sample_values"],
        text: indexarray[0]["otu_labels"],
        mode: 'markers',
        marker: {
          color: indexarray[0]["otu_ids"],
          size: indexarray[0]["sample_values"],
      
        }
      };
      
      var bubbledata = [trace2];
      
      var bubblelayout = {
        title: `Sample Belly Button Biodiversity`,
        showlegend: false,
        hovermode: "closest",
        xaxis: {title:"OTU ID"},
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', bubbledata, bubblelayout);



  });

};