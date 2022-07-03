export default function createScenario(rows, cols) {
  var scenario = {
    name: '',
    id: Date.now(),
    table: [],
  };

  for (var i = 0; i < rows; i++) {
    var row = { id: i, title: "", cols: [] };
    for (var j = 0; j < cols; j++) {
      row.cols.push({ type: "text", question: "", answer: "", score: 100, src:'' });
    }
    scenario.table.push(row);
   
  }
  return scenario;
}
