export default function createScenario(name, rows, cols) {
  var scenario = {
    name: name,
    id: Date.now(),
    table: [],
  };

  for (var i = 0; i < rows; i++) {
    var row = { id: i, title: "", cols: [] };
    for (var j = 0; j < cols; j++) {
      row.cols.push({ type: "text", questions: "", answers: "", score: 100, src:'' });
    }
    scenario.table.push(row);
  }

  return scenario;
}
